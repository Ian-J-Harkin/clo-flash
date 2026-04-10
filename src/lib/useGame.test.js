import { describe, it, expect, beforeEach, vi } from 'vitest';
import { game } from './useGame.svelte.js';

describe('GameEngine Logic', () => {
    beforeEach(() => {
        game.reset();
        vi.useFakeTimers();
    });

    it('should initialize in LOADING and transition to ONBOARDING', () => {
        // We can't easily test the constructor since game is a singleton
        // but we can test the reset and manual state change
        game.goToScreen('LOADING');
        expect(game.currentScreen).toBe('LOADING');
        
        game.startLoadingTimer();
        
        // Advance timers
        vi.advanceTimersByTime(2500);
        expect(game.currentScreen).toBe('ONBOARDING');
    });

    it('should transition to GAME when startGame is called', () => {
        game.startGame();
        expect(game.currentScreen).toBe('GAME');
    });

    it('should advance from Gate 1 to Gate 2', () => {
        game.startGame();
        for (let i = 0; i < 5; i++) {
            game.checkAnswer(game.currentWord.missing);
        }
        expect(game.currentGate).toBe(2);
        expect(game.currentIndex).toBe(0);
    });

    it('should transition to WON screen after finishing Gate 2', () => {
        game.startGame();
        game.currentGate = 2;
        game.currentIndex = 4;
        game.checkAnswer(game.currentWord.missing);
        
        expect(game.currentScreen).toBe('WON');
        expect(game.isGameWon).toBe(true);
    });

    it('should transition to GAMEOVER screen after losing 3 lives', () => {
        game.startGame();
        const wrong = game.currentWord.options.find(o => o !== game.currentWord.missing);
        
        game.checkAnswer(wrong);
        game.checkAnswer(wrong);
        game.checkAnswer(wrong);
        
        expect(game.currentScreen).toBe('GAMEOVER');
        expect(game.lives).toBe(0);
    });

    it('should handle Evil Mode transitions correctly', () => {
        game.startEvilMode();
        expect(game.currentScreen).toBe('BOSS_PREP');
        
        game.launchEvilGauntlet();
        expect(game.currentScreen).toBe('GAME');
        expect(game.isEvilMode).toBe(true);
    });

    it('should complete Evil Mode after 20 correct answers', () => {
        game.startEvilMode();
        game.launchEvilGauntlet();

        for (let i = 0; i < 20; i++) {
            game.checkAnswer(game.currentWord.missing);
        }

        expect(game.currentScreen).toBe('WON');
        expect(game.isGameWon).toBe(true);
    });
});
