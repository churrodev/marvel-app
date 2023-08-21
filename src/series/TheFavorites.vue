<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { useFavoritesStore } from '../stores/favoritesStore';

  const favoritesStore = useFavoritesStore();
  const { favorites, errorMessage } = favoritesStore;
  const isListView = ref(false);

  const toggleView = () => {
    isListView.value = !isListView.value;
  };

</script>

<template>
  <button 
    @click="toggleView"
    class="toggle"
    >
    <span class="icon"></span>
    {{ isListView ? 'View as card' : 'View as list' }}
  </button>
  <div :class="isListView ? 'list-container' : 'cards-container'">
    <div v-for="favorite in favorites" :key="favorite.id" class="item">
      <img :src="`${favorite.thumbnail.path}.${favorite.thumbnail.extension}`" alt="Imagen de la serie" class="item-image" />
      <h3 class="item-title">{{ favorite.title }}</h3>
      <p class="item-description">{{ favorite.description || 'No description listed for this series.' }}</p>
      <div class="item-button">
        <p v-if="favorite.description" class="item-description">{{ favorite.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toggle {
  margin: 10px;
}

.toggle {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s;
}

.toggle:hover {
  background-color: #0056b3;
}


.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.card {
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0,0,0,0.3);
  padding: 10px;
  margin: 10px;
  width: calc(25% - 20px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.cards-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  box-sizing: border-box;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

@media screen and (min-width: 744px) and (max-width: 1023px) {
  .card {
    flex-basis: calc(50% - 20px);
  }

  .cards-container {
    max-height: 100vh;
    width: 100%;
  }
}

@media screen and (max-width: 743px) {
  .card {
    width: calc(100% - 20px);
  }
}

/* Clases comunes para tarjetas y lista */
.item {
  box-sizing: border-box;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-image {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
  display: block;
}

.item-title {
  font-size: 18px;
  margin: 10px 0;
}

.item-description {
  font-size: 14px;
}

.list-container {
  width: 100%;
}

.list-container .item {
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0,0,0,0.3);
  padding: 10px;
  width: calc(100% - 20px);
  flex-direction: row;
  align-items: center;
}

.list-container .item-image {
  width: 100px;
  height: 150px;
}

/* Vista de tarjetas */
.cards-container .item {
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0,0,0,0.3);
  padding: 10px;
  width: calc(25% - 20px);
  align-items: center;
  text-align: center;
}

.card-title {
  text-align: center;
}
</style>