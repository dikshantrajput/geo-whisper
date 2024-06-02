<!-- <script>
  import { enhance } from "$app/forms";
  import { getUserLocation } from "@/utils";
  import { LAT_LONG_CONTEXT } from "@/utils/constants";
  import { getContext } from "svelte";
  import { toast } from "svelte-sonner";

  export let message = "";

  const ctx = getContext(LAT_LONG_CONTEXT);
  const lat = ctx.lat;
  const long = ctx.long;
  const isDenied = ctx.isDenied;
  const showEducationalModal = ctx.showEducationalModal;

  const messageFormSubmitAction = async ({ formData, cancel }) => {
    let toastId;

    if (!$lat || !$long) {
      toastId = toast.loading(
        "Please allow location access to post message...",
      );
      try {
        const loc = await getUserLocation();
        lat.set(loc.latitude);
        long.set(loc.longitude);
      } catch (error) {
        toast.error("Location access denied...");
        cancel();
        showEducationalModal.set(true);
        return;
      }
    } else {
      toastId = toast.loading("Posting your message...");
    }

    toastId = toast.loading("Posting message...");
    formData.append("long", $long);
    formData.append("lat", $lat);
    return async ({ result, update }) => {
      toast.dismiss(toastId);
      if (result.status === 200) {
        toast.success("Message posted on location");
        await update();
        message = undefined;
      } else {
        toast.error("Error adding message on location");
      }
    };
  };
</script>

<div class="bg-gray-900 rounded-xl p-8">
  <h2 class="text-3xl font-bold text-white mb-8">Share Your Thoughts</h2>
  <form
    class="space-y-6"
    method="POST"
    action="?/addMessageOnLocation"
    use:enhance={messageFormSubmitAction}
  >
    <div class="relative">
      <textarea
        id="message"
        name="message"
        rows="5"
        class="w-full rounded-lg border-2 border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300"
        placeholder="Type your message here..."
        required
        bind:value={message}
      ></textarea>
    </div>
    <button
      type="submit"
      class="bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors duration-300"
    >
      <svg
        class="w-5 h-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
          clip-rule="evenodd"
        />
      </svg>
      Post Message
    </button>
  </form>
</div> -->

<script>
  import { enhance } from "$app/forms";
  import { getUserLocation } from "@/utils";
  import { LAT_LONG_CONTEXT } from "@/utils/constants";
  import { getContext, onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import { browser } from "$app/environment";
  import { fade, scale } from "svelte/transition";
  import ClickOutside from "svelte-click-outside"
  export let message = "";

  let loading = false;

  const ctx = getContext(LAT_LONG_CONTEXT);
  const lat = ctx.lat;
  const long = ctx.long;
  const isDenied = ctx.isDenied;
  const showEducationalModal = ctx.showEducationalModal;

  const messageFormSubmitAction = async ({ formData, cancel }) => {
    loading = true;
    let toastId;

    if (!$lat || !$long) {
      toastId = toast.loading(
        "Please allow location access to post message...",
      );
      try {
        const loc = await getUserLocation();
        lat.set(loc.latitude);
        long.set(loc.longitude);
      } catch (error) {
        toast.error("Location access denied...");
        loading = false;
        showEducationalModal.set(true);
        cancel();
        return;
      }
    } else {
      toastId = toast.loading("Posting your message...");
    }

    toastId = toast.loading("Posting message...");
    formData.append("long", $long);
    formData.append("lat", $lat);
    return async ({ result, update }) => {
      loading = false;
      toast.dismiss(toastId);
      if (result.status === 200) {
        toast.success("Message posted on location");
        await update();
        message = undefined;
      } else {
        toast.error("Error adding message on location");
      }
    };
  };

  const initializeEmojiSelector = async () => {
    if (browser) {
      await import("emoji-picker-element");
      document
        ?.querySelector("emoji-picker")
        ?.addEventListener("emoji-click", (event) => {
          const unicode = event.detail.unicode;
          message += unicode;
        });
    }
  };

  const toggleEmojiPicker = () => {
    isEmojiPickerOpen = !isEmojiPickerOpen
  }

  let isEmojiPickerOpen = false, emojiPickerTrigger = undefined;

  onMount(initializeEmojiSelector);
</script>

<div
  class="bg-gray-800 p-3 md:p-8 rounded-lg shadow-lg relative"
>
  <div
    class="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 pointer-events-none rounded-lg"
  ></div>
  <div class="relative z-10">
    <h2
      class="text-base sm:text-lg md:text-3xl font-bold mb-2 sm:mb-4 md:mb-6 text-emerald-400"
    >
      Share Your Whisper
    </h2>
    <form
      class="space-y-6"
      method="POST"
      action="?/addMessageOnLocation"
      use:enhance={messageFormSubmitAction}
    >
      <div class="mb-2 sm:mb-4 md:mb-6 relative">
        <textarea
          id="message"
          name="message"
          rows="4"
          class="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base md:text-lg text-gray-900 rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-400 bg-gray-50 placeholder-gray-400"
          bind:value={message}
          disabled={loading}
          placeholder="Write your message here..."
          required
        ></textarea>
        {#if browser}
          <button
            type="button"
            class="absolute top-2 right-2 focus:outline-none"
            on:click={toggleEmojiPicker}
            bind:this={emojiPickerTrigger}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-6 w-6 text-emerald-700 hover:text-emerald-800"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </button>
          <ClickOutside
          on:clickoutside={() => isEmojiPickerOpen = false}
          exclude={[emojiPickerTrigger]}
          >
            <div
              class="absolute top-14 right-0 z-20 {isEmojiPickerOpen ? "visible" : "invisible"}"
              in:scale={{ duration: 300 }}
              out:scale={{ duration: 300 }}
            >
              <emoji-picker></emoji-picker>
            </div>
          </ClickOutside>
        {/if}
      </div>
      <button
        type="submit"
        class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold md:py-3 py-2 px-4 md:px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg md:text-lg text-xs"
        disabled={loading}
      >
        {#if loading}
          <span class="flex items-center">
            <svg
              class="animate-spin -ml-1 mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 text-white"
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
            Sending...
          </span>
        {:else}
          Send Message
        {/if}
      </button>
    </form>
  </div>
</div>
