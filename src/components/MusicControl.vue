<script setup>
import { onBeforeUnmount, onMounted, shallowRef, useTemplateRef } from 'vue'
import sweetwaterBgm from '../assets/bgm/Sweetwater.mp3'
import playMusicIcon from '../assets/bgm/playmucic.svg'
import stopMusicIcon from '../assets/bgm/stopmusic.svg'

const audioRef = useTemplateRef('audioRef')
const isAudible = shallowRef(false)

const autoplayEvents = ['pointerdown', 'keydown', 'wheel', 'touchstart']

function removeAutoplayFallback() {
  autoplayEvents.forEach((eventName) => {
    window.removeEventListener(eventName, handleAutoplayFallback)
  })
}

async function playAudibly() {
  const audio = audioRef.value

  if (!audio) {
    return
  }

  audio.muted = false
  audio.volume = 0.5

  try {
    await audio.play()
    isAudible.value = true
    removeAutoplayFallback()
  } catch {
    isAudible.value = false
  }
}

function handleAutoplayFallback() {
  void playAudibly()
}

async function toggleMusic() {
  const audio = audioRef.value

  if (!audio) {
    return
  }

  if (isAudible.value) {
    audio.muted = true
    isAudible.value = false
    return
  }

  await playAudibly()
}

onMounted(() => {
  void playAudibly()
  autoplayEvents.forEach((eventName) => {
    window.addEventListener(eventName, handleAutoplayFallback, { passive: true })
  })
})

onBeforeUnmount(() => {
  removeAutoplayFallback()
  audioRef.value?.pause()
})
</script>

<template>
  <div class="music-control">
    <audio ref="audioRef" :src="sweetwaterBgm" autoplay loop preload="auto"></audio>
    <button
      class="music-control__button"
      type="button"
      :aria-label="isAudible ? '静音 Sweetwater 背景音乐' : '播放 Sweetwater 背景音乐'"
      :aria-pressed="isAudible"
      @click="toggleMusic"
    >
      <img
        class="music-control__icon"
        :class="{ 'is-playing': isAudible }"
        :src="isAudible ? playMusicIcon : stopMusicIcon"
        alt=""
        aria-hidden="true"
      />
    </button>
  </div>
</template>