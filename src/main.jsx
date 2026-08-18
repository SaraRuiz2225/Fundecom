import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import { hydrateSiteContent } from "./data/siteContent";

async function startApplication() {
  try {
    const response = await fetch("/api/content", { headers: { Accept: "application/json" } });
    if (response.ok) hydrateSiteContent(await response.json());
  } catch {
    // El contenido incluido en la aplicación funciona como respaldo seguro.
  }

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
}

startApplication();
