<template>
  <div>
    <div class="filter">
      <calendar v-model="filterDate" :loading="loading"/>
      <select-filter
        v-model="currentGraficType"
        :title="$t('table.grafic')"
        :list="listGrafic"
        :loading="loading"
        :remove-clear="true"
        @clear="currentGraficType = null"
      />
      <select-filter
        v-model="currentTypeTransaction"
        :title="$t('table.type')"
        :list="listType"
        :loading="loading"
        @clear="currentTypeTransaction = null"
      />
    </div>
    <base-grafic
        v-if="items"
        :type="currentGraficType"
        :items="items"
        :date-range="filterDate"
        :current-type="currentTypeTransaction"
    />
    <v-skeleton-loader class="skeleton" v-else type="card"></v-skeleton-loader>
  </div>
</template>

<script setup lang="ts">
import BaseGrafic from '@/components/base-grafic.vue';
import {IItem, IType} from '@/types/table';
import {computed, ComputedRef, onMounted, ref} from 'vue';
import {getHistory} from "@/api/application";
import SelectFilter from "@/components/select-filter.vue";
import {filterGrafic, filterType} from "@/types/filter";
import {useI18n} from "vue-i18n";
import Calendar from "@/components/calendar.vue";
import {getLastMonthDate} from "@/composables/useDate";

const {t} = useI18n()
const items = ref<IItem[] | null>(null)
const currentTypeTransaction = ref<IType>('buy')
const currentGraficType = ref<'line' | 'bar'>('line')
const filterDate = ref<Array<string> | null>(null)

const loading = ref(false)

const listType: ComputedRef<Record<string, string | null>[]> = computed(() => {
  const types = filterType(t)
  types.unshift({
    title: t('type.all'),
    value: null
  })
  return types
})
const listGrafic: ComputedRef<Record<string, string>[]> = computed(() => filterGrafic(t))

onMounted(async() => {
  loading.value = true
  filterDate.value = [
    getLastMonthDate(new Date()).toString(),
    new Date().toString()
  ]
  try {
    const response = await getHistory()
    items.value = response.data
    loading.value = false
  } catch (e: any) {
    console.log(e)
  }
})

</script>

<style lang="scss" scoped>
.skeleton {
  max-width: 1200px;
  margin: 0 auto;
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

</style>
