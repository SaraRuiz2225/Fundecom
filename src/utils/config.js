export const formsEndpoint =
  window.__APP_CONFIG__?.FORMS_ENDPOINT ||
  import.meta.env.VITE_FORMS_ENDPOINT ||
  "";
