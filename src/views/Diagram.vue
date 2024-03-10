<template>
  <div>
    <div class="filter">
      <calendar v-model="filterDate"/>
      <select-filter
        v-model="currentTypeTransaction"
        :title="$t('table.type')"
        :list="listType"
        @clear="currentTypeTransaction = null"
      />
    </div>
    <base-grafic
        v-if="items"
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
import {filterType} from "@/types/filter";
import {useI18n} from "vue-i18n";
import Calendar from "@/components/calendar.vue";
import {getLastMonthDate} from "@/composables/useDate";

const {t} = useI18n()
const items = ref<IItem[] | null>(null)
const currentTypeTransaction = ref<IType | null>(null)
const filterDate = ref<Array<string> | null>(null)

const listType: ComputedRef<Record<string, string>[]> = computed(() => filterType(t))

onMounted(async() => {
  filterDate.value = [
    getLastMonthDate(new Date()).toString(),
    new Date().toString()
  ]
  try {
    const { data }: { data: IItem[] } = await getHistory()
    items.value = data
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
