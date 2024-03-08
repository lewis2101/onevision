<template>
  <div class="container">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto'
import {computed, onMounted, ref, watch} from "vue";
import {IItem, IStatus} from "@/types/table";

const props = defineProps<{
  items: IItem[]
}>()

const chart = ref<any>(null)

const getItems = computed(() => {
  return props.items
})

const labels = computed(() => {
  const uniqueDates = new Set();
  getItems.value.forEach(item => {
    uniqueDates.add(item.date);
  });
  return Array.from(uniqueDates);
})

const calculateSum = (items: IItem[], status: IStatus) => {
  if (items.length === 0) return []

  const calculatedArray = JSON.parse(JSON.stringify(labels.value))
  calculatedArray.fill(0)

  labels.value.forEach((i, idx) => {
    items.forEach(j => {
      if (i === j.date && j.status === status) calculatedArray[idx] += Number(j.sum)
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
          label: 'Success',
          data: successItems.value,
          backgroundColor: 'green',
          borderWidth: 1,
          borderColor: 'green'
        },
        {
          label: 'Reject',
          data: rejectItems.value,
          backgroundColor: 'red',
          borderWidth: 1,
          borderColor: 'red'
        },
        {
          label: 'Pending',
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

  chart.value = new Chart(
      ctx,
      {
        type: 'line',
        data: dataChart.value
      }
  )
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