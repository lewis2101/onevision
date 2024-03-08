<template>
  <v-app>
    <v-main>
      <slot name="header"/>
      <div style="padding: 20px;">
        <slot/>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

</style>
