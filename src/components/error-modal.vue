<template>
  <v-dialog
    v-model="modal"
    width="auto"
  >
    <v-card
      max-width="400"
      min-width="300"
      prepend-icon="mdi-alert"
      text="Сервер не отвечает"
      title="Ошибка"
    >
      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          text="Ok"
          @click="dialog = false"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";

const dialog = ref(true)

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const modal = computed({
  get: () => props.modelValue,
  set: e => emit('update:modelValue', e)
})

</script>

<style lang="scss" scoped>

</style>
