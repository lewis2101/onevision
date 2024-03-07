<template>
  <div class="container">
    <v-data-table
        page-text=""
        :show-current-page="true"
        items-per-page-text="Количество"
        no-data-text="Ничего не найдено"
        :items-per-page-options="perPageOptions"
        :items="items"
        :headers="headers"
    >
      <template #item="{ item }">
        <tr class="hoverable" @click="onRowClick(item.id)">
          <td>{{ item.date }}</td>
          <td>{{ formatSum(item.sum) }}</td>
          <td>{{ $t(`type.${item.type}`) }}</td>
          <td>
            <v-chip :color="colorMapper[item.status]">
              {{ $t(`status.${item.status}`) }}
            </v-chip>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog
        v-model="modal"
        width="auto"
    >
      <v-card
          max-width="400"
          title="Транзакция"
      >
        <template #text>
          {{ currentId }}
        </template>
        <template v-slot:actions>
          <v-btn
              class="ms-auto"
              text="Ok"
              @click="modal = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {IStatus} from "@/types/table";
import {formatSum} from "@/helpers";

const props = defineProps<{
  items: Array<Record<string, string>>,
  headers: Array<Record<string, string | boolean>>,
}>()

const perPageOptions = computed(() => {
  const options = [10]
  if (props.items.length > 20) options.push(20)
  if (props.items.length > 30) options.push(30)
  return options
})

const modal = ref(false)
const currentId = ref<null | string>(null)

const colorMapper: Record<IStatus, string> = {
  'success': 'green',
  'pending': 'yellow',
  'reject': 'red'
}

const onRowClick = (id: string) => {
  currentId.value = id
  modal.value = true
  // Handle row click event here
}

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
