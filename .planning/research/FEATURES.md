# Features Research: Soundboard + Game Timer

**Domain:** Board game night control panel (tablet-responsive web app)
**Researched:** 2026-01-21
**Confidence:** MEDIUM (WebSearch findings cross-referenced with multiple sources)

## Table Stakes (Must Have)

Features users expect. Missing any of these creates friction or makes the app feel incomplete.

### Dice Roller
| Feature | Why Essential | Complexity | Notes |
|---------|---------------|------------|-------|
| Tap-to-roll interaction | Core function - must be instant and responsive | Low | Single tap triggers roll |
| 2x D6 display | Project requirement - standard for most board games | Low | Clear visual of both dice results |
| Sum total display | Users expect quick math - reduces mental overhead | Low | Show individual + total |
| Roll animation/feedback | Without feedback, users doubt the roll happened | Medium | CSS animation sufficient; physics optional |
| Roll history (last 3-5) | Dispute resolution, "what did I roll?" moments | Low | Simple array display |

### Timer System
| Feature | Why Essential | Complexity | Notes |
|---------|---------------|------------|-------|
| Countdown timer | Core function - turn limits, timed phases | Low | Basic setInterval implementation |
| Start/Pause/Resume controls | Essential controls users expect from any timer | Low | State management pattern |
| Reset function | Quick restart without re-entering time | Low | Reset to initial value |
| Time preset buttons (common values) | Reduces friction - no typing during gameplay | Low | 30s, 1m, 2m, 5m buttons |
| Audio alert on completion | Must notify when timer ends (user may not be watching) | Low | Single alert sound |
| Visual countdown (large digits) | Must be readable from across table | Low | Large font, high contrast |

### Stopwatch
| Feature | Why Essential | Complexity | Notes |
|---------|---------------|------------|-------|
| Count-up timer | Track elapsed time for turns/games | Low | Basic implementation |
| Start/Stop/Reset controls | Standard stopwatch controls | Low | Same pattern as countdown |
| Lap/Mark function | Optional but expected for tracking turn durations | Low | Array of timestamps |

### Background Music Player
| Feature | Why Essential | Complexity | Notes |
|---------|---------------|------------|-------|
| Play/Pause control | Core playback control | Low | HTML5 audio API |
| Seamless loop | Music must loop without gaps/pops | Medium | Web Audio API for gapless looping |
| Volume control | Users need to balance music with conversation | Low | Slider or buttons |
| Mute toggle | Quick silence without losing volume setting | Low | Preserve volume state |

### Sound Effect Buttons
| Feature | Why Essential | Complexity | Notes |
|---------|---------------|------------|-------|
| 10 configurable buttons | Project requirement - variety for different moments | Low | Grid layout |
| Instant playback on tap | Timing matters for sound effects - must be immediate | Low | Pre-loaded AudioBuffers |
| Visual feedback on press | Confirm the tap registered (haptic not available on web) | Low | CSS :active state |
| Individual volume per sound | Some effects need to be louder/softer than others | Medium | Per-sound gain nodes |
| Sound labeling | Users must know which button does what | Low | Text or icon on button |

### Interface/UX
| Feature | Why Essential | Complexity | Notes |
|---------|---------------|------------|-------|
| Large touch targets (48dp+ / 10mm+) | Accessibility and usability on tablets | Low | CSS sizing, per W3C/Google guidelines |
| Tablet-responsive layout | Project requirement - landscape/portrait support | Medium | CSS Grid/Flexbox |
| High contrast visibility | Must be readable in varied lighting | Low | Dark theme with bright accents |
| Works offline (after initial load) | Game nights may have spotty WiFi | Medium | Service worker, cached assets |

## Differentiators (Nice to Have)

Features that enhance the experience but aren't deal-breakers if missing.

