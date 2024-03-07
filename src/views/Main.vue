<template>
  <base-layout>
    <template #header>
      <base-header/>
    </template>
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
  </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from "@/components/base-layout.vue";
import BaseHeader from "@/components/base-header.vue";
import BaseTable from "@/components/base-table.vue";
import {formatDate} from "@/helpers";
import {useI18n} from "vue-i18n";
import {computed, onMounted, ref, watch} from "vue";
import {IItem, IStatus, IType} from "@/types/table";

const {t} = useI18n()

const typeTransactionFilter = ref<IType | null>(null)
const statusFilter = ref<IStatus | null>(null)

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1500)
})

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

watch(typeTransactionFilter, value => {
  if(value === null) sort()
})

watch(statusFilter, value => {
  if(value === null) sort()
})
const toFilterStatus = (value: IStatus) => {
  statusFilter.value = value
  sort()
}

const toFilterTypeTransaction = (value: IType) => {
  typeTransactionFilter.value = value
  sort()
}

const sort = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    if(typeTransactionFilter.value === null && statusFilter.value === null) return sortedItems.value = items

    sortedItems.value = items.filter(i => {
      if (typeTransactionFilter.value && statusFilter.value) return i.type === typeTransactionFilter.value && i.status === statusFilter.value
      if(typeTransactionFilter.value) return i.type === typeTransactionFilter.value
      if(statusFilter.value) return i.status === statusFilter.value
    })
  }, 500)
}

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
    date: formatDate(new Date().toString()),
    sum: '2534',
    type: 'buy',
    status: 'success',
    id: Date.now().toString()
  },
  {
    date: formatDate(new Date().toString()),
    sum: '32453',
    type: 'buy',
    status: 'reject',
    id: Date.now().toString()
  },
  {
    date: formatDate(new Date().toString()),
    sum: '3453',
    type: 'buy',
    status: 'pending',
    id: Date.now().toString()
  },
  {
    date: formatDate(new Date().toString()),
    sum: '25243523434',
    type: 'subscribe',
    status: 'pending',
    id: Date.now().toString()
  },
  {
    date: formatDate(new Date().toString()),
    sum: '25327624',
    type: 'comeback',
    status: 'success',
    id: Date.now().toString()
  },
  {
    date: formatDate(new Date().toString()),
    sum: '13456',
    type: 'subscribe',
    status: 'reject',
    id: Date.now().toString()
  },
  {
    date: formatDate(new Date().toString()),
    sum: '554543',
    type: 'subscribe',
    status: 'success',
    id: Date.now().toString()
  },
  {
    date: formatDate(new Date().toString()),
    sum: '146363',
    type: 'buy',
    status: 'pending',
    id: Date.now().toString()
  },
  {
    date: formatDate(new Date().toString()),
    sum: '10130000',
    type: 'comeback',
    status: 'reject',
    id: Date.now().toString()
  },
]
const sortedItems = ref(items)

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
