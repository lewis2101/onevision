<template>
  <div :class="$style.container">
      <v-btn :class="$style.btn" @click="modal">alert</v-btn>
      <v-btn :class="$style.btn" @click="modalInput">propt</v-btn>
    <v-btn v-if="showInstallButton" @click="installPWA">Установить на главный экран</v-btn>
    <div :class="$style.container">
      <h1>Web Camera Example</h1>
      <video ref="videoElement" autoplay></video>
      <v-btn @click="startWebcam">Start Webcam</v-btn>
      <v-btn @click="stopWebcam">Stop Webcam</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const videoStream = ref<any>()
const videoElement = ref<HTMLVideoElement>()
const showInstallButton = ref(false)
const deferredPrompt = ref<Event>()

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

onMounted(() => {
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // Разрешение получено, можно отправлять уведомления
      }
    });
  }
})

const installPWA = () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
    // Ожидаем реакции пользователя
    deferredPrompt.value.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Пользователь согласился установить PWA');
      } else {
        console.log('Пользователь отклонил установку PWA');
      }
      // Сбрасываем deferredPrompt после завершения запроса
      deferredPrompt.value = null;
      // Скрываем кнопку для установки PWA
      showInstallButton.value = false;
    });
  }
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt.value = event;
    showInstallButton.value = true
  });
})

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
