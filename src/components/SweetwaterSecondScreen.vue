<script setup>
import '../css/sweetwaterSecondScreen.css'
import { useMindConsole } from '../JavaScript/useMindConsole'
import MindQueryList from './mind-console/MindQueryList.vue'
import MindStdoutPanel from './mind-console/MindStdoutPanel.vue'

const emit = defineEmits(['openFriends'])

const {
  activeQuery,
  isCursorVisible,
  isStreaming,
  meta,
  queries,
  selectQuery,
  visibleOutputLines,
  visual,
} = useMindConsole()

</script>

<template>
  <section class="page-screen sweetwater-screen-two" aria-labelledby="sweetwater-console-title">
    <img class="sweetwater-screen-two__background" :src="visual.backgroundImage" alt="" aria-hidden="true" />
    <div class="sweetwater-screen-two__shade" aria-hidden="true"></div>

    <div class="mind-console" aria-label="控制台查询机制">
      <header class="mind-console__header">
        <p class="mind-console__eyebrow">{{ meta.eyebrow }}</p>
        <h2 id="sweetwater-console-title">{{ meta.title }}</h2>
        <p class="mind-console__summary">{{ meta.summary }}</p>
      </header>

      <div class="mind-console__panel">
        <MindQueryList :queries="queries" :active-query-id="activeQuery.id" @select-query="selectQuery" />
        <MindStdoutPanel
          :active-query="activeQuery"
          :lines="visibleOutputLines"
          :is-streaming="isStreaming"
          :is-cursor-visible="isCursorVisible"
          @open-friends="emit('openFriends')"
        />
      </div>
    </div>
  </section>
</template>