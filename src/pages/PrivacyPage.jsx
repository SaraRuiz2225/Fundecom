import { privacySummary } from "../data/siteContent";

export function PrivacyPage() {
  return (
    <>
      <section className="page-hero page-hero--soft">
        <div className="shell page-hero__copy">
          <span className="eyebrow">Legal</span>
          <h1>Política de tratamiento de datos personales</h1>
          <p>
            Información sobre el tratamiento de los datos compartidos a través
            del sitio web de Fundecompe.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell section-narrow legal-copy">
          {privacySummary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            Para solicitar actualización o eliminación de información, escribe
            a <a href="mailto:mercadeo@fundecompe.org">mercadeo@fundecompe.org</a>.
          </p>
        </div>
      </section>
    </>
  );
}
