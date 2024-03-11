<template>
  <base-modal
    :title="title"
    v-model="modal"
  >
    <div class="item">
      <h2>{{ $t('details.id') }}: №{{ currentItem.id }}</h2>
      <div>{{ $t('details.fullName') }}: {{ currentItem.fullName }}</div>
      <div>{{ $t('details.sum') }}: {{ formatSum(currentItem.sum) }}₸</div>
      <div>{{ $t('details.city') }}: {{ currentItem.city }}</div>
      <div>{{ $t('details.phone') }}: <a :href="`tel:${'7083795484'}`">{{ formatPhone('7083795484') }}</a></div>
      <div>{{ $t('details.status') }}: {{ $t(`status.${currentItem.status}`) }}</div>
      <div>{{ $t('details.type') }}: {{ $t(`type.${currentItem.type}`) }}</div>
      <div>{{ $t('details.date') }}: {{ currentItem.date }}</div>
      <div class="centered">
        <v-btn @click="modal = false">{{ $t('details.back') }}</v-btn>
      </div>
    </div>
  </base-modal>
</template>

<script setup lang="ts">
import BaseModal from "@/components/base-modal.vue";
import {computed, ComputedRef, WritableComputedRef} from "vue";
import {formatPhone, formatSum} from "@/helpers/format";
import {IItem} from "@/types/table";

const props = defineProps<{
  modelValue: boolean,
  title: string,
  item: IItem | null
}>()

const emit = defineEmits(['update:modelValue'])

const modal: WritableComputedRef<boolean> = computed({
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
