<template>
  <v-app-bar color="black">
    <v-app-bar-title>{{ $t('header.title') }}</v-app-bar-title>
    <locale/>
  </v-app-bar>
</template>

<script setup lang="ts">
import Locale from "@/components/locale.vue";

</script>

<style lang="scss" scoped>

</style>
