# Project Research Summary

**Project:** LoFi Immersive Interface
**Domain:** Audio-heavy board game control panel (tablet web app)
**Researched:** 2026-01-21
**Confidence:** HIGH

## Executive Summary

This project is a tablet-responsive web application combining an audio soundboard, game timers, dice roller, and background music player with an industrial/steampunk aesthetic. The research indicates this is a well-understood domain with mature libraries and established patterns. The recommended approach uses Next.js 15 with static export, use-sound (built on Howler.js) for audio, Zustand for state management, and Tailwind CSS v4 for the custom industrial theme.

The primary technical risk is iOS/Safari audio handling. Browser autoplay policies require explicit user gesture initialization, and iOS-specific quirks (silent switch behavior, background tab suspension, audio delay) demand careful architecture from day one. The single AudioContext pattern with proper memory management is non-negotiable. Secondary concerns include ensuring touch responsiveness for instant sound effect playback and managing concurrent audio streams on resource-constrained tablets.

The project scope is intentionally focused: 2xD6 dice, countdown/stopwatch timers, one background music track, and 10 configurable sound effect buttons. Anti-features like user accounts, cloud sync, RPG dice variants, and score tracking are explicitly out of scope. This constraint keeps complexity manageable and delivery achievable.

## Key Findings

### Recommended Stack

The stack prioritizes developer experience, bundle size, and audio application requirements. All technologies are mature and well-documented.

**Core technologies:**
- **Next.js 15 + React 19**: Static export for Vercel deployment, /public folder for audio files, mature App Router
- **use-sound (Howler.js)**: React hooks API for audio, handles format fallbacks, ~1KB gzipped with async Howler load
- **Zustand 5**: Global state with built-in persist middleware for localStorage, simpler than Redux, better than Context for frequently-updating state
- **Tailwind CSS v4**: CSS-first configuration perfect for custom industrial theme, CSS variables for metal/copper/brass palette

**Critical version requirements:**
- Next.js 15.5.x (static export stability)
- React 19.x (required by Next.js 15)
- Howler.js 2.2.4 (peer dependency of use-sound, stable for 2+ years)

### Expected Features

**Must have (table stakes):**
- Dice roller with tap-to-roll, 2xD6 display, sum total, roll feedback
- Countdown timer with start/pause/reset, preset buttons (30s, 1m, 2m, 5m), audio alert
- Stopwatch with count-up, lap marking
- Background music player with seamless loop, volume control, mute toggle
- 10 sound effect buttons with instant playback, visual feedback, individual volume
- Large touch targets (48dp+), tablet-responsive layout, high contrast visibility

**Should have (differentiators):**
- Roll history (last 3-5 rolls)
- Analysis paralysis alert timer
- Visual progress ring for timers
- Settings persistence across sessions
- PWA install capability

**Defer (v2+):**
- 3D physics dice animation (high complexity)
- Shake-to-roll device motion
- Per-player chess-clock timers
- Custom sound upload
- Sound categories/tabs
- Multi-device sync

### Architecture Approach

The architecture uses a single shared AudioContext via React Context (browser requirement), Zustand for global config state with localStorage persistence, and clear component boundaries (Panel > Widget > Control). Audio state lives in refs and context, timer state is component-local, and only user preferences persist.

**Major components:**
1. **AudioProvider** — AudioContext singleton, user gesture initialization, gain node management
2. **StoreProvider** — Zustand store with persist middleware, volume/soundButton config
3. **MusicPanel** — HTMLAudioElement streaming for background music, progress tracking
4. **SoundEffectsPanel** — 10 SoundButton components with preloaded AudioBuffers
5. **TimerPanel** — Countdown + Stopwatch with local state, alert sound integration
6. **DicePanel** — Roll logic, animation, history (standalone, minimal dependencies)

### Critical Pitfalls

1. **Browser Autoplay Policy** — AudioContext starts suspended. Create on first user gesture or call resume() inside click/touch handler. Design a "Start/Enter" screen for initialization.

2. **iOS Safari Silent Switch** — Physical mute switch kills Web Audio. Play silent MP3 via HTMLAudioElement first to switch to media channel. Use unmute-ios-audio library.

3. **AudioBufferSourceNode Memory Leaks** — Don't store references to source nodes after creation. Reuse AudioBuffer, let source nodes garbage collect. Limit to 4-6 concurrent sounds.

4. **iOS Safari Audio Delay** — Known WebKit bug causes latency through Web Audio processing. Keep audio graphs simple, test on real devices, consider Howler.js abstraction.

5. **Background Tab Suspension** — Safari suspends audio when app backgrounded. Handle visibilitychange event, call audioContext.resume() on return, save/restore playback position.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation & Audio Infrastructure
**Rationale:** AudioContext initialization must be architected from day one; retrofitting is painful. All sound features depend on this.
**Delivers:** Project scaffolding, theme system, AudioContext provider with user gesture handling, Zustand store skeleton, volume controls with gain nodes
**Addresses:** Touch targets, responsive layout foundation, high contrast theme
**Avoids:** Pitfall #1 (Autoplay Policy), Pitfall #2 (iOS Mute Switch)

