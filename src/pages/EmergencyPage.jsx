import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MAINTENANCE_PASSWORD, getMaintenanceEnabled, setMaintenanceEnabled } from "../utils/maintenance";

export function EmergencyPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(getMaintenanceEnabled());
  const [message, setMessage] = useState("");

  useEffect(() => {
    function syncStatus() {
      setStatus(getMaintenanceEnabled());
    }

    syncStatus();
    window.addEventListener("maintenancechange", syncStatus);
    window.addEventListener("storage", syncStatus);

    return () => {
      window.removeEventListener("maintenancechange", syncStatus);
      window.removeEventListener("storage", syncStatus);
    };
  }, []);

  function verifyPassword() {
    if (password !== MAINTENANCE_PASSWORD) {
      setMessage("Contraseña incorrecta.");
      return false;
    }

    setMessage("");
    return true;
  }

  function handleToggle(nextValue) {
    if (!verifyPassword()) {
      return;
    }

    setMaintenanceEnabled(nextValue);
    setStatus(nextValue);
    setMessage(nextValue ? "Sitio puesto en mantenimiento." : "Sitio encendido.");
  }

  return (
    <section className="maintenance-control">
      <div className="shell maintenance-control__inner">
        <div className="maintenance-control__panel">
          <span className="eyebrow">Control de sitio</span>
          <h1>Emergency</h1>
          <p>
            Usa esta página para apagar o encender la vista pública del sitio.
            La contraseña es obligatoria para ambas acciones.
          </p>

          <label className="field">
            <span>Contraseña</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Ingresa la contraseña"
              autoComplete="current-password"
            />
          </label>

          <div className="button-row">
            <button
              className="button button--secondary"
              type="button"
              onClick={() => handleToggle(true)}
            >
              Apagar sitio
            </button>
            <button
              className="button button--primary"
              type="button"
              onClick={() => handleToggle(false)}
            >
              Encender sitio
            </button>
          </div>

          <div className="maintenance-control__status" aria-live="polite">
            <strong>Estado actual:</strong> {status ? "Mantenimiento activo" : "Sitio activo"}
            {message ? <p>{message}</p> : null}
          </div>

          <Link className="text-link" to="/">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}

