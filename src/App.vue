<template>
  <router-view/>
</template>

<script setup lang="ts">
import {useRouteLocale} from "@/locales/route-locale";

useRouteLocale()

</script>
