import { Link } from "react-router-dom";
import {
  homeHighlights,
  homeMetrics,
  partners,
  programs,
  projects,
  siteImages,
} from "../data/siteContent";
import { Icon } from "../components/Icon";
import { SectionHeading } from "../components/SectionHeading";

export function HomePage() {
  return (
    <>
      <section className="hero hero--home">
        <div className="hero__media">
          <img
            src={siteImages.homeHero}
            alt="Sala de reuniones corporativa moderna con muros de vidrio y luz natural"
          />
        </div>
        <div className="shell hero__grid">
          <div className="hero__copy hero__copy--panel">
            <span className="eyebrow">Consultoría con impacto en Colombia</span>
            <h1>Acompañamos a organizaciones y comunidades a crecer con propósito</h1>
            <p>
              Somos un equipo de consultores especializados con más de 16 años
              trabajando junto a cooperativas, entidades públicas y emprendedores
              para construir soluciones que realmente transforman.
            </p>
            <div className="button-row">
              <Link className="button button--primary" to="/contacto">
                Hablemos de su proyecto
              </Link>
              <Link className="button button--ghost" to="/servicios">
                Conocer nuestros servicios
              </Link>
            </div>
          </div>
          <aside className="hero-proof" aria-label="Trayectoria de Fundecompe">
            <div className="hero-proof__seal"><Icon name="community" className="hero-proof__icon" /><span>Experiencia nacional desde 2010</span></div>
            <div className="hero-proof__metrics">
              <div><strong>16+</strong><span>Años de experiencia</span></div>
              <div><strong>300+</strong><span>Proyectos ejecutados</span></div>
              <div><strong>18</strong><span>Departamentos</span></div>
            </div>
            <p>Consultoría para organizaciones solidarias, entidades públicas, empresas y comunidades.</p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            centered
            title="Líneas de trabajo"
            description="Consultoría especializada para fortalecer organizaciones, sectores y territorios."
          />
          <div className="card-grid card-grid--two">
            {homeHighlights.map((item) => (
              <article key={item.title} className="surface-card">
                <div className="icon-badge">
                  <Icon name={item.icon} className="icon-badge__icon" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link className="text-link" to="/servicios">
                  Explorar área
                  <Icon name="arrow" className="text-link__icon" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell">
          <SectionHeading
            centered
            eyebrow="Programas propios"
            title="Aprender, conectar y decidir mejor"
            description="Dos programas creados por Fundecompe para construir conocimiento colectivo y fortalecer competencias gerenciales en el sector solidario."
          />
          <div className="card-grid card-grid--two">
            {programs.map((program) => (
              <article key={program.title} className="surface-card program-card">
                <div className="icon-badge"><Icon name={program.icon} className="icon-badge__icon" /></div>
                <p className="chip">{program.category}</p>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <p className="program-card__goal">{program.goal}</p>
                <Link className="text-link" to="/programas">Conocer el programa <Icon name="arrow" className="text-link__icon" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="metrics-band">
        <div className="shell metrics-band__grid">
          <div>
            <SectionHeading
              eyebrow="Trayectoria"
              title="Resultados que respaldan nuestro trabajo"
              description="Desde 2010 acompañamos proyectos públicos, privados y solidarios con alcance nacional."
            />
          </div>
          <div className="stats-grid">
            {homeMetrics.map((item) => (
              <article key={item.label} className="metric-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading centered eyebrow="Experiencia aplicada" title="Proyectos destacados" description="Casos reales en los que convertimos retos territoriales y organizacionales en resultados concretos." />
          <div className="card-grid card-grid--three">
            {projects.slice(0, 3).map((project) => (
              <article key={project.title} className="surface-card">
                <p className="chip">{project.location}</p>
                <h3>{project.title}</h3>
                <p><strong>{project.client}</strong></p>
                <p><strong>Reto:</strong> {project.problem}</p>
                <p><strong>Solución:</strong> {project.solution}</p>
                <p><strong>Resultado:</strong> {project.result}</p>
              </article>
            ))}
          </div>
          <div className="section-action"><Link className="button button--ghost" to="/proyectos">Ver los 6 proyectos destacados</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            centered
            eyebrow="Confianza"
            title="Aliados estratégicos"
            description="Trabajamos con organizaciones que buscan impacto medible, crecimiento sostenible y formación útil."
          />
          <div className="logo-strip">
            {partners.map((partner) => (
              <div key={partner.label} className="logo-pill">
                <img src={partner.logo} alt={partner.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell">
          <div className="cta-banner">
            <div>
              <h2>¿Listo para transformar su organización?</h2>
              <p>
                Nuestro equipo de expertos está preparado para acompañarlo en
                el diseño y ejecución de estrategias de alto impacto.
              </p>
            </div>
            <Link className="button button--primary" to="/contacto">
              Hablemos de su proyecto
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
