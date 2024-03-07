<template>
  <base-layout>
    <template #header>
      <base-header/>
    </template>
    <!--    <input type="text" placeholder="search" v-model="model">-->
    <div class="filter">
      <v-btn @click="filter = true">{{ $t('filter') }}</v-btn>
    </div>
    <base-table :headers="headers" :items="items"/>
    <v-dialog
      v-model="filter"
      width="auto"
    >
      <v-card
        max-width="400"
        title="Фильтр"
      >
        <template #text>
          <div style="margin-bottom: 10px;">От:
            <v-btn>
              <input type="date" style="outline: none">
            </v-btn>
          </div>
          <div>До:
          <v-btn>
            <input type="date" style="outline: none">
          </v-btn>
          </div>
        </template>
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="filter = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </base-layout>
</template>

<script setup lang="ts">
import levenshtein from 'js-levenshtein';
import BaseLayout from "@/components/base-layout.vue";
import BaseHeader from "@/components/base-header.vue";
import BaseTable from "@/components/base-table.vue";
import {formatDate, formatSum} from "@/helpers";
import {useI18n} from "vue-i18n";
import {computed, ref, watch} from "vue";

const {t} = useI18n()

const model = ref('')
const filter = ref(false)

// watch(model, value => {
//   const query = value.toLowerCase();
//   console.log(query)
//   if(!query) sortedItems.value = items
//
//   sortedItems.value = items.filter(item => {
//     const itemDate = item.date.toLowerCase();
//     const itemSum = item.sum.toLowerCase();
//     const itemType = item.type.toLowerCase();
//     const itemDetails = item.details.toLowerCase();
//
//     if(isContains(itemDate, query)) return isContains(itemDate, query)
//     if(isContains(itemSum, query)) return isContains(itemSum, query)
//     if(isContains(itemType, query)) return isContains(itemType, query)
//     if(isContains(itemDetails, query)) return isContains(itemDetails, query)
//
//   })
// })

const isContains = (text: string, query: string) => {
  if (text.includes(query) || levenshtein(query, text) <= 3) return text.includes(query) || levenshtein(query, text) <= 3
}

const headers = computed(() => (
  [
    {title: t('table.date'), value: 'date', sortable: true},
    {title: t('table.sum'), value: 'sum', sortable: true},
    {title: t('table.type'), value: 'type', sortable: true},
    {title: t('table.details'), value: 'details', sortable: true}
  ]
))

const items = [
  {
    date: formatDate(new Date()),
    sum: formatSum('100000'),
    type: 'Покупка',
    details: 'Успешно',
    id: Date.now()
  },
  {
    date: formatDate(new Date()),
    sum: formatSum('100000'),
    type: 'Баука',
    details: 'Успешно',
    id: Date.now()
  },
  {
    date: formatDate(new Date()),
    sum: formatSum('100000'),
    type: 'Покупка',
    details: 'Успешно',
    id: Date.now()
  },
  {
    date: formatDate(new Date()),
    sum: formatSum('100000'),
    type: 'Покупка',
    details: 'Успешно',
    id: Date.now()
  },
  {
    date: formatDate(new Date()),
    sum: formatSum('100000'),
    type: 'Покупка',
    details: 'Успешно',
    id: Date.now()
  },
]

// const sortedItems = ref(items)

</script>

<style lang="scss" scoped>
.filter {
  margin: 0 auto;
  padding-top: 20px;
  display: flex;
  max-width: 1200px;
  width: 100%;
  justify-content: flex-end;
  align-items: end;
}
</style>
