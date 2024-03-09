<template>
  <v-autocomplete
    :search="modelValue"
    :auto-select-first="true"
    :no-data-text="$t('search.non')"
    :label="$t('search.title')"
    :items="items"
    @update:focused="(value) => focus = value"
    @update:search="model"
  >
  </v-autocomplete>
</template>
<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  modelValue: string,
  title: string,
  items: string[] | unknown[],
  noDataText: string
}>()

const focus = ref(false)

const emit = defineEmits(['update:modelValue'])

const model = (value) => {
  if(focus.value) return emit('update:modelValue', value)
  if(props.items.length === 0) emit('update:modelValue', '')
}

</script>

<style lang="scss" scoped>

</style>
