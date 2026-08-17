class AudioEngine {
  private ctx: AudioContext | null = null;
  private enabled = true;

  setEnabled(val: boolean) {
    this.enabled = val;
  }

  private getCtx() {
    if (!this.enabled) return null;
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playTone(freq: number, type: OscillatorType, duration: number, vol = 0.1) {
    const ctx = this.getCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio play failed", e);
    }
  }

  playCardDeal() { this.playTone(400, 'sine', 0.1, 0.05); }
  playAttack() { this.playTone(150, 'sawtooth', 0.2, 0.1); }
  playHeal() { 
    this.playTone(600, 'sine', 0.3, 0.05); 
    setTimeout(() => this.playTone(800, 'sine', 0.4, 0.05), 100); 
  }
  playEquip() { 
    this.playTone(300, 'square', 0.1, 0.05); 
    setTimeout(() => this.playTone(450, 'square', 0.2, 0.05), 50); 
  }
  playError() { this.playTone(100, 'sawtooth', 0.3, 0.1); }
  playVictory() { 
    [400, 500, 600, 800].forEach((f, i) => setTimeout(() => this.playTone(f, 'sine', 0.4, 0.1), i * 150)); 
  }
  playDefeat() { 
    [300, 250, 200, 150].forEach((f, i) => setTimeout(() => this.playTone(f, 'sawtooth', 0.4, 0.1), i * 200)); 
  }
  playFlee() {
    [600, 500, 400, 300].forEach((f, i) => setTimeout(() => this.playTone(f, 'sine', 0.1, 0.05), i * 50)); 
  }
}

export const audio = new AudioEngine();
