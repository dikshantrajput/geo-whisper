<script>
    export let content = "",
    maxCharacters = 500,
    ixExpanded = false;
</script>

{#if content.length < maxCharacters}
    {content}
{:else}
    {! ixExpanded ? content.slice(0,maxCharacters) : content}
    <button on:click={() => ixExpanded = !ixExpanded} class="text-gray-500 text-sm ml-1">
        {!ixExpanded ?"Show more" : "Show less"}
    </button>
{/if}