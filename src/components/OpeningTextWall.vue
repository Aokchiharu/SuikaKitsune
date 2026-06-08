<script setup>
import '../css/openingTextWall.css'
import { openingTextWallAccessibleText, openingTextWallPhrases } from '../JavaScript/openingTextWallPhrases'
</script>

<template>
  <section class="opening-text-wall" aria-label="开场文字云">
    <div class="opening-text-wall__cloud" aria-hidden="true">
      <span
        v-for="phrase in openingTextWallPhrases"
        :key="`${phrase.lang}-${phrase.layout}`"
        class="opening-text-wall__phrase"
        :class="[phrase.tone, phrase.scale, phrase.flow, `opening-text-wall__phrase--${phrase.layout}`]"
        :lang="phrase.lang"
      >
        {{ phrase.text }}
      </span>
    </div>

    <p class="opening-text-wall__accessible">
      {{ openingTextWallAccessibleText }}
    </p>
  </section>
</template>