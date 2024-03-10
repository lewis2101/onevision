<template>
  <div>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">
          {{ getLocale === 'ru' ? 'Рус' : 'Каз' }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="changeLocale('ru')">
          <v-list-item-title>Рус</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeLocale('kk')">
          <v-list-item-title>Каз</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed, ComputedRef} from "vue";
import {setLocale} from "@/plugins/i18n";

const {locale} = useI18n()

const getLocale: ComputedRef<string> = computed(() => locale.value)

const changeLocale = (lang: 'ru' | 'kk') => setLocale(lang)

</script>

<style lang="scss" scoped>

//.disabled {
//  color: gray;
//}

</style>
