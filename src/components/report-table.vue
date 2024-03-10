<template>
  <v-table class="report-table">
    <thead>
    <tr>
      <th class="text-left" v-for="header in getHeaders" :key="headers">
        {{ header }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="(item, idx) in getItems"
      :key="idx"
    >
      <td>{{ $t(`status.${item.status}`) }}</td>
      <td>{{ formatSum(item.sum) }}</td>
    </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import {computed, ComputedRef} from "vue";
import {IReportItem, IReportList} from "@/types/report";
import {formatSum} from "../helpers/format";

const props = defineProps<{
  headers: IReportList[],
  items: IReportItem[]
}>()

const getHeaders: ComputedRef<IReportList[]> = computed(() => props.headers)
const getItems: ComputedRef<IReportItem[]> = computed(() => props.items)

</script>

<style lang="scss" scoped>
.report-table {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
</style>
