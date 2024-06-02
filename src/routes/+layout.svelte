<script>
    import "../app.css";
    import Header2 from "../components/Header2.svelte";
    import Footer2 from "../components/Footer2.svelte";
    import { Toaster } from "svelte-sonner";
    import mixpanel from "mixpanel-browser";
    import { setContext } from "svelte";
    import { LAT_LONG_CONTEXT } from "@/utils/constants";
    import { writable } from "svelte/store";
    import { scale } from "svelte/transition";
    import { cubicIn, cubicOut } from "svelte/easing";
    import { afterNavigate, beforeNavigate } from "$app/navigation";

    mixpanel.init("3a39802719d0882be0b5a089edb97eb1", {
        debug: false,
        track_pageview: true,
        persistence: "localStorage",
    });

    setContext(LAT_LONG_CONTEXT, {
        lat: writable(undefined),
        long: writable(undefined),
        isDenied: writable(undefined),
        showEducationalModal: writable(false),
        showLocationAccessModal: writable(false),
        successActionCallback: writable(undefined),
    });

    export let data;
    $: ({ pathname } = data);

    let isLoading = true;
    beforeNavigate(({ to }) => {
        if (to?.route?.id) {
            isLoading = true;
        }
    });
    afterNavigate(() => setTimeout(() => (isLoading = false), 400));
</script>

<div class="flex flex-col min-h-screen bg-gray-900">
    <Toaster richColors visibleToasts={5} />
    <Header2 />

    {#key pathname}
        <main
            class="flex-1"
            in:scale={{ easing: cubicOut, duration: 300, delay: 400 }}
            out:scale={{ easing: cubicIn, duration: 300 }}
        >
            <slot />
        </main>
    {/key}
    <Footer2 />
</div>
