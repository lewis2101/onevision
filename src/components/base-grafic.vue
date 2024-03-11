<template>
  <div class="container">
    <div class="overflow-canvas">
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto'
import {computed, ComputedRef, onMounted, watch} from "vue";
import {IDataChart, IItem, IStatus, IType} from "@/types/table";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
import {formatDate} from "@/helpers/format";
import dayjs from "dayjs";
import {calculateSum, getDatesInRange} from "@/composables/useDate";

const props = defineProps<{
  items: IItem[] | null,
  currentType: IType,
  dateRange: Array<string> | null,
  type: 'bar' | 'line',
}>()

const {t} = useI18n()
const route = useRoute()
let chart = null

const draw = () => {
  const myChart = document.getElementById('myChart') as HTMLCanvasElement
  if (!myChart) return
  const ctx = myChart.getContext('2d')

  chart = new Chart(ctx, {type: getTypeGrafic.value, data: dataChart.value})
}

const render = () => {
  chart.destroy()
  draw()
}

const getTypeGrafic: ComputedRef<'line' | 'bar'> = computed(() => props.type)
const getItems: ComputedRef<IItem[] | null> = computed(() => props.items)
const getCurrentType: ComputedRef<IType> = computed(() => props.currentType)
const labels: ComputedRef<string[] | []> = computed(() => {
  if(props.dateRange === null) return []
  return getDatesInRange(new Date(props.dateRange[0]), new Date(props.dateRange[1]))
})

const successItems: ComputedRef<number[] | []> = computed(() => {
  if (getItems.value.length === 0) return []
  return calculateSum(getItems.value, 'success', labels.value, getCurrentType.value)
})

const pendingItems: ComputedRef<number[] | []> = computed(() => {
  if (getItems.value.length === 0) return []
  return calculateSum(getItems.value, 'pending', labels.value, getCurrentType.value)
})

const rejectItems: ComputedRef<number[] | []> = computed(() => {
  if (getItems.value.length === 0) return []
  return calculateSum(getItems.value, 'reject', labels.value, getCurrentType.value)
})

const dataChart: ComputedRef<IDataChart> = computed(() => (
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

onMounted(() => {
  draw()
})

watch(getCurrentType, () => render())
watch(labels, value => {
  value.length > 0 && render()
})
watch(getTypeGrafic, () => render())
watch(() => route.params.locale, () => render())

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
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
