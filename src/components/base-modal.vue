<template>
  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card
      max-width="400"
      min-width="300"
      prepend-icon="mdi-update"
      :title="title"
    >
      <template #text>
        <slot/>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  modelValue: boolean,
  title: string
}>()

const emit = defineEmits(['update:modelValue'])

const dialog = computed({
  get: () => props.modelValue,
  set: e => emit('update:modelValue', e)
})
</script>

<style lang="scss" scoped>

</style>
