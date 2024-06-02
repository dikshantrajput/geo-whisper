<script>
  import ShowMoreLess from "./showMoreLess.svelte";

  export let messages = [],
    isFetched = false;
</script>

{#if isFetched}
  <div class="bg-gray-900 rounded-xl p-4 sm:p-8">
    <h2 class="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6">Nearby Messages</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {#each messages as message}
        <div class="bg-gray-800 rounded-lg shadow-md">
          <div class="p-4">
            <p class="text-white">
              <ShowMoreLess content={message.message} maxCharacters="100" />
            </p>
          </div>

          <div class="flex justify-between items-center p-4">
            <span class="text-gray-400 text-xs md:text-sm">
              <svg
                class="w-3 h-3 md:w-4 md:h-4 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
              </svg>
              {message.distance} m
            </span>
            <span class="text-gray-400 text-xs md:text-sm">
              <svg
                class="w-3 h-3 md:w-4 md:h-4 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
              {message.created_at}
            </span>
          </div>
        </div>
      {:else}
        <p class="text-white text-center">No messages nearby you. Post one at this location.</p>
      {/each}
    </div>
  </div>
{/if}
