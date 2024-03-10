<template>
  <div class="container">
    <v-sheet class="form">
      <base-login-form
        v-model="form"
        :on-submit="submit"
        :rules="rules"
        :error="error"
        :loading="loading"
        />
    </v-sheet>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {IAuth} from "@/types/auth";
import {auth} from "@/api/auth";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import BaseLoginForm from "@/components/base-login-form.vue";

const {locale} = useI18n()

const router = useRouter()

const form = reactive<IAuth>({
  userName: '',
  password: ''
})

const loading = ref(false)
const error = ref(false)

const rules: Array<(value: string) => string | boolean> =  [
  value => {
    if (value) return true

    return 'Введите данные'
  },
]

const submit = async () => {
  loading.value = true
  try {
    const { data } = await auth(form)
    localStorage.setItem('token', data.token)
    await router.push('/')
  } catch (e: any) {
    error.value = true
    console.log(e)
  } finally {
    loading.value = false
  }
}

watch(form, () => error.value = false)

</script>

<style lang="scss" scoped>
@use '@/style/mixins/breakpoints' as *;

.form {
  max-width: 400px;
  height: fit-content;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  @include breakpoint_up(sm) {
    max-width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
}
.container {
  padding-top: 20px;
  background: gray;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  @include breakpoint_up(sm) {
    align-items: start;
    padding: 0;
  }
}
.error {
  color: red;
  text-align: center;
}
</style>