### Dice Roller Enhancements
| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| 3D physics animation | More satisfying, immersive feel | High | Three.js + physics engine (cannon-es) |
| Shake-to-roll (device motion) | Fun alternative interaction | Medium | DeviceMotion API, permission required |
| Custom dice faces/colors | Personalization, match board game themes | Medium | Asset management |
| Dice sound effects | Auditory feedback enhances experience | Low | Already have audio infrastructure |
| Lock and reroll | Strategic - keep some dice, reroll others | Low | Individual dice state |

### Timer Enhancements
| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Analysis paralysis alert | Gentle reminder after X seconds of thinking | Low | Configurable threshold + sound |
| Custom time entry | For non-standard time limits | Low | Input field |
| Per-player timers | Chess-clock style for competitive games | High | Multi-timer state management |
| Sudden death mode | Each player has total time bank | High | Complex state, UI for multiple players |
| Visual progress ring/bar | Glanceable time remaining | Medium | SVG/Canvas animation |

### Sound System Enhancements
| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Sound categories/tabs | Organize effects (victory, fail, ambient, etc.) | Medium | Navigation/state |
| Upload custom sounds | Personalization for specific games | Medium | File handling, validation |
| Drag-to-reorder buttons | Customize layout to preference | Medium | Drag-and-drop library |
| Sound preview mode | Hear sound before committing to button | Low | Hold vs tap interaction |
| Crossfade between music tracks | Smoother transitions if multiple tracks | High | Complex audio scheduling |

### Ambiance/Aesthetic
| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Theme variants | Different aesthetics for different game types | Medium | CSS variables, theme system |
| Ambient visual effects | Particle effects, subtle animations | Medium | Canvas/CSS animations |
| Screen-saver mode | Display mode when not actively used | Low | Inactivity detection |
| Fullscreen mode | Maximize immersion, hide browser chrome | Low | Fullscreen API |

### Quality of Life
| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Settings persistence | Remember volume, timer presets between sessions | Low | localStorage |
| Keyboard shortcuts | Power user efficiency (desktop fallback) | Low | Event listeners |
| Quick presets per game | "Monopoly mode", "Catan mode" etc. | Medium | Preset management |
| Multi-device sync | Shared timer across devices at table | High | WebSockets, server infrastructure |
| PWA install | Home screen icon, more app-like | Low | Manifest + service worker |

## Anti-Features (Do NOT Build)

Features that are common in the domain but wrong for this specific use case.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| User accounts/login | Personal use app - adds friction, no benefit | Local storage only |
| Cloud sync | Complexity without value for single-user personal tool | Local storage persistence |
| Social features (sharing, leaderboards) | Not a social app - game night is in-person | Focus on in-room experience |
| Multiple simultaneous music tracks | Complexity explosion, mixing issues, confusing UI | Single track with loop |
| Playlist management | Over-engineering - single ambient track is sufficient | Just loop one track well |
| Sound recording/editing | Out of scope - use dedicated tools for sound prep | Accept pre-prepared audio files |
| AI-generated sounds | Unnecessary complexity, unpredictable results | Curated sound library |
| Multi-room/multi-table support | Personal use, not venue management | Single instance |
| RPG dice (D4, D8, D12, D20, D100) | Project scope is 2xD6 for standard board games | Just D6 |
| Complex dice expressions (3d6+2, advantage) | TTRPG feature, not board game feature | Simple roll display |
| Score tracking | Different games have different scoring - use paper | Focus on timer/dice/ambiance |
| Game rules database | Massive scope creep, better done by dedicated apps | Assume users know their game |
| Turn order management | Complex state, varies by game, better done manually | Let players manage order |
| Notification system | Personal tablet app doesn't need push notifications | Audio alerts sufficient |
| Achievements/gamification | Meta-gaming the game night tool is weird | Utility, not game itself |
| Ads or monetization | Personal project, not a business | Clean experience |
| Analytics/tracking | Personal use, no need for usage data | Privacy-respecting |
| Multi-language support | Personal use, single language sufficient | English only |
| Text-to-speech for timers | Adds complexity, audio alerts sufficient | Simple sound alerts |

