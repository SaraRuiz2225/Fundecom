import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { DynamicExperience } from "./DynamicExperience";
import { PageBlocks } from "./PageBlocks";

export function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = {
      "/": ["Fundecompe | Consultoría sector solidario Colombia", "Consultoría para el sector solidario en Colombia. Más de 16 años acompañando cooperativas, entidades públicas, empresas y comunidades."],
      "/servicios": ["Consultoría empresarial para cooperativas | Fundecompe", "Consultoría empresarial, sector solidario, turismo e innovación para cooperativas y organizaciones en Colombia."],
      "/programas": ["RedSaber y Simulador Gerencial | Fundecompe", "RedSaber: aprendizaje colectivo e innovación abierta en Colombia, junto con formación gerencial para el sector solidario."],
      "/proyectos": ["Proyectos y casos de éxito | Fundecompe", "Casos de éxito de Fundecompe en sector solidario, turismo, inclusión productiva, exportaciones y buenas prácticas agropecuarias."],
      "/equipo": ["Consultores en desarrollo organizacional en Quindío | Fundecompe", "Equipo consultor especializado en gestión empresarial, sector solidario, PyMEs, mercadeo y turismo en Quindío y Colombia."],
      "/contacto": ["Contacto | Fundecompe", "Hable con Fundecompe sobre su proyecto de consultoría, fortalecimiento organizacional o desarrollo territorial."],
      "/politicas-de-privacidad": ["Política de tratamiento de datos | Fundecompe", "Política de tratamiento de datos personales de Fundecompe."],
    };
    const [title, description] = seo[pathname] || seo["/"];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [pathname]);

  return (
    <>
      <DynamicExperience />
      <Header />
      <main className="page">
        {children ?? <Outlet />}
        <PageBlocks pathname={pathname} position="bottom" />
      </main>
      <Footer />
    </>
  );
}
