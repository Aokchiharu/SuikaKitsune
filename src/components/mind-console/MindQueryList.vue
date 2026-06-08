<script setup>
defineProps({
  queries: {
    type: Array,
    required: true,
  },
  activeQueryId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['selectQuery'])
</script>

<template>
  <aside class="mind-console__sidebar" aria-label="Query List" data-screen-pager-ignore>
    <div class="mind-console__bar">
      <span>Query List</span>
      <span class="mind-console__bar-status">ONLINE</span>
    </div>

    <button
      v-for="query in queries"
      :key="query.id"
      class="mind-console__query"
      :class="{ 'is-active': query.id === activeQueryId }"
      type="button"
      :aria-pressed="query.id === activeQueryId"
      @click="emit('selectQuery', query.id)"
    >
      <span class="mind-console__query-index">{{ query.index }}</span>
      <span class="mind-console__query-copy">
        <span class="mind-console__query-endpoint">{{ query.endpoint }}</span>
        <span class="mind-console__query-title">{{ query.title }}</span>
      </span>
    </button>
  </aside>
</template>