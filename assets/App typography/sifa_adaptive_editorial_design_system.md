---
name: "SIFA — Adaptive Editorial"
description: "Luxury women's fashion e-commerce design system for Kenya featuring product-adaptive monochromatic editorial environments paired with conversion-focused ivory checkout surfaces."
---

## Overview

SIFA is a Nairobi-based women's luxury fashion house and mobile commerce experience. Its visual language is **Adaptive Editorial Commerce**: on discovery, listing, and product detail screens, the interface surrenders to the dominant hue of the featured garment—crimson silk, indigo raw denim, or warm champagne linen—creating an immersive, monochromatic magazine-spread environment with oversized photography that bleeds past container edges. When the customer moves into Cart, Saved Addresses, and Checkout, the palette settles into a calm, high-contrast warm-ivory editorial paper surface to maximize clarity, trust, and mobile-money conversion (M-Pesa, Airtel Money, and Bank Transfer in KES).

## Colors

The system pairs a deep oxblood-crimson brand core with adaptive garment environment tokens (`crimson-env`, `indigo-env`, `champagne-env`) for monochromatic editorial immersion, alongside high-contrast neutral surfaces for forms and checkout.

- **Primary (`#4D0011`):** Deep oxblood ink used for primary brand CTAs on light checkout and form surfaces.
- **Adaptive Environments:**
  - `crimson-env` (`#5E0B18`) with `on-crimson-env` (`#FFF0F2`) for crimson silk silhouettes.
  - `indigo-env` (`#0F223D`) with `on-indigo-env` (`#EDF4FF`) for deep indigo denim pieces.
  - `champagne-env` (`#EFE3D2`) with `on-champagne-env` (`#231A12`) and `champagne-deep` (`#3B2D20`) for warm cream and linen ensembles.
- **Semantic Status:** `success` (`#166534`) for confirmed M-Pesa/order states; `warning` (`#92400E`) for pending STK Push approval; `error` (`#BA1A1A`) for failed payments or validation.

```yaml
colors:
  crimson-env: "#5E0B18"
  on-crimson-env: "#FFF0F2"
  crimson-surface: "#781222"
  on-crimson-surface: "#FFE4E8"
  indigo-env: "#0F223D"
  on-indigo-env: "#EDF4FF"
  indigo-surface: "#1A355B"
  on-indigo-surface: "#DCEAFF"
  champagne-env: "#EFE3D2"
  on-champagne-env: "#231A12"
  champagne-deep: "#3B2D20"
  on-champagne-deep: "#FAF3E8"
  gold-accent: "#C6A15B"
  on-gold-accent: "#1F1608"
  success: "#166534"
  on-success: "#FFFFFF"
  warning: "#92400E"
  on-warning: "#FFFFFF"
  light:
    primary: "#4D0011"
    on-primary: "#FFFFFF"
    primary-container: "#6E1423"
    on-primary-container: "#F67C86"
    secondary: "#845053"
    on-secondary: "#FFFFFF"
    secondary-container: "#FFBBBD"
    on-secondary-container: "#7B484B"
    tertiary: "#002824"
    on-tertiary: "#FFFFFF"
    tertiary-container: "#00403A"
    on-tertiary-container: "#77ACA3"
    error: "#BA1A1A"
    on-error: "#FFFFFF"
    error-container: "#FFDAD6"
    on-error-container: "#93000A"
    background: "#FFF8F7"
    on-background: "#231919"
    surface: "#FFF8F7"
    surface-dim: "#E9D6D5"
    surface-bright: "#FFF8F7"
    surface-container-lowest: "#FFFFFF"
    surface-container-low: "#FFF0F0"
    surface-container: "#FDE9E9"
    surface-container-high: "#F7E4E3"
    surface-container-highest: "#F2DEDE"
    on-surface: "#231919"
    surface-variant: "#F9DCDC"
    on-surface-variant: "#564242"
    outline: "#897172"
    outline-variant: "#DCC0C0"
    inverse-surface: "#392E2E"
    inverse-on-surface: "#FFEDEC"
    inverse-primary: "#FFB3B6"
    shadow: "#000000"
    scrim: "#000000"
  dark:
    primary: "#FFB3B6"
    on-primary: "#630B1C"
    primary-container: "#6E1423"
    on-primary-container: "#F67C86"
    secondary: "#F9B5B8"
    on-secondary: "#4F2326"
    secondary-container: "#6C3B3E"
    on-secondary-container: "#E9A7AA"
    tertiary: "#9BD1C8"
    on-tertiary: "#003732"
    tertiary-container: "#00403A"
    on-tertiary-container: "#77ACA3"
    error: "#FFB4AB"
    on-error: "#690005"
    error-container: "#93000A"
    on-error-container: "#FFDAD6"
    background: "#1A1111"
    on-background: "#F2DEDE"
    surface: "#1A1111"
    surface-dim: "#1A1111"
    surface-bright: "#423636"
    surface-container-lowest: "#150C0C"
    surface-container-low: "#231919"
    surface-container: "#271D1D"
    surface-container-high: "#322727"
    surface-container-highest: "#3E3232"
    on-surface: "#F2DEDE"
    surface-variant: "#564242"
    on-surface-variant: "#DCC0C0"
    outline: "#A48B8B"
    outline-variant: "#564242"
    inverse-surface: "#F2DEDE"
    inverse-on-surface: "#392E2E"
    inverse-primary: "#A23B46"
    shadow: "#000000"
    scrim: "#000000"
```

