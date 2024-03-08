<template>
  <div>
    <base-grafic
        v-if="items"
        :items="items"
    />
  </div>
</template>

<script setup lang="ts">
import BaseGrafic from '@/components/base-grafic.vue';
import {IItem} from '@/types/table';
import {onMounted, ref} from 'vue';
import {getHistory} from "@/api/application";

const items = ref<IItem[] | null>(null)

onMounted(async() => {
  try {
    const { data }: { data: IItem[] } = await getHistory()
    items.value = data
  } catch (e: any) {
    console.log(e)
  }
})

</script>

<style lang="scss" scoped>

</style>
