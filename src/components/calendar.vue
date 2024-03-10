<template>
  <v-btn icon="mdi-calendar" @click="modal = true"></v-btn>
  <base-modal title="Календарь" v-model="modal">
    <VueDatePicker
      v-model="date"
      :clearable="false"
      class="calendar"
      select-text="Выбрать"
      cancel-text="Отмена"
      locale="ru"
      date
      range
      model-auto
      focus-start-date
      inline
      auto-apply
    />
    <div class="centered">
      <v-btn @click="modal = false">Сохранить</v-btn>
    </div>
  </base-modal>
</template>
<script setup lang="ts">
import {computed, ref, WritableComputedRef} from "vue";
import dayjs from "dayjs";
import BaseModal from "@/components/base-modal.vue";

const props = defineProps<{
  modelValue: string[] | null
}>()

const modal = ref(false)

const emit = defineEmits(['update:modelValue'])

const date: WritableComputedRef<string[] | null> = computed({
  get: () => props.modelValue,
  set: e => emit('update:modelValue', e)
})

</script>

<style lang="scss" scoped>
.calendar {
  margin-bottom: 20px;
}
.centered {
  display: flex;
  justify-content: flex-end;
}
</style>
