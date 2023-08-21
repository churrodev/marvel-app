<script lang="ts" setup>
  import { useSeriesDetailStore } from '../stores/seriesDetail';
  import { useFavoritesStore } from '../stores/favoritesStore';
  import { onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import TheAlerts from '../components/TheAlerts.vue';

  const showToast = ref(false)
  const toastMessage = ref('')
  const toastType = ref('')

  const favoritesStore = useFavoritesStore();
  const errorMessage = ref(favoritesStore.errorMessage);

  const toggleFavorite = () => {
    if (isFavorite.value) {
      favoritesStore.removeFavorite(id);
    } else {
      favoritesStore.addFavorite(seriesDetailStore.seriesDetail);
      if (favoritesStore.errorMessage) {
        showToast.value = true;
        toastMessage.value = favoritesStore.errorMessage;
        toastType.value = 'error';
        return;
      }
    }

    isFavorite.value = !isFavorite.value

    showToast.value = true
    toastMessage.value = isFavorite.value 
      ? 'Added to favorites'
      : 'Removed from favorites'
    toastType.value = isFavorite.value ? 'success' : 'error'
    
    setTimeout(() => {
      showToast.value = false
    }, 3000)
  };

  watch(() => favoritesStore.errorMessage, (newErrorMessage) => {
    errorMessage.value = newErrorMessage;
  });

  const seriesDetailStore = useSeriesDetailStore();
  const route = useRoute();

  const id = parseInt(route.params.id as string, 10);
  const isFavorite = ref(favoritesStore.isFavorite(id));

  onMounted(() => {
    const id = parseInt(route.params.id as string, 10);
    seriesDetailStore.fetchSeriesDetail(id);
  });
</script>


<template>
  <div class="series-detail">
    <h1>{{ seriesDetailStore.seriesDetail.title }}</h1>
    <div class="content">
      <img :src="seriesDetailStore.seriesDetail && seriesDetailStore.seriesDetail.thumbnail ? `${seriesDetailStore.seriesDetail.thumbnail.path}.${seriesDetailStore.seriesDetail.thumbnail.extension}` : 'path/to/your/random/image.png'" alt="Image" class="series-image" />
      <div class="info">
        <p>Tipo: {{ seriesDetailStore.seriesDetail.type }}</p>
        <p>Años: {{ seriesDetailStore.seriesDetail.startYear }} - {{ seriesDetailStore.seriesDetail.endYear }}</p>
      
        <div class="related-content">
          <div v-if="seriesDetailStore.relatedStories.length">
            <h2>Historias relacionadas</h2>
            <div v-for="story in seriesDetailStore.relatedStories" :key="story.id">
              <p>{{ story.title }}</p>
            </div>
          </div>
          <div v-if="seriesDetailStore.relatedComics.length">
            <h2>Cómics relacionados</h2>
            <div v-for="comic in seriesDetailStore.relatedComics" :key="comic.id">
            <p>{{ comic.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="series-detail-button">
      <button @click="toggleFavorite" class="favorite-button">
        <i :class="isFavorite ? 'trash-icon' : 'star-icon'"></i>
        {{ isFavorite ? 'Remove from Favorite' : 'Add to Favorite' }}
      </button>
    </div>

    <div class="toast-center">
      <TheAlerts 
        v-if="showToast"
        :message="toastMessage"
        :toastType="toastType"
        @close="showToast = false"
      />
    </div>
  </div>
</template>

<style scoped>

.toast-center {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.series-detail {
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0,0,0,0.3);
  border: 1px solid #ddd;
  border-radius: 5px; 
  box-sizing: border-box;
  position: relative;
  text-align: right;
}

.series-detail h1 {
  text-align: center;
}

.content {
  display: flex;
  flex-wrap: wrap;
}

.series-image {
  width: 50%;
  max-width: 400px;
  height: auto;
}

.info {
  flex-grow: 1;
  text-align: left;
  margin-left: 20px;
}

.related-content {
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
}

.series-detail-button {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: end;
}

.favorite-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px; 
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: background-color 0.3s;
}

.favorite-button:hover {
  background-color: #0056b3;
}

.star-icon::before {
  content: '\2605';
  margin-right: 10px;
  font-style: normal;
}

.trash-icon::before {
  content: '\1F5D1';
}

.error-message {
    color: red;
}

hr {
  width: 80%;
  margin: 20px auto;
}

@media screen and (max-width: 744px) {
  .content {
    flex-direction: column;
  }

  .series-image, .info {
    width: 100%;
    text-align: left;
  }

  .favorite-button {
    justify-content: center;
  }
}

</style>