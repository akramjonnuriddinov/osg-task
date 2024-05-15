<script setup lang="ts">
defineProps(['tasks', 'date'])
import { useTaskStore } from '@/store'
const store = useTaskStore()
</script>

<template>
  <div class="task-wrapper">
    <span class="task-wrapper__day">{{ date.getDate() }}</span>
    <ul calss="tasks">
      <li
        v-for="task in tasks"
        :key="task.date"
        class="tasks__item"
        @click="$emit('open-modal', task.id), store.updateId(task.id)"
      >
        <span>{{ task.title }}</span>
        <span class="circle" :style="{ backgroundColor: task.status }"></span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
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
  cursor: pointer;
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
