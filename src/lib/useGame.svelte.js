import data from './data.json';

class GameEngine {
    currentGate = $state(1);
    score = $state(0);
    lives = $state(3);
    isHintVisible = $state(false);
    isGameWon = $state(false);
    isEvilMode = $state(false);
    isPreparingEvilMode = $state(false);
    currentScreen = $state('LOADING'); // 'LOADING', 'ONBOARDING', 'WELCOME', 'GAME', 'BOSS_PREP', 'WON', 'GAMEOVER'
    currentIndex = $state(0);
    evilCount = $state(0);
    speed = $state(4000); 
    missedMap = $state({}); 
    shuffledOptions = $state([]);
    timerId = null;

    constructor() {
        this.shuffleCurrentOptions();
    }

    startLoadingTimer() {
        if (this.currentScreen === 'LOADING') {
            setTimeout(() => {
                if (this.currentScreen === 'LOADING') {
                    this.currentScreen = 'ONBOARDING';
                }
            }, 2200);
        }
    }

    get currentWord() {
        if (this.isEvilMode) {
            return data.evilTwins[this.currentIndex];
        }
        const gateKey = `gate${this.currentGate}`;
        // @ts-ignore
        return data[gateKey][this.currentIndex];
    }

    get isGameOver() {
        return this.lives <= 0;
    }

    checkAnswer(choice) {
        if (this.isGameOver) return;
        this.clearTimer();

        if (choice === this.currentWord.missing) {
            this.score++;
            this.isHintVisible = false;
            this.playPhonetic(this.currentWord.word);
            
            if (this.isEvilMode) {
                this.evilCount++;
                this.speed = Math.max(800, this.speed - 75); 
                if (this.evilCount >= 20) {
                    this.isGameWon = true;
                    this.isEvilMode = false;
                    this.currentScreen = 'WON';
                } else {
                    this.currentIndex = Math.floor(Math.random() * data.evilTwins.length);
                    this.shuffleCurrentOptions();
                    this.startEvilTimer();
                }
            } else {
                this.advance();
            }
        } else {
            this.lives--;
            this.isHintVisible = true;
            
            if (this.isGameOver) {
                this.currentScreen = 'GAMEOVER';
                this.clearTimer();
            }

            const char = this.currentWord.missing;
            this.missedMap[char] = (this.missedMap[char] || 0) + 1;
            
            if (this.isEvilMode) {
                this.speed += 200; 
                this.startEvilTimer();
            }
        }
    }

    playPhonetic(word) {
        console.log(`[Audio Hook] Playing phonetic for: ${word}`);
    }

    advance() {
        const gateKey = `gate${this.currentGate}`;
        // @ts-ignore
        if (this.currentIndex < data[gateKey].length - 1) {
            this.currentIndex++;
            this.shuffleCurrentOptions();
        } else {
            if (this.currentGate === 1) {
                this.currentGate = 2;
                this.currentIndex = 0;
                this.shuffleCurrentOptions();
            } else {
                this.isGameWon = true;
                this.currentScreen = 'WON';
            }
        }
    }

    reset() {
        this.currentGate = 1;
        this.score = 0;
        this.lives = 3;
        this.isHintVisible = false;
        this.isGameWon = false;
        this.isEvilMode = false;
        this.isPreparingEvilMode = false;
        this.currentScreen = 'WELCOME';
        this.currentIndex = 0;
        this.evilCount = 0;
        this.speed = 4000;
        this.missedMap = {};
        this.shuffleCurrentOptions();
    }

    startEvilMode() {
        this.isPreparingEvilMode = true;
        this.isEvilMode = false;
        this.currentGate = 2; 
        this.currentIndex = Math.floor(Math.random() * data.evilTwins.length);
        this.evilCount = 0;
        this.speed = 4000;
        this.isGameWon = false;
        this.currentScreen = 'BOSS_PREP';
        this.shuffleCurrentOptions();
    }

    launchEvilGauntlet() {
        this.isEvilMode = true;
        this.isPreparingEvilMode = false;
        this.currentScreen = 'GAME';
        this.speed = 4000;
        this.evilCount = 0;
        this.shuffleCurrentOptions();
        this.startEvilTimer();
    }

    shuffleCurrentOptions() {
        // Calculate pool explicitly to match getter
        let wordData;
        if (this.isEvilMode) {
            wordData = data.evilTwins[this.currentIndex];
        } else {
            const gateKey = `gate${this.currentGate}`;
            // @ts-ignore
            wordData = data[gateKey][this.currentIndex];
        }

        if (!wordData) return;

        const options = [...wordData.options];
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        this.shuffledOptions = options;
    }

    startEvilTimer() {
        this.clearTimer();
        if (!this.isEvilMode) return;
        this.timerId = setTimeout(() => {
            this.handleTimeout();
        }, this.speed);
    }

    clearTimer() {
        if (this.timerId) clearTimeout(this.timerId);
    }

    handleTimeout() {
        if (this.isGameOver || !this.isEvilMode) return;
        this.lives--;
        this.isHintVisible = true;
        this.speed += 200;
    }

    startGame() {
        this.currentScreen = 'GAME';
        this.shuffleCurrentOptions();
    }

    goToScreen(screen) {
        this.currentScreen = screen;
    }
}

export const game = new GameEngine();
