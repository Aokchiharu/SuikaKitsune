<script setup>
import sweetwaterImage from '../assets/Sweetwater.png'

const heroParagraphs = [
  '你好，我是这里的“架构师”，也是这趟旅程的向导。',
  '在物理世界的现实法则中，我是一名深耕于 Java 现代生态的后端开发者。正如支撑甜水镇运转的地下控制中心，我习惯于在幕后构建秩序。从全异步的 WebFlux 到严密的领域驱动设计（DDD）与六边形架构，我热衷于用极致的非阻塞逻辑和充血模型，搭建出能够应对极高吞吐量的复杂平台。对我来说，代码不仅是工具，更是构建世界运转规则的基石。',
  '但在这座小镇里，没有日复一日的死循环。',
  '走出控制中心，我是一个崇尚极限与精确的硬核玩家。我深深的喜欢Counter Strike 2这个游戏，精准的团队分工与配合如同手术刀一般精确的战术执行。',
  '这里是我的起点。没有剧本，一切都在响应式地生成。',
  '祝你在甜水镇的探索之旅愉快。',
]
 </script>

<template>
  <section class="sweetwater-hero" aria-labelledby="page-title">
    <img class="sweetwater-hero__background" :src="sweetwaterImage" alt="" aria-hidden="true" />
    <span class="sweetwater-hero__shade" aria-hidden="true"></span>

    <div class="sweetwater-hero__content">
      <p class="sweetwater-hero__kicker">Sweetwater Chronicle</p>
      <h1 id="page-title">Welcome To Sweetwater</h1>
      <p class="sweetwater-hero__subtitle">
        剥开宁静的表象，这里是全异步流转的代码、精准的肌肉记忆，以及一个不断重构的灵魂。
      </p>

      <div class="sweetwater-hero__body">
        <p v-for="paragraph in heroParagraphs" :key="paragraph">{{ paragraph }}</p>
      </div>
    </div>
  </section>
</template>