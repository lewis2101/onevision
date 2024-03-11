<template>
  <v-btn
    icon="mdi-calendar"
    @click="modal = true"
    :loading="getLoading"
    :disabled="getLoading"
  >
  </v-btn>
  <base-modal :title="$t('calendar.title')" v-model="modal">
    <VueDatePicker
      v-model="date"
      :clearable="false"
      class="calendar"
      locale="ru"
      date
      range
      model-auto
      focus-start-date
      inline
      auto-apply
    />
    <div class="centered">
      <v-btn :disabled="disabled" @click="save">{{ $t('calendar.save') }}</v-btn>
    </div>
  </base-modal>
</template>
<script setup lang="ts">
import {computed, ComputedRef, ref, watch, WritableComputedRef} from "vue";
import dayjs from "dayjs";
import BaseModal from "@/components/base-modal.vue";
import {getLastMonthDate} from "@/composables/useDate";

const props = defineProps<{
  modelValue: string[] | null,
  loading: boolean
}>()

const modal = ref(false)
const disabled = ref(false)

const emit = defineEmits(['update:modelValue'])

const save = () => modal.value = false

const date: WritableComputedRef<string[] | null> = computed({
  get: () => props.modelValue,
  set: e => emit('update:modelValue', e)
})

const getLoading: ComputedRef<boolean> = computed(() => props.loading)

watch(date, value => {
  disabled.value = !Array.isArray(value)
})
watch(modal, () => {
  if(!Array.isArray(date.value)) date.value = [
    getLastMonthDate(new Date()).toString(),
    new Date().toString()
  ]
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
