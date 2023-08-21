<script setup lang="ts">

  import { computed } from 'vue';

  const skeleton = computed(() => {
    if (window.innerWidth >= 1024) return 8;
    if (window.innerWidth >= 744 && window.innerWidth < 1024) return 4; 
    return 2;
  })

</script>

<template>
  <div class="sk1">
    <div v-for="n in skeleton" :key="n" class="skeleton">
      <div class="skeleton-image"></div>
      <div class="skeleton-title"></div>
      <div class="skeleton-description"></div>
    </div>
  </div>
</template>

<style scoped>
.sk1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  width: 100%;
  max-height: 80px;
}

.skeleton {
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0,0,0,0.3);
  padding: 10px;
  margin: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 calc(25% - 20px);
}


.skeleton-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 5px 5px 0 0;
}

.skeleton-title {
  text-align: center;
  width: 80%;
  height: 18px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  margin: 10px 0;
}

.skeleton-description {
  text-align: center;
  width: 80%;
  height: 14px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  margin: 10px 0;
}

@media only screen and (max-width: 744px) {
  .skeleton {
    flex: 1 1 calc(100% - 20px);
  }
}

@media only screen and (min-width: 744px) and (max-width: 1023px) {
  .skeleton {
    flex: 1 1 calc(50% - 20px);
  }
}


@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>