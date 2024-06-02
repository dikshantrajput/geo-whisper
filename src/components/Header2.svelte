<script>
  import { slide } from "svelte/transition";

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<header class="bg-gray-900 text-white py-4">
  <nav class="container mx-auto flex justify-between items-center">
    <div class="flex items-center">
      <a href="/" class="text-2xl font-bold text-emerald-400">GeoWhisper</a>
    </div>
    <div class="lg:hidden">
      <button
        class="text-gray-300 hover:text-emerald-400 focus:outline-none"
        on:click={toggleMenu}
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
    </div>
    <ul class="hidden lg:flex space-x-4">
      <li>
        <a href="/app" class="text-gray-300 hover:text-emerald-400"
          >Whisper Something</a
        >
      </li>
      <li>
        <a href="/app" class="text-gray-300 hover:text-emerald-400"
          >Explore Nearby</a
        >
      </li>
    </ul>
  </nav>
  {#if isMenuOpen}
    <div class="p-5">
      <ul class="space-y-4 px-4" in:slide out:slide>
        <li>
          <a href="/app" class="block text-gray-300 hover:text-emerald-400"
            >Whisper Something</a
          >
        </li>
        <li>
          <a href="/app" class="block text-gray-300 hover:text-emerald-400"
            >Explore Nearby</a
          >
        </li>
      </ul>
    </div>
  {/if}
</header>
