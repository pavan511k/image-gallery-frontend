<template>
  <div class="home-container">
    <h1>Welcome to the Image Gallery!</h1>
    <p>This is a simple image gallery application built with Vue.js and .NET 8 Web API.</p>
    <p>Please <router-link to="/login">Login</router-link> to view the gallery.</p>
    <p>Once logged in, navigate to the <router-link to="/gallery">Gallery</router-link>.</p>
    <p>Admin users can upload and delete images.</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2.5em;
}

p {
  color: #555;
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 15px;
}

router-link {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

router-link:hover {
  text-decoration: underline;
}
</style>