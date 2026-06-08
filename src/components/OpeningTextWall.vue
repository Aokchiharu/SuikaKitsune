<script setup>
const phraseTiles = [
  { text: 'These violent delights have violent ends.', lang: 'en', tone: 'is-dark', scale: 'is-hero', flow: 'is-horizontal', layout: 'english' },
  { text: 'この激しい歓びには激しい終わりがある', lang: 'ja', tone: 'is-blood', scale: 'is-md', flow: 'is-vertical', layout: 'japanese' },
  { text: '這些殘暴的歡愉，終將以殘暴收場', lang: 'zh-Hant', tone: 'is-blood', scale: 'is-lg', flow: 'is-vertical', layout: 'traditional' },
  { text: 'Queste gioie violente hanno fini violente.', lang: 'it', tone: 'is-blood', scale: 'is-sm', flow: 'is-horizontal', layout: 'italian' },
  { text: 'Diese gewaltsamen Freuden nehmen ein gewaltsames Ende.', lang: 'de', tone: 'is-dark', scale: 'is-md', flow: 'is-horizontal', layout: 'german' },
  { text: 'Ces délices violents ont des fins violentes.', lang: 'fr', tone: 'is-dark', scale: 'is-md', flow: 'is-horizontal', layout: 'french' },
  { text: 'Estos placeres violentos tienen finales violentos.', lang: 'es', tone: 'is-blood', scale: 'is-lg', flow: 'is-horizontal', layout: 'spanish' },
  { text: 'Эти яростные наслаждения имеют яростный конец.', lang: 'ru', tone: 'is-blood', scale: 'is-md', flow: 'is-horizontal', layout: 'russian' },
  { text: 'Estos deleites violentos acaban violentamente.', lang: 'es-MX', tone: 'is-dark', scale: 'is-sm', flow: 'is-horizontal', layout: 'spanish-alt' },
  { text: 'Näillä väkivaltaisilla iloilla on väkivaltaiset loput.', lang: 'fi', tone: 'is-blood', scale: 'is-sm', flow: 'is-horizontal', layout: 'finnish' },
  { text: 'Deze gewelddadige genoegens hebben gewelddadige eindes.', lang: 'nl', tone: 'is-dark', scale: 'is-sm', flow: 'is-horizontal', layout: 'dutch' },
  { text: 'Essas delícias violentas têm fins violentos.', lang: 'pt', tone: 'is-dark', scale: 'is-sm', flow: 'is-horizontal', layout: 'portuguese' },
  { text: 'Aqueles delèits violents an de fins violentas.', lang: 'oc', tone: 'is-blood', scale: 'is-xs', flow: 'is-horizontal', layout: 'occitan' },
  { text: 'Gozamen bortitz hauek amaiera bortitzak dituzte.', lang: 'eu', tone: 'is-dark', scale: 'is-xs', flow: 'is-horizontal', layout: 'basque' },
  { text: 'Dizze gewelddiedige genietingen hawwe gewelddiedige einen.', lang: 'fy', tone: 'is-blood', scale: 'is-xs', flow: 'is-horizontal', layout: 'frisian' },
  { text: 'Quests plaschairs violents han fins violentas.', lang: 'rm', tone: 'is-dark', scale: 'is-xs', flow: 'is-horizontal', layout: 'romansh' },
  { text: 'Dës gewalteg Freed hunn gewalteg Ennen.', lang: 'lb', tone: 'is-blood', scale: 'is-xs', flow: 'is-horizontal', layout: 'luxembourgish' },
  { text: 'Tha crìochan fòirneartach aig na tlachdan fòirneartach seo.', lang: 'gd', tone: 'is-dark', scale: 'is-xs', flow: 'is-horizontal', layout: 'gaelic' },
]
</script>

<template>
  <section class="opening-text-wall" aria-label="开场文字云">
    <div class="opening-text-wall__cloud" aria-hidden="true">
      <span
        v-for="phrase in phraseTiles"
        :key="`${phrase.lang}-${phrase.layout}`"
        class="opening-text-wall__phrase"
        :class="[phrase.tone, phrase.scale, phrase.flow, `opening-text-wall__phrase--${phrase.layout}`]"
        :lang="phrase.lang"
      >
        {{ phrase.text }}
      </span>
    </div>

    <p class="opening-text-wall__accessible">
      These violent delights have violent ends. 這些殘暴的歡愉，終將以殘暴收場。
    </p>
  </section>
</template>