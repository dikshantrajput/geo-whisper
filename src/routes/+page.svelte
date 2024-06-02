<script>
    import Hero from "@/components/Hero.svelte";
    import actionImage from "../assets/action2.png";
</script>

<main class="bg-gradient-to-br from-gray-900 to-teal-900 text-white">
    <Hero />
    <section class="container mx-auto px-4 md:py-16 py-6">
        <h2 class="text-3xl font-bold mb-8 text-center text-emerald-400">
            How It Works
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-teal-800 p-6 rounded-lg shadow-lg">
                <h3 class="text-xl font-bold mb-4 text-emerald-400">
                    1. Write a Message
                </h3>
                <p>
                    Share your thoughts, stories, or experiences by writing a
                    message at your current location.
                </p>
            </div>
            <div class="bg-teal-800 p-6 rounded-lg shadow-lg">
                <h3 class="text-xl font-bold mb-4 text-emerald-400">
                    2. Explore Nearby
                </h3>
                <p>
                    Discover messages left by others in your vicinity. Set a
                    radius to control the range of exploration.
                </p>
            </div>
            <div class="bg-teal-800 p-6 rounded-lg shadow-lg">
                <h3 class="text-xl font-bold mb-4 text-emerald-400">
                    3. Leave Your Mark
                </h3>
                <p>
                    Contribute to the tapestry of experiences and perspectives
                    wherever you go, creating a unique local narrative.
                </p>
            </div>
        </div>
    </section>
    <section class="container mx-auto px-4 md:py-16 py-6">
        <h2 class="text-3xl font-bold mb-8 text-center text-emerald-400">
            GeoWhisper in Action
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
                <img
                    src={actionImage}
                    alt="GeoWhisper in Action"
                    class="w-full rounded-lg shadow-lg"
                />
            </div>
            <div>
                <h3 class="text-2xl font-bold mb-4">
                    Unveiling the Stories Around You
                </h3>
                <p class="mb-4">
                    With GeoWhisper, every location becomes a treasure trove of
                    stories waiting to be discovered. Uncover the thoughts,
                    experiences, and perspectives of people from all walks of
                    life, and gain a deeper understanding of the world around
                    you.
                </p>
                <a
                    href="/app"
                    class="bg-white text-gray-900 hover:bg-gray-200 font-bold py-2 px-6 md:py-3 md:px-8 rounded-lg"
                >
                    Start Exploring
                </a>
            </div>
        </div>
    </section>
</main>
