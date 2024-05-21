import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/core/user'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])


})
