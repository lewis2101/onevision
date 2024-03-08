<template>
  <v-app>
    <v-main>
      <base-header/>
      <div style="padding: 20px;">
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import BaseHeader from "@/components/base-header.vue";

</script>

<style lang="scss" scoped>

</style>
