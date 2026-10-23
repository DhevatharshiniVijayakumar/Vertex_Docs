---
name: Vertex Midnight and Teal
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf3'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef4ff'
  surface-container: '#e5efff'
  surface-container-high: '#dbe9ff'
  surface-container-highest: '#d3e4fc'
  on-surface: '#0c1d2e'
  on-surface-variant: '#44474e'
  inverse-surface: '#223244'
  inverse-on-surface: '#e9f1ff'
  outline: '#74777e'
  outline-variant: '#c4c6ce'
  surface-tint: '#4a5f81'
  primary: '#001632'
  on-primary: '#ffffff'
  primary-container: '#142b4a'
  on-primary-container: '#7d93b7'
  inverse-primary: '#b2c7ee'
  secondary: '#006b5f'
  on-secondary: '#ffffff'
  secondary-container: '#71f8e4'
  on-secondary-container: '#007165'
  tertiary: '#130057'
  on-tertiary: '#ffffff'
  tertiary-container: '#25008f'
  on-tertiary-container: '#8f81ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#b2c7ee'
  on-primary-fixed: '#021c3a'
  on-primary-fixed-variant: '#324768'
  secondary-fixed: '#71f8e4'
  secondary-fixed-dim: '#50dbc8'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#e4dfff'
  tertiary-fixed-dim: '#c7bfff'
  on-tertiary-fixed: '#170065'
  on-tertiary-fixed-variant: '#422bb5'
  background: '#f8f9ff'
  on-background: '#0c1d2e'
  surface-variant: '#d3e4fc'
typography:
  headline-xl:
    fontFamily: Noto Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Noto Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: '0'
  body-lg:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-md:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  body-sm:
    fontFamily: Noto Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Noto Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-tablet: 1rem
  gutter-desktop: 1.5rem
  margin: 1.25rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system establishes a high-trust, productivity-focused visual language tailored for mobile-first document collaboration, dynamic enterprise editing, and AI-accelerated workflows. The brand posture balances the precision and architectural authority of modern institutional software with the kinetic energy of contemporary mobile utilities. 

Targeting demanding corporate leaders, technical project directors, and multilingual field operators, the interface evokes calm authority, uncompromising security, and effortless operational velocity. 

