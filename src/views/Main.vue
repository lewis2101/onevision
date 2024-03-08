<template>
  <div class="filter">
    <v-select
        style="max-width: 250px; width: 100%;"
        clearable
        :label="$t('table.type')"
        :items="listType"
        @click:clear="typeTransactionFilter = null"
    >
      <template #item="{ props, item }">
        <v-list-item v-bind="props" @click="toFilterTypeTransaction(item.value)"></v-list-item>
      </template>
    </v-select>
    <v-select
        style="max-width: 250px; width: 100%;"
        clearable
        :label="$t('table.status')"
        :items="listStatus"
        @click:clear="statusFilter = null"
    >
      <template #item="{ props, item }">
        <v-list-item v-bind="props" @click="toFilterStatus(item.value)"></v-list-item>
      </template>
    </v-select>
  </div>
  <base-table
      :headers="headers"
      :items="sortedItems"
      :loading="loading"
  />
</template>

<script setup lang="ts">
import BaseTable from "@/components/base-table.vue";
import {useI18n} from "vue-i18n";
import {computed, ref, watch} from "vue";
import {IItem, IStatus, IType} from "@/types/table";

const {t} = useI18n()

const typeTransactionFilter = ref<IType | null>(null)
const statusFilter = ref<IStatus | null>(null)

const loading = ref(false)

const listType = computed(() => (
    [
      {
        title: t('type.buy'),
        value: 'buy',
      },
      {
        title: t('type.comeback'),
        value: 'comeback',
      },
      {
        title: t('type.subscribe'),
        value: 'subscribe',
      }
    ]
))

const listStatus = computed(() => (
    [
      {
        title: t('status.success'),
        value: 'success',
      },
      {
        title: t('status.reject'),
        value: 'reject',
      },
      {
        title: t('status.pending'),
        value: 'pending',
      }
    ]
))

watch(typeTransactionFilter, value => sort())
watch(statusFilter, value => sort())

const headers = computed(() => (
    [
      {title: t('table.date'), value: 'date', sortable: true},
      {title: t('table.sum'), value: 'sum', sortable: true},
      {title: t('table.type'), value: 'type', sortable: true},
      {title: t('table.status'), value: 'status', sortable: true}
    ]
))

const items: IItem[] = [
  {
    date: '05.02.2024',
    sum: '2534',
    type: 'buy',
    status: 'success',
    id: Date.now().toString()
  },
  {
    date: '05.02.2024',
    sum: '32453',
    type: 'buy',
    status: 'reject',
    id: Date.now().toString()
  },
  {
    date: '05.02.2024',
    sum: '3453',
    type: 'buy',
    status: 'pending',
    id: Date.now().toString()
  },
  {
    date: '05.02.2024',
    sum: '252437',
    type: 'subscribe',
    status: 'pending',
    id: Date.now().toString()
  },
  {
    date: '06.02.2024',
    sum: '25327624',
    type: 'comeback',
    status: 'success',
    id: Date.now().toString()
  },
  {
    date: '06.02.2024',
    sum: '13456',
    type: 'subscribe',
    status: 'reject',
    id: Date.now().toString()
  },
  {
    date: '06.02.2024',
    sum: '554543',
    type: 'subscribe',
    status: 'success',
    id: Date.now().toString()
  },
  {
    date: '07.02.2024',
    sum: '146363',
    type: 'buy',
    status: 'pending',
    id: Date.now().toString()
  },
  {
    date: '07.02.2024',
    sum: '10130000',
    type: 'comeback',
    status: 'reject',
    id: Date.now().toString()
  },
]
const sortedItems = ref(items)

const toFilterStatus = (value: IStatus) => statusFilter.value = value
const toFilterTypeTransaction = (value: IType) => typeTransactionFilter.value = value

const sort = () => {
  if (typeTransactionFilter.value === null && statusFilter.value === null) {
    sortedItems.value = items;
    return;
  }

  sortedItems.value = items.filter(item => {
    const typeMatch = typeTransactionFilter.value ? item.type === typeTransactionFilter.value : true;
    const statusMatch = statusFilter.value ? item.status === statusFilter.value : true;
    return typeMatch && statusMatch;
  });
};

</script>

<style lang="scss" scoped>
.filter {
  margin: 0 auto;
  padding-top: 20px;
  display: flex;
  max-width: 1200px;
  width: 100%;
  justify-content: flex-end;
  align-items: end;
  gap: 10px;
}
</style>
