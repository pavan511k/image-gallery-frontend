<template>
  <div class="login-view">
    <AuthForm
      :isRegister="isRegisterMode"
      @submit="handleAuth"
      @toggle-mode="isRegisterMode = !isRegisterMode"
      @google-login="handleGoogleLogin"
    />
    <p v-if="message" class="message">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser, registerUser, loginWithGoogle } from '../services/auth';
import { registerUserInBackend } from '../services/api';
import AuthForm from '../components/AuthForm.vue';

const router = useRouter();
const isRegisterMode = ref(false);
const message = ref('');
const error = ref('');

const handleAuth = async (email, password) => {
  message.value = '';
  error.value = '';
  try {
    let user;
    if (isRegisterMode.value) {
      user = await registerUser(email, password);
      message.value = 'Registration successful! Redirecting to gallery...';
    } else {
      user = await loginUser(email, password);
      message.value = 'Login successful! Redirecting to gallery...';
    }

    if (user) {
      // Register/update user in your backend database after successful Firebase auth
      await registerUserInBackend();
      router.push('/gallery');
    }
  } catch (err) {
    error.value = err.message || 'Authentication failed.';
    console.error(err);
  }
};

const handleGoogleLogin = async () => {
  message.value = '';
  error.value = '';
  try {
    const user = await loginWithGoogle();
    if (user) {
      // Register/update user in your backend database after successful Firebase auth
      await registerUserInBackend();
      message.value = 'Google login successful! Redirecting to gallery...';
      router.push('/gallery');
    }
  } catch (err) {
    error.value = err.message || 'Google login failed.';
    console.error(err);
  }
};
</script>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.message {
  color: green;
  margin-top: 15px;
}

.error {
  color: red;
  margin-top: 15px;
}
</style>