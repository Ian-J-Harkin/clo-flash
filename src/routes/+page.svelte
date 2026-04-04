<script>
    import { game } from '$lib/useGame.svelte.js';
    import Flashcard from '$lib/Flashcard.svelte';
    import { fade } from 'svelte/transition';

    function handleAnswer(choice) {
        game.checkAnswer(choice);
    }

    function handleReset() {
        game.reset();
    }
</script>

<svelte:head>
    <title>Cló-Flash: Irish Orthography Lab</title>
    <meta name="description" content="Master the traditional Irish script (Cló Gaelach) through visual discrimination.">
    <meta property="og:title" content="Cló-Flash: Irish Orthography Lab">
    <meta property="og:description" content="Interactive visual discrimination training for traditional Irish typography.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://github.com/Ian-J-Harkin/clo-flash">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Cló-Flash: Irish Orthography Lab">
    <meta name="twitter:description" content="Master the 'Evil Twins' of Cló Gaelach.">
</svelte:head>

<main class="game-container">
    {#if !game.isGameStarted}
        <div class="welcome-screen card" transition:fade>
            <div class="cló-header">Cló-Flash</div>
            <h2 class="sub-title">Irish Orthography Lab</h2>
            
            <section class="intro-text">
                <p>Master the <strong>Traditional Irish Script</strong> through visual discrimination.</p>
                
                <div class="lookalike-demo">
                    <div class="demo-box f">
                        <span class="cló">f</span>
                        <p><strong>f</strong> = bar</p>
                    </div>
                    <div class="demo-box s">
                        <span class="cló">s</span>
                        <p><strong>s</strong> = curve</p>
                    </div>
                </div>

                <div class="training-tiers">
                    <p>• <strong>Gate 1</strong>: Intro | <strong>Gate 2</strong>: Discrimination | <strong>Evil</strong>: Fluency</p>
                </div>
            </section>

            <button class="start-btn" onclick={() => game.startGame()}>Start Your Training</button>
        </div>
    {:else}
        <header class="game-header" transition:fade>
            <div class="stats">
                <span class="stat">GATE: {game.currentGate === 2 ? (game.isEvilMode ? 'BOSS' : '2') : '1'}</span>
                <span class="stat">SCORE: {game.score}</span>
                <span class="stat">LIVES: 
                    {#each Array(game.lives) as _, i}
                        <span class="heart" transition:fade>❤️</span>
                    {/each}
                </span>
            </div>
            
            <div class="progress-bar">
                <div 
                    class="progress-fill {game.isEvilMode ? 'evil' : ''}" 
                    style="width: {game.isEvilMode ? (game.evilCount / 20) * 100 : (game.currentIndex / 5) * 100}%"
                ></div>
            </div>
        </header>

        {#if game.isGameWon}
            <div class="game-won card" transition:fade>
                <h2>Comhghairdeachas!</h2>
                <div class="final-score">Final Score: {game.score}</div>
                
                <div class="boss-mode-offer">
                    <h3>Proceed to Boss Level?</h3>
                    <p>20 rapid-fire cards with increasing speed.</p>
                    <button class="boss-btn" onclick={() => game.startEvilMode()}>Enter Evil Twins Mode</button>
                </div>

                <button class="reset-btn secondary" onclick={handleReset}>Finish & Reset</button>
            </div>
        {:else if game.isPreparingEvilMode}
            <div class="get-ready card" transition:fade>
                <div class="evil-tag large">BOSS LEVEL</div>
                <h2>Evil Twins Gauntlet</h2>
                <div class="rules">
                    <p>• <strong>20 Cards</strong> in a row.</p>
                    <p>• <strong>Timer Pressure</strong>: Speed ramps up.</p>
                    <p>• <strong>Goal</strong>: Identifiy instant recognition.</p>
                </div>
                <button class="boss-btn" onclick={() => game.launchEvilGauntlet()}>LÁNSEOL!</button>
            </div>
        {:else if !game.isGameOver}
            <div class="stage" transition:fade>
                {#key (game.currentWord?.word || '') + game.evilCount}
                    <Flashcard 
                        currentWord={game.currentWord} 
                        isHintVisible={game.isHintVisible} 
                        gameSpeed={game.isEvilMode ? game.speed : 0}
                        isEvilTitle={game.isEvilMode}
                        evilCount={game.evilCount}
                        onAnswer={handleAnswer} 
                    />
                {/key}
            </div>
            
            <div class="choice-container" transition:fade>
                {#each game.shuffledOptions as option}
                    <button class="option-btn" onclick={() => handleAnswer(option)}>{option}</button>
                {/each}
            </div>
        {:else}
            <div class="game-over card" transition:fade>
                <h2>Game Over!</h2>
                <p>Final score: {game.score}</p>
                <button class="reset-btn" onclick={handleReset}>Try Again</button>
            </div>
        {/if}
    {/if}
</main>

<style>
    .game-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-height: 100vh;
        background-color: #FFFDD0;
        padding: 0.5rem;
        gap: 0.5rem;
        box-sizing: border-box;
        justify-content: center;
    }

    .cló-header {
        font-family: 'Bunchlo GC', serif;
        font-size: clamp(2rem, 8vw, 3.5rem);
        color: #1a1a1a;
        margin-bottom: 0px;
    }

    .sub-title {
        font-size: 1.2rem !important;
        margin-top: 0 !important;
        opacity: 0.7;
    }

    .intro-text {
        text-align: left;
        margin: 0.5rem 0;
        font-family: 'Outfit', sans-serif;
        font-size: 0.95rem;
        line-height: 1.4;
    }

    .lookalike-demo {
        display: flex;
        justify-content: center;
        margin: 0.8rem 0;
        gap: 0.8rem;
    }

    .demo-box {
        background: #1a1a1a08;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid #1a1a1a1a;
        text-align: center;
        flex: 1;
    }

    .demo-box .cló {
        font-family: 'Bunchlo GC', serif;
        font-size: 3rem;
        display: block;
        color: #1a1a1a;
        line-height: 1;
    }

    .demo-box p {
        font-size: 0.85rem;
        margin: 0.2rem 0;
    }

    .training-tiers {
        background: #1a1a1a08;
        padding: 0.8rem;
        border-radius: 0.5rem;
        font-size: 0.85rem;
        text-align: center;
    }

    .start-btn {
        background: #1a1a1a;
        color: #FFFDD0;
        padding: 0.8rem 2.5rem;
        border-radius: 1rem;
        font-family: 'Outfit', sans-serif;
        font-weight: 700;
        font-size: 1.2rem;
        cursor: pointer;
        border: none;
        margin-top: 1rem;
    }

    .game-header {
        width: 100%;
        max-width: 500px;
    }

    .stats {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-family: 'Outfit', sans-serif;
        font-weight: 700;
        font-size: 1rem;
    }

    .progress-bar {
        height: 8px;
        background: #1a1a1a1a;
        border-radius: 4px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: #1a1a1a;
    }

    .progress-fill.evil {
        background: #ef4444;
    }

    .boss-mode-offer {
        background: #1a1a1a08;
        padding: 1rem;
        border-radius: 1rem;
        margin: 1rem 0;
        border: 2px dashed #1a1a1a44;
    }

    .boss-btn {
        background: #ef4444;
        color: white;
        padding: 0.8rem 2rem;
        border-radius: 1rem;
        font-weight: 700;
        font-size: 1.1rem;
        cursor: pointer;
        border: none;
    }

    .choice-container {
        display: flex;
        gap: 1rem;
    }

    .option-btn {
        width: clamp(5rem, 20vw, 8rem);
        height: clamp(5rem, 20vw, 8rem);
        background: #FFFDD0;
        border: 3px solid #1a1a1a;
        border-bottom: 6px solid #1a1a1a;
        border-radius: 0.8rem;
        font-family: 'Bunchlo GC', serif;
        font-size: clamp(2.5rem, 10vw, 4rem);
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #1a1a1a;
    }

    .option-btn:active {
        transform: translateY(3px);
        border-bottom-width: 3px;
    }

    .card {
        background: #FFF;
        padding: 1rem 1.5rem;
        border-radius: 1.5rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        text-align: center;
        width: 100%;
        max-width: 450px;
        border: 3px solid #1a1a1a;
        box-sizing: border-box;
    }

    .game-over h2, .game-won h2, .get-ready h2, .welcome-screen h2 {
        font-family: 'Bunchlo GC', serif;
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }

    .final-score {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0.5rem 0;
        color: #f97316;
    }

    .reset-btn {
        margin-top: 1rem;
        background: #1a1a1a;
        color: #FFFDD0;
        padding: 0.5rem 2rem;
        border-radius: 0.8rem;
        font-size: 1.1rem;
    }

    .evil-tag.large {
        font-size: 1.2rem;
        color: #ef4444;
        font-weight: 900;
        letter-spacing: 0.1rem;
    }
</style>
