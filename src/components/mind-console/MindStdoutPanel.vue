<script setup>
defineProps({
  activeQuery: {
    type: Object,
    required: true,
  },
  lines: {
    type: Array,
    required: true,
  },
  isStreaming: {
    type: Boolean,
    required: true,
  },
  isCursorVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['openFriends'])
</script>

<template>
  <section class="mind-console__stdout" aria-live="polite" aria-label="Stdout Output">
    <div class="mind-console__bar mind-console__bar--stdout">
      <span>Stdout Output</span>
      <span class="mind-console__stream-state">{{ isStreaming ? 'STREAMING' : 'IDLE' }}</span>
    </div>

    <div class="mind-console__screen">
      <div class="mind-console__scanline" aria-hidden="true"></div>
      <p class="mind-console__active-command">
        <span class="mind-console__prompt">fox@sweetwater:~$</span>
        <span>{{ activeQuery.command }}</span>
      </p>

      <div class="mind-console__output">
        <p v-for="(line, lineIndex) in lines" :key="lineIndex" class="mind-console__line">
          <template
            v-for="(segment, segmentIndex) in line.segments"
            :key="`${lineIndex}-${segmentIndex}`"
          >
            <button
              v-if="segment.action === 'friends'"
              class="mind-console__link"
              :class="segment.tone ? `is-${segment.tone}` : undefined"
              type="button"
              @click="emit('openFriends')"
            >{{ segment.text }}</button>
            <span v-else :class="segment.tone ? `is-${segment.tone}` : undefined">{{ segment.text }}</span>
          </template>
        </p>
        <span class="mind-console__cursor" :class="{ 'is-hidden': !isCursorVisible }" aria-hidden="true">_</span>
      </div>
    </div>
  </section>
</template>