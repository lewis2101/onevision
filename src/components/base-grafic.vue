<template>
  <div class="container">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto'
import {computed, onMounted, watch} from "vue";
import {IItem, IStatus, IType} from "@/types/table";
import {useI18n} from "vue-i18n";

const props = defineProps<{
  items: IItem[] | null,
  currentType: IType
}>()

const {t} = useI18n()
let chart = null

const getItems = computed(() => props.items)
const getCurrentType = computed(() => props.currentType)

watch(getCurrentType, () => {
  chart.data.datasets = []
  chart.data.datasets = dataChart.value.datasets
  chart.update()
})

const labels = computed(() => {
  const uniqueDates = new Set();
  getItems.value.forEach(i => {
    uniqueDates.add(i.date);
  });
  return Array.from(uniqueDates);
})

const calculateSum = (items: IItem[], status: IStatus) => {
  if (items.length === 0) return []

  const calculatedArray = JSON.parse(JSON.stringify(labels.value))
  calculatedArray.fill(0)

  labels.value.forEach((i, idx) => {
    items.forEach(j => {
      if (i === j.date && j.status === status || getCurrentType.value === j.type)
        calculatedArray[idx] += +j.sum
    })
  })
  return calculatedArray
}

const successItems = computed(() => {
  if (getItems.value.length === 0) return []
  return calculateSum(getItems.value, 'success')
})

const pendingItems = computed(() => {
  if (getItems.value.length === 0) return []
  return calculateSum(getItems.value, 'pending')
})

const rejectItems = computed(() => {
  if (getItems.value.length === 0) return []
  return calculateSum(getItems.value, 'reject')
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

const draw = () => {
  const myChart = document.getElementById('myChart') as HTMLCanvasElement
  if (!myChart) return
  const ctx = myChart.getContext('2d')

  chart = new Chart(ctx, { type: 'line', data: dataChart.value })
}

onMounted(() => {
  draw()
})

</script>

<style lang="scss" scoped>
.container {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
}
</style>
