<script setup>
import { onBeforeUnmount, onMounted, shallowRef } from 'vue'
import Friends from './components/Friends.vue'
import HomePage from './components/HomePage.vue'
import OpeningTextWall from './components/OpeningTextWall.vue'

const currentPage = shallowRef('home')
const showOpeningTextWall = shallowRef(true)
let openingTextWallTimer

function openFriendsPage() {
  currentPage.value = 'friends'
}

function openHomePage() {
  currentPage.value = 'home'
}

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
  <HomePage v-if="currentPage === 'home'" @open-friends="openFriendsPage" />
  <Friends v-else-if="currentPage === 'friends'" @back-home="openHomePage" />

  <Transition name="opening-text-wall" appear>
    <OpeningTextWall v-if="showOpeningTextWall" />
  </Transition>
</template>
