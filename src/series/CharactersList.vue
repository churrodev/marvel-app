<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useSeriesStore } from '../stores/marvel';
  import TheSkeleton from '../components/TheSkeleton.vue'
  
  const seriesStore = useSeriesStore();
  const containerRef = ref<HTMLElement | null>(null);

  const resultsToShow = computed(() => {
    return seriesStore.searchMode ? seriesStore.searchSeriesResults : seriesStore.seriesResults;
  });

  seriesStore.FETCH_SERIES();

  const loadingMore = computed(() => seriesStore.loading && !seriesStore.initialLoading);

  const loadMore = () => {
    if (!seriesStore.hasMore || seriesStore.loading) return;
    seriesStore.FETCH_SERIES();
  }


  onMounted(() => {
    const handleScroll = () => {
      const container = containerRef.value;
      if (container && (container.scrollHeight - container.scrollTop) <= container.clientHeight) {
        loadMore();
      }
    };

    containerRef.value?.addEventListener('scroll', handleScroll);

    return () => {
      containerRef.value?.removeEventListener('scroll', handleScroll);
    }
  });

</script>

<template>
  <div ref="containerRef" class="cards-container" style="height: 100vh; overflow-y: auto;">
    <TheSkeleton v-if="seriesStore.initialLoading"/>
    <div v-else v-for="series in resultsToShow" :key="series.id" class="card">
      <img :src="`${series.thumbnail.path}.${series.thumbnail.extension}`" alt="Imagen de la serie" class="card-image"/>
      <h3 class="card-title">{{ series.title }}</h3>
      <p class="card-description">{{ series.description || 'No description listed for this series.' }}</p>
      <div class="card-button">
        <router-link
          :to="{ name: 'SeriesDetail', params: { id: series.id } }"
          class="card-link"
          target="_blank"
        >
          More Details
        </router-link>
      </div>
    </div>
    <img v-if="loadingMore" src="../assets/loading.gif" class="loading" alt="Loading..." />
  </div>
</template>

<style scoped>
.cards-container {
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card {
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0,0,0,0.3);
  padding: 10px;
  margin: 10px;
  width: 100%;
  flex-basis: calc(100% - 20px);
}

.card-image {
  width: 200px; 
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.card-title {
  font-size: 18px;
  margin: 10px 0;
}

.card-description {
  font-size: 14px;
}

.card-link {
  display: flex;
  align-items: center;
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  background-color: #007bff;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  margin-right: 10px;
  position: relative;
}

.card-link::after {
  content: 'ℹ'; 
  color: #fff;
  font-size: 16px;
  margin-left: 10px;
}

.card-footer {
  text-align: right;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  flex: 1 1 calc(25% - 20px);
  box-sizing: border-box;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
}

.card-title {
  text-align: center;
  font-size: 1rem;
}

.card-description {
  text-align: center;
  flex-grow: 1; 
  padding: 10px;
}

.card-button {
  display: flex;
  justify-content: flex-end;
}

.card-link:hover {
  background-color: #0056b3;
}

@media only screen and (max-width: 1024px) {
  .card {
    flex: 1 1 calc(50% - 20px);
  }
}

@media only screen and (max-width: 744px) {
  .card {
    flex: 1 1 calc(100% - 20px);
  }
}

@media screen and (min-width: 744px) and (max-width: 1023px) {
  .card {
    flex-basis: calc(50% - 20px);
  }

  .cards-container {
    max-height: 100vh;
    width: 100%;
  }
}

@media screen and (min-width: 1024px) {
  .card {
    flex-basis: calc(25% - 20px);
  }
}

.loading {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50px;
}

@media screen and (max-width: 743px) {
  .cards-container {
    max-height: 100vh;
  }
}
</style>