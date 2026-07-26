import { defineStore } from 'pinia'

export const sessionStore = defineStore('session', () => {

  function getPayload() {
    const token = localStorage.getItem('user_token')
    if (!token) return null
    return JSON.parse(atob(token.split('.')[1]))
  }

  function getId() {
    return getPayload()?.id ?? ''
  }

  function getName() {
    return getPayload()?.name ?? ''
  }

  function logout() {
    localStorage.removeItem('user_token')
  }

  return {
    getId,
    getName,
    logout,
  }
})