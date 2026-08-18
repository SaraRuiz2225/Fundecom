import { Link } from "react-router-dom";
import {
  brandAssets,
  contactInfo,
  footerLinks,
  socialLinks,
} from "../data/siteContent";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div>
          <Link className="brand brand--footer" to="/">
            <img className="brand__logo brand__logo--footer" src={brandAssets.logo} alt="Fundecompe" />
          </Link>
          <p className="site-footer__copy">
            Acompañamos a organizaciones y comunidades a crecer con propósito.
          </p>
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

        <div>
          <p className="footer-title">Navegación</p>
          <div className="footer-links">
            {footerLinks.navigate.map((item) => (
              <Link key={item.href} to={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="footer-title">Legal</p>
          <div className="footer-links">
            {footerLinks.legal.map((item) => (
              <Link key={item.href} to={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="footer-title">Contacto</p>
          <div className="contact-stack">
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            <a href={`mailto:${contactInfo.directorEmail}`}>{contactInfo.directorEmail}</a>
            <a href={`tel:${contactInfo.phoneRaw}`}>{contactInfo.phoneDisplay}</a>
            <a href={contactInfo.maps} target="_blank" rel="noreferrer">
              {contactInfo.address}
            </a>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="shell site-footer__bottom-inner">
          <span>© 2026 Fundecompe · NIT 900.344.392-3</span>
          <Link className="admin-access" to="/administracion" title="Acceso para el equipo autorizado">
            <Icon name="lock" className="admin-access__icon" />
            Acceso administrativo
          </Link>
        </div>
      </div>
    </footer>
  );
}