## Feature Dependencies

```
Core Audio System (Web Audio API setup)
    |
    +-- Background Music Player (depends on audio context)
    |
    +-- Sound Effect Buttons (depends on audio context)
    |       |
    |       +-- Individual Volume Control (depends on gain nodes)
    |
    +-- Timer Alerts (depends on audio context for sounds)

Timer System (state management)
    |
    +-- Countdown Timer
    |       |
    |       +-- Time Presets (depends on countdown)
    |       |
    |       +-- Analysis Paralysis Alert (depends on countdown)
    |
    +-- Stopwatch (same state pattern)

Dice Roller (standalone)
    |
    +-- Roll Animation (CSS or canvas)
    |
    +-- Roll History (array state)
    |
    +-- Dice Sounds (depends on audio system)

Settings Persistence (localStorage)
    |
    +-- Volume Settings
    |
    +-- Timer Presets
    |
    +-- Sound Assignments

UI Foundation
    |
    +-- Touch Target Sizing (CSS)
    |
    +-- Responsive Layout (CSS)
    |
    +-- Theme/Aesthetic (CSS variables)

Offline Support (Service Worker)
    |
    +-- Requires: All audio assets bundled
    |
    +-- Requires: App shell cached
```

## MVP Recommendation

**For MVP, prioritize:**
1. Dice roller with tap-to-roll and sum display (table stakes)
2. Countdown timer with start/pause/reset (table stakes)
3. Background music with seamless loop and volume (table stakes)
4. 10 sound effect buttons with instant playback (table stakes)
5. Large touch targets and tablet layout (table stakes)
6. Industrial/steampunk aesthetic (project identity)

**Defer to post-MVP:**
- 3D dice physics (nice-to-have, high complexity)
- Shake-to-roll (permission complexity, not essential)
- Per-player timers (high complexity, niche use)
- Custom sound upload (medium complexity, prepare sounds in advance)
- Settings persistence (low complexity but not blocking)
- PWA/offline (medium complexity, WiFi usually works)

## Sources

**Soundboard Features:**
- [Web Audio API Best Practices - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)
- [Podcast Soundboard](https://podcastsoundboard.com/)
- [Soundboard Studio - App Store](https://apps.apple.com/us/app/soundboard-studio/id1108810082)

**Game Timer Features:**
- [Shared Game Timer Features](https://sharedgametimer.com/features)
- [Board Game Timer - Google Play](https://play.google.com/store/apps/details?id=com.ferrancatalan.countdowngames)
- [Game Timer - App Store](https://apps.apple.com/us/app/game-timer/id6746631584)

**Dice Roller Features:**
- [Crafting a Dice Roller with Three.js - Codrops](https://tympanus.net/codrops/2023/01/25/crafting-a-dice-roller-with-three-js-and-cannon-es/)
- [Board Game Buddy - AppAdvice](https://appadvice.com/app/board-game-buddy-game-toolbox/1521583244)
- [Dice Simulator](https://dice-simulator.com/)

**Touch/Accessibility:**
- [Touch Target Size - Nielsen Norman Group](https://www.nngroup.com/articles/touch-target-size/)
- [W3C Research on Touch Target Size](https://www.w3.org/WAI/GL/mobile-a11y-tf/wiki/Summary_of_Research_on_Touch/Pointer_Target_Size)
- [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/ensure-interactive-elements-virtual-controls-are-large-and-well-spaced-particularly-on-small-or-touch-screens/)

**Timer UX:**
- [Countdown Timer Design - Medium](https://medium.com/100daysofui/day-14-of-100-how-i-designed-a-countdown-timer-using-the-design-hierarchy-of-needs-de914afb688b)
- [React Countdown Libraries - LogRocket](https://blog.logrocket.com/top-react-countdown-component-libraries/)
