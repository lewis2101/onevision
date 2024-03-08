<template>
  <div>
    <base-grafic ref="grafic" :items="sortedItems"/>
  </div>
</template>

<script setup lang="ts">
import BaseGrafic from '@/components/base-grafic.vue';
import {IItem} from '@/types/table';
import {ref} from 'vue';


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
</script>

<style lang="scss" scoped>

</style>
