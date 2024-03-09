<template>
  <v-app-bar color="black">
    <v-app-bar-title>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
              color="white"
              v-bind="props"
              icon="mdi-menu"
          >
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in routes"
            :key="item.pathName"
            @click="$router.push(item.pathName)"
          >
            <div class="item">{{ item.title }}</div>
          </v-list-item>
          <v-list-item>
            <div class="item exit" @click="logout">Выйти</div>
          </v-list-item>
        </v-list>
      </v-menu>
      {{ getTitle }}
    </v-app-bar-title>
    <locale/>
  </v-app-bar>
</template>

<script setup lang="ts">
import Locale from "@/components/locale.vue";
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {titleOfRoute} from "@/locales/route-locale";
import {getLocale} from "@/plugins/i18n";

const route = useRoute()
const router = useRouter()
const {t} = useI18n()

const getTitle = computed(() => t(titleOfRoute[route.name.toString()]))

const routes = computed(() => (
    [
      {
        pathName: `/${getLocale()}`,
        title: t('header.main-title')
      },
      {
        pathName: `/${getLocale()}/diagram`,
        title: t('header.diagram-title')
      },
      {
        pathName: `/${getLocale()}/report`,
        title: t('header.report-title')
      },
    ]
))

const logout = () => {
  localStorage.removeItem('token')
  router.push({ name: 'login' })
}

</script>

<style lang="scss" scoped>
.item {
  cursor: pointer;
}
.exit {
  color: red;
}
</style>
