// Sound engine using Web Audio API — no external files needed.
// All sounds are synthesized procedurally.

let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (muted) return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  // Resume if suspended (browser autoplay policy)
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

interface ToneOpts {
  freq: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
  attack?: number;
  release?: number;
  detune?: number;
}

function playTone({ freq, duration, type = 'sine', volume = 0.15, attack = 0.005, release = 0.05, detune = 0 }: ToneOpts) {
  const ac = getCtx();
  if (!ac) return;

  const now = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + attack);
  gain.gain.linearRampToValueAtTime(volume * 0.7, now + duration - release);
  gain.gain.linearRampToValueAtTime(0, now + duration);

  osc.connect(gain);
  gain.connect(ac.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function playNoise(duration: number, volume = 0.08, filterFreq = 1200) {
  const ac = getCtx();
  if (!ac) return;

  const now = ac.currentTime;
  const bufferSize = Math.floor(ac.sampleRate * duration);
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const noise = ac.createBufferSource();
  noise.buffer = buffer;

  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = filterFreq;

  const gain = ac.createGain();
  gain.gain.setValueAtTime(volume, now);
  gain.gain.linearRampToValueAtTime(0, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);

  noise.start(now);
  noise.stop(now + duration);
}

// --- Sound definitions ---

// 1. Menu/tab transition — soft pop
export function playMenuClick() {
  playTone({ freq: 600, duration: 0.08, type: 'sine', volume: 0.12, attack: 0.002, release: 0.04 });
  playTone({ freq: 900, duration: 0.06, type: 'sine', volume: 0.08, attack: 0.002, release: 0.03 });
}

// 2. Tile slide — short whoosh
export function playSlide() {
  playNoise(0.12, 0.06, 800);
  playTone({ freq: 300, duration: 0.1, type: 'triangle', volume: 0.06, attack: 0.005, release: 0.05 });
}

// 3. Tile merge — pleasant pop with pitch based on value
export function playMerge(value: number) {
  // Map value (2,4,8,...) to a rising pitch scale
  const base = 220;
  const step = Math.log2(value);
  const freq = base * Math.pow(1.12, Math.min(step, 24));
  playTone({ freq, duration: 0.15, type: 'sine', volume: 0.14, attack: 0.003, release: 0.08 });
  playTone({ freq: freq * 1.5, duration: 0.12, type: 'sine', volume: 0.08, attack: 0.003, release: 0.06 });
}

// 4. New animal discovered — cute happy melody
export function playDiscovery() {
  const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    setTimeout(() => {
      playTone({ freq, duration: 0.2, type: 'sine', volume: 0.14, attack: 0.005, release: 0.1 });
      playTone({ freq: freq * 2, duration: 0.15, type: 'sine', volume: 0.05, attack: 0.005, release: 0.08 });
    }, i * 90);
  });
}

// 5. Game over — gentle descending tones
export function playGameOver() {
  const notes = [440, 370, 311];
  notes.forEach((freq, i) => {
    setTimeout(() => {
      playTone({ freq, duration: 0.3, type: 'triangle', volume: 0.12, attack: 0.01, release: 0.15 });
    }, i * 150);
  });
}

// 6. Win — happy ascending arpeggio
export function playWin() {
  const notes = [523, 659, 784, 1047, 1319];
  notes.forEach((freq, i) => {
    setTimeout(() => {
      playTone({ freq, duration: 0.25, type: 'sine', volume: 0.15, attack: 0.005, release: 0.12 });
      playTone({ freq: freq * 2, duration: 0.2, type: 'sine', volume: 0.05, attack: 0.005, release: 0.1 });
    }, i * 80);
  });
}

// 7. Buy/purchase — coin sound
export function playBuy() {
  playTone({ freq: 988, duration: 0.08, type: 'square', volume: 0.1, attack: 0.002, release: 0.04 });
  setTimeout(() => playTone({ freq: 1319, duration: 0.12, type: 'square', volume: 0.1, attack: 0.002, release: 0.06 }), 60);
}

// 8. Daily claim — sparkle
export function playDailyClaim() {
  const notes = [784, 988, 1319];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone({ freq, duration: 0.15, type: 'sine', volume: 0.12, attack: 0.003, release: 0.08 }), i * 70);
  });
}

// 9. Joker use — magic zap
export function playJoker() {
  playTone({ freq: 200, duration: 0.1, type: 'sawtooth', volume: 0.08, attack: 0.002, release: 0.05 });
  setTimeout(() => playTone({ freq: 800, duration: 0.15, type: 'sine', volume: 0.1, attack: 0.003, release: 0.08 }), 40);
  setTimeout(() => playTone({ freq: 1200, duration: 0.12, type: 'sine', volume: 0.06, attack: 0.003, release: 0.06 }), 80);
}

// --- Mute control ---
export function setMuted(m: boolean) {
  muted = m;
}

export function isMuted(): boolean {
  return muted;
}

// Pre-warm the audio context on first user interaction
export function initAudio() {
  getCtx();
}
