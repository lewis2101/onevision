<template>
  <router-view/>
  <error-modal v-model="modal"/>
  {{ new Date() }}
</template>

<script setup lang="ts">
import {useRouteLocale} from "@/locales/route-locale";
import ErrorModal from "@/components/error-modal.vue";
import error from "@/composables/useError";
import {computed} from "vue";

const modal = computed(() => error.modal.value)

useRouteLocale()

</script>
