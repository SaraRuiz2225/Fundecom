export function MaintenancePage() {
  return (
    <section className="maintenance-screen">
      <div className="shell maintenance-screen__inner">
        <span className="eyebrow">Mantenimiento</span>
        <h1>La página está en mantenimiento</h1>
        <p>
          El sitio está temporalmente desactivado mientras se realizan ajustes.
        </p>
        <a className="button button--ghost" href="mailto:mercadeo@fundecompe.org">
          Contactar por correo
        </a>
      </div>
    </section>
  );
}
