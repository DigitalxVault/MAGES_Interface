# LoFi Immersive Interface

## What This Is

A configurable board game night control panel with an industrial/military/steampunk metal aesthetic. Built as a tablet-responsive web app for creating immersive gaming atmospheres with dice, timers, and soundboard controls. Designed for reuse across different themed game nights by reconfiguring sound buttons and swapping audio files.

## Core Value

Enable game hosts to control atmosphere and timing during board game sessions with a single, visually striking interface.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] 2× D6 dice roller with visual result display
- [ ] Countdown timer with preset buttons (30s, 1m, 5m, 10m) and custom input
- [ ] Timer triggers visual alert (flash/pulse) and configurable sound at zero
- [ ] Stopwatch with start/stop/reset for tracking game duration
- [ ] Background music player with track dropdown, play/pause/stop, progress bar, auto-loop
- [ ] 10 configurable sound effect buttons with name field and audio dropdown
- [ ] Separate volume sliders for background music and sound effects
- [ ] Button configurations persist in localStorage
- [ ] Audio files served from /public/sounds/background/ and /public/sounds/effects/
- [ ] Industrial/steampunk metal visual style per style guide
- [ ] Tablet-responsive layout

### Out of Scope

- User authentication — not needed for personal use
- Database — localStorage sufficient for config persistence
- Offline support — online deployment is acceptable
- Upload functionality — audio files managed via repo commits
- Mobile phone optimization — tablet-focused

## Context

This is a greenfield project for personal board game night use. The interface should be reusable for different themed game nights by reconfiguring the sound buttons and swapping audio files.

The visual style is defined by a comprehensive JSON style guide featuring:
- Dark gunmetal panels (#2B2F36, #2F3A45)
- Rivets, bevels, inset wells
- LED indicators with glow effects
- Hazard stripes (yellow/black)
- Bold condensed all-caps typography (Bebas Neue, Oswald, Rajdhani)
- 8px base grid, 14px panel corner radius

### Style Guide Reference

```json
{
  "colorTokens": {
    "neutrals": {
      "bgDeep": "#1C1C1E",
      "panelBase": "#2B2F36",
      "panelTintBlueGrey": "#2F3A45",
      "wellInner": "#23272E",
      "metalMid": "#3A4450",
      "metalLight": "#90A8A6",
      "metalHighlight": "#F1E8D9",
      "borderDark": "#14161A",
      "textPrimary": "#E6E8EC",
      "textSecondary": "#B7BEC8",
      "textMuted": "#7C8794"
    },
    "accents": {
      "warningAmber": "#F0B040",
      "warningStripeYellow": "#E6C74A",
      "dangerRed": "#F04020",
      "successGreen": "#20A850",
      "infoCyan": "#2AA7A0",
      "radarGreen": "#2BCB78",
      "purpleNeon": "#C46BFF"
    }
  },
  "typography": {
    "families": {
      "labelCondensed": ["DIN Condensed", "Bebas Neue", "Oswald", "Rajdhani"],
      "buttonDisplay": ["Impact", "Anton", "Teko"],
      "microUI": ["Roboto Condensed", "Inter Tight", "Rajdhani"]
    },
    "styles": {
      "allCaps": true,
      "embossed": "text-shadow: 0 1px 0 rgba(255,255,255,0.12), 0 -1px 0 rgba(0,0,0,0.55)"
    }
  },
  "layout": {
    "baseUnitPx": 8,
    "panelPaddingPx": 16,
    "cornerRadiiPx": {
      "panelOuter": 14,
      "buttonRect": 6
    }
  }
}
```

## Constraints

- **Tech stack**: React/Next.js
- **Deployment**: Vercel via GitHub
- **Audio**: User provides all MP3 files, static in repo
- **Target device**: Tablet (responsive, but tablet-primary)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static audio files in repo | Simplest approach for 10-20 files, no backend needed | — Pending |
| localStorage for persistence | No database needed, survives browser refresh | — Pending |
| Configurable sound buttons | Enables reuse across different game themes | — Pending |
| Separate BG music section | Clearer UX, dedicated loop/progress controls | — Pending |
| React/Next.js | Modern component architecture, good for complex UI state | — Pending |

---
*Last updated: 2025-01-21 after initialization*
