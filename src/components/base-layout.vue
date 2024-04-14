<template>
  <v-app>
    <v-main>
      <base-header :class="$style.desktop"/>
      <div :class="$style.content">
        <router-view/>
      </div>
      <base-bottom-nav :class="$style.mobile"/>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import BaseHeader from "@/components/base-header.vue";
import BaseBottomNav from "@/components/base-bottom-nav.vue";

</script>

<style lang="scss" module>
@use '@/style/mixins/breakpoints' as *;

.content {
  padding: 20px;
  background: white;
  @include breakpoint_up(sm) {
    margin-top: -50px;
  }
}

.desktop {
  display: block;
  @include breakpoint_up(sm) {
    display: none;
  }
}
.mobile {
  display: none;
  @include breakpoint_up(sm) {
    display: block;
  }
}
</style>
