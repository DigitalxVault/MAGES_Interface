# Pitfalls Research: Audio Web Apps

**Domain:** Audio-heavy web application (soundboard + game timer)
**Target Platform:** Tablet (iPad, Android tablets)
**Researched:** 2026-01-21
**Confidence:** HIGH (verified against MDN, WebKit, Chrome documentation)

---

## Critical Pitfalls

These mistakes cause broken core functionality or require architectural rewrites.

---

### 1. Browser Autoplay Policy Violations

**Problem:** AudioContext created on page load starts in "suspended" state. Attempting to play audio without user gesture fails silently or throws errors. Your background music and sound effects simply don't play.

**Warning Signs:**
- Console message: "An AudioContext was prevented from starting automatically"
- `audioContext.state` returns "suspended" when you expect "running"
- Audio works on desktop but fails on mobile/tablet
- Audio plays after clicking something random but not on intended triggers

**Prevention:**
1. Never create AudioContext at page load. Create it inside the first user interaction handler.
2. If context must exist early, always call `audioContext.resume()` inside a click/touch handler.
3. Provide a prominent "Start" or "Enter" button that initializes audio on tap.
4. Check context state before playing:
```javascript
async function ensureAudioContext() {
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
}
```

**Phase Impact:** Phase 1 (Foundation) - Must be architected from day one. Retrofitting user-gesture unlocking is painful.

