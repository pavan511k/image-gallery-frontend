<template>
  <nav class="main-nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/gallery">Gallery</router-link>
  </nav>
  <router-view />
</template>

<script setup>
</script>

<style>
/* src/assets/main.css or style block in App.vue */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #eef1f5;
  color: #333;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.main-nav {
  padding: 20px;
  background-color: #2c3e50;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.main-nav a {
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  padding: 0 15px;
  transition: color 0.3s ease;
}

.main-nav a.router-link-exact-active {
  color: #42b983;
}

.main-nav a:hover {
  color: #6ed0a8;
}
</style>