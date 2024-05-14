<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '@/store'
import { month } from '@/constants'
import { useImage } from '@/composables/useImage'
import { weeks } from '@/constants'

const store = useTaskStore()
const emit = defineEmits<{
  (event: 'open-modal'): void
}>()
const currentMonth = ref<number>(new Date().getMonth())
const currentYear = ref<number>(new Date().getFullYear())
const currentDate = ref<Date>(new Date(currentYear.value, currentMonth.value))

const allDays = (date: Date): number[] => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const dayOfWeek = firstDay.getDay()
  const startOfWeekOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek
  const startOfWeek = new Date(firstDay)
  startOfWeek.setDate(firstDay.getDate() + startOfWeekOffset)

  return Array.from({ length: 35 }, (_, i) => {
    const currentDate = new Date(startOfWeek)
    currentDate.setDate(startOfWeek.getDate() + i)
    return currentDate.getDate()
  })
}

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
      <div v-for="i in allDays(currentDate)" class="task-wrapper">
        <span class="task-wrapper__day">{{ i }}</span>
        <ul calss="tasks">
          <li v-for="task in store.tasks" :key="task.date" @click="emit('open-modal')" class="tasks__item">
            <span>{{ task.title }}</span>
            <span class="circle" :style="{ backgroundColor: task.status }"></span>
          </li>
        </ul>
      </div>
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

.task-wrapper {
  border: 1px solid #cbcbcb;
  border-radius: 4px;
  padding: 12px 4px;
  max-width: 240px;
  width: 100%;
  height: 240px;
}

.task-wrapper__day {
  font-weight: 600;
  font-size: 16px;
  line-height: 19.5px;
  display: block;
  margin-bottom: 28px;
}

.tasks {
  display: flex;
  flex-direction: column;
}

.tasks__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 4px 8px 5px;
}

.tasks__item:not(:last-child) {
  margin-bottom: 4px;
}

.circle {
  width: 8px;
  height: 8px;
  border-radius: 100%;
}
</style>
