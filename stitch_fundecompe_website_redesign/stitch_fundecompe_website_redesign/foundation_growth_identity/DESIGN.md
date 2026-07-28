---
name: Foundation Growth Identity
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434653'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#747684'
  outline-variant: '#c4c6d5'
  surface-tint: '#2d58bf'
  primary: '#002975'
  on-primary: '#ffffff'
  primary-container: '#003da5'
  on-primary-container: '#98b1ff'
  inverse-primary: '#b4c5ff'
  secondary: '#006e29'
  on-secondary: '#ffffff'
  secondary-container: '#7dfd8f'
  on-secondary-container: '#00752c'
  tertiary: '#00334c'
  on-tertiary: '#ffffff'
  tertiary-container: '#004a6d'
  on-tertiary-container: '#50bdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#033ea6'
  secondary-fixed: '#7dfd8f'
  secondary-fixed-dim: '#60df76'
  on-secondary-fixed: '#002107'
  on-secondary-fixed-variant: '#00531d'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#8aceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004b6f'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  h1:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Lexend
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.25'
  h3:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  section-gap: 80px
  container-max: 1280px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system is built upon the pillars of accessibility, institutional trust, and community empowerment. The brand personality is professional and established, yet radiating an approachable warmth that welcomes students, educators, and donors alike. 

The visual style follows a **Corporate / Modern** aesthetic, prioritizing clarity and functional elegance. It utilizes heavy whitespace to reduce cognitive load and focuses on a structured hierarchy that communicates transparency and reliability. By blending a traditional institutional palette with modern UI patterns, the system bridges the gap between a formal foundation and a forward-thinking educational catalyst. The emotional response should be one of confidence and inspiration—reinforcing the idea that education is a clear, well-supported path to a better future.

## Colors

The color strategy leverages the heritage of the foundation while elevating the tones for digital accessibility. 

- **Primary (#003DA5):** A deep, scholarly blue used for headers, primary actions, and navigational anchors. It evokes stability and authority.
- **Secondary (#0BA141):** A vibrant "Growth Green" symbolizing the educational journey and community prosperity. Used for success states and secondary calls to action.
- **Tertiary (#0099DB):** A bright azure used to bring energy to the interface, ideal for links, active states, and informative accents.
- **Neutral:** A refined slate gray derived from the blue spectrum to ensure all text remains legible and the interface feels cohesive.

The background remains predominantly white to emphasize the "generous whitespace" requirement, ensuring the chromatic colors act as purposeful waypoints for the user.

## Typography

This design system utilizes **Lexend** as the sole typeface. Designed specifically to reduce visual stress and improve reading proficiency, it is the ideal choice for an educational foundation focused on accessibility.

The typographic scale is generous, favoring larger base sizes and ample line height to ensure readability across all demographics. Headlines use a tighter tracking and heavier weight to appear "institutional" and bold, while body copy maintains a standard weight for maximum flow. High-level labels use uppercase styling with increased letter spacing to provide clear categorization without overwhelming the content.

## Layout & Spacing

The layout employs a **fixed grid system** centered within the viewport. A 12-column grid provides the structural backbone for desktop views, transitioning to a flexible 4-column grid for mobile devices.

Spacing follows an 8px geometric progression. To achieve the "inspiring and institutional" feel, vertical spacing between major sections is kept intentionally large (80px+), allowing each content block to be processed independently. Content containers should maintain a maximum width of 1280px to prevent line lengths from becoming uncomfortable on ultra-wide monitors, preserving the accessibility of the text.

## Elevation & Depth

To maintain a clean and professional look, this design system avoids heavy drop shadows in favor of **Tonal Layers** and **Ambient Shadows**.

- **Surface Tiers:** Use subtle off-white or very light gray (#F8FAFC) backgrounds to differentiate content cards from the main page background.
- **Shadows:** When depth is required (e.g., on primary buttons or floating cards), use extra-diffused, low-opacity shadows. These should have a slight blue tint (using the primary color at 5-10% opacity) to feel integrated rather than "dirty" gray.
- **Interactions:** Elevation should increase slightly on hover to provide tactile feedback, signaling interactivity without breaking the clean, flat aesthetic.

## Shapes

The shape language is defined by **Rounded (Level 2)** corners. This 8px (0.5rem) base radius strikes a balance between the "friendly/community" focus and "professional/institutional" requirements. 

- **Small elements (Buttons, Inputs):** 8px radius.
- **Large elements (Cards, Containers):** 16px (1rem) radius.
- **Full rounding:** Reserved for tags and status indicators to differentiate them from actionable buttons.

Avoid sharp corners to maintain the foundation's welcoming atmosphere, but avoid pill-shapes for primary containers to ensure the design remains grounded and serious.

## Components

### Buttons
Primary buttons use the Primary Blue with white text, featuring the standard 8px border radius. Secondary buttons should use an outline style with the Secondary Green to indicate a supportive but distinct action. 

### Cards
Cards are the primary vehicle for community stories and educational programs. They should feature a 1px border in a very light neutral shade and use the "body-md" typography. Use generous internal padding (min 24px) to ensure content feels uncrowded.

### Input Fields
Inputs must have a clear 1px border that thickens and changes to the Primary Blue on focus. Labels should always be visible (never placeholder-only) to meet high accessibility standards.

### Chips & Tags
Use the Tertiary Blue or the Cyan/Teal (#09DDCC) for category tags. These should have a light background tint of the color with a high-contrast dark text version of the same hue for maximum legibility.

### Progress Indicators
Essential for educational tracking. These should use the Secondary Green to represent positive advancement and growth, reinforcing the foundation's mission.