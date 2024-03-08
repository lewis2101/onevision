<template>
  <router-view/>
  <error-modal v-model="error().modal"/>
</template>

<script setup lang="ts">
import {useRouteLocale} from "@/locales/route-locale";
import ErrorModal from "@/components/error-modal.vue";
import error from "@/composables/useError";

useRouteLocale()

</script>
