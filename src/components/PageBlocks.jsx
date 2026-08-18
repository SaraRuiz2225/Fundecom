import { Link } from "react-router-dom";
import { pageBlocks } from "../data/siteContent";

function videoEmbedUrl(value = "") {
  try {
    const url = new URL(value);
    if (url.hostname.includes("youtube.com")) return `https://www.youtube.com/embed/${url.searchParams.get("v") || ""}`;
    if (url.hostname === "youtu.be") return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    if (url.hostname.includes("vimeo.com")) return `https://player.vimeo.com/video/${url.pathname.split("/").filter(Boolean).pop()}`;
  } catch { return ""; }
  return "";
}

function Action({ block }) {
  if (!block.buttonLabel || !block.linkUrl) return null;
  return block.linkUrl.startsWith("/")
    ? <Link className="button button--primary" to={block.linkUrl}>{block.buttonLabel}</Link>
    : <a className="button button--primary" href={block.linkUrl} target="_blank" rel="noreferrer">{block.buttonLabel}</a>;
}

function Block({ block }) {
  const embed = videoEmbedUrl(block.videoUrl);
  if (block.type === "gallery") {
    const images = (block.galleryImages || []).filter(Boolean);
    return <section className="section custom-block"><div className="shell"><div className="custom-block__heading"><p className="eyebrow">Contenido destacado</p><h2>{block.title}</h2>{block.text && <p>{block.text}</p>}</div><div className="custom-gallery">{images.map((image, index) => <img key={`${image}-${index}`} src={image} alt={`${block.title || "Galería"} ${index + 1}`} loading="lazy" />)}</div></div></section>;
  }
  if (block.type === "video") {
    return <section className="section custom-block"><div className="shell custom-block__video"><div className="custom-block__heading"><p className="eyebrow">Video</p><h2>{block.title}</h2>{block.text && <p>{block.text}</p>}<Action block={block} /></div><div className="custom-video">{embed ? <iframe src={embed} title={block.title || "Video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <video src={block.videoUrl} controls preload="metadata" />}</div></div></section>;
  }
  if (block.type === "banner") return <section className="section custom-block"><div className="shell"><div className="cta-banner custom-banner" style={block.imageUrl ? { backgroundImage: `linear-gradient(90deg, rgba(7,31,78,.94), rgba(7,31,78,.68)), url(${block.imageUrl})` } : undefined}><div><h2>{block.title}</h2>{block.text && <p>{block.text}</p>}</div><Action block={block} /></div></div></section>;
  return <section className="section custom-block"><div className={`shell custom-content${block.imageUrl ? " custom-content--media" : ""}`}><div className="custom-block__heading"><p className="eyebrow">{block.type === "image" ? "Imagen destacada" : "Información"}</p><h2>{block.title}</h2>{block.text && <p>{block.text}</p>}<Action block={block} /></div>{block.imageUrl && <img src={block.imageUrl} alt={block.title || "Contenido Fundecompe"} loading="lazy" />}</div></section>;
}

export function PageBlocks({ pathname, position = "bottom" }) {
  const visible = pageBlocks.filter((block) => block.page === pathname && (block.position || "bottom") === position && block.enabled !== false && block.enabled !== "false");
  return visible.map((block, index) => <Block key={block.id || `${block.title}-${index}`} block={block} />);
}
