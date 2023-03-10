export class Timer {
    timerInSeconds: number = 0;

    constructor(seconds: number) {
        this.timerInSeconds = seconds;
    }

    decrementTime() {
        this.timerInSeconds--;
    }
}