**Sources:**
- [MDN Web Audio API Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)
- [Chrome Autoplay Policy](https://developer.chrome.com/blog/autoplay)

---

### 2. iOS Safari Silent/Ringer Switch Mutes Web Audio

**Problem:** On iOS, when the physical mute switch is on, Web Audio API output is completely muted. Users flip the switch expecting to silence phone calls/notifications, but it also kills your app's audio. This is iOS-specific behavior - Android handles it differently.

**Warning Signs:**
- iPad/iPhone users report "no sound" while desktop users hear audio fine
- Audio stops working for some users intermittently (they toggled their mute switch)
- No errors in console - audio "plays" but produces no output

**Prevention:**
1. Use the "silent audio track" hack: Play a short silent MP3 via `<audio>` element before initializing Web Audio. This switches iOS from "ringer" channel to "media" channel.
2. Use libraries like [unmute-ios-audio](https://github.com/feross/unmute-ios-audio) or [unmute](https://github.com/swevans/unmute) that handle this automatically.
3. Display a clear message to users about the mute switch if audio fails.

**Implementation:**
```javascript
// Play silent audio to unlock media channel on iOS
const silentAudio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0...');
await silentAudio.play();
// Now Web Audio will play even with mute switch on
```

**Phase Impact:** Phase 1 (Foundation) - Must be handled in audio initialization code.

**Sources:**
- [WebKit Bug 237322](https://bugs.webkit.org/show_bug.cgi?id=237322)
- [Audjust: Unmute Web Audio on iOS](https://www.audjust.com/blog/unmute-web-audio-on-ios)

---

### 3. AudioBufferSourceNode Memory Leaks

**Problem:** Creating new AudioBufferSourceNodes for each sound effect play without proper cleanup leads to memory growth. After hundreds of sound plays, mobile devices become sluggish or crash. The nodes aren't automatically garbage collected if references are held.

**Warning Signs:**
- Memory usage grows steadily during extended play sessions
- Performance degrades after playing many sound effects (especially on iPad)
- Browser tab crashes after prolonged use
- Phaser/game engine users report "after ~400 sound effects, problems begin"

**Prevention:**
1. Don't store references to AudioBufferSourceNodes after creating them - let them garbage collect.
2. The AudioBuffer itself can be reused; only the source node is one-time-use.
3. For looping background music, keep ONE source node and control it (don't create new ones).
4. Call `disconnect()` on nodes when done, then null references.
5. Use a sound pool pattern: pre-create a limited number of source nodes and recycle them.

**Correct Pattern:**
```javascript
// Store the buffer, not the source
const soundBuffer = await loadAudioBuffer('effect.mp3');

function playEffect() {
  const source = audioContext.createBufferSource();
  source.buffer = soundBuffer;  // Reuse buffer
  source.connect(audioContext.destination);
  source.start(0);
  // Don't store 'source' - let it GC after playback
}
```

**Phase Impact:** Phase 2 (Sound System) - Must be designed correctly in the sound effects architecture.

**Sources:**
- [MDN AudioBufferSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode)
- [Phaser Web Audio Memory Leak Issue](https://github.com/phaserjs/phaser/issues/2280)

---

### 4. iOS Safari Audio Delay and Glitchiness

**Problem:** Audio passed through Web Audio processing on Safari can be delayed and glitchy compared to Chrome. This is a known WebKit bug that's been open for years. Your carefully timed sound effects may feel laggy.

**Warning Signs:**
- Sound effects feel "late" compared to visual triggers on iPad
- Audio stutters or has micro-gaps on iOS Safari
- Same code works perfectly on Chrome/Android

**Prevention:**
1. Keep audio processing graphs simple - avoid unnecessary nodes.
2. Test extensively on actual iOS devices, not just simulators.
3. For critical timing, consider using HTML `<audio>` elements for simple playback instead of full Web Audio processing.
4. Buffer sizes matter - experiment with different latency settings.
5. Consider Howler.js which abstracts some of these issues.

**Phase Impact:** Phase 2 (Sound System) and Phase 4 (Polish) - Initial implementation plus optimization pass.

**Sources:**
- [WebKit Bug 221334: Audio delayed and glitchy on Safari](https://bugs.webkit.org/show_bug.cgi?id=221334)

---

### 5. Multiple Simultaneous Audio Streams Resource Exhaustion

**Problem:** Playing background music + 10 potential sound effects simultaneously can overwhelm mobile browsers. Each audio stream consumes memory and processing. Tablets have limited resources compared to desktops.

**Warning Signs:**
- Audio becomes distorted when multiple sounds play at once
- Device becomes hot during extended use
- Frame rate drops when sounds trigger
- Sounds cut each other off unexpectedly

**Prevention:**
1. Limit concurrent sound effects (e.g., max 4-6 simultaneous).
2. Implement sound priority system - new sounds can preempt lower-priority ones.
3. Use audio sprites: combine all sound effects into one file, play segments.
4. Keep background music on a separate, lower-priority audio path.
5. Use gain nodes to duck background music when effects play.

**Sound Sprite Pattern:**
```javascript
const sprite = {
  explosion: [0, 1500],      // start ms, duration ms
  click: [1500, 200],
  victory: [1700, 3000]
};
```

**Phase Impact:** Phase 2 (Sound System) - Architecture decision about sound management.

**Sources:**
- [MDN Web Audio API Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)

---

## Medium Priority Pitfalls

These cause degraded UX or maintenance headaches but won't break core functionality.

---

### 6. Safari 7-Day Storage Eviction for Web Data

**Problem:** Safari automatically deletes IndexedDB, localStorage, and Cache API data after 7 days of no user interaction with the site. Your saved user preferences, cached audio files, and settings vanish.

**Warning Signs:**
- Users report "settings reset" after not using the app for a week
- Cached audio needs to re-download periodically
- Only affects Safari/iOS users

**Prevention:**
1. For a game night app used regularly, this may be acceptable - users likely return within 7 days.
2. Request persistent storage: `navigator.storage.persist()` - Safari may grant it based on engagement heuristics.
3. If users add to home screen (PWA), the 7-day limit doesn't apply.
4. Server-side storage with user accounts for critical data.
5. Don't cache large audio files in IndexedDB on Safari - stream them instead.

**Phase Impact:** Phase 3 (Features) - Consider when implementing settings persistence.

**Sources:**
- [WebKit Storage Policy Updates](https://webkit.org/blog/14403/updates-to-storage-policy/)
- [MDN Storage Quotas](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)

---

### 7. CSS Animations + Audio Sync Drift

**Problem:** CSS animations run on the compositor thread while JavaScript/Web Audio runs on the main thread. Over time, a "rolling dice" animation may drift out of sync with its sound effect, especially if the main thread is busy.

**Warning Signs:**
- Sound and visual start together but end at different times
- Animations "jank" when sounds trigger
- Sync issues worse on slower devices

**Prevention:**
1. Keep animations short (under 2 seconds) where sync matters.
2. Use `requestAnimationFrame` for JavaScript-controlled animations that need audio sync.
3. For critical sync, use the Web Audio API's precise timing (`audioContext.currentTime`) to trigger visual changes.
4. Use CSS `transform` and `opacity` for animations - they're GPU-accelerated and don't block the main thread.
5. Don't sync looping animations to looping audio - drift is inevitable.

**Recommended Approach:**
```javascript
// Trigger animation at exact audio time
source.start(audioContext.currentTime + 0.1);
setTimeout(() => element.classList.add('animate'), 100);
```

**Phase Impact:** Phase 2 (Timer/Dice Visuals) and Phase 4 (Polish) - Initial implementation plus refinement.

**Sources:**
- [Motion.dev Web Animation Performance Tier List](https://motion.dev/blog/web-animation-performance-tier-list)
- [Hans Garon: Animation Sync with Audio](https://hansgaron.com/articles/web_audio/animation_sync_with_audio/part_one/)

---

### 8. Background Tab/App Suspension on Mobile

**Problem:** When users switch apps or tabs on iPad, Safari suspends background audio playback. Your background music stops when they check a text message.

**Warning Signs:**
- Audio stops when user switches to another app briefly
- Audio doesn't resume automatically when returning
- Works fine in Vivaldi browser (which added background audio in 2025) but not Safari

**Prevention:**
1. Accept this as a platform limitation for Safari - it's by design.
2. Detect visibility changes and gracefully resume audio:
```javascript
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    audioContext.resume();
    // Optionally restart background music
  }
});
```
3. Save playback position before suspension, restore on return.
4. If PWA added to home screen, behavior may differ slightly (still suspends but better resume).

**Phase Impact:** Phase 2 (Background Music) - Must handle visibility change events.

**Sources:**
- [WebKit Bug 198277: Audio stops in background](https://bugs.webkit.org/show_bug.cgi?id=198277)
- [Vivaldi iOS Background Audio (May 2025)](https://www.macrumors.com/2025/05/22/vivaldi-ios-background-audio-playback/)

---

### 9. localStorage Size Limits (5MB)

**Problem:** localStorage is limited to ~5MB per origin and is synchronous (blocks main thread). Storing audio files or large settings objects causes performance issues or quota exceeded errors.

**Warning Signs:**
- `QuotaExceededError` exceptions
- App becomes sluggish when saving/loading preferences
- Works on desktop, fails on mobile (lower limits)

**Prevention:**
1. Never store audio files in localStorage - use IndexedDB or Cache API.
2. Keep localStorage for small settings only (theme preference, volume level, last-used timer values).
3. Always wrap localStorage writes in try/catch:
```javascript
try {
  localStorage.setItem('settings', JSON.stringify(settings));
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    // Handle gracefully
  }
}
```
4. For this app's scope, localStorage is fine for settings - audio should be fetched/cached differently.

**Phase Impact:** Phase 3 (Settings Persistence) - Minor concern given app scope.

**Sources:**
- [web.dev: Storage for the Web](https://web.dev/articles/storage-for-the-web)
- [RxDB: localStorage in Modern Applications](https://rxdb.info/articles/localstorage.html)

---

### 10. Audio Format Compatibility Across Browsers

**Problem:** Not all browsers support all audio formats. WebM/Opus is efficient but not universal. MP3 is universal but larger. Using only one format means some users get no audio.

**Warning Signs:**
- Audio works in Chrome but not Safari
- No error, just silence in certain browsers

**Prevention:**
1. Provide multiple formats with fallbacks:
   - WebM/Opus (best compression, Chrome/Firefox/Edge)
   - MP3 (universal fallback, slightly larger)
   - AAC/M4A (good for Safari)
2. Use Howler.js which handles format selection automatically.
3. Order formats by preference (most efficient first):
```javascript
const sound = new Howl({
  src: ['sound.webm', 'sound.mp3']
});
```

**Phase Impact:** Phase 2 (Asset Preparation) - Encode audio in multiple formats.

**Sources:**
- [Howler.js Documentation](https://howlerjs.com/)
- [MDN: Media type and format guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats)

---

## Low Priority Pitfalls

Nice to avoid but not critical for this project scope.

---

### 11. Touch Event vs Click Event Timing on Mobile

**Problem:** Using only `click` events can introduce 300ms delay on mobile. Using only `touchstart` can fire accidentally during scroll. Sound effects may feel unresponsive.

**Warning Signs:**
- Noticeable delay between tap and sound on tablet
- Sounds trigger when user is trying to scroll

**Prevention:**
1. Use `touchend` for sound triggers, not `touchstart`.
2. Consider using a library like FastClick (though less needed in modern browsers).
3. Use CSS `touch-action: manipulation` to remove 300ms delay.
4. For buttons, modern browsers have eliminated the delay - test your actual target devices.

**Phase Impact:** Phase 2 (Sound Buttons) - Minor UX refinement.

---

### 12. AudioParam Value vs Method Conflicts

**Problem:** Mixing direct `gainNode.gain.value = 0.5` with scheduled methods like `setValueAtTime()` causes unexpected behavior. The scheduled methods take precedence.

**Warning Signs:**
- Volume changes don't apply
- Fades don't work as expected
- Inconsistent behavior between browsers

**Prevention:**
1. Pick one approach per audio parameter and stick with it.
2. For simple volume control (user slider), use direct `value` property.
3. For programmatic fades/transitions, use only `AudioParam` methods.

**Phase Impact:** Phase 2 (Volume Controls) - Code consistency issue.

**Sources:**
- [MDN Web Audio API Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)

---

### 13. Heavy CSS Effects Impacting Audio Thread

**Problem:** Complex CSS effects (blur, drop-shadow on many elements) can strain the GPU and indirectly affect audio smoothness through shared system resources.

**Warning Signs:**
- Audio glitches coincide with visual updates
- Performance issues on older iPads
- Smooth on powerful devices, choppy on mid-range tablets

**Prevention:**
1. Use `will-change` sparingly on animated elements only.
2. Avoid animating blur or drop-shadow.
3. Keep steampunk/industrial bevels as static backgrounds, not animated.
4. Test on mid-range tablets, not just latest iPad Pro.

**Phase Impact:** Phase 4 (Visual Polish) - Performance optimization.

---

## Phase Impact Summary

| Phase | Pitfalls to Address |
|-------|---------------------|
| **Phase 1: Foundation** | #1 Autoplay Policy, #2 iOS Mute Switch |
| **Phase 2: Sound System** | #3 Memory Leaks, #4 iOS Delay, #5 Concurrent Streams, #7 Animation Sync, #8 Background Suspension, #10 Audio Formats |
| **Phase 3: Features** | #6 Safari Storage, #9 localStorage Limits |
| **Phase 4: Polish** | #4 iOS Delay (optimization), #7 Animation Sync (refinement), #11 Touch Events, #12 AudioParam, #13 CSS Performance |

---

## Recommended Libraries

Based on research, these libraries help avoid multiple pitfalls:

1. **[Howler.js](https://howlerjs.com/)** - Handles autoplay unlocking, format fallbacks, audio sprites, cross-browser issues. ~7KB gzipped.

2. **[unmute-ios-audio](https://github.com/feross/unmute-ios-audio)** - Specifically solves iOS mute switch issue.

3. **[standardized-audio-context](https://github.com/chrisguttandin/standardized-audio-context)** - Polyfill for Web Audio API inconsistencies.

---

## Pre-Implementation Checklist

Before writing any audio code, ensure:

- [ ] "Start/Enter" screen designed for user gesture initialization
- [ ] Audio format strategy decided (WebM + MP3 fallback recommended)
- [ ] Sound effect count determined (limit concurrent plays)
- [ ] iOS device available for testing (simulator is insufficient)
- [ ] Memory monitoring plan for extended play sessions
- [ ] Visibility change handler architecture planned
