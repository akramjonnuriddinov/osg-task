import { defineStore } from "pinia"
import type { Task } from '@/types'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
  }),
  getters: {
  },
  actions: {
    addTask(task: Task) {
      this.tasks.unshift(task)
    },
    updateTask(task: Task) {
      const index = this.tasks.findIndex((item: Task) => item.id === task.id)
      this.tasks[index] = task
    },
    deleteTask(id: string) {
      const index = this.tasks.findIndex((item: Task) => item.id === id)
      this.tasks.splice(index, 1)
    }
  },
})
