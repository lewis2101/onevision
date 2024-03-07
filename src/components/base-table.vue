<template>
  <div class="container">
    <v-data-table
      page-text=""
      :show-current-page="true"
      items-per-page-text="Количество"
      :items-per-page-options="perPageOptions"
      :items="items"
      :headers="headers"
      @click:row="onRowClick"
    >
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  items: Array<Record<string, string>>,
  headers: Array<Record<string, string>>,
}>()

const perPageOptions = computed(() => {
  const options = [10]
  if(props.items.length > 20) options.push(20)
  if(props.items.length > 30) options.push(30)
  return options
})

const onRowClick = (_, data) => {
  console.log('Clicked on row:', data.item.id);
  // Handle row click event here
}

</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
}
</style>
