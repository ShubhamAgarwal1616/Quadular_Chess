export class SoundController {
    static playMoveSound() {
        const audio = new Audio('/audio/move.wav');
        const context = new AudioContext();
        const source = context.createMediaElementSource(audio);
        source.connect(context.destination);
        audio.play()
    }

    static playCaptureSound() {
        const audio = new Audio('/audio/capture.wav');
        const context = new AudioContext();
        const source = context.createMediaElementSource(audio);
        source.connect(context.destination);
        audio.play()
    }

    static playSetUpSound() {
        const audio = new Audio('/audio/board-start.mp3');
        const context = new AudioContext();
        const source = context.createMediaElementSource(audio);
        source.connect(context.destination);
        audio.play()
    }

    static playTimerExpireSound() {
        const audio = new Audio('/audio/timeExpire.wav');
        const context = new AudioContext();
        const source = context.createMediaElementSource(audio);
        source.connect(context.destination);
        audio.play()
    }

    static playWinningSound() {
        const audio = new Audio('/audio/win.wav');
        const context = new AudioContext();
        const source = context.createMediaElementSource(audio);
        source.connect(context.destination);
        audio.play()
    }
}