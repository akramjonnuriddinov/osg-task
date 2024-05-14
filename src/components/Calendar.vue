<script setup lang="ts">
import { computed, ref } from 'vue'
import { useImage } from '@/composables/useImage'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { useTaskStore } from '@/store'
import type { PropsCalendar } from '@/types'

dayjs.extend(isToday)

const store = useTaskStore()
const emits = defineEmits(['update:modelValue', 'open-modal'])
const props = withDefaults(defineProps<PropsCalendar>(), {
  modelValue: () => null,
  display: () => 'month',
  startDate: () => '2024-05-14',
})

const viewDate = ref(dayjs(props.startDate))
const weekDays = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']

const daystoPrepend = computed(() => {
  const startOfMonth = viewDate.value.startOf('month')
  const startOfFirstWeek = startOfMonth.startOf('week')
  const daysToFirstDay = startOfMonth.diff(startOfFirstWeek, 'day')
  return Array.from(new Array(daysToFirstDay).keys())
})

const units = computed(() => {
  let ranges = []
  let startOfRange = viewDate.value.startOf('month').add(-1, 'day')
  let endOfRange = viewDate.value.endOf('month').add(-1, 'day')

  let currentDate = startOfRange

  while (currentDate.isBefore(endOfRange) || currentDate.isSame(endOfRange)) {
    currentDate = currentDate.add(1, 'day')
    ranges.push(currentDate)
  }
  return ranges
})

const shiftMonth = function (amount: number) {
  viewDate.value = viewDate.value.add(amount, 'month')
}
// const reset = function () {
//   viewDate.value = dayjs()
// }
</script>

<template>
  <section class="calendar">
    <div class="container">
      <div class="month">
        <div class="month__btn-wrapper">
          <button @click="shiftMonth(-1)" class="month__btn">
            <img class="month__btn-img" :src="useImage('left-btn.svg')" alt="Month change left" />
          </button>
          <span class="month__btn-text">{{ viewDate.format('MMMM YYYY') }}</span>
          <button @click="shiftMonth(1)" class="month__btn">
            <img class="month__btn-img" :src="useImage('right-btn.svg')" alt="Month change right" />
          </button>
        </div>

        <button @click="emits('open-modal')" class="plus-btn">
          <img :src="useImage('plus-btn.svg')" alt="Add task" />
        </button>
      </div>
      <div class="days-wrapper">
        <div v-for="d in weekDays" class="weeks">
          <div>{{ d }}</div>
        </div>
      </div>
      <div class="all-tasks">
        <div v-for="p in daystoPrepend" :key="p"></div>
        <div class="task-wrapper" v-for="d in units">
          <div :class="[d.isToday() ? 'bg-red' : '']" class="task-wrapper__day">
            {{ d.format('D') }}
          </div>
          <ul calss="tasks">
            <li v-for="task in store.tasks" :key="task.date" @dblclick="emits('open-modal')" class="tasks__item">
              <span>{{ task.title }}</span>
              <span class="circle" :style="{ backgroundColor: task.status }"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-red {
  background-color: rgb(243, 213, 213);
  border-radius: 4px;
}
.calendar {
  padding-top: 48px;
  padding-bottom: 48px;
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
  margin-bottom: 12px;
}

.weeks__item {
  text-align: center;
  max-width: 240px;
  width: 100%;
}

.days-wrapper {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
}

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
  display: flex;
  flex-direction: column;
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
  cursor: pointer;
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
