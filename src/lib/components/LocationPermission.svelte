<script>
  import { LAT_LONG_CONTEXT } from "@/utils/constants";
  import { createEventDispatcher, getContext } from "svelte";
  import { scale } from "svelte/transition";

  const ctx = getContext(LAT_LONG_CONTEXT);
  const showLocationAccessModal = ctx.showLocationAccessModal;

  const dispatch = createEventDispatcher();
  const dispatchRequestLocationPermissionClick = () => {
    dispatch("requestLocationAccess");
  };
</script>

{#if $showLocationAccessModal}
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4 sm:p-6 md:p-8 z-50"
    in:scale={{ duration: 300 }}
    out:scale={{ duration: 300 }}
  >
    <div
      class="bg-gray-800 p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-full max-w-4xl"
    >
      <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-emerald-400">
        Location Permission Required
      </h2>
      <p class="text-white mb-4 text-sm sm:text-base">
        GeoWhisper is a location-based messaging app that allows you to discover
        and connect with the thoughts and stories shared by people in your
        vicinity.
      </p>
      <p class="text-white mb-6 text-sm sm:text-base">
        To provide you with a truly immersive and localized experience,
        GeoWhisper needs access to your device's location. Here's why:
      </p>
      <ul class="text-left text-white mb-6 space-y-4 text-sm sm:text-base">
        <li>
          <div class="flex items-start mb-3">
            <div
              class="bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0"
            >
              <svg
                class="w-4 h-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span class="font-semibold text-emerald-400"
              >Discover Nearby Messages:</span
            >
          </div>
          <p class="text-xs md:text-base">
            With location access, GeoWhisper can show you messages that have
            been posted by others within a certain radius of your current
            location. This allows you to explore the thoughts and experiences of
            people in your surroundings.
          </p>
        </li>
        <li>
          <div class="flex items-start mb-3">
            <div
              class="bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0"
            >
              <svg
                class="w-4 h-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span class="font-semibold text-emerald-400"
              >Post Location-Based Messages:</span
            >
          </div>
          <p class="text-xs md:text-base">
            When you post a message on GeoWhisper, your location is associated
            with the message. This enables others in the same area to discover
            and engage with your content.
          </p>
        </li>
        <li>
          <div class="flex items-start mb-3">
            <div
              class="bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0"
            >
              <svg
                class="w-4 h-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span class="font-semibold text-emerald-400"
              >Localized User Experience:</span
            >
          </div>
          <p class="text-xs md:text-base">
            By accessing your location, GeoWhisper can provide you with a
            personalized and relevant user experience tailored to your specific
            geographic context.
          </p>
        </li>
      </ul>
      <p class="text-white mb-8 text-sm sm:text-base">
        Rest assured, your location data is solely used to enhance your
        GeoWhisper experience and is not shared with any third parties.
      </p>
      <button
        class="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-300 ease-in-out"
        on:click={dispatchRequestLocationPermissionClick}
      >
        Allow Location Access
      </button>

      <button
        on:click={() => showLocationAccessModal.set(false)}
        class="bg-white text-gray-900 hover:bg-gray-200 font-bold py-2 px-6 md:py-3 md:px-8 rounded-lg ml-2"
      >
        Cancel
      </button>
    </div>
  </div>
{/if}
