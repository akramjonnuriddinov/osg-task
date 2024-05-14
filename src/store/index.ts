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
      console.log(this.tasks)
      // const [year, month, day] = this.tasks[0].date.split('-').map(Number)
    },
    updateTask(task: Task) {
      const index = this.tasks.findIndex((item: Task) => item.id === task.id)
      this.tasks[index] = task
    },
    deleteTask(id: string) {
      const index = this.tasks.findIndex((item: Task) => item.id === id)
      this.tasks.splice(index, 1)
    },
  },
})
