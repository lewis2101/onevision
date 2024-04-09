<template>
  <div :class="$style.container">
      <v-btn :class="$style.btn" @click="modal">alert</v-btn>
      <v-btn :class="$style.btn" @click="modalInput">propt</v-btn>
    <div :class="$style.container">
      <h1>Web Camera Example</h1>
      <video ref="videoElement" autoplay></video>
      <v-btn @click="startWebcam">Start Webcam</v-btn>
      <v-btn @click="stopWebcam">Stop Webcam</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const videoStream = ref<any>()
const videoElement = ref<HTMLVideoElement>()

const startWebcam = async () => {
  try {
    videoStream.value = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.value.srcObject = videoStream.value;
  } catch (error) {
    console.error('Error accessing webcam:', error);
  }
}

const stopWebcam = () => {
  if (videoStream.value) {
    videoStream.value.getTracks().forEach(track => track.stop());
    videoElement.value.srcObject = null;
  }
}

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
