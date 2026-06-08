<script setup>
import '../css/heroCard.css'
import { sweetwaterHeroContent } from '../JavaScript/heroCardContent'
</script>

<template>
  <section class="sweetwater-hero" aria-labelledby="page-title">
    <img class="sweetwater-hero__background" :src="sweetwaterHeroContent.backgroundImage" alt="" aria-hidden="true" />
    <span class="sweetwater-hero__shade" aria-hidden="true"></span>

    <div class="sweetwater-hero__content">
      <p class="sweetwater-hero__kicker">{{ sweetwaterHeroContent.kicker }}</p>
      <h1 id="page-title">{{ sweetwaterHeroContent.title }}</h1>
      <p class="sweetwater-hero__subtitle">{{ sweetwaterHeroContent.subtitle }}</p>

      <div class="sweetwater-hero__body">
        <p v-for="paragraph in sweetwaterHeroContent.paragraphs" :key="paragraph">{{ paragraph }}</p>
      </div>
    </div>
  </section>
</template>