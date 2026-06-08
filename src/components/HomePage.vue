<script setup>
import '../css/homePage.css'
import { useHomeScreenPager } from '../JavaScript/useHomeScreenPager'
import HeroCard from './HeroCard.vue'
import SweetwaterSecondScreen from './SweetwaterSecondScreen.vue'
import MusicControl from './MusicControl.vue'

const emit = defineEmits(['openFriends'])
const { screenTrack, screenViewport } = useHomeScreenPager()
</script>

<template>
  <main ref="screenViewport" class="home-shell" aria-labelledby="page-title">
    <MusicControl />

    <div ref="screenTrack" class="screen-track">
      <section class="page-screen hero-section">
        <HeroCard />
      </section>

      <SweetwaterSecondScreen @open-friends="emit('openFriends')" />
    </div>
  </main>
</template>