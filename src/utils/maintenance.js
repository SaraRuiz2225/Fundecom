const MAINTENANCE_KEY = "fundecompe.maintenance.enabled";
export const MAINTENANCE_PASSWORD = "Lah8_S7=Luv6";

export function getMaintenanceEnabled() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(MAINTENANCE_KEY) === "true";
}

export function setMaintenanceEnabled(enabled) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(MAINTENANCE_KEY, enabled ? "true" : "false");
  window.dispatchEvent(new Event("maintenancechange"));
}

