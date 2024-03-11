<template>
  <v-dialog
    v-model="modal"
    width="auto"
  >
    <v-card
      max-width="400"
      min-width="300"
      prepend-icon="mdi-alert"
      :text="$t('error.subtitle')"
      :title="$t('error.title')"
    >
      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          text="Ok"
          @click="modal = false"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {computed, WritableComputedRef} from "vue";
import error from '@/composables/useError'

const props = defineProps<{
  modelValue: boolean
}>()

const modal: WritableComputedRef<boolean> = computed({
  get: () => props.modelValue,
  set: e => !e ? error.hide() : error.show()
})

</script>

<style lang="scss" scoped>

</style>
