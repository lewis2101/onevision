<template>
  <div class="autocomplete-container">
    <base-autocomplete
      v-model="search"
      :no-data-text="$t('search.non')"
      :title="$t('search.title')"
      :items="sortedItems"
      :loading="loading"
      class="autocomplete"
    />
  </div>
  <div class="filter">
    <calendar v-model="filterDate" :loading="loading"/>
    <base-accordion title="Фильтр" :loading="loading">
      <select-filter
        v-model="typeTransactionFilter"
        :title="$t('table.type')"
        :list="listType"
        @clear="typeTransactionFilter = null"
      />
      <select-filter
        v-model="statusFilter"
        :title="$t('table.status')"
        :list="listStatus"
        @clear="statusFilter = null"
      />
    </base-accordion>
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
import {computed, ComputedRef, onMounted, ref, watch} from "vue";
import {IItem, IStatus, IType} from "@/types/table";
import {getHistory} from "@/api/application";
import SelectFilter from "@/components/select-filter.vue";
import {filterStatus, filterType} from "@/types/filter";
import Calendar from "@/components/calendar.vue";
import {getDatesInRange, getLastMonthDate} from "@/composables/useDate";
import BaseAutocomplete from "@/components/base-autocomplete.vue";
import BaseAccordion from "@/components/base-accordion.vue";

const {t} = useI18n()

const typeTransactionFilter = ref<IType | null>(null)
const statusFilter = ref<IStatus | null>(null)
const filterDate = ref<string[] | null>(null)
const search = ref('')

const loading = ref(true)

const items = ref<IItem[] | null>(null)
const sortedItems = ref<IItem[] | null>(null)

const sort = async () => {
  if (!items.value) return

  const dates = getDatesInRange(new Date(filterDate.value[0]), new Date(filterDate.value[1]))

  sortedItems.value = items.value.filter(item => {
    const typeMatch = typeTransactionFilter.value ? item.type === typeTransactionFilter.value : true
    const statusMatch = statusFilter.value ? item.status === statusFilter.value : true
    const datesMatch = filterDate.value ? dates.includes(item.date) : true
    const nameMatch = search.value ? item.fullName.toLowerCase().includes(search.value.toLowerCase()) : true
    return typeMatch && statusMatch && datesMatch && nameMatch;
  });
};

const fetchData = async () => {
  try {
    const response = await getHistory()
    items.value = response.data
    sortedItems.value = response.data
  } catch (e: any) {
    console.log(e)
    throw e
  }
}

const listType: ComputedRef<Record<string, string>[]> = computed(() => filterType(t))
const listStatus: ComputedRef<Record<string, string>[]> = computed(() => filterStatus(t))

const headers = computed(() => (
  [
    {title: t('table.date'), value: 'date', sortable: true},
    {title: t('table.name'), value: 'fullName', sortable: true},
    {title: t('table.sum'), value: 'sum', sortable: true},
    {title: t('table.type'), value: 'type', sortable: true},
    {title: t('table.status'), value: 'status', sortable: true}
  ]
))

onMounted(async () => {
  filterDate.value = [
    getLastMonthDate(new Date()).toString(),
    new Date().toString()
  ]
  try {
    await fetchData()
    loading.value = false
  } catch (e: any) {
    console.log(e)
  }
})

watch(typeTransactionFilter, () => sort())
watch(statusFilter, () => sort())
watch(filterDate, () => sort())
watch(search, () => sort())

</script>

<style lang="scss" scoped>
.filter {
  margin: 0 auto;
  display: flex;
  max-width: 1200px;
  width: 100%;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.autocomplete-container {
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}

.autocomplete {
  max-width: 500px;
  width: 100%;
}
</style>
