<script>
  import PostMessage from "@/components/ui/PostMessage.svelte";
  import LocationAccessEducationalModal from "@/components/ui/LocationAccessEducationalModal.svelte";
  import RadiusScroller from "@/components/ui/RadiusScroller.svelte";
  import { LAT_LONG_CONTEXT } from "@/utils/constants";
  import { getContext } from "svelte";
  import { toast } from "svelte-sonner";
  import {
    calculateDistanceBetweenLocations,
    formatTimestamp,
    getUserLocation,
  } from "@/utils";
  import ShowMoreLess from "@/components/showMoreLess.svelte";
  import LocationPermission from "@/components/LocationPermission.svelte";

  let messages = [];

  let isNearbyMessagesFetched = false;
  let isMessagesFetching = false;

  const ctx = getContext(LAT_LONG_CONTEXT);
  const lat = ctx.lat;
  const long = ctx.long;

  const showEducationalModal = ctx.showEducationalModal;
  const showLocationAccessModal = ctx.showLocationAccessModal;
  const wasLocationAccessDenied = ctx.isDenied;

  const requestLocationAccess = async () => {
    toast.loading("Please allow location access to get messages nearby you...");
    try {
      const loc = await getUserLocation();
      lat.set(loc.latitude);
      long.set(loc.longitude);
    } catch (error) {
      toast.error("Location access denied...");
      showEducationalModal.set(true);
      wasLocationAccessDenied.set(true);
    } finally {
      isMessagesFetching = false;
      showLocationAccessModal.set(false);
    }
  };

  async function fetchMessages(event) {
    isMessagesFetching = true;
    isNearbyMessagesFetched = false;
    const radius = event.detail.radius;
    messages = [];
    if (!$lat || !$long) {
      if ($wasLocationAccessDenied) {
        showEducationalModal.set(true);
      }else{
        showLocationAccessModal.set(true);
      }
      isMessagesFetching = false;
      return;
    }

    try {
      const response = await fetch(
        `/api/getMessagesNearbyLocation?radius=${radius}&lat=${$lat}&long=${$long}`,
      );
      const data = await response.json();
      messages = prepareMessages(data.data);
    } catch (error) {
      toast.error("Error fetching messages");
    } finally {
      isMessagesFetching = false;
      isNearbyMessagesFetched = true;
    }
  }

  const prepareMessages = (rawMessages) => {
    return rawMessages.map((message) => ({
      id: message.id,
      distance: calculateDistanceBetweenLocations(
        $lat,
        $long,
        message.lat,
        message.long,
      ),
      message: message.message,
      created_at: message.created_at ? formatTimestamp(message.created_at) : "",
    }));
  };
</script>

<LocationPermission on:requestLocationAccess={requestLocationAccess} />
<LocationAccessEducationalModal />

<main
  class="min-h-[calc(100vh-128px)] bg-gradient-to-br from-gray-900 to-teal-900 text-white py-12 relative"
>
  <div
    class="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 pointer-events-none"
  ></div>
  <div
    class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 pointer-events-none"
  ></div>
  <div class="container mx-auto px-4 relative z-10">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-lg">
      <div class="rounded-lg">
        <PostMessage />
      </div>
      <div class="h-full">
        <RadiusScroller
          on:getMessages={fetchMessages}
          loading={isMessagesFetching}
        />
      </div>
    </div>

    {#if isNearbyMessagesFetched}
      {#if messages.length > 0}
        <div class="mt-8 md:mt-12">
          <h2
            class="md:text-3xl text-xl font-bold mb-6 md:mb-8 text-emerald-400"
          >
            Nearby Whispers:
          </h2>
          <ul class="space-y-4">
            {#each messages as message}
              <div class="bg-gray-800 rounded-lg shadow-md">
                <div class="p-4">
                  <p class="text-white md:text-lg text-sm">
                    <ShowMoreLess
                      content={message.message}
                      maxCharacters="500"
                    />
                  </p>
                </div>

                <div class="flex justify-between items-center p-4">
                  <div
                    class="text-gray-400 text-xs md:text-sm flex items-center"
                  >
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
                  </div>
                  <span
                    class="text-gray-400 text-xs md:text-sm flex items-center"
                  >
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
            {/each}
          </ul>
        </div>
      {:else}
        <div class="mt-8 md:mt-12 bg-gray-800 rounded-lg shadow-md p-5">
          <p class="text-lg text-gray-400 mb-4">No nearby messages found.</p>
          <p class="text-sm text-gray-400">
            Be the first one to post a message at this location!
          </p>
        </div>
      {/if}
    {/if}
  </div>
</main>
