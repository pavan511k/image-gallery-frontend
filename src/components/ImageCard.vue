<template>
  <div class="image-card">
    <img :src="image.blobUrl" :alt="image.originalFileName" />
    <div class="image-info">
      <h3>{{ image.originalFileName }}</h3>
      <p>Uploaded by: {{ image.uploadedByUserId }}</p>
      <p>Uploaded at: {{ new Date(image.uploadedAt).toLocaleString() }}</p>
      <button v-if="isAdmin" @click="$emit('delete-image', image.id)" class="delete-button">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  image: {
    type: Object,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['delete-image']);
</script>

<style scoped>
.image-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.image-card img {
  width: 100%;
  height: 200px; /* Fixed height for consistency */
  object-fit: cover; /* Cover the area, cropping if necessary */
  display: block;
}

.image-info {
  padding: 15px;
}

.image-info h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
  font-size: 1.1em;
}

.image-info p {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 5px;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 0.9em;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>