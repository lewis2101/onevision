<template>
  <v-form @submit.prevent="onSubmit">
    <h1 class="title">Авторизация</h1>
    <v-text-field
      v-model="model.userName"
      :rules="rules"
      label="Логин"
      class="input"
    ></v-text-field>
    <v-text-field
      type="password"
      v-model="model.password"
      :rules="rules"
      label="Пароль"
    ></v-text-field>
    <div class="error" v-if="getError">Неверные данные</div>
    <v-btn class="mt-2" type="submit" color="black" block :loading="getLoading">Авторизоваться</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import {computed, ComputedRef, WritableComputedRef} from "vue";
import {IAuth} from "@/types/auth";

const props = defineProps<{
  modelValue: IAuth,
  rules: Array<(value: string) => string | boolean>,
  onSubmit: () => void,
  error: boolean,
  loading: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const model: WritableComputedRef<IAuth> = computed({
  get: () => props.modelValue,
  set: e => emit('update:modelValue', e)
})

const getError: ComputedRef<boolean> = computed(() => props.error)
const getLoading: ComputedRef<boolean> = computed(() => props.loading)

</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
}
</style>
