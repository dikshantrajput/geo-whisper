<!-- <script>
    import Icon from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";

  let radius = 500;

  const dispatch = createEventDispatcher();
</script>

<div class="bg-gray-800 rounded-lg shadow-md p-8 flex flex-col items-center">
  <h2 class="text-2xl font-bold text-white">Search Radius</h2>
  <div class="w-80 h-48 relative">
    <input
      type="range"
      min="1"
      max="5000"
      bind:value={radius}
      class="absolute inset-0 m-auto w-full h-1 rounded-full bg-gray-600 appearance-none focus:outline-none"
      style="background: linear-gradient(to right, #9f7aea {(radius / 5000) *
        100}%, #4a5568 {(radius / 5000) * 100}%);"
    />
    <div
      class="absolute inset-0 m-auto w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center"
    >
      <span class="text-lg font-bold text-white p-4">{radius}m</span>
    </div>
  </div>
  <button
    class="bg-purple-600 text-white p-3 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center gap-2"
    on:click={() => dispatch("search", radius)}
  >
  <Icon icon="mdi:location" />
  Search Nearby
  </button>
</div> -->
<script>
  import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();

  let radius = 100; // Default radius in meters
  export let loading = false;
  async function handleGetMessages() {
    dispatch("getMessages", {
      radius
    })
  }
</script>

<div
  class="bg-gray-800 p-4 md:p-8 rounded-lg shadow-lg relative overflow-hidden h-full"
>
  <div
    class="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-20 pointer-events-none"
  ></div>
  <div class="relative z-10">
    <h2 class="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-emerald-400">
      Explore Nearby Whispers
    </h2>
    <div class="mb-4 md:mb-8">
      <label for="radius" class="block text-white mb-2">Radius:</label>
      <div class="flex items-center space-x-2 md:space-x-4">
        <input
          type="range"
          id="radius"
          min="10"
          max="2000"
          step="50"
          bind:value={radius}
          class="w-full h-2 bg-gray-50 rounded-lg appearance-none cursor-pointer"
        />
        <p class="text-white text-sm md:text-base w-fit">{radius}m</p>
      </div>
    </div>
    <button
      on:click={handleGetMessages}
        class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold md:py-3 py-2 px-4 md:px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg md:text-lg text-xs"
      disabled={loading}
    >
      {#if loading}
        <span class="flex items-center">
          <svg
            class="animate-spin -ml-1 mr-2 h-4 md:h-5 w-4 md:w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </span>
      {:else}
        Get Nearby Messages
      {/if}
    </button>
  </div>
</div>

