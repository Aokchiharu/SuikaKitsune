<script setup>
import '../css/friends.css'
import friendsBackground from '../assets/friends.png'
import { useFriendsSystem } from '../JavaScript/friends'

const emit = defineEmits(['backHome'])

const { errorPopups, isLoading, isPageReady, loadingProgress } = useFriendsSystem({
  onReturnHome: () => emit('backHome'),
})
</script>

<template>
  <main class="friends-page" aria-labelledby="friends-title">
    <img class="friends-page__background" :src="friendsBackground" alt="" aria-hidden="true" />
    <div class="friends-page__static" aria-hidden="true"></div>

    <Transition name="friends-content" appear>
      <section v-if="isPageReady" class="friends-page__content">
        <p class="friends-page__eyebrow">CONNECTION INTERRUPTED</p>
        <h1 id="friends-title" class="friends-page__title">Friends Directory</h1>
        <p class="friends-page__copy">Love all, trust a few, do wrong to none.</p>
        <button class="friends-page__back" type="button" @click="emit('backHome')">Return / Home</button>
      </section>
    </Transition>

    <div v-if="isPageReady" class="friends-error-layer" aria-live="polite" aria-label="错误消息流">
      <article
        v-for="error in errorPopups"
        :key="error.id"
        class="friends-error-toast"
        :style="error.style"
        :aria-label="error.label"
      >
        <div class="friends-error-toast__header">
          <img class="friends-error-toast__icon" :src="error.icon" alt="" aria-hidden="true" />
          <span class="friends-error-toast__title">ERROR</span>
        </div>
        <span class="friends-error-toast__message">{{ error.message }}</span>
      </article>
    </div>

    <Transition name="friends-loader" appear>
      <section v-if="isLoading" class="friends-loader" role="status" aria-live="polite">
        <div class="friends-loader__panel">
          <div class="friends-loader__meta">
            <span>Loading friend graph Now</span>
            <strong>{{ Math.round(loadingProgress) }}%</strong>
          </div>
          <div class="friends-loader__track" aria-hidden="true">
            <div
              class="friends-loader__bar"
              :style="{
                transform: `scaleX(${loadingProgress / 100})`,
                boxShadow: `0 0 ${10 + Math.round(loadingProgress * 0.38)}px rgba(255, 0, 0, ${Math.min(0.9, 0.28 + loadingProgress / 140).toFixed(2)})`,
              }"
            ></div>
          </div>
          <p class="friends-loader__hint">Love all, trust a few, do wrong to none.</p>
        </div>
      </section>
    </Transition>
  </main>
</template>