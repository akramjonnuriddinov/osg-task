<script setup lang="ts">
import { useTaskStore } from '@/store'

const { tasks, date } = defineProps(['tasks', 'date'])
const store = useTaskStore()

const emits = defineEmits(['click-event-item', 'drag-start', 'drag-over', 'drop', 'open-modal'])

const handleDragStart = (e: DragEvent, task: any) => {
  emits('drag-start', e, task)
}

const handleDragOver = (index: number, event: DragEvent) => {
  event.preventDefault()
  emits('drag-over', index, event)
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  emits('drop', event)
}
</script>

<template>
  <div class="task-wrapper" @drop="handleDrop" @dragover="handleDragOver(-1, $event)">
    <span class="task-wrapper__day">{{ date.getDate() }}</span>
    <ul calss="tasks">
      <li
        v-for="(task, index) in tasks"
        :key="task.date"
        class="tasks__item"
        draggable="true"
        @dragstart="handleDragStart($event, task)"
        @dragover="handleDragOver(index, $event)"
        @click="$emit('open-modal', task.id), store.updateId(task.id), $emit('click-event-item', task.id)"
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
