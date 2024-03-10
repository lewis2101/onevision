<template>
  <div class="container">
    <div class="overflow-canvas">
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto'
import {computed, onMounted, watch} from "vue";
import {IItem, IStatus, IType} from "@/types/table";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
import {formatDate} from "@/helpers";
import dayjs from "dayjs";
import {calculateSum, getDatesInRange} from "@/composables/useDate";

const props = defineProps<{
  items: IItem[] | null,
  currentType: IType,
  dateRange: Array<string> | null
}>()

const {t} = useI18n()
const route = useRoute()
let chart = null

const getItems = computed(() => props.items)
const getCurrentType = computed(() => props.currentType)
const labels = computed(() => {
  if(props.dateRange === null) return []
  return getDatesInRange(new Date(props.dateRange[0]), new Date(props.dateRange[1]))
})

const successItems = computed(() => {
  if (getItems.value.length === 0) return []
  return calculateSum(getItems.value, 'success', labels.value, getCurrentType.value)
})

const pendingItems = computed(() => {
  if (getItems.value.length === 0) return []
  return calculateSum(getItems.value, 'pending', labels.value, getCurrentType.value)
})

const rejectItems = computed(() => {
  if (getItems.value.length === 0) return []
  return calculateSum(getItems.value, 'reject', labels.value, getCurrentType.value)
})

const dataChart = computed(() => (
  {
    labels: labels.value,
    datasets: [
      {
        label: t('status.success'),
        data: successItems.value,
        backgroundColor: 'green',
        borderWidth: 1,
        borderColor: 'green'
      },
      {
        label: t('status.reject'),
        data: rejectItems.value,
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: 'red'
      },
      {
        label: t('status.pending'),
        data: pendingItems.value,
        backgroundColor: 'yellow',
        borderWidth: 1,
        borderColor: 'yellow'
      }
    ],
  }
))

const render = () => {
  chart.data.datasets = dataChart.value.datasets
  chart.data.labels = dataChart.value.labels
  chart.update()
}

const draw = () => {
  const myChart = document.getElementById('myChart') as HTMLCanvasElement
  if (!myChart) return
  const ctx = myChart.getContext('2d')

  chart = new Chart(ctx, {type: 'line', data: dataChart.value})
}

watch(getCurrentType, () => render())
watch(labels, () => render())
watch(() => route.params.locale, () => render())

onMounted(() => {
  draw()
})

</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 90vw;
  margin: 0 auto;
  overflow: auto;
}
.overflow-canvas {
  overflow: auto;
  max-width: 1200px;
  min-width: 1000px;
  width: 100%;
}
</style>
