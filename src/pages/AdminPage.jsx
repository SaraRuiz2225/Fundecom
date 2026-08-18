import { useEffect, useMemo, useState } from "react";

const sections = [
  { key: "pageBlocks", label: "Bloques de página", description: "Agregue texto, imágenes, videos, galerías o banners a cualquier página.", fields: [["title", "Título"], ["type", "Tipo de componente", "select", [["text", "Texto"], ["image", "Texto con imagen"], ["video", "Video"], ["gallery", "Galería"], ["banner", "Banner con botón"]]], ["page", "Página donde aparecerá", "select", [["/", "Inicio"], ["/servicios", "Servicios"], ["/programas", "Programas"], ["/proyectos", "Proyectos"], ["/equipo", "Equipo"], ["/contacto", "Contacto"]]], ["position", "Ubicación dentro de la página", "select", [["top", "Después de la portada (destacado)"], ["bottom", "Al final de la página"]]], ["enabled", "Visible en la página", "checkbox"], ["text", "Texto", "textarea"], ["imageUrl", "Imagen", "image"], ["videoUrl", "Video (YouTube, Vimeo o archivo)", "video"], ["galleryImages", "Imágenes de galería (una URL por línea)", "lines"], ["buttonLabel", "Texto del botón"], ["linkUrl", "Enlace del botón"]] },
  { key: "contactInfo", label: "Contacto", kind: "object", fields: [["phoneDisplay", "Teléfono visible"], ["phoneRaw", "Teléfono para llamadas"], ["secondaryPhoneDisplay", "Segundo teléfono"], ["secondaryPhoneRaw", "Segundo teléfono para llamadas"], ["email", "Correo general"], ["directorEmail", "Correo de dirección"], ["address", "Dirección"], ["whatsapp", "Enlace de WhatsApp"], ["maps", "Enlace de Google Maps"]] },
  { key: "siteImages", label: "Imágenes principales", kind: "object", fields: [["homeHero", "Imagen de portada", "image"], ["contactHero", "Imagen de contacto", "image"], ["servicesFeature", "Imagen de servicios", "image"], ["mapIllustration", "Imagen de mapa", "image"]] },
  { key: "homeHighlights", label: "Líneas de trabajo", fields: [["title", "Título"], ["description", "Descripción", "textarea"], ["icon", "Icono"]] },
  { key: "homeMetrics", label: "Cifras de impacto", fields: [["value", "Cifra"], ["label", "Descripción"]] },
  { key: "partners", label: "Aliados", fields: [["label", "Nombre"], ["logo", "Logotipo", "image"], ["href", "Enlace"]] },
  { key: "teamMembers", label: "Equipo", fields: [["name", "Nombre"], ["role", "Cargo"], ["specialty", "Especialidad"], ["summary", "Perfil", "textarea"], ["details", "Información adicional", "textarea"], ["image", "Fotografía", "image"], ["videoUrl", "Enlace de video"]] },
  { key: "teamGallery", label: "Galería del equipo", fields: [["image", "Fotografía", "image"], ["alt", "Descripción de la fotografía"]] },
  { key: "services", label: "Servicios", fields: [["title", "Título"], ["description", "Descripción", "textarea"], ["icon", "Icono"], ["bullets", "Puntos principales (uno por línea)", "lines"], ["href", "Enlace"]] },
  { key: "programs", label: "Programas", fields: [["title", "Título"], ["category", "Categoría"], ["description", "Descripción", "textarea"], ["goal", "Meta"], ["icon", "Icono"], ["href", "Enlace"], ["image", "Imagen", "image"], ["videoUrl", "Enlace de video"]] },
  { key: "projects", label: "Proyectos", fields: [["title", "Título"], ["client", "Cliente"], ["location", "Ubicación"], ["problem", "Problema", "textarea"], ["solution", "Solución", "textarea"], ["result", "Resultado", "textarea"], ["image", "Imagen", "image"], ["videoUrl", "Enlace de video"], ["href", "Enlace relacionado"]] },
  { key: "faqs", label: "Preguntas frecuentes", fields: [["question", "Pregunta"], ["answer", "Respuesta", "textarea"]] },
  { key: "socialLinks", label: "Redes sociales", fields: [["label", "Red social"], ["href", "Enlace"], ["icon", "Icono"]] },
  { key: "backups", label: "Historial y respaldos", kind: "backups", description: "Restaure una versión publicada anteriormente." },
];

