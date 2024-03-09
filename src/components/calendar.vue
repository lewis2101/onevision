<template>
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
  />
</template>
<script setup lang="ts">
import {computed} from "vue";
import dayjs from "dayjs";

const props = defineProps<{
  modelValue: string[] | null
}>()

const emit = defineEmits(['update:modelValue'])

const date = computed({
  get: () => props.modelValue,
  set: e => {
    const startDate = dayjs(e[0]).format('MM.DD.YYYY')
    const endDate = dayjs(e[1]).format('MM.DD.YYYY')
    emit('update:modelValue', [startDate, endDate])
  }
})

</script>

<style lang="scss" scoped>
.calendar {
  margin-bottom: 20px;
}
</style>
