<template>
  <div :class="$style.container">
      <v-btn :class="$style.btn" @click="modal">alert</v-btn>
      <v-btn :class="$style.btn" @click="modalInput">propt</v-btn>
  </div>
</template>

<script setup lang="ts">

const modal = () => {
  alert('DEBUG')
}

const modalInput = () => {
  prompt('DEBUG')
}

</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.btn {
  max-width: 200px;
}
</style>
