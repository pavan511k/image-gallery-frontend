<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <h2>{{ isRegister ? 'Register' : 'Login' }}</h2>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <button type="submit">{{ isRegister ? 'Register' : 'Login' }}</button>
    <button type="button" @click="$emit('toggle-mode')">
      {{ isRegister ? 'Already have an account? Login' : 'Need an account? Register' }}
    </button>
    <button type="button" @click="$emit('google-login')">Login with Google</button>
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isRegister: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'toggle-mode', 'google-login']);

const email = ref('');
const password = ref('');

const handleSubmit = () => {
  emit('submit', email.value, password.value);
  email.value = '';
  password.value = '';
};
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.auth-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input[type="email"],
.form-group input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box; /* Ensures padding doesn't increase width */
}

.auth-form button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.auth-form button:hover {
  background-color: #0056b3;
}

.auth-form button:nth-of-type(2) {
  background-color: #6c757d;
}

.auth-form button:nth-of-type(2):hover {
  background-color: #5a6268;
}

.auth-form button:nth-of-type(3) { /* Google button */
  background-color: #db4437; /* Google red */
}

.auth-form button:nth-of-type(3):hover {
  background-color: #c23321;
}
</style>