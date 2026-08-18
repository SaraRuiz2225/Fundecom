import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { createReadStream, existsSync } from "node:fs";
import { copyFile, mkdir, readFile, readdir, rename, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import * as defaults from "../src/data/siteContent.js";

const port = Number(process.env.PORT || 8080);
const root = process.cwd();
const distDir = join(root, "dist");
const dataDir = process.env.CONTENT_DATA_DIR || join(root, "data");
const uploadDir = join(dataDir, "uploads");
const backupDir = join(dataDir, "backups");
const contentFile = join(dataDir, "content.json");
const sessionSecret = process.env.ADMIN_SESSION_SECRET || randomBytes(32).toString("hex");
const adminEmail = process.env.ADMIN_EMAIL || "";
const adminPassword = process.env.ADMIN_PASSWORD || "";
const allowedKeys = ["contactInfo", "brandAssets", "siteImages", "socialLinks", "primaryNavigation", "homeHighlights", "homeMetrics", "partners", "teamMembers", "teamGallery", "serviceCategories", "services", "programs", "projects", "faqs", "pageBlocks"];
const mimeTypes = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml", ".ico": "image/x-icon" };

await mkdir(uploadDir, { recursive: true });
await mkdir(backupDir, { recursive: true });

function initialContent() {
  return Object.fromEntries(allowedKeys.map((key) => [key, structuredClone(defaults[key])]));
}

async function getContent() {
  if (!existsSync(contentFile)) return initialContent();
  try { return { ...initialContent(), ...JSON.parse(await readFile(contentFile, "utf8")) }; }
  catch { return initialContent(); }
}

function json(response, status, value, headers = {}) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers });
  response.end(JSON.stringify(value));
}

async function body(request, limit = 35 * 1024 * 1024) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > limit) throw new Error("payload_too_large");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && timingSafeEqual(left, right);
}

function sign(value) {
  return createHmac("sha256", sessionSecret).update(value).digest("hex");
}

function isAuthenticated(request) {
  const cookie = request.headers.cookie?.split(";").map((value) => value.trim()).find((value) => value.startsWith("fundecompe_admin="));
  if (!cookie) return false;
  const [expires, signature] = cookie.slice("fundecompe_admin=".length).split(".");
  return Number(expires) > Date.now() && safeEqual(signature || "", sign(expires));
}

function secureContent(input) {
  const clean = {};
  for (const key of allowedKeys) {
    const value = input[key];
    if (Array.isArray(value) || (value && typeof value === "object")) clean[key] = value;
  }
  return clean;
}

async function createBackup(reason = "publication") {
  if (!existsSync(contentFile)) return null;
  const fileName = `content-${Date.now()}-${reason}.json`;
  await copyFile(contentFile, join(backupDir, fileName));
  return fileName;
}

async function listBackups() {
  const files = (await readdir(backupDir)).filter((name) => /^content-\d+-(?:publication|restore)\.json$/.test(name));
  const items = await Promise.all(files.map(async (name) => {
    const info = await stat(join(backupDir, name));
    return { id: name, createdAt: info.mtime.toISOString(), reason: name.endsWith("-restore.json") ? "restore" : "publication", size: info.size };
  }));
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 50);
}

async function serveFile(response, filePath) {
  try {
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error("not_file");
    response.writeHead(200, { "Content-Type": mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream" });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("No encontrado");
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  try {
    if (url.pathname === "/env-config.js" && request.method === "GET") {
      response.writeHead(200, { "Content-Type": "text/javascript; charset=utf-8", "Cache-Control": "no-store" });
      return response.end(`window.__APP_CONFIG__ = { FORMS_ENDPOINT: ${JSON.stringify(process.env.FORMS_ENDPOINT || "")} };`);
    }

    if (url.pathname === "/api/content" && request.method === "GET") return json(response, 200, await getContent());

    if (url.pathname === "/api/admin/login" && request.method === "POST") {
      const input = await body(request, 64 * 1024);
      if (!adminEmail || !adminPassword || !safeEqual(input.email, adminEmail) || !safeEqual(input.password, adminPassword)) return json(response, 401, { error: "invalid_credentials" });
      const expires = String(Date.now() + 8 * 60 * 60 * 1000);
      const secure = process.env.COOKIE_SECURE === "true" ? "; Secure" : "";
      return json(response, 200, { ok: true }, { "Set-Cookie": `fundecompe_admin=${expires}.${sign(expires)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${secure}` });
    }

    if (url.pathname === "/api/admin/logout" && request.method === "POST") return json(response, 200, { ok: true }, { "Set-Cookie": "fundecompe_admin=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0" });

    if (url.pathname.startsWith("/api/admin/") && !isAuthenticated(request)) return json(response, 401, { error: "unauthorized" });

    if (url.pathname === "/api/admin/content" && request.method === "GET") return json(response, 200, await getContent());

    if (url.pathname === "/api/admin/backups" && request.method === "GET") return json(response, 200, await listBackups());

    if (url.pathname === "/api/admin/backups/restore" && request.method === "POST") {
      const input = await body(request, 64 * 1024);
      if (!/^content-\d+-(?:publication|restore)\.json$/.test(input.id || "")) return json(response, 400, { error: "invalid_backup" });
      const backupPath = join(backupDir, input.id);
      if (!existsSync(backupPath)) return json(response, 404, { error: "backup_not_found" });
      const restored = secureContent(JSON.parse(await readFile(backupPath, "utf8")));
      const temporary = `${contentFile}.tmp`;
      await createBackup("restore");
      await writeFile(temporary, JSON.stringify(restored, null, 2));
      await rename(temporary, contentFile);
      return json(response, 200, { ok: true, content: { ...initialContent(), ...restored } });
    }

    if (url.pathname === "/api/admin/content" && request.method === "PUT") {
      const content = secureContent(await body(request, 6 * 1024 * 1024));
      const temporary = `${contentFile}.tmp`;
      await createBackup("publication");
      await writeFile(temporary, JSON.stringify(content, null, 2));
      await rename(temporary, contentFile);
      return json(response, 200, { ok: true });
    }

    if (url.pathname === "/api/admin/upload" && request.method === "POST") {
      const input = await body(request);
      const match = /^data:((?:image\/(?:jpeg|png|webp|gif))|(?:video\/(?:mp4|webm)));base64,(.+)$/s.exec(input.data || "");
      if (!match) return json(response, 400, { error: "unsupported_file" });
      const extension = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif", "video/mp4": ".mp4", "video/webm": ".webm" }[match[1]];
      const fileName = `${Date.now()}-${randomBytes(6).toString("hex")}${extension}`;
      const data = Buffer.from(match[2], "base64");
      if (data.length > 30 * 1024 * 1024) return json(response, 413, { error: "file_too_large" });
      await writeFile(join(uploadDir, fileName), data);
      return json(response, 201, { url: `/uploads/${fileName}` });
    }

    if (url.pathname.startsWith("/uploads/")) {
      const fileName = normalize(url.pathname.slice("/uploads/".length)).replace(/^\.\.(\/|\\)/, "");
      return serveFile(response, join(uploadDir, fileName));
    }

    const requested = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
    const normalized = normalize(requested).replace(/^\.\.(\/|\\)/, "");
    const assetPath = join(distDir, normalized);
    if (existsSync(assetPath)) return serveFile(response, assetPath);
    return serveFile(response, join(distDir, "index.html"));
  } catch (error) {
    return json(response, error.message === "payload_too_large" ? 413 : 500, { error: "request_failed" });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Fundecompe disponible en http://0.0.0.0:${port}`);
});
