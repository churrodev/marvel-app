<script setup lang="ts">

</script>

<template>
    <nav class="navbar">
        <router-link to="/" class="nav-item" exact>Home</router-link>
        <router-link to="/favorites" class="nav-item">Favorites</router-link>
    </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  background-color: #333;
  padding: 1rem;
  flex-wrap: wrap;
}

.nav-item {
  text-decoration: none;
  color: white;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: #555;
}

@media screen and (max-width: 600px) {
  .navbar {
    flex-direction: column;
  }

  .nav-item {
    text-align: center;
  }
}
</style>