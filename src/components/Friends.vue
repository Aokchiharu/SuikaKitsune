<script setup>
const emit = defineEmits(['backHome'])
</script>

<template>
  <main class="friends-page" aria-labelledby="friends-title">
    <section class="friends-page__panel">
      <p class="friends-page__eyebrow">GET /api/v1/mind/friends</p>
      <h1 id="friends-title">Friends</h1>
      <p class="friends-page__copy">这里是狐瓜西的朋友们页面，后续可以继续接入朋友卡片、头像与跳转链接。</p>
      <button class="friends-page__back" type="button" @click="emit('backHome')">返回 Sweetwater</button>
    </section>
  </main>
</template>