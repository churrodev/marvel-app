<script setup lang="ts">
    import { useCharactersStore } from '../stores/marvel';
    const charactersStore = useCharactersStore()

    // Para acceder a los datos y métodos
    const characters = charactersStore.characters
    charactersStore.FETCH_CHARACTERS('nombre')
</script>

<template>
    <div class="card">
        <img src="path/to/image.jpg" alt="Description" class="card-image">
        <div class="card-content">
            <p class="card-text">Text</p>
            <button class="card-button">Button</button>
        </div>
    </div>

</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 15px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.card-text {
  margin: 10px 0;
}

.card-button {
  align-self: flex-end;
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.card-button:hover {
  background-color: #0056b3;
}

/* Responsive design */
@media only screen and (max-width: 767px) {
  /* Smartphone */
  .card {
    width: 100%;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  /* Tablet */
  .card {
    width: 48%;
  }
}

@media only screen and (min-width: 1024px) {
  /* Pantallas grandes */
  .card {
    width: 23%;
  }
}

</style>