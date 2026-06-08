<script setup>
import { computed, shallowRef } from 'vue'
import sweetwaterSecondImage from '../assets/Sweetwater2.png'
import { useTerminalStream } from '../composables/useTerminalStream'
import MindQueryList from './mind-console/MindQueryList.vue'
import MindStdoutPanel from './mind-console/MindStdoutPanel.vue'

const queries = [
  {
    id: 'architecture',
    index: '01',
    title: '狐瓜西的由来',
    command: 'sys_check --mode=architecture',
    endpoint: 'GET /api/v1/mind/architecture',
    output: [
      { segments: [{ text: '[QUERY]: ', tone: 'muted' }, { text: 'sys_check --mode=architecture', tone: 'command' }] },
      { segments: [{ text: '[STATUS]: ', tone: 'muted' }, { text: '200 OK', tone: 'success' }] },
      { segments: [] },
      { segments: [{ text: 'Q：', tone: 'question' }, { text: '狐瓜西这个nickname是怎么诞生的？' }] },
      {
        segments: [
          { text: 'A：', tone: 'answer' },
          { text: ' 因为我喜欢吃西瓜，而且是一只毛茸茸的大只狐狸，所以我的nickname就是狐瓜西。我的猫就叫猫瓜西。' },
        ],
      },
    ],
  },
  {
    id: 'tactical',
    index: '02',
    title: '关于游戏与现实（同步校准）',
    command: 'sys_check --mode=tactical',
    endpoint: 'GET /api/v1/mind/tactical',
    output: [
      { segments: [{ text: '[QUERY]: ', tone: 'muted' }, { text: 'sys_check --mode=tactical', tone: 'command' }] },
      { segments: [{ text: '[STATUS]: ', tone: 'muted' }, { text: '200 OK', tone: 'success' }] },
      { segments: [] },
      { segments: [{ text: 'Q：', tone: 'question' }, { text: '即使在这么恶劣的游戏环境下，为什么依旧这么喜欢CS2，？' }] },
      {
        segments: [
          { text: 'A：', tone: 'answer' },
          { text: ' 这是我记忆的一部分，承载着我年少时期最美好的一段回忆。CS对于我来说就像纯粹的体育运动，如同登山，骑行一样。我喜欢和我的朋友们一起玩，去认识更多各种各样的，有趣的新的朋友。' },
        ],
      },
    ],
  },
  {
    id: 'evolution',
    index: '03',
    title: '关于演进与重构（自我迭代）',
    command: 'sys_check --mode=evolution',
    endpoint: 'GET /api/v1/mind/evolution',
    output: [
      { segments: [{ text: '[QUERY]: ', tone: 'muted' }, { text: 'sys_check --mode=evolution', tone: 'command' }] },
      { segments: [{ text: '[STATUS]: ', tone: 'muted' }, { text: '200 OK', tone: 'success' }] },
      { segments: [] },
      { segments: [{ text: 'Q：', tone: 'question' }, { text: '网页上提到的“不断重构的灵魂”，对你而言意味着什么？' }] },
      {
        segments: [
          { text: 'A：', tone: 'answer' },
          { text: ' 优秀的系统不是设计出来的，而是演进出来的。代码每隔一段时间就需要剥离坏味道、打破旧模式，人也是一样。我不喜欢日复一日的死循环，无论是技术栈的迭代，还是个人性格的完善，都是一场不断推翻、不断寻找更优解的重构过程。' },
        ],
      },
    ],
  },
]

const activeQueryId = shallowRef(queries[0].id)
const activeQuery = computed(() => queries.find((query) => query.id === activeQueryId.value) ?? queries[0])
const { isStreaming, isCursorVisible, visibleOutputLines, streamActiveQuery } = useTerminalStream(activeQuery)

function selectQuery(queryId) {
  if (queryId === activeQueryId.value) {
    streamActiveQuery()
    return
  }

  activeQueryId.value = queryId
}
</script>

<template>
  <section class="page-screen sweetwater-screen-two" aria-labelledby="sweetwater-console-title">
    <img class="sweetwater-screen-two__background" :src="sweetwaterSecondImage" alt="" aria-hidden="true" />
    <div class="sweetwater-screen-two__shade" aria-hidden="true"></div>

    <div class="mind-console" aria-label="控制台查询机制">
      <header class="mind-console__header">
        <p class="mind-console__eyebrow">Sweetwater Control Deck</p>
        <h2 id="sweetwater-console-title">Mind Query Console</h2>
        <p class="mind-console__summary">选择左侧接口，读取狐瓜西的底层配置与自我迭代日志。</p>
      </header>

      <div class="mind-console__panel">
        <MindQueryList :queries="queries" :active-query-id="activeQuery.id" @select-query="selectQuery" />
        <MindStdoutPanel
          :active-query="activeQuery"
          :lines="visibleOutputLines"
          :is-streaming="isStreaming"
          :is-cursor-visible="isCursorVisible"
        />
      </div>
    </div>
  </section>
</template>