import { defineStore } from 'pinia'
import { ref } from 'vue'

export const sessionStore = defineStore('session', () => {

  const id = ref('')
  const name = ref('')
  
  const token = localStorage.getItem('user_token')
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]))
    console.log('PAYLOAD : ', payload)
    
    id.value = payload.id
    name.value = payload.name
    
  }

  return{
    id,
    name,
  }

})
  