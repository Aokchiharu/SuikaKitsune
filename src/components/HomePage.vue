<script setup>
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import HeroCard from './HeroCard.vue'
import SweetwaterSecondScreen from './SweetwaterSecondScreen.vue'
import MusicControl from './MusicControl.vue'

const screenViewport = useTemplateRef('screenViewport')
const screenTrack = useTemplateRef('screenTrack')
const screenAnimationDuration = 1500
const touchThreshold = 48

let activeScreenIndex = 0
let isScreenAnimating = false
let screenAnimationFrame = 0
let touchStartY = null

function getScreens() {
  return Array.from(screenTrack.value?.querySelectorAll('.page-screen') ?? [])
}

function getScreenHeight() {
  return screenViewport.value?.clientHeight ?? window.innerHeight
}

function getScreenScrollProgress(progress) {
  const accelerationRatio = 0.24
  const decelerationRatio = 0.3
  const steadyRatio = 1 - accelerationRatio - decelerationRatio
  const velocity = 1 / (accelerationRatio / 2 + steadyRatio + decelerationRatio / 2)

  if (progress <= accelerationRatio) {
    return (velocity * progress * progress) / (2 * accelerationRatio)
  }

  if (progress <= accelerationRatio + steadyRatio) {
    return velocity * (progress - accelerationRatio / 2)
  }

  const decelerationProgress = progress - accelerationRatio - steadyRatio
  return velocity * (accelerationRatio / 2 + steadyRatio + decelerationProgress - decelerationProgress * decelerationProgress / (2 * decelerationRatio))
}

function setTrackOffset(offset) {
  const track = screenTrack.value

  if (!track) {
    return
  }

  track.style.transform = `translate3d(0, ${offset}px, 0)`
}

function syncTrackToActiveScreen() {
  setTrackOffset(-activeScreenIndex * getScreenHeight())
}

function animateToScreen(targetIndex) {
  const startOffset = -activeScreenIndex * getScreenHeight()
  const targetOffset = -targetIndex * getScreenHeight()
  const distance = targetOffset - startOffset
  const startTime = performance.now()

  window.cancelAnimationFrame(screenAnimationFrame)
  isScreenAnimating = true

  function step(currentTime) {
    const elapsedRatio = Math.min((currentTime - startTime) / screenAnimationDuration, 1)
    setTrackOffset(startOffset + distance * getScreenScrollProgress(elapsedRatio))

    if (elapsedRatio < 1) {
      screenAnimationFrame = window.requestAnimationFrame(step)
      return
    }

    activeScreenIndex = targetIndex
    syncTrackToActiveScreen()
    isScreenAnimating = false
  }

  screenAnimationFrame = window.requestAnimationFrame(step)
}

function requestScreenScroll(direction) {
  if (direction === 0) {
    return false
  }

  const screens = getScreens()
  const targetIndex = activeScreenIndex + direction

  if (targetIndex < 0 || targetIndex >= screens.length) {
    return false
  }

  animateToScreen(targetIndex)
  return true
}

function handleWheel(event) {
  const direction = Math.sign(event.deltaY)

  if (direction === 0) {
    return
  }

  if (isScreenAnimating) {
    event.preventDefault()
    return
  }

  if (requestScreenScroll(direction)) {
    event.preventDefault()
  }
}

function handleTouchStart(event) {
  touchStartY = event.touches[0]?.clientY ?? null
}

function handleTouchMove(event) {
  if (touchStartY === null) {
    return
  }

  const currentY = event.touches[0]?.clientY

  if (typeof currentY !== 'number') {
    return
  }

  const deltaY = touchStartY - currentY

  if (Math.abs(deltaY) < touchThreshold) {
    return
  }

  if (isScreenAnimating) {
    event.preventDefault()
    return
  }

  if (requestScreenScroll(Math.sign(deltaY))) {
    event.preventDefault()
    touchStartY = null
  }
}

function handleResize() {
  syncTrackToActiveScreen()
}

onMounted(() => {
  const viewport = screenViewport.value

  if (!viewport) {
    return
  }

  syncTrackToActiveScreen()
  viewport.addEventListener('wheel', handleWheel, { passive: false })
  viewport.addEventListener('touchstart', handleTouchStart, { passive: true })
  viewport.addEventListener('touchmove', handleTouchMove, { passive: false })
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  const viewport = screenViewport.value

  window.cancelAnimationFrame(screenAnimationFrame)
  window.removeEventListener('resize', handleResize)

  if (!viewport) {
    return
  }

  viewport.removeEventListener('wheel', handleWheel)
  viewport.removeEventListener('touchstart', handleTouchStart)
  viewport.removeEventListener('touchmove', handleTouchMove)
})
</script>

<template>
  <main ref="screenViewport" class="home-shell" aria-labelledby="page-title">
    <MusicControl />

    <div ref="screenTrack" class="screen-track">
      <section class="page-screen hero-section">
        <HeroCard />
      </section>

      <SweetwaterSecondScreen />
    </div>
  </main>
</template>