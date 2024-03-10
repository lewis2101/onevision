<template>
  <base-modal
    :title="title"
    v-model="modal"
  >
    <div class="item">
      <h2>Номер транзакции: №{{ currentItem.id }}</h2>
      <div>ФИО: {{ currentItem.fullName }}</div>
      <div>Сумма: {{ formatSum(currentItem.sum) }}₸</div>
      <div>Город: Алматы</div>
      <div>Номер: <a :href="`tel:${'7083795484'}`">{{ formatPhone('7083795484') }}</a></div>
      <div>Статус: {{ $t(`status.${currentItem.status}`) }}</div>
      <div>Тип: {{ $t(`type.${currentItem.type}`) }}</div>
      <div>Дата: {{ currentItem.date }}</div>
      <div class="centered">
        <v-btn @click="modal = false">Назад</v-btn>
      </div>
    </div>
  </base-modal>
</template>

<script setup lang="ts">
import BaseModal from "@/components/base-modal.vue";
import {computed, ComputedRef} from "vue";
import {formatPhone, formatSum} from "@/helpers";
import {IItem} from "@/types/table";

const props = defineProps<{
  modelValue: boolean,
  title: string,
  item: IItem
}>()

const emit = defineEmits(['update:modelValue'])

const modal = computed({
  get: () => props.modelValue,
  set: e => emit('update:modelValue', e)
})

const currentItem: ComputedRef<IItem> = computed(() => props.item)

</script>

<style lang="scss" scoped>
.item {
  padding: 10px;
  min-width: 300px;
}
.centered {
  display: flex;
  justify-content: flex-end;
}
</style>
