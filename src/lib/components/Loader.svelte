<script lang="ts">
    export let color = "rgb(52 211 153";
    export let unit = "px";
    export let duration = "2.1s";
    export let size = "100";
    export let pause = false;

    const durationUnitRegex = /[a-zA-Z]/;

    let durationUnit: string = duration.match(durationUnitRegex)?.[0] ?? "s";
    let durationNum: string = duration.replace(durationUnitRegex, "");

    const range = (size: number, startAt = 0) =>
        [...Array(size).keys()].map((i) => i + startAt);
</script>

<div class="min-h-screen bg-gray-900 flex items-center justify-center">
    <div class="wrapper" style="--size: {size}{unit}; --color: {color}">
        {#each range(2, 1) as version}
            <div
                class="circle"
                class:pause-animation={pause}
                style="animation: {duration} {version === 1
                    ? `${(+durationNum - 0.1) / 2}${durationUnit}`
                    : `0s`} infinite ease-in-out"
            />
        {/each}
    </div>
</div>

<style>
    .wrapper {
        position: relative;
        width: var(--size);
        height: var(--size);
    }
    .circle {
        position: absolute;
        width: var(--size);
        height: var(--size);
        background-color: var(--color);
        border-radius: 100%;
        opacity: 0.6;
        top: 0;
        left: 0;
        animation-fill-mode: both;
        animation-name: bounce !important;
    }
    .pause-animation {
        animation-play-state: paused;
    }
    @keyframes bounce {
        0%,
        100% {
            transform: scale(0);
        }
        50% {
            transform: scale(1);
        }
    }
</style>
