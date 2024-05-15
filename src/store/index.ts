import { defineStore } from "pinia"
import type { Task } from '@/types'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    id: '' as string
  }),
  getters: {
  },
  actions: {
    addTask(task: Task) {
      this.tasks.unshift(task)
    },
    // updateTask(task: Task) {
    //   const index = this.tasks.findIndex((item: Task) => item.id === task.id)
    //   this.tasks[index] = task
    //   console.log('taks')
    //   console.log(task)
    // },
    updateTask() {
      this.tasks.forEach((item: Task) => {
        if (item.title == 'my-title') {
          console.log('hey')
          item = {
            id: 'string',
            title: 'string',
            date: 'string',
            description: 'string',
            file: 'string',
            status: 'string',
          }
        }
      })
    },
    deleteTask(id: string) {
      const index = this.tasks.findIndex((item: Task) => item.id === id)
      this.tasks.splice(index, 1)
    },
    updateId(id: string) {
      this.id = id
    }
  },
})
