"use client";

interface SoundOptions {
    startFrequency?: number;
    endFrequency?: number;
    noteCount?: number;
    noteDuration?: number;
    type?: OscillatorType;
    volume?: number;
}

export function useSound() {
    const playArpeggio = async (options: SoundOptions = {}) => {
        const {
            startFrequency = 200,
            endFrequency = 800,
            noteCount = 3,
            noteDuration = 30,
            type = "sine",
            volume = 0.05,
        } = options;

        // Only run on client side
        if (typeof window === "undefined") return;

        const audioContext = new (window.AudioContext ||
            (window as any).webkitAudioContext)();

        // Calculate frequencies for each note in the arpeggio
        const frequencies = Array.from({ length: noteCount }, (_, i) => {
            const t = i / (noteCount - 1);
            return startFrequency + (endFrequency - startFrequency) * t;
        });

        // Play each note with a slight delay
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.type = type;
                oscillator.frequency.setValueAtTime(
                    freq,
                    audioContext.currentTime
                );

                gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(
                    0.01,
                    audioContext.currentTime + noteDuration / 1000
                );

                oscillator.start();
                oscillator.stop(audioContext.currentTime + noteDuration / 1000);
            }, index * (noteDuration * 0.8)); // Overlap notes slightly for smoother effect
        });
    };

    return { playArpeggio };
}
