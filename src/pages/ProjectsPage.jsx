import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { projects } from "../data/siteContent";

export function ProjectsPage() {
  return (
    <>
      <section className="page-hero page-hero--soft page-hero--projects">
        <div className="shell page-hero__copy">
          <span className="eyebrow">Casos de éxito</span>
          <h1>Proyectos que convierten retos en resultados</h1>
          <p>Experiencia de Fundecompe en fortalecimiento solidario, inclusión productiva, turismo, exportaciones y desarrollo agropecuario.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell project-list">
          {projects.map((project, index) => (
            <article key={project.title} className="project-case">
              <div className="project-case__number">{String(index + 1).padStart(2, "0")}</div>
              <div className="project-case__content">
                <p className="chip">{project.location}</p>
                <h2>{project.title}</h2>
                <p className="project-case__client">{project.client}</p>
                <div className="project-case__details">
                  <div><h3>Problema identificado</h3><p>{project.problem}</p></div>
                  <div><h3>Solución implementada</h3><p>{project.solution}</p></div>
                  <div className="project-case__result"><h3>Resultados obtenidos</h3><p>{project.result}</p></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell"><div className="cta-banner"><div><h2>Hablemos de su proyecto</h2><p>Podemos estructurar una solución acorde con su organización, comunidad o territorio.</p></div><Link className="button button--primary" to="/contacto">Contactar a Fundecompe <Icon name="arrow" className="button__icon" /></Link></div></div>
      </section>
    </>
  );
}
