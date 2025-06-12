<template>
  <div class="gallery-container">
    <div class="header">
      <h1>Image Gallery</h1>
      <div class="user-info">
        <p v-if="currentUser">
          Logged in as: <strong>{{ currentUser.email }}</strong>
        </p>
        <p v-if="isAdmin">Role: <span class="admin-badge">Admin</span></p>
        <p v-if="!isAdmin">Role: <span class="admin-badge">Regualr</span></p>
        <button @click="handleLogout" class="logout-button">Logout</button>
      </div>
    </div>

    <div v-if="isAdmin" class="upload-section">
      <h2>Upload New Images</h2>
      <input type="file" ref="fileInput" multiple @change="handleFileChange" />
      <button @click="handleUpload" :disabled="!selectedFiles.length || uploading">
        {{ uploading ? 'Uploading...' : 'Upload' }}
      </button>
      <p v-if="uploadMessage" class="upload-message">{{ uploadMessage }}</p>
      <p v-if="uploadError" class="error-message">{{ uploadError }}</p>
    </div>

    <div class="image-grid">
      <ImageCard
        v-for="image in images"
        :key="image.id"
        :image="image"
        :isAdmin="isAdmin"
        @delete-image="handleDeleteImage"
      />
    </div>

    <p v-if="images.length === 0 && !loading" class="no-images">
      No images found. Start uploading!
    </p>
    <p v-if="loading" class="loading-message">Loading images...</p>
    <p v-if="fetchError" class="error-message">Error fetching images: {{ fetchError }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { getImages, uploadImages, deleteImage } from '../services/api'
import { logoutUser } from '../services/auth'
import ImageCard from '../components/ImageCard.vue'

const router = useRouter()
const auth = getAuth()

const images = ref([])
const loading = ref(true)
const fetchError = ref(null)
const currentUser = ref(null)
const isAdmin = ref(false)

const selectedFiles = ref([])
const fileInput = ref(null)
const uploading = ref(false)
const uploadMessage = ref('')
const uploadError = ref('')

const fetchImages = async () => {
  loading.value = true
  fetchError.value = null
  try {
    images.value = await getImages()
  } catch (err) {
    fetchError.value = err.message || 'Failed to fetch images.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleFileChange = (event) => {
  selectedFiles.value = Array.from(event.target.files)
}

const handleUpload = async () => {
  if (selectedFiles.value.length === 0) return

  uploading.value = true
  uploadMessage.value = ''
  uploadError.value = ''

  try {
    const result = await uploadImages(selectedFiles.value)
    uploadMessage.value = result.message
    selectedFiles.value = [] // Clear selected files
    fileInput.value.value = '' // Clear file input
    await fetchImages() // Refresh the list of images
  } catch (err) {
    uploadError.value = err.response?.data?.Message || err.message || 'Image upload failed.'
    console.error('Upload error:', err)
  } finally {
    uploading.value = false
  }
}

const handleDeleteImage = async (id) => {
  if (!confirm('Are you sure you want to delete this image?')) {
    return
  }
  try {
    await deleteImage(id)
    images.value = images.value.filter((img) => img.id !== id)
    alert('Image deleted successfully!')
  } catch (err) {
    alert(`Error deleting image: ${err.response?.data || err.message}`)
    console.error(err)
  }
}

const handleLogout = async () => {
  try {
    await logoutUser()
    router.push('/login')
  } catch (err) {
    console.error('Error logging out:', err)
  }
}

onMounted(() => {
  // Listen for auth state changes to update currentUser and isAdmin
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    currentUser.value = user
    if (user) {
      console.log(user)
      // Get the ID token and decode it to check for custom claims
      const idTokenResult = await user.getIdTokenResult()
      console.log(idTokenResult)
      // 'IsAdmin' is the custom claim you added in your .NET backend
      isAdmin.value = true //idTokenResult.claims.IsAdmin === true
      fetchImages() // Fetch images once authenticated
    } else {
      isAdmin.value = false
      images.value = [] // Clear images if logged out
    }
  })

  onUnmounted(() => {
    unsubscribe() // Clean up the auth state listener
  })
})
</script>

<style scoped>
.gallery-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f0f2f5;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
}

.header h1 {
  color: #333;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info p {
  margin: 0;
  color: #555;
  font-size: 0.95em;
}

.admin-badge {
  background-color: #28a745;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.85em;
}

.logout-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
}

.logout-button:hover {
  background-color: #0056b3;
}

.upload-section {
  background-color: #e7f3ff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  border: 1px dashed #a0d1ff;
  text-align: center;
}

.upload-section h2 {
  margin-top: 0;
  color: #333;
  margin-bottom: 20px;
}

.upload-section input[type='file'] {
  margin-bottom: 15px;
  display: block;
  width: fit-content;
  margin: 0 auto 15px auto;
}

.upload-section button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.05em;
}

.upload-section button:disabled {
  background-color: #94d3a2;
  cursor: not-allowed;
}

.upload-section button:hover:not(:disabled) {
  background-color: #218838;
}

.upload-message {
  color: green;
  margin-top: 15px;
}

.error-message {
  color: red;
  margin-top: 15px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.no-images,
.loading-message {
  text-align: center;
  color: #777;
  font-size: 1.2em;
  margin-top: 50px;
}
</style>
