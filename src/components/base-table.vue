<template>
  <div class="container" v-if="getItems">
    <v-data-table
        page-text=""
        :show-current-page="true"
        items-per-page-text="Количество"
        no-data-text="Ничего не найдено"
        :items-per-page-options="perPageOptions"
        :items="getItems"
        :headers="headers"
        :loading="getLoading"
    >
      <template #item="{ item }">
        <tr class="hoverable" @click="onRowClick(item)" :style="{ color: getLoading ? 'lightgray' : '' }">
          <td>{{ item.date }}</td>
          <td>{{ item.fullName }}</td>
          <td>{{ formatSum(item.sum) }}</td>
          <td>{{ $t(`type.${item.type}`) }}</td>
          <td>
            <v-chip :style="[
              { 'color': getLoading ? 'gray' : colorMapper[item.status]},
              colorMapper[item.status]
            ]">
              {{ $t(`status.${item.status}`) }}
            </v-chip>
          </td>
        </tr>
      </template>
    </v-data-table>
    <table-details-modal
      v-model="modal"
      title="Подробнее"
      :item="currentItem"
    />
  </div>
  <div class="container" v-else>
    <v-skeleton-loader type="list-item-avatar" v-for="item in 10"></v-skeleton-loader>
  </div>
</template>

<script setup lang="ts">
import {computed, ComputedRef, ref} from "vue";
import {IItem, IStatus} from "@/types/table";
import {formatSum, formatPhone, formatDate} from "@/helpers/format";
import TableDetailsModal from "@/components/table-details-modal.vue";

const props = defineProps<{
  items: IItem[] | null,
  headers: Array<{
    title: string,
    value: string,
    sortable: boolean
  }>,
  loading: boolean
}>()

const modal = ref(false)
const currentItem = ref<null | IItem>(null)

const colorMapper: Record<IStatus, string> = {
  'success': 'green',
  'pending': 'yellow',
  'reject': 'red'
}

const onRowClick = (value: IItem) => {
  if(getLoading.value) return
  currentItem.value = value
  modal.value = true
}

const getItems: ComputedRef<IItem[]> = computed(() => props.items)

const getLoading: ComputedRef<boolean> = computed(() => props.loading)

const perPageOptions: ComputedRef<number[]> = computed(() => {
  const options = [10]
  if (getItems.value.length > 10) options.push(20)
  if (getItems.value.length > 20) options.push(30)
  return options
})

</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
}
.hoverable:hover {
  background: var(--hover);
  cursor: pointer;
}
</style>
