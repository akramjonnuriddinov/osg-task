import { defineStore } from "pinia"
import type { Task } from '@/types'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    id: '' as string,
    isUpdate: false
  }),
  getters: {
  },
  actions: {
    addTask(task: Task) {
      this.tasks.unshift(task)
    },
    deleteTask(id: string) {
      const index = this.tasks.findIndex((item: Task) => item.id === id)
      this.tasks.splice(index, 1)
    },
    updateId(id: string) {
      this.id = id
      console.log(this.id)
    }
  },
})
