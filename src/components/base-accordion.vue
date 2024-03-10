<template>
  <v-expansion-panels variant="accordion" class="container" :disabled="getLoading">
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
import {computed, ComputedRef} from "vue";

const props = defineProps<{
  title: string,
  loading: boolean
}>()

const getLoading: ComputedRef<boolean> = computed(() => props.loading)

</script>

<style lang="scss" scoped>
.container {
  max-width: 250px;
}
</style>
