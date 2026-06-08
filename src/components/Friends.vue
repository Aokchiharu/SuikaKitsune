<script setup>
import '../css/friends.css'
import { trustedFriendNodes, trustedMatrixMeta } from '../JavaScript/friendsNodes'
import { useTrustedNodeMatrix } from '../JavaScript/useTrustedNodeMatrix'

const emit = defineEmits(['backHome'])

const {
  activeNodeId,
  connectionSegments,
  isMatrixLoading,
  positionedNodes,
  clearActiveNode,
  handleNodePointerDown,
  setActiveNode,
} = useTrustedNodeMatrix(trustedFriendNodes)
</script>

<template>
  <main class="trusted-matrix-page" aria-labelledby="trusted-matrix-title">
    <Transition name="trusted-matrix-loader">
      <section v-if="isMatrixLoading" class="trusted-matrix-loader" aria-live="polite">
        <p class="trusted-matrix-loader__eyebrow">SYSTEM DATA LOADING</p>
        <div class="trusted-matrix-loader__bar" aria-hidden="true"></div>
        <p class="trusted-matrix-loader__status">establishing encrypted trust channels...</p>
      </section>
    </Transition>

    <section class="trusted-matrix-shell" :class="{ 'is-loading': isMatrixLoading }">
      <header class="trusted-matrix-header">
        <div class="trusted-matrix-header__copy">
          <p class="trusted-matrix-header__eyebrow">{{ trustedMatrixMeta.endpoint }}</p>
          <h1 id="trusted-matrix-title">{{ trustedMatrixMeta.title }}</h1>
          <p class="trusted-matrix-header__summary">{{ trustedMatrixMeta.summary }}</p>
        </div>

        <button class="trusted-matrix-header__back" type="button" @click="emit('backHome')">
          <span aria-hidden="true">↵</span>
          返回控制舱
        </button>
      </header>

      <section class="trusted-matrix-board" data-trusted-matrix-board aria-label="信任节点拓扑图">
        <svg class="trusted-matrix-board__links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line
            v-for="segment in connectionSegments"
            :key="segment.id"
            class="trusted-matrix-board__link"
            :class="{ 'is-active': activeNodeId === segment.id }"
            x1="50"
            y1="50"
            :x2="segment.x"
            :y2="segment.y"
            :style="{ '--signal-strength': segment.signalStrength }"
          />
        </svg>

        <div class="trusted-matrix-core" :class="{ 'has-active-node': activeNodeId }" aria-hidden="true">
          <span class="trusted-matrix-core__ring"></span>
          <span class="trusted-matrix-core__label">{{ trustedMatrixMeta.coreLabel }}</span>
          <span class="trusted-matrix-core__status">{{ trustedMatrixMeta.coreStatus }}</span>
        </div>

        <article
          v-for="node in positionedNodes"
          :key="node.id"
          class="trusted-node-card"
          :class="{ 'is-active': activeNodeId === node.id }"
          :style="node.style"
          tabindex="0"
          @focusin="setActiveNode(node.id)"
          @mouseenter="setActiveNode(node.id)"
          @mouseleave="clearActiveNode"
          @pointerdown="handleNodePointerDown($event, node.id)"
        >
          <div class="trusted-node-card__avatar" aria-hidden="true">
            <img v-if="node.avatar" class="trusted-node-card__avatar-image" :src="node.avatar" :alt="node.avatarAlt" draggable="false" />
            <span v-else class="trusted-node-card__avatar-placeholder">{{ node.initials }}</span>
            <span class="trusted-node-card__scanline"></span>
          </div>

          <div class="trusted-node-card__body">
            <p class="trusted-node-card__index">Node _ {{ node.index }}</p>
            <h2>{{ node.name }}</h2>

            <dl class="trusted-node-card__meta">
              <div>
                <dt>系统定位</dt>
                <dd>{{ node.systemRole }}</dd>
              </div>
              <div>
                <dt>连接始于</dt>
                <dd>{{ node.connectedAt }}</dd>
              </div>
            </dl>

            <ul class="trusted-node-card__tags" aria-label="节点标签">
              <li v-for="tag in node.tags" :key="tag">{{ tag }}</li>
            </ul>

            <section class="trusted-node-card__story" aria-label="核心故事与简介">
              <p v-for="paragraph in node.story" :key="paragraph">{{ paragraph }}</p>
            </section>
          </div>
        </article>
      </section>

      <aside class="trusted-matrix-log" aria-label="信号共鸣日志">
        <p class="trusted-matrix-log__eyebrow">Signal Resonance Log</p>
        <ol>
          <li v-for="node in positionedNodes" :key="`${node.id}-log`" :class="{ 'is-active': activeNodeId === node.id }">
            <span>{{ node.index }}</span>
            <strong>{{ node.name }}</strong>
            <em>{{ node.signalLabel }}</em>
          </li>
        </ol>
      </aside>
    </section>
  </main>
</template>