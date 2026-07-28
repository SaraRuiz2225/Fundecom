import { Icon } from "../components/Icon";
import { contactInfo, siteImages, socialLinks } from "../data/siteContent";

const contactCards = [
  {
    title: "Nuestra sede",
    content: contactInfo.address,
    icon: "pin",
    tone: "blue",
  },
  {
    title: "Teléfono",
    content: `${contactInfo.phoneDisplay} · ${contactInfo.secondaryPhoneDisplay}`,
    icon: "phone",
    tone: "green",
  },
  {
    title: "Correo electrónico",
    content: contactInfo.email,
    icon: "mail",
    tone: "sky",
  },
  {
    title: "Correo de dirección",
    content: contactInfo.directorEmail,
    icon: "mail",
    tone: "sky",
  },
];

export function ContactPage() {
  return (
    <>
      <section className="page-hero page-hero--contact">
        <div className="page-hero__media">
          <img
            src={siteImages.contactHero}
            alt="Fachada de edificio moderno con vidrio y cielo azul"
          />
        </div>
        <div className="shell page-hero__copy page-hero__copy--light">
          <span className="eyebrow eyebrow--light">Contacto</span>
          <h1>Hablemos de progreso</h1>
          <p>
            Estamos aquí para escucharte y colaborar en el desarrollo de
            soluciones educativas y sociales que transformen comunidades.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell contact-layout">
          <aside className="contact-panel">
            <h2>Información directa</h2>
            <div className="contact-panel__stack">
              {contactCards.map((item) => (
                <article key={item.title} className="contact-item">
                  <div className={`icon-badge icon-badge--${item.tone}`}>
                    <Icon name={item.icon} className="icon-badge__icon" />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    {item.title === "Teléfono" ? (
                      <div><a href={`tel:${contactInfo.phoneRaw}`}>{contactInfo.phoneDisplay}</a><br /><a href={`tel:${contactInfo.secondaryPhoneRaw}`}>{contactInfo.secondaryPhoneDisplay}</a></div>
                    ) : item.title.includes("Correo") ? (
                      <a href={`mailto:${item.content}`}>{item.content}</a>
                    ) : (
                      <p>{item.content}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <div className="contact-panel__social">
              <span className="eyebrow">Síguenos en redes</span>
              <div className="social-list">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    className="social-link"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    title={item.label}
                  >
                    <Icon name={item.icon} className="social-link__icon" />
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div className="contact-form-panel">
            <span className="eyebrow">Canales directos</span>
            <h2>Cuéntanos qué necesitas</h2>
            <p>
              Mientras conectamos el formulario, puedes escribirnos por correo
              o WhatsApp para iniciar la conversación.
            </p>
            <div className="contact-form-panel__actions">
              <a className="button button--primary" href={`mailto:${contactInfo.email}`}>
                Escribir por correo
              </a>
              <a
                className="button button--ghost"
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                Abrir WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell">
          <div className="map-panel">
            <div className="map-panel__content map-panel__content--floating">
              <span className="eyebrow">Visítanos</span>
              <h2>Ubicación y atención</h2>
              <p>
                Nuestras oficinas están ubicadas en Armenia, facilitando el
                acceso a aliados, clientes y procesos de acompañamiento.
              </p>
              <a
                className="button button--ghost"
                href={contactInfo.maps}
                target="_blank"
                rel="noreferrer"
              >
                Ver en Google Maps
              </a>
            </div>
            <div className="map-panel__visual">
              <iframe
                title="Mapa de Fundecompe"
                src={`https://www.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&z=16&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell">
          <div className="cta-banner">
            <div>
              <h2>¿Prefieres agendar una reunión?</h2>
              <p>
                Nuestro equipo de consultores está disponible para una sesión
                personalizada donde exploraremos tus necesidades.
              </p>
            </div>
            <a
              className="button button--secondary"
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Reservar espacio
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
