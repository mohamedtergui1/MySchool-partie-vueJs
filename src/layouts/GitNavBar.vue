<template>
    <div :class="{
        'bg-transparent': !isScrolled,
        'bg-white': (isScrolled && !showMenu) || showMenu,
        'shadow-lg': isScrolled
    }" class="fixed w-full top-0 z-10 transition-all ease-in duration-300">
        <!-- Navbar -->
        <nav class="
          container
          px-6
          py-8
          mx-auto
          md:flex md:justify-between md:items-center
        ">
            <div class="flex items-center justify-between">
                <router-link to="/" class="
              text-xl
              font-bold
              text-black
              md:text-2xl
              hover:text-orange-400
            "> Logo
                </router-link>
                <!-- Mobile menu button -->
                <div @click="toggleNav" class="flex md:hidden">
                    <button type="button" class="
                text-black
                hover:text-gray-400
                focus:outline-none focus:text-orange-400
              ">
                        <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                            <path fill-rule="evenodd"
                                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
            <ul :class="showMenu ? 'flex' : 'hidden'" class="
            flex-col
            mt-8
            space-y-4
            md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0
          ">
                <li class="text-black hover:text-orange-400 font-semibold">Home</li>
                <li class="text-black hover:text-orange-400 font-semibold">About</li>
                <li class="text-black hover:text-orange-400 font-semibold">Blogs</li>
                <li class="text-black hover:text-orange-400 font-semibold">Contact Us</li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

//navbar responsive and transition

//responsive
const showMenu = ref(false);
const isScrolled = ref(false);

const toggleNav = () => (showMenu.value = !showMenu.value);

//transition bg navbar
const handleScroll = () => {
    isScrolled.value = window.scrollY > 100;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>


<style lang="scss" scoped></style>