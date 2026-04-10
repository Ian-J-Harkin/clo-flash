<script>
    import { fade, fly } from 'svelte/transition';
    import { game } from './useGame.svelte.js';
    import Flashcard from './Flashcard.svelte';

    let currentSlide = $state(0);
    
    const slides = [
        {
            title: "Traditional Irish Orthography",
            content: "Most modern readers find Traditional Irish Script (*Cló Gaelach*) beautiful but difficult. It's not just the letters; it's how they look like each other.",
            image: "🇮🇪"
        },
        {
            title: "Visual Discrimination",
            content: "The secret is in the fine details. For example, `f` has a crossbar (*Trasnán*), while `s` is open at the bottom. Our lab trains your eye to see these differences instantly.",
            demo: 'discrimination'
        },
        {
            title: "Interactive Demo",
            content: "We'll show you a word with a missing letter in red. Choose the correct character to complete it. If you're wrong, we'll highlight the 'discriminating feature' to help you learn.",
            demo: 'gameplay'
        }
    ];

    function next() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
        } else {
            game.goToScreen('WELCOME');
        }
    }

    // Demo data for the interactive slide
    const demoWord = {
        word: "fear",
        display: " _ear",
        missing: "f",
        options: ["f", "s"]
    };
    let demoHintVisible = $state(false);

    function handleDemoAnswer(choice) {
        if (choice === 'f') {
            demoHintVisible = false;
            next();
        } else {
            demoHintVisible = true;
        }
    }
</script>

<div class="onboarding-overlay" transition:fade>
    <div class="onboarding-card">
        <div class="progress-dots">
            {#each slides as _, i}
                <div class="dot" class:active={i === currentSlide}></div>
            {/each}
        </div>

        {#key currentSlide}
            <div class="slide-content" in:fly={{ x: 20, duration: 400 }} out:fade={{ duration: 200 }}>
                <h2>{slides[currentSlide].title}</h2>
                <p>{@html slides[currentSlide].content}</p>

                {#if slides[currentSlide].demo === 'discrimination'}
                    <div class="lookalike-comparison">
                        <div class="pair">
                            <span class="cló large">f</span>
                            <span class="label">Trasnán (Bar)</span>
                        </div>
                        <div class="vs">vs</div>
                        <div class="pair">
                            <span class="cló large">s</span>
                            <span class="label">Open curve</span>
                        </div>
                    </div>
                {/if}

                {#if slides[currentSlide].demo === 'gameplay'}
                    <div class="demo-stage">
                        <Flashcard 
                            currentWord={demoWord} 
                            isHintVisible={demoHintVisible} 
                            onAnswer={handleDemoAnswer}
                        />
                        <div class="demo-choices">
                            <button class="demo-btn" onclick={() => handleDemoAnswer('f')}>f</button>
                            <button class="demo-btn" onclick={() => handleDemoAnswer('s')}>s</button>
                        </div>
                        {#if demoHintVisible}
                            <p class="hint-text" transition:fade>Try again! Look for the horizontal bar on the <strong>f</strong>.</p>
                        {/if}
                    </div>
                {/if}
            </div>
        {/key}

        <div class="footer">
            {#if currentSlide < slides.length - 1 && slides[currentSlide].demo !== 'gameplay'}
                <button class="next-btn" onclick={next}>Continue</button>
            {:else if slides[currentSlide].demo !== 'gameplay'}
                <button class="next-btn" onclick={() => game.goToScreen('WELCOME')}>Finish Tutorial</button>
            {/if}
        </div>
    </div>
</div>

<style>
    .onboarding-overlay {
        position: fixed;
        inset: 0;
        background: rgba(26, 26, 26, 0.4);
        backdrop-filter: blur(8px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 900;
        padding: 1rem;
    }

    .onboarding-card {
        background: #FFFDD0;
        width: 100%;
        max-width: 500px;
        min-height: 450px;
        border-radius: 2rem;
        padding: 2.5rem;
        border: 4px solid #1a1a1a;
        display: flex;
        flex-direction: column;
        position: relative;
        box-shadow: 0 20px 50px rgba(0,0,0,0.2);
    }

    .progress-dots {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #1a1a1a22;
        transition: all 0.3s ease;
    }

    .dot.active {
        background: #1a1a1a;
        width: 25px;
        border-radius: 5px;
    }

    h2 {
        font-family: 'Bunchlo GC', serif;
        font-size: 2.2rem;
        margin-bottom: 1rem;
        color: #1a1a1a;
    }

    p {
        font-family: 'Outfit', sans-serif;
        font-size: 1.1rem;
        line-height: 1.6;
        color: #1a1a1a;
        margin-bottom: 2rem;
    }

    .lookalike-comparison {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        margin: 1rem 0;
        background: #1a1a1a08;
        padding: 1.5rem;
        border-radius: 1rem;
    }

    .pair {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .cló.large {
        font-family: 'Bunchlo GC', serif;
        font-size: 4rem;
        line-height: 1;
    }

    .vs {
        font-family: 'Outfit', sans-serif;
        font-weight: 800;
        opacity: 0.3;
        font-size: 1.2rem;
    }

    .label {
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 0.5rem;
    }

    .demo-stage {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        transform: scale(0.9);
    }

    .demo-choices {
        display: flex;
        gap: 1rem;
    }

    .demo-btn {
        width: 60px;
        height: 60px;
        background: white;
        border: 2px solid #1a1a1a;
        border-radius: 0.5rem;
        font-family: 'Bunchlo GC', serif;
        font-size: 2rem;
        cursor: pointer;
    }

    .hint-text {
        font-size: 0.9rem;
        color: #ef4444;
        margin-top: 0.5rem;
        text-align: center;
    }

    .footer {
        margin-top: auto;
        display: flex;
        justify-content: flex-end;
    }

    .next-btn {
        background: #1a1a1a;
        color: #FFFDD0;
        padding: 0.8rem 2rem;
        border-radius: 1rem;
        font-weight: 700;
        font-size: 1.1rem;
        cursor: pointer;
        border: none;
    }

    .next-btn:hover {
        background: #333;
    }
</style>
