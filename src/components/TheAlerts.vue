<script setup lang="ts">
  defineProps({
    message: {
      type: String,
      required: true
    },
    toastType: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <div class="toast">
    <div 
      class="toast-message"
      :class="toastType"
    >
      {{ message }}

      <button class="close-button" @click="$emit('close')">
        <div class="close-icon">X</div>  
      </button>
    </div>
  </div>
</template>

<style scoped>
.toast-message {
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 10px;
  color: white;
  border-radius: 4px;
}

.toast {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 120px;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
}

.success {
  background: #169b35;
}

.error {
  background: #b72531; 
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.toast-enter-active {
  animation: slideIn 0.5s ease; 
}

@keyframes fadeOut {
  to {
    opacity: 0;
  }
}

.toast-enter-active {
  animation: slideInUp 0.5s ease;
}

@keyframes slideInUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.toast-leave-active {
  animation: fadeOut 0.5s ease;
}

.close-button {
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.close-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #ddd;
  color: #333;
  font-size: 16px;
}
</style>