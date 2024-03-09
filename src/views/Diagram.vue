<template>
  <div>
    <div class="filter">
      <select-filter
        :title="$t('table.type')"
        :list="listType"
        @clear="currentTypeTransaction = null"
        @filter="setTypeTransaction"
      />
      <VueDatePicker
        v-model="filterDate"
        :clearable="false"
        class="calendar"
        select-text="Выбрать"
        cancel-text="Отмена"
        locale="ru"
        date
        range
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
import {computed, onMounted, ref, watch} from 'vue';
import {getHistory} from "@/api/application";
import SelectFilter from "@/components/select-filter.vue";
import {filterType} from "@/types/filter";
import {useI18n} from "vue-i18n";
import dayjs from 'dayjs';

const {t} = useI18n()
const items = ref<IItem[] | null>(null)
const currentTypeTransaction = ref<IType | null>(null)
const filterDate = ref<Array<string> | null>(null)

const getLastMonthDate = (date) => {
  const lastMonthDate = new Date(date);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  return lastMonthDate;
}

const setTypeTransaction = (value: IType) => currentTypeTransaction.value = value

const listType = computed(() => filterType(t))

onMounted(async() => {
  filterDate.value = [
    dayjs(getLastMonthDate(new Date())).format('MM.DD.YYYY'),
    dayjs(new Date()).format('MM.DD.YYYY')
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
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  justify-content: flex-end;
  align-items: end;
}

.calendar {
  margin-bottom: 20px;
}
</style>
