import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { SectionHeading } from "../components/SectionHeading";
import { teamGallery, teamMembers } from "../data/siteContent";

export function TeamPage() {
  const [lead, ...team] = teamMembers;

  return (
    <>
      <section className="page-hero page-hero--soft page-hero--team">
        <div className="shell page-hero__copy">
          <span className="eyebrow">Nuestro capital humano</span>
          <h1>Excelencia técnica con sensibilidad humana</h1>
          <p>
            En Fundecompe reunimos líderes y especialistas comprometidos con la
            consultoría ética y el desarrollo sostenible de las comunidades.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="leadership-grid">
            <article className="lead-card">
              <div className="lead-card__media">
                <img src={lead.image} alt={lead.name} />
              </div>
              <div className="lead-card__content">
                <span className="eyebrow">Perfil destacado</span>
                <h2>{lead.name}</h2>
                <p className="role">{lead.role}</p>
                <p>{lead.summary}</p>
                <p>{lead.details}</p>
                <Link className="button button--primary" to="/contacto">
                  Hablar con el equipo
                </Link>
              </div>
            </article>

            <article className="lead-side-card">
              <h3>Equipo consultor</h3>
              <p className="lead-side-card__role">Experiencia multidisciplinaria</p>
              <p>Especialistas en gestión empresarial, sector solidario, estrategia comercial, PyMEs, talento humano y desarrollo turístico.</p>
              <div className="lead-side-card__meta"><span>Trayectoria</span><strong>Más de 16 años transformando organizaciones y comunidades</strong></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell">
          <div className="team-gallery">
            <div className="team-gallery__copy">
              <span className="eyebrow">Trabajo colaborativo</span>
              <h2>Un equipo presente en cada etapa del proceso</h2>
              <p>
                Combinamos lectura estratégica, acompañamiento técnico y trabajo
                de campo para construir soluciones con las organizaciones.
              </p>
            </div>
            <div className="team-gallery__images" aria-label="Equipo Fundecompe">
              {teamGallery.map((item) => (
                <figure key={item.image} className="team-gallery__item">
                  <img src={item.image} alt={item.alt} />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell">
          <SectionHeading
            centered
            title="Consultores y especialistas"
            description="Cada perfil aporta experiencia aplicada para proyectos, programas y procesos de crecimiento."
          />
          <div className="card-grid card-grid--three team-grid">
            {team.map((member) => (
              <article key={member.name} className="profile-card">
                <div className={`profile-card__image${member.image ? "" : " profile-card__image--placeholder"}`}>
                  {member.image ? (
                    <img src={member.image} alt={member.name} />
                  ) : (
                    <>
                      <Icon name="community" className="profile-card__placeholder-icon" />
                      <span>Espacio para fotografía</span>
                    </>
                  )}
                </div>
                <h3>{member.name}</h3>
                <p className="profile-card__role">{member.role}</p>
                <p><strong>{member.specialty}</strong></p>
                <p>{member.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell">
          <div className="cta-banner cta-banner--dark">
            <div>
              <h2>¿Su organización necesita acompañamiento especializado?</h2>
              <p>
                Converse con nuestro equipo sobre los retos y objetivos de su proyecto.
              </p>
            </div>
            <Link className="button button--secondary" to="/contacto">
              Solicitar reunión
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
