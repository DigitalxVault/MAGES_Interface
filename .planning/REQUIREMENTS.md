# Requirements: LoFi Immersive Interface

**Defined:** 2025-01-21
**Core Value:** Enable game hosts to control atmosphere and timing during board game sessions with a single, visually striking interface.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Dice

- [ ] **DICE-01**: User can tap to roll 2x D6 dice
- [ ] **DICE-02**: Dice results display clearly with individual values and sum total
- [ ] **DICE-03**: Roll animation provides visual feedback on roll
- [ ] **DICE-04**: Roll history shows last 5 rolls for dispute resolution
- [ ] **DICE-05**: Dice roll plays sound effect when rolled

### Timer

- [ ] **TIMER-01**: Countdown timer with preset buttons (30s, 1m, 5m, 10m)
- [ ] **TIMER-02**: Countdown timer accepts custom time input
- [ ] **TIMER-03**: Timer has start/pause/resume/reset controls
- [ ] **TIMER-04**: Timer displays large, readable digits visible from across table
- [ ] **TIMER-05**: Timer shows visual progress bar/ring indicating time remaining
- [ ] **TIMER-06**: Timer plays configurable sound alert when reaching zero
- [ ] **TIMER-07**: Timer flashes/pulses visual alert when reaching zero

### Stopwatch

- [ ] **WATCH-01**: Stopwatch counts up from 00:00:00
- [ ] **WATCH-02**: Stopwatch has start/stop/reset controls

### Background Music

- [ ] **BGMUSIC-01**: Dropdown to select track from /public/sounds/background/ folder
- [ ] **BGMUSIC-02**: Play/pause/stop transport controls for background music
- [ ] **BGMUSIC-03**: Progress bar showing current position in track
- [ ] **BGMUSIC-04**: Track loops seamlessly without gaps
- [ ] **BGMUSIC-05**: Dedicated volume slider for background music

### Sound Effects

- [ ] **EFFECTS-01**: 10 configurable sound effect buttons displayed in grid
- [ ] **EFFECTS-02**: Each button has editable name/label field
- [ ] **EFFECTS-03**: Each button has dropdown to select audio file from /public/sounds/effects/
- [ ] **EFFECTS-04**: Sound plays instantly on tap (one-shot playback, auto-stops when complete)
- [ ] **EFFECTS-05**: Dedicated volume slider for all sound effects
- [ ] **EFFECTS-06**: Button configuration (names and audio assignments) persists in localStorage

### User Interface

- [ ] **UI-01**: Industrial/steampunk metal visual style per project style guide
- [ ] **UI-02**: Tablet-responsive layout supporting landscape and portrait orientations
- [ ] **UI-03**: Touch targets minimum 48dp (approx 10mm) for accessibility
- [ ] **UI-04**: User gesture/welcome screen to unlock audio context (browser requirement)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Dice Enhancements

- **DICE-V2-01**: 3D physics-based dice animation (Three.js + cannon-es)
- **DICE-V2-02**: Shake-to-roll using device motion API
- **DICE-V2-03**: Custom dice colors/themes
- **DICE-V2-04**: Lock individual dice for reroll mechanics

### Timer Enhancements

- **TIMER-V2-01**: Stopwatch lap/mark function for turn tracking
- **TIMER-V2-02**: Analysis paralysis alert after configurable threshold
- **TIMER-V2-03**: Per-player chess-clock style timers

### Sound Enhancements

- **EFFECTS-V2-01**: Upload custom sounds through UI
- **EFFECTS-V2-02**: Drag-to-reorder sound buttons
- **EFFECTS-V2-03**: Sound categories/tabs for organization
- **EFFECTS-V2-04**: Per-sound individual volume control

### Platform

- **PLAT-V2-01**: PWA with offline support (service worker)
- **PLAT-V2-02**: Fullscreen mode
- **PLAT-V2-03**: Theme variants for different game aesthetics
- **PLAT-V2-04**: Keyboard shortcuts for desktop use

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| User authentication/login | Personal use app — adds friction without benefit |
| Cloud sync/database | localStorage sufficient for single-user config |
| Multiple simultaneous music tracks | Complexity explosion, mixing issues |
| Playlist management | Single looping track is sufficient |
| RPG dice (D4, D8, D12, D20) | Project scope is 2xD6 for standard board games |
| Complex dice expressions (3d6+2) | TTRPG feature, not board game feature |
| Score tracking | Different games have different scoring — use paper |
| Game rules database | Massive scope creep — users know their games |
| Turn order management | Complex state, better managed manually |
| Multi-device sync | Requires server infrastructure |
| Sound recording/editing | Use dedicated tools for audio prep |
| AI-generated sounds | Unnecessary complexity |
| Multi-language support | English only for personal use |
| Analytics/tracking | Personal use, privacy-respecting |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DICE-01 | Phase 5 | Pending |
| DICE-02 | Phase 5 | Pending |
| DICE-03 | Phase 5 | Pending |
| DICE-04 | Phase 5 | Pending |
| DICE-05 | Phase 5 | Pending |
| TIMER-01 | Phase 4 | Pending |
| TIMER-02 | Phase 4 | Pending |
| TIMER-03 | Phase 4 | Pending |
| TIMER-04 | Phase 4 | Pending |
| TIMER-05 | Phase 4 | Pending |
| TIMER-06 | Phase 4 | Pending |
| TIMER-07 | Phase 4 | Pending |
| WATCH-01 | Phase 4 | Pending |
| WATCH-02 | Phase 4 | Pending |
| BGMUSIC-01 | Phase 3 | Pending |
| BGMUSIC-02 | Phase 3 | Pending |
| BGMUSIC-03 | Phase 3 | Pending |
| BGMUSIC-04 | Phase 3 | Pending |
| BGMUSIC-05 | Phase 3 | Pending |
| EFFECTS-01 | Phase 2 | Pending |
| EFFECTS-02 | Phase 2 | Pending |
| EFFECTS-03 | Phase 2 | Pending |
| EFFECTS-04 | Phase 2 | Pending |
| EFFECTS-05 | Phase 2 | Pending |
| EFFECTS-06 | Phase 2 | Pending |
| UI-01 | Phase 1 | Pending |
| UI-02 | Phase 1 | Pending |
| UI-03 | Phase 1 | Pending |
| UI-04 | Phase 1 | Pending |

**Coverage:**
- v1 requirements: 29 total
- Mapped to phases: 29
- Unmapped: 0

---
*Requirements defined: 2025-01-21*
*Last updated: 2025-01-21 after roadmap creation*
