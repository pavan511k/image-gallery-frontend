// src/services/auth.js
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

// REMOVE THIS LINE:
// const auth = getAuth(); // <-- THIS IS THE PROBLEM

// Define the GoogleAuthProvider directly, as it doesn't depend on the app being initialized immediately
const googleProvider = new GoogleAuthProvider()

export const loginUser = async (email, password) => {
  try {
    // Call getAuth() here, inside the function, when it's executed
    const userCredential = await signInWithEmailAndPassword(getAuth(), email, password)
    return userCredential.user
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

export const registerUser = async (email, password) => {
  try {
    // Call getAuth() here
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password)
    return userCredential.user
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}

export const loginWithGoogle = async () => {
  try {
    // Call getAuth() here
    const result = await signInWithPopup(getAuth(), googleProvider)
    return result.user
  } catch (error) {
    console.error('Error logging in with Google:', error)
    throw error
  }
}

export const logoutUser = async () => {
  try {
    // Call getAuth() here
    await signOut(getAuth())
  } catch (error) {
    console.error('Error logging out:', error)
    throw error
  }
}

export const getCurrentUser = () => {
  // Call getAuth() here
  return getAuth().currentUser
}

export const getIdToken = async () => {
  // Call getAuth() here
  const user = getAuth().currentUser // Or call getCurrentUser() if preferred
  if (user) {
    return await user.getIdToken()
  }
  return null
}
