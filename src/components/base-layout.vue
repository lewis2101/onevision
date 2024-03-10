<template>
  <v-app>
    <v-main>
      <base-header/>
      <div class="content">
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import BaseHeader from "@/components/base-header.vue";

</script>

<style lang="scss" scoped>
.content {
  padding: 20px;
  background: white;
}
</style>
