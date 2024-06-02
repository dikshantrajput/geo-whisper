<script>
  import { LAT_LONG_CONTEXT } from "@/utils/constants";
  import { getContext } from "svelte";
  import { scale } from "svelte/transition";

  const ctx = getContext(LAT_LONG_CONTEXT);
  const showEducationalModal = ctx.showEducationalModal;

  let onClose = () => {
    showEducationalModal.set(false);
  };
</script>

{#if $showEducationalModal}
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50"
    in:scale={{ duration: 300 }}
    out:scale={{ duration: 300 }}
  >
    <div
      class="bg-teal-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-8"
    >
      <h2 class="text-2xl font-bold mb-4 text-emerald-400">
        Location Access Required
      </h2>
      <p class="text-white mb-4">
        To fully experience GeoWhisper and discover the whispers around you, we
        need access to your location.
      </p>
      <p class="text-white mb-6">
        Please follow the instructions below to enable location access:
      </p>
      <ol class="list-decimal list-inside space-y-2 text-white">
        <li>Open your browser settings</li>
        <li>Navigate to the privacy or security section</li>
        <li>Find the location settings</li>
        <li>Allow location access for this website</li>
      </ol>
      <div class="mt-8 flex justify-end">
        <button
          on:click={onClose}
          class="bg-emerald-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-emerald-600 transition-colors duration-300"
        >
          Got it
        </button>
      </div>
    </div>
  </div>
{/if}
