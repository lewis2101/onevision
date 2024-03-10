<template>
  <v-select
    v-model="model"
    class="select"
    :clearable="getClearable"
    :label="getTitle"
    :items="list"
    bg-color="white"
    @click:clear="$emit('clear')"
    :loading="getLoading"
  >
    <template #item="{ props, item }">
      <v-list-item v-bind="props"></v-list-item>
    </template>
  </v-select>
</template>

<script setup lang="ts">
import {computed, ComputedRef, WritableComputedRef} from "vue";

const props = defineProps<{
  modelValue: string | null,
  list: Record<string, string>[],
  title: string,
  loading?: boolean,
  removeClear?: boolean
}>()

const emit = defineEmits(['clear', 'update:modelValue'])

const getTitle: ComputedRef<string> = computed(() => props.title)

const model: WritableComputedRef<string | null> = computed({
  get: () => props.modelValue,
  set: e => emit('update:modelValue', e)
})

const getLoading: ComputedRef<boolean> = computed(() => props.loading ? props.loading : false)
const getClearable: ComputedRef<boolean> = computed(() => !props.removeClear)

</script>

<style lang="scss" scoped>
.select {
  max-width: 250px;
  width: 100%;
}
</style>
