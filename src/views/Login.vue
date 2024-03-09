<template>
  <div class="container">
    <v-sheet class="mx-auto form">
      <v-form @submit.prevent="submit">
        <h1 class="title">Авторизация</h1>
        <v-text-field
          v-model="form.userName"
          :rules="rules"
          label="Логин"
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="form.password"
          :rules="rules"
          label="Пароль"
        ></v-text-field>
        <div class="error" v-if="error">Неверные данные</div>
        <v-btn class="mt-2" type="submit" color="black" block :loading="loading">Авторизоваться</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {IAuth} from "@/types/auth";
import {auth} from "@/api/auth";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

const {locale} = useI18n()

const router = useRouter()

const form = reactive<IAuth>({
  userName: '',
  password: ''
})

const loading = ref(false)
const error = ref(false)

watch(form, () => error.value = false)

const rules =  [
  value => {
    if (value) return true

    return 'Введите данные'
  },
]

const submit = async () => {
  loading.value = true
  try {
    const { data } = await auth(form)
    const { token } = data
    localStorage.setItem('token', token)
    await router.push('/')
  } catch (e: any) {
    error.value = true
    console.log(e)
  } finally {
    loading.value = false
  }
}

</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
}
.form {
  max-width: 400px;
  height: fit-content;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
}
.container {
  padding-top: 20px;
  background: gray;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
}
.error {
  color: red;
  text-align: center;
}
</style>
