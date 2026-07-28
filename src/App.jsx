import { useEffect, useState } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { MaintenancePage } from "./pages/MaintenancePage";
import { EmergencyPage } from "./pages/EmergencyPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { ProgramsPage } from "./pages/ProgramsPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ServicesPage } from "./pages/ServicesPage";
import { TeamPage } from "./pages/TeamPage";
import { getMaintenanceEnabled } from "./utils/maintenance";

function SiteShell() {
  const { pathname } = useLocation();
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(getMaintenanceEnabled());

  useEffect(() => {
    function syncMaintenance() {
      setMaintenanceEnabled(getMaintenanceEnabled());
    }

    window.addEventListener("maintenancechange", syncMaintenance);
    window.addEventListener("storage", syncMaintenance);

    return () => {
      window.removeEventListener("maintenancechange", syncMaintenance);
      window.removeEventListener("storage", syncMaintenance);
    };
  }, []);

  if (maintenanceEnabled && pathname !== "/emergency") {
    return <MaintenancePage />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="emergency" element={<EmergencyPage />} />
      <Route element={<SiteShell />}>
        <Route index element={<HomePage />} />
        <Route path="equipo" element={<TeamPage />} />
        <Route path="servicios" element={<ServicesPage />} />
        <Route path="programas" element={<ProgramsPage />} />
        <Route path="proyectos" element={<ProjectsPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route
          path="politicas-de-privacidad"
          element={<PrivacyPage />}
        />
      </Route>
    </Routes>
  );
}
