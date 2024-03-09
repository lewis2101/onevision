<template>
  <div class="filter">
    <select-filter
      :title="$t('table.type')"
      :list="listType"
      @clear="typeTransactionFilter = null"
      @filter="toFilterTypeTransaction"
    />
    <select-filter
      :title="$t('table.status')"
      :list="listStatus"
      @clear="statusFilter = null"
      @filter="toFilterStatus"
    />
    <calendar v-model="filterDate"/>
  </div>
  {{ sortedItems }}
  <base-table
      :headers="headers"
      :items="sortedItems"
      :loading="loading"
  />
</template>
<script setup lang="ts">
import BaseTable from "@/components/base-table.vue";
import {useI18n} from "vue-i18n";
import {computed, onMounted, ref, watch} from "vue";
import {IItem, IStatus, IType} from "@/types/table";
import {getHistory} from "@/api/application";
import SelectFilter from "@/components/select-filter.vue";
import {filterStatus, filterType} from "@/types/filter";
import Calendar from "@/components/calendar.vue";
import {getDatesInRange, getLastMonthDate} from "@/composables/useDate";
import dayjs from "dayjs";

const {t} = useI18n()

const typeTransactionFilter = ref<IType | null>(null)
const statusFilter = ref<IStatus | null>(null)
const filterDate = ref<string[] |null>(null)

const loading = ref(true)

const listType = computed(() => filterType(t))

const listStatus = computed(() => filterStatus(t))

watch(typeTransactionFilter, () => sort())
watch(statusFilter, () => sort())
watch(filterDate, () => sort())

const headers = computed(() => (
    [
      {title: t('table.date'), value: 'date', sortable: true},
      {title: t('table.sum'), value: 'sum', sortable: true},
      {title: t('table.type'), value: 'type', sortable: true},
      {title: t('table.status'), value: 'status', sortable: true}
    ]
))

const items = ref<IItem[] | null>(null)
const sortedItems = ref<IItem[] | null>(null)

const toFilterStatus = (value: IStatus) => statusFilter.value = value
const toFilterTypeTransaction = (value: IType) => typeTransactionFilter.value = value

const sort = async () => {
  if(!items.value) return

  const dates = getDatesInRange(new Date(filterDate.value[0]), new Date(filterDate.value[1]))

  sortedItems.value = items.value.filter(item => {
    const typeMatch = typeTransactionFilter.value ? item.type === typeTransactionFilter.value : true;
    const statusMatch = statusFilter.value ? item.status === statusFilter.value : true;
    const datesMatch = filterDate.value ? dates.includes(item.date) : true
    return typeMatch && statusMatch && datesMatch;
  });
};

const fetchData = async () => {
  try {
    const {data}: { data: IItem[] } = await getHistory()
    items.value = data
    sortedItems.value = data
  } catch(e: any) {
    console.log(e)
    throw e
  }
}

onMounted(async () => {
  filterDate.value = [
    dayjs(getLastMonthDate(new Date())).format('MM.DD.YYYY'),
    dayjs(new Date()).format('MM.DD.YYYY')
  ]
  try {
    await fetchData()
    loading.value = false
  } catch (e: any) {
    console.log(e)
  }
})

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
  flex-wrap: wrap;
}
</style>
