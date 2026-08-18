import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "./Icon";

const revealSelectors = [
  ".section-heading",
  ".surface-card",
  ".profile-card",
  ".project-case",
  ".feature-card",
  ".lead-card",
  ".lead-side-card",
  ".team-gallery__item",
  ".contact-panel",
  ".contact-form-panel",
  ".map-panel",
  ".cta-banner",
  ".logo-pill",
  ".faq-item",
].join(",");

function animateCounter(element) {
  if (element.dataset.counted === "true") return;

  const original = element.textContent.trim();
  const numeric = Number(original.replace(/[^0-9]/g, ""));
  if (!numeric) return;

  const suffix = original.endsWith("+") ? "+" : "";
  const usesThousandsSeparator = original.includes(".");
  const duration = 1200;
  const startedAt = performance.now();
  element.dataset.counted = "true";

  const draw = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(numeric * eased);
    const formatted = usesThousandsSeparator
      ? new Intl.NumberFormat("es-CO").format(value)
      : String(value);
    element.textContent = `${formatted}${suffix}`;

    if (progress < 1) requestAnimationFrame(draw);
    else element.textContent = original;
  };

  requestAnimationFrame(draw);
}

export function DynamicExperience() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScrollState = () => {
      const top = window.scrollY;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(top > 360);
      setProgress(available > 0 ? Math.min((top / available) * 100, 100) : 0);
      document.querySelector(".site-header")?.classList.toggle("site-header--scrolled", top > 18);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [pathname]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = [...document.querySelectorAll(revealSelectors)];
    const countElements = [
      ...document.querySelectorAll(
        ".metric-card strong, .stats-strip__item strong, .hero-proof__metrics strong",
      ),
    ];

    revealElements.forEach((element, index) => {
      element.classList.add("reveal-item");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );

    const countObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.7 },
    );

    revealElements.forEach((element) => revealObserver.observe(element));
    countElements.forEach((element) => countObserver.observe(element));

    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <button
        className={`back-to-top${scrolled ? " back-to-top--visible" : ""}`}
        type="button"
        aria-label="Volver al inicio de la página"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Icon name="arrow" className="back-to-top__icon" />
      </button>
    </>
  );
}
