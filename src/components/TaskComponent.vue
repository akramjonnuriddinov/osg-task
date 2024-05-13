<script setup lang="ts">
import { useTaskStore } from '@/store'

const store = useTaskStore()

const emit = defineEmits<{
  (event: 'open-modal'): void
}>()
</script>

<template>
  <div class="container">
    <div class="all-tasks">
      <div class="task-wrapper">
        <span class="task-wrapper__day">1</span>
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
.all-tasks {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 3px;
}

.task-wrapper {
  border: 1px solid #cbcbcb;
  border-radius: 4px;
  padding: 12px 4px;
  width: 240px;
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
