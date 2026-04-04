<script>
    import { fade } from 'svelte/transition';
    let { currentWord, isHintVisible, onAnswer, gameSpeed = 0, isEvilTitle = false, evilCount = 0 } = $props();

    const parts = $derived.by(() => {
        const word = currentWord.word;
        const missingChar = currentWord.missing;
        const idx = word.indexOf(missingChar);
        if (idx === -1) return { before: word, after: "" };
        return {
            before: word.substring(0, idx),
            after: word.substring(idx + 1)
        };
    });

    const bionic = (text) => {
        if (!text) return { bold: "", rest: "" };
        const mid = Math.ceil(text.length / 2);
        const fix = Math.min(mid, 3);
        return {
            bold: text.substring(0, fix),
            rest: text.substring(fix)
        };
    };

    const isFHint = $derived(isHintVisible && currentWord.missing === 'f');
    const isSHint = $derived(isHintVisible && currentWord.missing === 's');
    const ghostLetter = $derived(isHintVisible ? currentWord.missing : "");

    const shapeTip = $derived.by(() => {
        if (!isHintVisible) return "";
        if (currentWord.missing === 'f') return "Look for the bar!";
        if (currentWord.missing === 's') return "Smooth curve!";
        return "Try again!";
    });
</script>

<div class="flashcard {isHintVisible ? 'shake' : ''}" id="flashcard-poc">
    {#if gameSpeed > 0}
        <div class="speed-bar" style="animation-duration: {gameSpeed}ms"></div>
    {/if}
    
    {#if isEvilTitle}
        <div class="evil-tag">ROUND {evilCount + 1}/20</div>
    {/if}

    <div class="word-display">
        <span class="segment">
            <span class="fixation">{bionic(parts.before).bold}</span><span>{bionic(parts.before).rest}</span>
        </span>
        <span class="missing-slot {isHintVisible ? 'highlight' : ''}">
            <span class="q-mark">{!isHintVisible ? '?' : ''}</span>
            {#if isHintVisible}
                <span class="ghost-character" transition:fade>{ghostLetter}</span>
            {/if}
            {#if isFHint || (!isHintVisible && currentWord.missing === 'f')}
                <div class="hint-bar {!isHintVisible ? 'anchor-pulse' : ''}"></div>
            {/if}
            {#if isSHint || (!isHintVisible && currentWord.missing === 's')}
                <div class="hint-curve {!isHintVisible ? 'anchor-pulse' : ''}"></div>
            {/if}
        </span>
        <span class="segment">
            <span class="fixation">{bionic(parts.after).bold}</span><span>{bionic(parts.after).rest}</span>
        </span>
    </div>

    {#if isHintVisible}
        <div class="shape-clue" transition:fade>
            {shapeTip}
        </div>
    {/if}
    
    <div class="translation">{currentWord.translation}</div>
</div>

<style>
    .flashcard {
        background: #FFFDD0;
        padding: 1rem 1.5rem;
        border-radius: 1.5rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        text-align: center;
        width: 100%;
        max-width: 400px;
        margin: 0.5rem auto;
        font-family: 'Bunchlo GC', serif;
        border: 3px solid #e0d9b0;
        transition: transform 0.3s ease;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
    }

    .speed-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 6px;
        background: #ef4444;
        width: 100%;
        animation: shrink linear forwards;
    }

    @keyframes shrink {
        from { width: 100%; }
        to { width: 0%; }
    }

    .evil-tag {
        font-family: 'Outfit', sans-serif;
        font-weight: 900;
        font-size: 0.8rem;
        color: #ef4444;
        letter-spacing: 0.1rem;
        margin-bottom: 0.2rem;
    }

    .word-display {
        font-size: clamp(3rem, 12vw, 5rem);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.5rem;
        line-height: 1;
    }

    .fixation {
        font-weight: 900;
        opacity: 0.9;
    }

    .missing-slot {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-bottom: 3px solid #b5af8c;
        min-width: 3rem;
        position: relative;
        color: #1a1a1a22;
        margin: 0 0.2rem;
        height: 1.2em;
    }

    .ghost-character {
        position: absolute;
        color: #f9731633;
        z-index: 1;
    }

    .missing-slot.highlight {
        border-bottom-color: #f97316;
        color: #f97316;
    }

    .hint-bar {
        position: absolute;
        width: 1rem;
        height: 0.25rem;
        background: #f97316;
        top: 50%;
        left: -0.1rem;
        z-index: 5;
    }

    .hint-curve {
        position: absolute;
        width: 1.5rem;
        height: 1rem;
        border: 3px solid #f97316;
        border-top: 0;
        border-radius: 0 0 1.5rem 1.5rem;
        bottom: 0.1rem;
        z-index: 5;
    }

    .shape-clue {
        font-family: 'Outfit', sans-serif;
        color: #f97316;
        font-weight: 700;
        font-size: 0.9rem;
        margin-top: 0.2rem;
    }

    .translation {
        font-family: 'Outfit', sans-serif;
        font-style: italic;
        color: #888;
        font-size: 0.85rem;
        margin-top: 0.2rem;
    }

    .shake {
        animation: shake 0.5s both;
    }

    @keyframes shake {
        10%, 90% { transform: translate3d(-1px, 0, 0); }
        20%, 80% { transform: translate3d(2px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
        40%, 60% { transform: translate3d(4px, 0, 0); }
    }

    .anchor-pulse {
        opacity: 0.1 !important;
        background: #000 !important;
        animation: anchor-fade 4s infinite;
    }

    @keyframes anchor-fade {
        0%, 100% { opacity: 0.05; }
        50% { opacity: 0.25; }
    }
</style>
