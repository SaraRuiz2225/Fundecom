const paths = {
  institution:
    "M4 10 12 5l8 5M6 10v6m4-6v6m4-6v6m4-6v6M3 20h18",
  community:
    "M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 2a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a5 5 0 0 1 10 0M11 20a5 5 0 0 1 10 0",
  compass:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3-12-2 6-6 2 2-6 6-2Z",
  strategy:
    "M4 18h16M7 15V9m5 6V5m5 10v-3",
  projects:
    "M4 6h9l2 2h5v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm4 5h8m-8 4h5",
  analytics:
    "M5 18V9m7 9V5m7 13v-7",
  education:
    "M3 9 12 4l9 5-9 5-9-5Zm3 3v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4",
  innovation:
    "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12v2h8v-2a7 7 0 0 0-4-12Z",
  check:
    "m5 13 4 4L19 7",
  phone:
    "M5 4h4l2 5-2 2a16 16 0 0 0 6 6l2-2 5 2v4a2 2 0 0 1-2 2C10.6 23 1 13.4 1 6a2 2 0 0 1 2-2Z",
  mail:
    "M3 6h18v12H3zM3 8l9 6 9-6",
  pin:
    "M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  arrow:
    "M5 12h14m-5-5 5 5-5 5",
  linkedin:
    "M7 9v8M7 6v.01M11 17V9h4a3 3 0 0 1 3 3v5M18 17v-5",
  facebook:
    "M14 8h2V4h-2a4 4 0 0 0-4 4v2H8v4h2v6h4v-6h2.5l.5-4H14V8a1 1 0 0 1 1-1Z",
  instagram:
    "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm4 5.5A3.5 3.5 0 1 0 15.5 12 3.5 3.5 0 0 0 12 8.5Zm5-1.5h.01",
  youtube:
    "M22 12s0-4-1-5-5-1-9-1-8 0-9 1-1 5-1 5 0 4 1 5 5 1 9 1 8 0 9-1 1-5 1-5ZM10 9l5 3-5 3Z",
  whatsapp:
    "M20 12a8 8 0 1 0-14 5.3L5 22l4.9-1.6A8 8 0 1 0 20 12Zm-4.4 2.4c-.2.5-1.1 1-1.5 1.1-.4.1-1 .2-3.2-.8-2.6-1.1-4.2-3.8-4.3-4-.1-.2-1.1-1.4-1.1-2.6s.6-1.9.8-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4s.8 1.9.8 2.1c.1.2.1.5 0 .7-.1.2-.2.3-.4.5l-.5.5c-.2.2-.4.4-.2.7.2.3.8 1.4 1.8 2.2 1.2 1 2.1 1.3 2.5 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.3.7-.2.3.1 1.8.8 2.1.9.3.2.5.2.6.4.1.1.1.7-.2 1.2Z",
  calendar:
    "M7 2v4M17 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
  menu:
    "M4 7h16M4 12h16M4 17h16",
  close:
    "m6 6 12 12M18 6 6 18",
};

export function Icon({ name, className = "", strokeWidth = 1.8 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <path d={paths[name] || paths.arrow} />
    </svg>
  );
}
