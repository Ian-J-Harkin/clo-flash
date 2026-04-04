import { describe, it, expect, beforeEach } from 'vitest';
import { game } from './useGame.svelte.js';

describe('GameEngine Logic', () => {
    beforeEach(() => {
        game.reset();
    });

    it('should advance from Gate 1 to Gate 2 after 5 correct answers', () => {
        expect(game.currentGate).toBe(1);
        expect(game.currentIndex).toBe(0);

        for (let i = 0; i < 5; i++) {
            const correct = game.currentWord.missing;
            game.checkAnswer(correct);
        }

        expect(game.currentGate).toBe(2);
        expect(game.currentIndex).toBe(0);
    });

    it('should synchronize shuffledOptions correctly during Evil Mode transition', () => {
        // Start game and finish Gate 2
        game.currentGate = 2;
        game.currentIndex = 4; // Last word of gate 2 (fíor)
        game.checkAnswer('f');
        
        expect(game.isGameWon).toBe(true);
        
        // Enter Evil Mode
        game.startEvilMode();
        expect(game.isPreparingEvilMode).toBe(true);
        
        // Launch Gauntlet
        game.launchEvilGauntlet();
        expect(game.isEvilMode).toBe(true);
        
        // Verify that shuffledOptions match the current word's options from the evil pool
        const currentParams = game.currentWord.options;
        expect(currentParams).toContain(game.shuffledOptions[0]);
        expect(currentParams).toContain(game.shuffledOptions[1]);
    });

    it('should complete Evil Mode after 20 correct answers', () => {
        game.startEvilMode();
        game.launchEvilGauntlet();
        expect(game.isEvilMode).toBe(true);
        expect(game.evilCount).toBe(0);

        for (let i = 0; i < 20; i++) {
            game.checkAnswer(game.currentWord.missing);
        }

        expect(game.isEvilMode).toBe(false);
        expect(game.isGameWon).toBe(true);
    });
});