The aesthetic is grounded in **Refined Modern Utility**:
- Crisp, deliberate boundaries and soft structural backgrounds (#F4F7FB) keep text readable under heavy sunlight or low office light.
- Restrained color distribution avoids visual exhaustion: dominant monochromatic deep blues with punctual bursts of sharp energetic teal (#16B8A6) indicating interaction and focal tasks, complemented by a discreet violet (#7C6CF2) reserved exclusively for automated and AI operations.
- Direct bilingual ergonomics ensure English typography and Tamil Unicode glyphs retain matched x-height perception and visual weight without clipping or baseline distortion.

## Colors

The palette leverages a structured light mode with layered slate depths to maintain visual separation without heavy borders.

### Palette Assignment & Roles
- **Primary (`#142B4A`)**: Applied to primary CTA surfaces, prominent mobile navigation headers, active high-priority icons, and critical structural anchors. Dark variant (`#0B1930`) handles deep pressed states and modal backdrops; soft variant (`#E8EEF7`) serves as active indicator fills and selection highlights.
- **Secondary / Brand Accent (`#16B8A6`)**: Deployed strategically for high-leverage interactive controls, active toggle switches, floating document creation triggers, and synchronized collaborative markers. Dark variant (`#0F8F82`) applies to tapped states.
- **AI Accent (`#7C6CF2`)**: Dedicated to generative prompts, semantic document analysis badges, AI search bars, and intelligence suggestions.
- **Background & Surfaces**: Base canvas defaults to Soft Cool Slate (`#F4F7FB`), transitioning upward to crisp white (`#FFFFFF`) for cards, sheets, and editable workspaces, and subtle recessed fill (`#EDF2F8`) for segmented toolbars and search inputs.
- **Text Hierarchies**: `#172B45` for high-contrast primary typography; `#68788D` for metadata, timestamps, and secondary descriptions; `#8A97A8` for placeholders, disabled states, and auxiliary counter badges.
- **Status Validation**: Semantic states operate with muted tint backgrounds to prevent visual alarming: Success (`#18865B` / `#E7F7EF`), Warning (`#B7791F`), and Error (`#D64545` / `#FDECEC`).

## Typography

Noto Sans provides uniform stroke modulation, exceptional open counters, and native cross-platform support for Tamil Unicode alongside Latin scripts without layout shifts.

### Rules & Script Harmony
- **Unicode Support (Tamil & Latin)**: Noto Sans eliminates line-height jitter when rendering mixed Latin and Tamil character strings within a single sentence or title. All line heights maintain a minimum 1.4x factor to accommodate tall Tamil vowel signs and sub-glyphs without ascender or descender collision.
- **Headings**: Tightly tracked and high-contrast, delivering structured scan paths for legal, technical, and operational documents.
- **Labels & Numbers**: Numerical tables, document byte counters, and modification timestamps use tabular figures (`font-variant-numeric: tabular-nums`) to prevent optical wobble during sorting or collaborative updates.

## Layout & Spacing

The layout is built for narrow mobile formats (optimized for a 393×852 viewport) using a fluid column architecture bounded by fixed outer bounds.

### Responsive Rules & Screen Constraints
- **Mobile (up to 599px)**: 4-column layout with 20px (`1.25rem`) fixed outer margins and 12px (`0.75rem`) gutters. All content flows inside these margins to maintain thumb comfort. Touch-reach zones place major creation triggers and filter anchors in the lower 40% of the screen.
- **Tablet (600px - 1023px)**: 8-column layout with 32px (`2rem`) margins and 16px (`1rem`) gutters. Side sheets and navigation panels dock without pushing canvas content into awkward line lengths.
- **Desktop (1024px+)**: 12-column layout with 48px (`3rem`) margins and 24px (`1.5rem`) gutters, maximum readable body container width clamped at 780px for standard reading views.
- **Touch Target Integrity**: No interactive element has an interactive target smaller than 44×44dp, regardless of optical icon scale.

## Elevation & Depth

Visual hierarchy uses clean tonal layers combined with diffused, slightly cool ambient shadows. Rather than harsh black drop-shadows, the interface relies on deep navy-tinted ambient occlusion to ground elements on the slate canvas.

- **Level 0 (Flat)**: Background canvas (`#F4F7FB`), inactive table structures, and segmented switch tracks.
- **Level 1 (Cards & Static Containers)**: Surface white (`#FFFFFF`) with a 1px border (`#DFE6EF`) and shadow: `0 1px 3px rgba(20, 43, 74, 0.04), 0 1px 2px rgba(20, 43, 74, 0.02)`.
- **Level 2 (Active Toolbars & Inline Cards)**: Hovered or selected cards, fixed contextual action bars: `0 4px 12px rgba(20, 43, 74, 0.06), 0 1px 3px rgba(20, 43, 74, 0.04)`.
- **Level 3 (Bottom Sheets & Modals)**: Document context menus, mobile bottom sheets, search overlays: `0 12px 32px rgba(20, 43, 74, 0.12), 0 4px 8px rgba(20, 43, 74, 0.04)`.
- **Level 4 (Floating Action Controls)**: Primary document creation triggers: `0 8px 24px rgba(22, 184, 166, 0.28)`.

## Shapes

The interface balances sharp productivity discipline with approachable mobile handling.

- **Cards & Sheet Surfaces**: Standardized at 16px radius (`rounded-lg`), establishing clear module boundaries that feel tactile and contained.
- **Inputs & Standard Buttons**: Standardized at 12px radius (`0.75rem`), presenting an ergonomically smooth edge that guides touch interaction.
- **Micro Tags & Checkboxes**: 6px to 8px radius for tags, status indicators, and form checkboxes, preserving high density.
- **Floating Triggers & Avatars**: True pill forms (`9999px`) for full-width action bars, pill badges, and collaborative avatar stacks.

## Components

### Buttons
- **Primary**: Background `#142B4A`, text `#FFFFFF`, 12px radius, minimum height 48px, horizontal padding 20px. Pressed state transitions to `#0B1930`.
- **Accent / Create**: Background `#16B8A6`, text `#FFFFFF`, 12px radius. Pressed state transitions to `#0F8F82`.
- **Secondary / Outline**: 1px border `#DFE6EF`, background `#FFFFFF`, text `#172B45`. Pressed state transitions to `#EDF2F8`.
- **AI Action**: Background `#7C6CF2` with crisp white text, or 1px tinted outline `#7C6CF2` over a faint 5% violet fill.

### Input Fields & Search
- Container height 48px with 12px radius, fill `#FFFFFF` (or `#EDF2F8` for unselected list search), and 1px border `#DFE6EF`. 
- Focus state features a crisp 1.5px outline in secondary teal (`#16B8A6`) with zero offset blur. 
- Prefix and suffix icons are 20px Lucide outline icons set to `#68788D`.
- Native support for Tamil character input with a minimum input font size of 16px to prevent unwanted iOS auto-zoom behavior.

### Cards & Document Tiles
- Surface `#FFFFFF`, 16px border-radius, bounded by a 1px `#DFE6EF` border and Level 1 elevation.
- Internal padding defaults to 16px (`1rem`).
- Document previews display file extension chips, synchronized collaborator avatar rings, and real-time offline status dots.

### Chips & Filters
- Compact 32px height, 8px radius, background `#EDF2F8`, text `#68788D`, font size 13px (`body-sm`).
- Selected state flips background to `#142B4A` with `#FFFFFF` text, or `#E8EEF7` background with `#142B4A` text for multi-select states.

### Lists & Cell Modules
- Cell minimum height 56px with zero horizontal card borders when placed in continuous slate groupings.
- Separators use a 1px hairline `#DFE6EF` inset by 16px to align with text margins.
- Active or swiped items expose clear teal or crimson contextual action utilities.

### Checkboxes & Radio Buttons
- 20×20px dimensions with 44×44dp transparent touch wrappers. 
- Checkboxes feature a 6px radius, unfilled border `#8A97A8`, transitioning to `#142B4A` or `#16B8A6` when checked with a 2px white stroke checkmark.

### Specialized App Elements
- **Document Status Badges**: Pill-shaped micro labels (height 22px, padding horizontal 8px, font size 11px) using semantic token pairs (e.g., `#E7F7EF` background with `#18865B` text for "Signed / முடிந்தது").
- **Collaborator Cursors**: Dynamic 2px outline indicator rings featuring user initials or avatars with crisp contrast borders against document canvas white.