## Typography

A high-contrast editorial pairing: **Playfair** (Didone display serif) commands headlines, garment titles, and campaign statements, while **Poppins** (geometric sans-serif) handles navigation, body copy, size chips, and checkout forms. **Source Code Pro** formats KES prices, order references, and `2547XXXXXXXX` phone numbers with tabular alignment.

```yaml
typography:
  display-lg:
    fontFamily: "Playfair"
    fontSize: 44px
    fontWeight: 700
    lineHeight: 48px
    letterSpacing: -0.5px
  display-lg-mobile:
    fontFamily: "Playfair"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 36px
    letterSpacing: -0.4px
  headline-lg:
    fontFamily: "Playfair"
    fontSize: 34px
    fontWeight: 600
    lineHeight: 40px
    letterSpacing: -0.25px
  headline-lg-mobile:
    fontFamily: "Playfair"
    fontSize: 26px
    fontWeight: 600
    lineHeight: 32px
    letterSpacing: -0.2px
  headline-md:
    fontFamily: "Playfair"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 28px
    letterSpacing: 0px
  title-lg:
    fontFamily: "Poppins"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 24px
    letterSpacing: 0px
  title-md:
    fontFamily: "Poppins"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 22px
    letterSpacing: 0.1px
  body-lg:
    fontFamily: "Poppins"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: 0.15px
  body-md:
    fontFamily: "Poppins"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0.15px
  label-lg:
    fontFamily: "Poppins"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 18px
    letterSpacing: 0.4px
  label-sm:
    fontFamily: "Poppins"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.5px
  mono-md:
    fontFamily: "Source Code Pro"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
    letterSpacing: 0.2px
```

## Layout & Spacing

Mobile-first `390px` viewport with generous editorial breathing room (`20px`–`24px` horizontal page margins) and an `8px` base rhythm (`4px` half-step). Editorial discovery screens use full-bleed edge-to-edge photography with floating controls and `84px` bottom clearance for the persistent navigation bar. Checkout and form screens use single-column stacked sections with `16px`–`24px` gaps.

```yaml
spacing:
  gutter-xs: 4px
  gutter-sm: 8px
  gutter-md: 16px
  gutter-lg: 24px
  gutter-xl: 32px
  section: 40px
  page-margin: 20px
```

## Elevation & Depth

SIFA relies on **tonal surface layering and monochromatic color shifts** rather than heavy drop shadows. On editorial screens, depth comes from overlapping oversized garment photography against deep tinted gradients and subtle translucent scrims (`bg-black/25` or `bg-white/10`) for legibility. On checkout and form screens, cards use `1px` low-contrast `outline-variant` borders and tonal `surface-container-low` fills.

## Shapes

Sharp-meets-sculptural luxury geometry: editorial image frames and primary pill CTAs (`rounded-full`) contrast with clean `rounded-xl` (`16px`) checkout cards and `rounded-md` (`8px`) input fields and size chips.

```yaml
rounded:
  none: 0px
  sm: 4px
  DEFAULT: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
```

## Motion & Micro-interaction

Adaptive environment transitions are slow and luxurious (`450ms` cubic-bezier) so background hues, gradients, and accent colors melt smoothly when switching featured garments. Interactive taps (size chips, wishlist hearts, quantity steppers) respond crisply within `150ms`.

```yaml
motion:
  state-change:
    duration: 150ms
    delay: 0ms
    timingFunction: ease-out
  palette-shift:
    duration: 450ms
    delay: 0ms
    timingFunction: cubic-bezier(0.22, 1, 0.36, 1)
  surface-enter:
    duration: 280ms
    delay: 0ms
    timingFunction: cubic-bezier(0.2, 0, 0, 1)
```

## Voice & Content Strategy

- **Tone:** Poised, editorial, and grounded in Nairobi contemporary luxury. Confident without hype or buzzwords.
- **Capitalisation:** Sentence case for body copy and form labels; Title Case for garment names and editorial headlines; uppercase with wide tracking only for small category eyebrows or `KES` currency tags.
- **Currency & Numbers:** Always integer `KES` formatted with comma separators (e.g., `KES 14,500`). Measurements in `cm`. Phone numbers in `2547XXXXXXXX` international format without `+`.
- **Actions:** Outcome-driven verb phrases (`Add to Bag`, `Pay KES 14,950`, `Save Measurements`, `Continue to Payment`).

## Components

Component implementations live as individual HTML sticker sheet files in
`components/`. Each file contains the canonical, styled HTML components with
`<!-- COMPONENT: name -->` comment markers. Read each file before use.

- **Button** → `@components/button.html`: `button-primary`, `button-icon`, `button-with-icon`
- **Card** → `@components/card.html`: `card-elevated`, `card-action`, `card-interactive`, `card-interactive-2`
- **Input Field** → `@components/input-field.html`: `input-field-text`, `input-field-icon`
- **Typography** → `@components/typography.html`: `typography-display`, `typography-body`, `typography-label`
