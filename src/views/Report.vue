<template>
  <div>
    <div class="filter">
      <calendar
        v-model="filterDate"
        :loading="loading"
      />
      <select-filter
        v-model="selectType"
        :title="$t('table.type')"
        :list="listType"
        :loading="loading"
        @clear="selectType = null"
      />
    </div>
    <report-table
      v-if="items"
      :headers="headers"
      :items="calculatedItems"
    />
    <div class="container" v-else>
      <v-skeleton-loader type="list-item-avatar" v-for="item in 3"></v-skeleton-loader>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed, ComputedRef, onMounted, ref, watch} from "vue";
import ReportTable from "@/components/report-table.vue";
import {IReportItem, IReportList} from "@/types/report";
import {getHistory} from "@/api/application";
import {IItem, IStatus, IType, statusList} from "@/types/table";
import {calculateAllSum, getDatesInRange, getLastMonthDate} from "@/composables/useDate";
import Calendar from "@/components/calendar.vue";
import SelectFilter from "@/components/select-filter.vue";
import {filterType} from "@/types/filter";

const {t} =  useI18n()

const items = ref<IItem[] | null>(null)
const filterDate = ref<Array<string> | null>(null)
const loading = ref(false)
const status = ref<IStatus[]>(['success', 'pending', 'reject'])
const selectType = ref<IType>('buy')

const calculatedItems = ref<IReportItem[]>([
  {
    status: 'success',
    sum: '0'
  },
  {
    status: 'pending',
    sum: '0'
  },
  {
    status: 'reject',
    sum: '0'
  }
])

const calculate = () => {
  status.value.forEach((i, idx) => {
    calculatedItems.value[idx].sum = calculateAllSum(items.value, i, labels.value, selectType.value).toString()
  })
}

const listType: ComputedRef<Record<string, string | null>[]> = computed(() => filterType(t))

const labels: ComputedRef<string[] | []> = computed(() => {
  if(filterDate === null) return []
  return getDatesInRange(new Date(filterDate.value[0]), new Date(filterDate.value[1]))
})

const headers: ComputedRef<IReportList[]> = computed(() => (
  [
    t('table.status'),
    t('table.sum')
  ]
))

onMounted(async () => {
  loading.value = true
  filterDate.value = [
    getLastMonthDate(new Date()).toString(),
    new Date().toString()
  ]
  try {
    const response = await getHistory()
    items.value = response.data
    calculate()
    loading.value = false
  } catch (e: any) {
    console.log(e)
  }
})

watch(selectType, () => calculate())
watch(filterDate, () => calculate())

</script>

<style lang="scss" scoped>
.table {
  border: 1px #000000 solid;
  padding: 10px;
}
.filter {
  margin: 0 auto;
  display: flex;
  max-width: 1200px;
  width: 100%;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}
.container {
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
}
</style>
