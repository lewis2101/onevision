<template>
  <v-select
    class="select"
    clearable
    :label="getTitle"
    :items="list"
    @click:clear="$emit('clear')"
  >
    <template #item="{ props, item }">
      <v-list-item
        v-bind="props"
        @click="$emit('filter', item.value)"
      ></v-list-item>
    </template>
  </v-select>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  list: Array<{
    title: string,
    value: string
  }>,
  title: string
}>()

const getTitle = computed(() => props.title)

defineEmits(['clear', 'filter'])

</script>

<style lang="scss" scoped>
.select {
  max-width: 250px;
  width: 100%;
}
</style>
