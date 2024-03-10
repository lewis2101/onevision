<template>
  <v-expansion-panels variant="accordion" class="container">
    <v-expansion-panel
      :title="title"
    >
      <template #text>
        <slot/>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style lang="scss" scoped>
.container {
  max-width: 250px;
  margin-bottom: 10px;
}
</style>
