<template>
  <router-view v-slot="{ Component }">
    <transition name="slide" mode="out-in">
      <component :is="Component" :key="$route.path"/>
    </transition>
  </router-view>
  <error-modal v-model="modal"/>
</template>

<script setup lang="ts">
import {useRouteLocale} from "@/composables/route-locale";
import ErrorModal from "@/components/error-modal.vue";
import error from "@/composables/useError";
import {computed} from "vue";

const modal = computed(() => error.modal.value)

useRouteLocale()

</script>
<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform .5s;
}
.slide-enter-from {
  transform: translateX(100%);
}
</style>
