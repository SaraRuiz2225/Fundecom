import { formsEndpoint } from "./config";

export async function submitContactForm(payload) {
  if (!formsEndpoint) {
    throw new Error(
      "No se configuró el endpoint del formulario. Define FORMS_ENDPOINT o VITE_FORMS_ENDPOINT.",
    );
  }

  const response = await fetch(formsEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("No fue posible enviar la solicitud.");
  }

  return response;
}
