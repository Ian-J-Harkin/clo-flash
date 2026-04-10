<script>
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { game } from './useGame.svelte.js';

    onMount(() => {
        game.startLoadingTimer();
    });
</script>

<div class="loading-container" out:fade={{ duration: 800 }}>
    <div class="logo-group">
        <h1 class="cló-title">Cló</h1>
        <div class="spinner">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
        <h1 class="flash-title">Flash</h1>
    </div>
    <p class="loading-subtitle">Irish Orthography Lab</p>
</div>

<style>
    .loading-container {
        position: fixed;
        inset: 0;
        background-color: #1a1a1a;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        color: #FFFDD0;
    }

    .logo-group {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .cló-title, .flash-title {
        font-family: 'Bunchlo GC', serif;
        font-size: clamp(3rem, 15vw, 6rem);
        margin: 0;
        letter-spacing: 0.2rem;
    }

    .cló-title {
        animation: slideInLeft 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    }

    .flash-title {
        animation: slideInRight 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    }

    .loading-subtitle {
        font-family: 'Outfit', sans-serif;
        font-size: 1.2rem;
        font-weight: 300;
        letter-spacing: 0.5rem;
        text-transform: uppercase;
        margin-top: 1rem;
        opacity: 0;
        animation: fadeIn 1.5s ease 0.5s forwards;
    }

    .spinner {
        display: flex;
        gap: 0.5rem;
        padding-top: 1rem;
    }

    .dot {
        width: 12px;
        height: 12px;
        background-color: #ef4444;
        border-radius: 50%;
        animation: bounce 0.6s infinite alternate;
    }

    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes bounce {
        to { transform: translateY(-15px); }
    }

    @keyframes slideInLeft {
        from { transform: translateX(-50px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideInRight {
        from { transform: translateX(50px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes fadeIn {
        to { opacity: 0.8; }
    }
</style>
