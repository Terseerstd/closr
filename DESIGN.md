---
name: Cyber-Electric Dark
colors:
  surface: '#23062b'
  surface-dim: '#23062b'
  surface-bright: '#4d2d53'
  surface-container-lowest: '#1d0225'
  surface-container-low: '#2c0f33'
  surface-container: '#311338'
  surface-container-high: '#3c1e43'
  surface-container-highest: '#48294e'
  on-surface: '#fcd6ff'
  on-surface-variant: '#e6bcc2'
  inverse-surface: '#fcd6ff'
  inverse-on-surface: '#43254a'
  outline: '#ad878d'
  outline-variant: '#5d3f44'
  surface-tint: '#ffb2bf'
  primary: '#ffb2bf'
  on-primary: '#660027'
  primary-container: '#ff4d7f'
  on-primary-container: '#5a0021'
  inverse-primary: '#bc004e'
  secondary: '#ffb598'
  on-secondary: '#591c00'
  secondary-container: '#f95e02'
  on-secondary-container: '#4e1800'
  tertiary: '#ffabef'
  on-tertiary: '#5c0058'
  tertiary-container: '#e653da'
  on-tertiary-container: '#51004d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9de'
  primary-fixed-dim: '#ffb2bf'
  on-primary-fixed: '#3f0015'
  on-primary-fixed-variant: '#90003a'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb598'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#7e2c00'
  tertiary-fixed: '#ffd7f3'
  tertiary-fixed-dim: '#ffabef'
  on-tertiary-fixed: '#390036'
  on-tertiary-fixed-variant: '#82007d'
  background: '#23062b'
  on-background: '#fcd6ff'
  surface-variant: '#48294e'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

This design system is defined by a high-energy, futuristic aesthetic that blends **Cyberpunk** influences with modern **SaaS precision**. The brand personality is bold, innovative, and unapologetically technical. It targets a demographic that appreciates high-performance tools with a distinct visual edge.

The UI evokes a sense of "night-mode" sophistication through a deep violet base, contrasted against hyper-saturated neon accents. The style utilizes **Glassmorphism** for depth and **Minimalism** for functional layout, ensuring that the vibrant palette enhances rather than distracts from the user experience.

## Colors

The color strategy relies on a "deep-space" neutral foundation to allow the neon highlights to glow. 

- **Primary (Vibrant Pink):** Reserved for main calls to action, active states, and critical branding elements.
- **Secondary (Bright Orange):** Used as an energy-infusing accent for warnings, notifications, or specific interactive highlights.
- **Tertiary (Purple/Violet):** Acts as a structural accent, used for subtle borders, secondary icons, and soft gradients.
- **Neutrals:** The background is an ultra-dark violet (#0D0111) to maintain depth. Surfaces are layered using "Surface Container" tiers that move from the dark base toward a more saturated violet as they "rise" in elevation.

## Typography

The design system utilizes **Geist** exclusively to maintain a technical, developer-centric feel. The typeface’s clean lines and geometric construction provide the necessary clarity against the high-contrast color palette.

Headlines should use tighter letter-spacing and heavier weights to command attention. Labels and metadata should utilize all-caps in the `label` roles to reinforce the "instrument panel" aesthetic. Ensure that large headlines scale down to `headline-lg-mobile` (32px) on smaller viewports to prevent layout overflow.

## Layout & Spacing

This design system employs a **fluid grid** model based on an 8px rhythmic scale. 

- **Desktop:** 12-column grid with 24px gutters and 40px outer margins.
- **Tablet:** 8-column grid with 24px gutters and 32px margins.
- **Mobile:** 4-column grid with 16px gutters and 16px margins.

Spacing should be used to create clear groupings; use `lg` (48px) for section vertical rhythm and `md` (24px) for internal component spacing. The "instrument panel" look is achieved by keeping internal component padding tight (using `sm`) while allowing the layout containers to breathe with generous external margins.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Backdrop Blurs**. Shadows are rarely used; instead, depth is conveyed by shifting the background color of containers to lighter/more saturated shades of violet as they occupy a higher z-index.

For high-priority modals or floating menus, use a **Glassmorphism** effect:
- **Background:** `surface-container` at 70% opacity.
- **Backdrop Blur:** 12px to 20px.
- **Border:** A 1px solid stroke using the `primary` color at 20% opacity to create a "glowing edge."

## Shapes

The shape language is defined by a **ROUND_EIGHT** philosophy, translating to a base roundedness of **0.5rem (8px)**. This provides a balance between the aggressive futuristic aesthetic and a professional, approachable UI.

- **Standard Buttons & Inputs:** 8px (0.5rem)
- **Large Cards & Containers:** 16px (1rem)
- **Chips & Tags:** Fully rounded (pill-shaped) to distinguish them from actionable buttons.

## Components

### Buttons
- **Primary:** Solid Vibrant Pink (#FF066D) with white text. High-saturation glow on hover.
- **Secondary:** Outlined with Vibrant Pink. 1px border.
- **Ghost:** No background, Vibrant Pink text. Use for low-emphasis actions.

### Input Fields
- **Background:** `surface-container-low` (#260431).
- **Border:** Subtle violet stroke, turning into a 2px Vibrant Pink border on focus.
- **Typography:** Geist Mono or Geist Regular for data entry.

### Cards
- **Style:** `surface-container` background with an 8px corner radius. 
- **Interaction:** On hover, the border color should shift to a subtle Purple/Violet (#AE16A7) to indicate interactivity.

### Chips & Tags
- **Style:** Small, pill-shaped containers.
- **Coloring:** Use Bright Orange (#FA5F04) for status-heavy tags (e.g., "Live", "Alert") and Purple/Violet (#AE16A7) for categorical metadata.

### Lists
- Use thin separators (1px) using the `surface-container-high` color to maintain a clean, structured appearance without adding visual bulk.