function emptyItem(fields) {
  return { id: globalThis.crypto?.randomUUID?.() || `${Date.now()}`, ...Object.fromEntries(fields.map(([key, , type, options]) => [key, type === "lines" ? [] : type === "checkbox" ? true : type === "select" ? options[0][0] : ""])) };
}

function Login({ onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    setMessage("Ingresando…");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (!response.ok) return setMessage("Los datos de acceso no son correctos.");
    onSuccess();
  }

  return <main className="admin-login"><form className="admin-login__panel" onSubmit={submit}><a className="admin-back-link" href="/">← Volver a la página</a><p className="eyebrow">Acceso privado</p><h1>Administración Fundecompe</h1><p>Actualice el contenido mediante formularios seguros. Este panel no permite modificar código ni diseño.</p><label className="field"><span>Correo</span><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label className="field"><span>Contraseña</span><input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label><button className="button button--primary button--wide" type="submit">Ingresar</button><p className="admin-message" aria-live="polite">{message}</p></form></main>;
}

export function AdminPage() {
  const [authenticated, setAuthenticated] = useState(null);
  const [content, setContent] = useState({});
  const [activeKey, setActiveKey] = useState(sections[0].key);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [backups, setBackups] = useState([]);
  const active = useMemo(() => sections.find((section) => section.key === activeKey), [activeKey]);

  async function load() {
    try {
      const response = await fetch("/api/admin/content");
      if (!response.ok) return setAuthenticated(false);
      setContent(await response.json());
      await loadBackups();
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function loadBackups() {
    const response = await fetch("/api/admin/backups");
    if (response.ok) setBackups(await response.json());
  }

  function updateObject(field, value) {
    setContent((current) => ({ ...current, [active.key]: { ...current[active.key], [field]: value } }));
  }

  function updateItem(index, field, value) {
    setContent((current) => ({ ...current, [active.key]: current[active.key].map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item) }));
  }

  function moveItem(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= content[active.key].length) return;
    const items = [...content[active.key]];
    [items[index], items[target]] = [items[target], items[index]];
    setContent({ ...content, [active.key]: items });
  }

  async function upload(file, apply) {
    if (!file) return;
    setMessage("Subiendo archivo…");
    const reader = new FileReader();
    reader.onload = async () => {
      const response = await fetch("/api/admin/upload", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: file.name, type: file.type, data: reader.result }) });
      if (!response.ok) return setMessage("No fue posible subir el archivo.");
      const result = await response.json();
      apply(result.url);
      setMessage("Archivo cargado. Recuerde publicar los cambios.");
    };
    reader.readAsDataURL(file);
  }

  async function save() {
    setSaving(true);
    setMessage("Publicando…");
    try {
      const response = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
      setMessage(response.ok ? "Cambios publicados correctamente." : "No fue posible publicar los cambios.");
      if (response.ok) await loadBackups();
    } catch {
      setMessage("No fue posible publicar los cambios.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
  }

  async function restoreBackup(backup) {
    const date = new Intl.DateTimeFormat("es-CO", { dateStyle: "long", timeStyle: "short" }).format(new Date(backup.createdAt));
    if (!window.confirm(`¿Restaurar la versión del ${date}? El estado actual también se guardará como respaldo.`)) return;
    setSaving(true);
    setMessage("Restaurando versión…");
    try {
      const response = await fetch("/api/admin/backups/restore", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: backup.id }) });
      const result = await response.json();
      if (!response.ok) return setMessage("No fue posible restaurar esta versión.");
      setContent(result.content);
      await loadBackups();
      setMessage("Versión restaurada correctamente. La página pública ya usa este contenido.");
    } catch {
      setMessage("No fue posible restaurar esta versión.");
    } finally {
      setSaving(false);
    }
  }

  if (authenticated === null) return <main className="admin-loading">Cargando administración…</main>;
  if (!authenticated) return <Login onSuccess={load} />;

  const value = active.kind === "backups" ? backups : content[active.key] ?? (active.kind === "object" ? {} : []);

  function renderField(field, label, type, fieldValue, apply) {
    if (type === "image") return <div className="admin-media-field"><label className="field"><span>{label}</span><input value={fieldValue || ""} onChange={(e) => apply(e.target.value)} placeholder="URL o archivo cargado" /></label><label className="button button--ghost admin-upload">Subir imagen<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e) => upload(e.target.files?.[0], apply)} /></label>{fieldValue && <img src={fieldValue} alt="Vista previa" />}</div>;
    if (type === "textarea") return <label className="field"><span>{label}</span><textarea rows="4" value={fieldValue || ""} onChange={(e) => apply(e.target.value)} /></label>;
    if (type === "lines") return <label className="field"><span>{label}</span><textarea rows="5" value={(fieldValue || []).join("\n")} onChange={(e) => apply(e.target.value.split("\n").filter(Boolean))} /></label>;
    if (type === "video") return <div className="admin-media-field"><label className="field"><span>{label}</span><input value={fieldValue || ""} onChange={(e) => apply(e.target.value)} placeholder="URL de YouTube/Vimeo o archivo cargado" /></label><label className="button button--ghost admin-upload">Subir video<input type="file" accept="video/mp4,video/webm" onChange={(e) => upload(e.target.files?.[0], apply)} /></label>{fieldValue?.startsWith("/uploads/") && <video src={fieldValue} controls />}</div>;
    if (type === "checkbox") return <label className="admin-check"><input type="checkbox" checked={fieldValue !== false && fieldValue !== "false"} onChange={(e) => apply(e.target.checked)} /><span>{label}</span></label>;
    if (type === "select") {
      const options = active.fields.find(([key]) => key === field)?.[3] || [];
      return <label className="field"><span>{label}</span><select value={fieldValue || options[0]?.[0]} onChange={(e) => apply(e.target.value)}>{options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}</select></label>;
    }
    return <label className="field"><span>{label}</span><input value={fieldValue || ""} onChange={(e) => apply(e.target.value)} /></label>;
  }

  return <main className="admin-shell"><header className="admin-header"><div><p className="eyebrow">Panel privado</p><h1>Contenido de Fundecompe</h1><p>Edite únicamente los campos disponibles. La estructura y el diseño están protegidos.</p></div><div className="button-row"><a className="button button--ghost" href="/">Ver página</a><button className="button button--primary" type="button" disabled={saving} onClick={save}>Publicar cambios</button><button className="button admin-logout" type="button" onClick={logout}>Salir</button></div></header><div className="admin-layout"><nav className="admin-nav" aria-label="Secciones administrables">{sections.map((section) => <button className={section.key === activeKey ? "is-active" : ""} key={section.key} type="button" onClick={() => { setActiveKey(section.key); setMessage(""); }}>{section.label}</button>)}</nav><section className="admin-content"><div className="admin-content__heading"><div><p className="eyebrow">Sección</p><h2>{active.label}</h2>{active.description && <p>{active.description}</p>}</div>{!active.kind && <button className="button button--ghost" type="button" onClick={() => setContent({ ...content, [active.key]: [...value, emptyItem(active.fields)] })}>Agregar elemento</button>}</div>{active.kind === "backups" ? <div className="backup-list">{backups.length ? backups.map((backup) => <article className="backup-card" key={backup.id}><div><strong>{new Intl.DateTimeFormat("es-CO", { dateStyle: "long", timeStyle: "short" }).format(new Date(backup.createdAt))}</strong><span>{backup.reason === "restore" ? "Respaldo creado antes de una restauración" : "Versión anterior a una publicación"}</span></div><button className="button button--ghost" type="button" disabled={saving} onClick={() => restoreBackup(backup)}>Restaurar esta versión</button></article>) : <div className="admin-card"><strong>Aún no hay respaldos</strong><p>El primer respaldo aparecerá después de publicar un cambio.</p></div>}</div> : active.kind === "object" ? <div className="admin-card">{active.fields.map(([field, label, type]) => <div key={field}>{renderField(field, label, type, value[field], (next) => updateObject(field, next))}</div>)}</div> : <div className="admin-items">{value.map((item, index) => <article className="admin-card" key={item.id || `${active.key}-${index}`}><div className="admin-card__toolbar"><strong>{item.title || item.name || item.label || `Elemento ${index + 1}`}</strong><div><button type="button" aria-label="Mover arriba" onClick={() => moveItem(index, -1)}>↑</button><button type="button" aria-label="Mover abajo" onClick={() => moveItem(index, 1)}>↓</button><button className="admin-delete" type="button" onClick={() => setContent({ ...content, [active.key]: value.filter((_, itemIndex) => itemIndex !== index) })}>Eliminar</button></div></div>{active.fields.map(([field, label, type]) => <div key={field}>{renderField(field, label, type, item[field], (next) => updateItem(index, field, next))}</div>)}</article>)}</div>}<p className="admin-message" aria-live="polite">{message}</p></section></div></main>;
}
