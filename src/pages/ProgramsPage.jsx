import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { SectionHeading } from "../components/SectionHeading";
import { programs } from "../data/siteContent";

export function ProgramsPage() {
  return (
    <>
      <section className="page-hero page-hero--soft page-hero--programs">
        <div className="shell page-hero__copy">
          <span className="eyebrow">Programas propios</span>
          <h1>Aprendizaje que conecta y transforma</h1>
          <p>
            RedSaber y el Simulador Gerencial convierten el conocimiento
            colectivo y la práctica en capacidades reales.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            centered
            title="Programas clave"
            description="Cada programa puede adaptarse a organizaciones solidarias, instituciones educativas, empresas o procesos territoriales."
          />
          <div className="card-grid card-grid--two">
            {programs.map((program) => (
              <article key={program.title} className="surface-card">
                <div className="icon-badge">
                  <Icon name={program.icon} className="icon-badge__icon" />
                </div>
                <p className="chip">{program.category}</p>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <p><strong>{program.goal}</strong></p>
                {program.href && <a className="text-link" href={program.href} target="_blank" rel="noreferrer">Visitar redsaber.co</a>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell">
          <div className="cta-banner">
            <div>
              <h2>¿Quieres construir un programa a la medida?</h2>
              <p>
                Podemos diseñar una propuesta específica para tu equipo,
                comunidad o institución.
              </p>
            </div>
            <Link className="button button--primary" to="/contacto">
              Solicitar propuesta
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
