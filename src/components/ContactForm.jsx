import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { submitContactForm } from "../utils/forms";

const initialState = {
  nombre: "",
  email: "",
  telefono: "",
  asunto: "Consulta general",
  mensaje: "",
  aceptaPolitica: false,
};

export function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const isValid = useMemo(() => {
    return (
      formData.nombre.trim() &&
      formData.email.trim() &&
      formData.asunto.trim() &&
      formData.mensaje.trim() &&
      formData.aceptaPolitica
    );
  }, [formData]);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isValid || status === "loading") {
      return;
    }

    setStatus("loading");
    setError("");

    try {
      await submitContactForm({
        source: "contacto-web",
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        asunto: formData.asunto.trim(),
        mensaje: formData.mensaje.trim(),
        aceptaPolitica: formData.aceptaPolitica,
        createdAt: new Date().toISOString(),
      });

      setStatus("success");
      setFormData(initialState);
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Ocurrió un error al enviar el formulario.",
      );
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">
          <span>Nombre completo</span>
          <input
            name="nombre"
            type="text"
            placeholder="Ej. Juan Pérez"
            value={formData.nombre}
            onChange={updateField}
            required
          />
        </label>

        <label className="field">
          <span>Correo electrónico</span>
          <input
            name="email"
            type="email"
            placeholder="nombre@correo.com"
            value={formData.email}
            onChange={updateField}
            required
          />
        </label>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>Teléfono</span>
          <input
            name="telefono"
            type="tel"
            placeholder="+57 300 000 0000"
            value={formData.telefono}
            onChange={updateField}
          />
        </label>

        <label className="field">
          <span>Asunto</span>
          <select name="asunto" value={formData.asunto} onChange={updateField}>
            <option>Consulta general</option>
            <option>Consultoría empresarial</option>
            <option>Sector solidario</option>
            <option>Turismo</option>
            <option>I+D e innovación</option>
            <option>RedSaber</option>
            <option>Simulador Gerencial</option>
            <option>Alianzas y convenios</option>
            <option>Emprendimiento y formación</option>
          </select>
        </label>
      </div>

      <label className="field">
        <span>Mensaje</span>
        <textarea
          name="mensaje"
          rows="6"
          placeholder="Cuéntanos cómo podemos ayudarte."
          value={formData.mensaje}
          onChange={updateField}
          required
        />
      </label>

      <label className="checkbox-field">
        <input
          name="aceptaPolitica"
          type="checkbox"
          checked={formData.aceptaPolitica}
          onChange={updateField}
          required
        />
        <span>
          Acepto la <Link className="inline-link" to="/politicas-de-privacidad">política de tratamiento de datos</Link> para la gestión de contacto.
        </span>
      </label>

      <div className="form-feedback" aria-live="polite">
        {status === "success" ? (
          <p className="form-feedback__success">
            Tu solicitud fue enviada correctamente.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="form-feedback__error">{error}</p>
        ) : null}
      </div>

      <button
        className="button button--primary button--wide"
        type="submit"
        disabled={!isValid || status === "loading"}
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
