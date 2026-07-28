import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  brandAssets,
  contactInfo,
  primaryNavigation,
} from "../data/siteContent";
import { Icon } from "./Icon";

function linkClass({ isActive }) {
  return `nav-link${isActive ? " nav-link--active" : ""}`;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <NavLink className="brand" to="/" onClick={() => setMenuOpen(false)}>
          <img className="brand__logo" src={brandAssets.logo} alt="Fundecompe" />
        </NavLink>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? "close" : "menu"} className="menu-toggle__icon" />
        </button>

        <nav className={`site-nav${menuOpen ? " site-nav--open" : ""}`}>
          {primaryNavigation.map((item) => (
            <NavLink
              key={item.href}
              className={linkClass}
              to={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <a
            className="button button--primary nav-cta"
            href={contactInfo.whatsapp}
            rel="noreferrer"
            target="_blank"
          >
            <Icon name="calendar" className="button__icon" />
            Agendar cita
          </a>
        </nav>
      </div>
    </header>
  );
}
