<template>
  <v-bottom-navigation bg-color="#000000" :class="$style.nav">
    <v-btn value="recent" @click="$router.push(`/${getLocale()}`)">
      <v-icon>mdi-history</v-icon>
      <span>История</span>
    </v-btn>
    <v-btn value="favorites" @click="$router.push(`/${getLocale()}/diagram`)">
      <v-icon>mdi-chart-bar</v-icon>
      <span>Диаграмма</span>
    </v-btn>
    <v-btn value="nearby" @click="$router.push(`/${getLocale()}/report`)">
      <v-icon>mdi-chart-tree</v-icon>
      <span>Отчет</span>
    </v-btn>
    <v-btn value="nearby" @click="$router.push(`/${getLocale()}/debug`)">
      <v-icon>mdi-bug</v-icon>
      <span>Debug</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
import {getLocale} from "@/plugins/i18n";
</script>

<style lang="scss" module>
.nav {
 margin-bottom: 10px;
}
</style>
