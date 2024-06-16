<script>
    export let play = false, soundType = "bubble"

    let audioElement;

    function playSound() {
        audioElement && audioElement.play();
    }

    const handleAudioEndEvent = () => {
        play = false
    };

    $: if (play) playSound()
</script>

<audio
    bind:this={audioElement}
    src={`/sounds/${soundType}.mp3`}
    preload="auto"
    on:ended={handleAudioEndEvent}
/>