### Phase 2: Sound System
**Rationale:** Proves audio infrastructure works; simpler than background music (buffer playback vs streaming)
**Delivers:** useSoundEffect hook, 10 configurable sound buttons, sound button config persistence
**Uses:** use-sound/Howler.js, Zustand persist middleware
**Implements:** AudioBuffer preloading, gain node routing
**Avoids:** Pitfall #3 (Memory Leaks), Pitfall #5 (Concurrent Streams)

### Phase 3: Background Music
**Rationale:** More complex audio pattern (streaming vs buffered); depends on working audio infrastructure
**Delivers:** Background music player with track selection, play/pause/stop, seamless loop, progress bar
**Uses:** HTMLAudioElement + createMediaElementSource for Web Audio integration
**Implements:** Music gain node, loop handling, progress tracking
**Avoids:** Pitfall #4 (iOS Delay), Pitfall #8 (Background Suspension)

### Phase 4: Timers
**Rationale:** Largely independent of audio (except alert sound); can be built in parallel with music polish
**Delivers:** Countdown timer with presets, stopwatch, timer alert sounds
**Uses:** useState + useRef + useEffect (standard React patterns)
**Implements:** Timer state management, preset buttons, alert integration

### Phase 5: Dice Roller
**Rationale:** Completely standalone; no dependencies on other features
**Delivers:** 2xD6 dice display, tap-to-roll, sum total, roll animation, roll history
**Uses:** Local state only, CSS animations
**Implements:** Dice component, roll logic, animation feedback

### Phase 6: Polish & PWA
**Rationale:** Integration and optimization after core features complete
**Delivers:** Responsive layout refinement, performance optimization, PWA manifest, service worker for offline
**Addresses:** Touch event timing, CSS performance, Safari storage considerations
**Avoids:** Pitfall #6 (Safari Storage), Pitfall #11 (Touch Events), Pitfall #13 (CSS Performance)

### Phase Ordering Rationale

- **Audio infrastructure first**: All sound features depend on properly initialized AudioContext with user gesture handling. This is the highest-risk area and affects multiple features.
- **Sound effects before music**: Buffer-based playback is simpler than streaming; validates audio system before adding complexity.
- **Timers and dice can parallelize**: Both are independent of each other and have minimal audio dependencies (timer alert only).
- **Polish last**: Performance optimization and PWA features require complete app to measure and test properly.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3 (Background Music):** Gapless looping implementation may need additional research if use-sound proves insufficient; potential fallback to direct Howler.js or custom Web Audio scheduling.
- **Phase 6 (PWA):** Service worker audio caching strategy needs validation; Safari 7-day eviction policy may affect cached assets.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Well-documented Next.js 15 setup, Tailwind v4 theming, AudioContext patterns
- **Phase 4 (Timers):** Standard React state management, no special considerations
- **Phase 5 (Dice):** Simple local state, CSS animations, no external dependencies

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies have official docs, large communities, proven in production |
| Features | MEDIUM | Feature expectations derived from multiple app comparisons; specific user needs may vary |
| Architecture | HIGH | Patterns verified against MDN, Web Audio best practices, and community implementations |
| Pitfalls | HIGH | All critical pitfalls verified against official WebKit bugs, Chrome docs, MDN |

**Overall confidence:** HIGH

### Gaps to Address

- **Industrial/steampunk CSS implementation:** Requires custom CSS work with no pre-built components. Medium confidence in execution, but techniques (box-shadow, gradients) are well-documented.
- **iOS device testing:** Simulator insufficient for audio behavior; need real iPad/iPhone for validation during development.
- **Audio file format strategy:** Research recommends WebM + MP3 fallback, but actual assets need encoding and testing.

## Sources

### Primary (HIGH confidence)
- [MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) — AudioContext patterns, best practices
- [Next.js 15 Documentation](https://nextjs.org/docs) — Static export, public folder, App Router
- [Zustand Documentation](https://zustand.docs.pmnd.rs/) — Persist middleware, store patterns
- [Howler.js](https://howlerjs.com/) — Audio format handling, cross-browser support
- [WebKit Bug Tracker](https://bugs.webkit.org/) — iOS Safari audio issues (237322, 221334, 198277)

### Secondary (MEDIUM confidence)
- [use-sound npm](https://www.npmjs.com/package/use-sound) — React audio hooks, 118K weekly downloads
- [Josh W. Comeau's use-sound article](https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/) — Library design rationale
- [Tailwind CSS v4 blog](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first configuration approach
- [Chrome Autoplay Policy](https://developer.chrome.com/blog/autoplay) — Browser audio restrictions

### Tertiary (LOW confidence)
- Various app store comparisons (Soundboard Studio, Game Timer apps) — Feature expectations
- Community blog posts on React audio — Pattern validation

---
*Research completed: 2026-01-21*
*Ready for roadmap: yes*
