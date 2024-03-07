<template>
  <div>
    <v-btn
      :class="{ disabled: getLocale !== 'kk' }"
      @click="changeLocale('kk')"
    >
      Каз
    </v-btn>
    <v-btn
      :class="{ disabled: getLocale !== 'ru' }"
      @click="changeLocale('ru')"
    >
      Рус
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import {setLocale} from "@/plugins/i18n";

const {locale} = useI18n()

const getLocale = computed(() => locale.value)

const changeLocale = (lang: 'ru' | 'kk') => setLocale(lang)

</script>

<style lang="scss" scoped>

.disabled {
  color: #B4BBB4;
}

</style>
