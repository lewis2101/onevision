<template>
  <v-autocomplete
    :search="modelValue"
    :auto-select-first="true"
    :no-data-text="$t('search.non')"
    :label="$t('search.title')"
    :items="sortedSearchItems"
    :clearable="true"
    bg-color="white"
    @update:focused="(value) => focus = value"
    @update:search="model"
  >
  </v-autocomplete>
</template>
<script setup lang="ts">
import {computed, ComputedRef, ref} from "vue";
import {IItem} from "@/types/table";

const props = defineProps<{
  modelValue: string,
  title: string,
  items: IItem[] | null,
  noDataText: string
}>()

const focus = ref(false)

const emit = defineEmits(['update:modelValue'])

const model = (value) => {
  if(focus.value) return emit('update:modelValue', value)
  if(props.items.length === 0) emit('update:modelValue', '')
}

const getItems: ComputedRef<IItem[] | null> = computed(() => props.items ? props.items : [])

const sortedSearchItems: ComputedRef<string[] | []> = computed(() => {
  if(getItems.value === null) return []
  const unique = new Set()
  getItems.value.forEach(i => {
    unique.add(i.fullName)
  })
  return Array.from(unique)
})

</script>

<style lang="scss" scoped>
</style>
