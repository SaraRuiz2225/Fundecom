import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { SectionHeading } from "../components/SectionHeading";
import {
  faqs,
  serviceCategories,
  serviceStats,
  services,
  siteImages,
} from "../data/siteContent";

export function ServicesPage() {
  return (
    <>
      <section className="page-hero page-hero--services">
        <div className="shell page-hero__copy">
          <span className="eyebrow">Experiencia técnica para transformar</span>
          <h1>Servicios de consultoría</h1>
          <p>
            Diseñamos soluciones para empresas, organizaciones solidarias,
            entidades públicas y territorios que quieren crecer con propósito.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell services-layout">
          <aside className="services-sidebar">
            {serviceCategories.map((category, index) => (
              <a
                key={category.label}
                className="services-sidebar__item"
                href={`#servicio-${index + 1}`}
              >
                <Icon name={category.icon} className="services-sidebar__icon" />
                <span>{category.label}</span>
              </a>
            ))}
          </aside>

          <div className="services-content">
            <div className="card-grid card-grid--two">
              {services.map((service, index) => (
                <article id={`servicio-${index + 1}`} key={service.title} className="surface-card service-card">
                  <div className="icon-badge">
                    <Icon name={service.icon} className="icon-badge__icon" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="check-list">
                    {service.bullets.map((bullet) => (
                      <li key={bullet}>
                        <Icon name="check" className="check-list__icon" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link className="button button--ghost button--wide" to="/contacto">
                    Solicitar información
                  </Link>
                </article>
              ))}
            </div>

            <article className="feature-card">
              <div className="feature-card__content">
                <span className="eyebrow eyebrow--light">Innovación abierta</span>
                <h2>RedSaber</h2>
                <p>
                  Una plataforma nacional que conecta comunidades e instituciones
                  para construir conocimiento colectivo y resolver retos sectoriales.
                </p>
                <Link className="button button--secondary" to="/programas">
                  Conocer nuestros programas
                </Link>
              </div>
              <div className="feature-card__media">
                <img
                  src={siteImages.servicesFeature}
                  alt="Equipo colaborando frente a portátiles en una sala de reuniones"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="shell stats-strip__grid">
          {serviceStats.map((item) => (
            <article key={item.label} className="stats-strip__item">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell section-narrow">
          <SectionHeading
            centered
            title="Detalles de implementación"
            description="Respuestas rápidas sobre el tipo de acompañamiento que puede estructurarse con Fundecompe."
          />
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question} className="faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell">
          <div className="cta-banner cta-banner--dark">
            <div>
              <h2>¿Listo para impulsar el cambio?</h2>
              <p>
                Nuestro equipo de expertos está listo para diseñar la solución
                que tu organización necesita para alcanzar el siguiente nivel.
              </p>
            </div>
            <div className="button-row">
              <Link className="button button--primary" to="/contacto">
                Hablar con un asesor
              </Link>
              <Link className="button button--ghost-light" to="/equipo">
                Ver equipo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
