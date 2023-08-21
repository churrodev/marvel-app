<script setup lang="ts">
    import { ref } from 'vue';
    import { useSeriesStore } from '../stores/marvel';

    const seriesStore = useSeriesStore();
    const query = ref('');

    const handleSearch = () => {
      seriesStore.SEARCH_SERIES(query.value);
    };
</script>

<template>
  <div class="search-container">
    <div class="search-box">
      <input type="text" class="search-input" v-model="query" @input="handleSearch" placeholder="Search series by name..." />
      <span class="search-icon"></span>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
}

.search-box {
  position: relative;
  width: 60%; 
  max-width: 500px;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 15px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 25px;
  outline: none;
}

.search-icon {
  position: absolute;
  right: -30px;
  top: 45%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  pointer-events: none;
  border: 2px solid #555;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #555;
  bottom: -5px;
  right: -2px;
  transform: rotate(45deg);
}
</style>