<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '@/store'
import { month } from '@/constants'
import { useImage } from '@/composables/useImage'
import { weeks } from '@/constants'
import TaskItem from '@/components/TaskItem.vue'

const store = useTaskStore()
const emit = defineEmits<{
  (event: 'open-modal'): void
}>()
const currentMonth = ref<number>(new Date().getMonth())
const currentYear = ref<number>(new Date().getFullYear())
const currentDate = ref<Date>(new Date(currentYear.value, currentMonth.value))

// const allDays = (date: Date): number[] => {
//   const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
//   const dayOfWeek = firstDay.getDay()
//   const startOfWeekOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek
//   const startOfWeek = new Date(firstDay)
//   startOfWeek.setDate(firstDay.getDate() + startOfWeekOffset)

//   return Array.from({ length: 35 }, (_, i) => {
//     const currentDate = new Date(startOfWeek)
//     currentDate.setDate(startOfWeek.getDate() + i)
//     return currentDate.getDate()
//   })
// }

const getCurrentDays = (date: any) => {
  let firstDay = new Date(date.setDate(1)) //01.05.2024;
  const dayOfWeek = firstDay.getDay()
  const monday = new Date(firstDay) //01.05.2024;
  monday.setDate(firstDay.getDate() - dayOfWeek + 1)
  let result = []
  let currentDate = new Date(monday)

  for (let i = 0; i < 35; i++) {
    result.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return result
}

function changeDateTop(dateString: string): string {
  let date = new Date(dateString)

  // Adjust the date by adding 6 days
  date.setDate(date.getDate() + 6)

  // Adjust the time by adding 8 hours and 50 minutes
  date.setHours(date.getHours() + 8)
  date.setMinutes(date.getMinutes() + 50)

  // Extract the components
  let year = date.getFullYear()
  let month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are zero-indexed
  let day = date.getDate().toString().padStart(2, '0')
  let hours = date.getHours().toString().padStart(2, '0')
  let minutes = date.getMinutes().toString().padStart(2, '0')

  // Format the date string
  let formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`

  return formattedDate
}

// Example usage
let dateString: string = 'Thu May 09 2024 00:00:00 GMT+0500 (Uzbekistan Standard Time)'
console.log(changeDateTop(dateString)) // Output: 2024-05-15T08:50

// console.log(getCurrentDays(new Date()))

const changeDate = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value)
}

const goToPreviousMonth = () => {
  if (currentMonth.value > 0) {
    currentMonth.value -= 1
    changeDate()
    return
  }
  currentMonth.value = 11
  changeDate()
}

const goToNextMonth = () => {
  if (currentMonth.value < 11) {
    currentMonth.value += 1
    changeDate()
    return
  }
  currentMonth.value = 0
  changeDate()
}

const goToPreviousYear = () => {
  currentYear.value -= 1
  changeDate()
}
const goToNextYear = () => {
  currentYear.value += 1
  changeDate()
}

const filterByTime = (time: any) => {
  const beginOfDay = new Date(time)
  beginOfDay.setHours(0, 0, 0, 0)
  const endOfDay = new Date(time)
  endOfDay.setHours(23, 59, 59, 999)
  const filteredTime = store.tasks.filter((item: any) => {
    const currDate = new Date(item.date)
    return currDate >= beginOfDay && currDate <= endOfDay
  })
  const sortedTime = filteredTime.sort((a: any, b: any) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateA.getTime() - dateB.getTime()
  })
  return sortedTime
}
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="container header__container">
        <div class="month">
          <div class="month__btn-wrapper">
            <button @click="goToPreviousMonth" class="month__btn">
              <img class="month__btn-img" :src="useImage('left-btn.svg')" alt="Month change left" />
            </button>
            <span class="month__btn-text">{{ month[currentMonth] }}</span>
            <button @click="goToNextMonth" class="month__btn">
              <img class="month__btn-img" :src="useImage('right-btn.svg')" alt="Month change right" />
            </button>
          </div>

          <div class="month__btn-wrapper">
            <button @click="goToPreviousYear" class="month__btn">
              <img class="month__btn-img" :src="useImage('left-btn.svg')" alt="Year change left" />
            </button>
            <span class="month__btn-text">{{ currentYear }}</span>
            <button @click="goToNextYear" class="month__btn">
              <img class="month__btn-img" :src="useImage('right-btn.svg')" alt="Year change right" />
            </button>
          </div>

          <button @click="emit('open-modal')" class="plus-btn">
            <img :src="useImage('plus-btn.svg')" alt="Add task" />
          </button>
        </div>
        <ul class="weeks">
          <li v-for="week in weeks" :key="week" class="weeks__item">{{ week }}</li>
        </ul>
      </div>
    </header>

    <div class="all-tasks">
      <task-item
        v-for="date in getCurrentDays(currentDate)"
        :key="date.getDay"
        :tasks="filterByTime(date)"
        :date="date"
      />
    </div>
  </div>
</template>

<style scoped>
/* HEADER */
.header {
  padding-top: 48px;
  padding-bottom: 12px;
}

.month {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: 32px;
}

.month__btn-wrapper {
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  margin-right: 32px;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19.5px;
}

.month__btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.4 ease;
}
.month__btn:hover {
  opacity: 0.8;
}

.month__btn-text {
  margin-left: 12px;
  margin-right: 12px;
}

.plus-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #39c54f;
  border: none;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.4 ease;
}
.plus-btn:hover {
  opacity: 0.8;
}

.weeks {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  font-size: 16px;
  line-height: 19.5px;
}

.weeks__item {
  text-align: center;
  max-width: 240px;
  width: 100%;
}
/* /HEADER */

.all-tasks {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
}
</style>
