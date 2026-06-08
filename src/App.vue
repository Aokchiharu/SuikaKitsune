<script setup>
import { onBeforeUnmount, onMounted, shallowRef } from 'vue'
import HomePage from './components/HomePage.vue'
import OpeningTextWall from './components/OpeningTextWall.vue'

const showOpeningTextWall = shallowRef(true)
let openingTextWallTimer

onMounted(() => {
  openingTextWallTimer = window.setTimeout(() => {
    showOpeningTextWall.value = false
  }, 1600)
})

onBeforeUnmount(() => {
  window.clearTimeout(openingTextWallTimer)
})
</script>

<template>
  <HomePage />

  <Transition name="opening-text-wall" appear>
    <OpeningTextWall v-if="showOpeningTextWall" />
  </Transition>
</template>
