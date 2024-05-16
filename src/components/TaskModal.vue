<script setup lang="ts">
import { ref, computed } from 'vue'
import { useImage } from '@/composables/useImage'
import { useTaskStore } from '@/store'
import { v4 as uuidv4 } from 'uuid'
import FileUpload from '@/components/FileUpload.vue'
import BaseButton from '@/components/BaseButton.vue'
import type { Task } from '@/types'
import { statuses } from '@/constants'
import { isDisabled } from '@/composables/isDisabled'

const store = useTaskStore()
const emit = defineEmits<{
  (event: 'close-modal'): void
}>()

const initialTask = ref<Task>({
  id: uuidv4(),
  title: '',
  date: '',
  description: '',
  file: 'test',
  status: '',
})

const taskUpdate = ref<Task>()
taskUpdate.value = store.tasks.filter((item: any) => item.id === store.id)[0]

const task = ref<Task>({
  ...initialTask.value,
  ...taskUpdate.value,
})

const disabled = computed(() => {
  return isDisabled(task.value)
})

const updateTask = () => {
  const taskIndex = store.tasks.findIndex((task) => task.id === store.id)
  if (taskIndex !== -1) {
    const taskToUpdate = store.tasks[taskIndex]
    taskToUpdate.title = task.value.title
    taskToUpdate.description = task.value.description
    taskToUpdate.file = task.value.file
    taskToUpdate.status = task.value.status
  }
}
</script>

<template>
  <section class="modal">
    <div class="modal__inner">
      <button class="modal__close" @click="emit('close-modal')">
        <img :src="useImage('close-btn.svg')" alt="Modal close button" />
      </button>
      <h2 class="modal__title">Yangi event</h2>
      <div class="modal__form">
        <div class="modal__top">
          <input v-model="task.title" class="modal__input-title" type="text" placeholder="Title" />
          <input v-model="task.date" class="modal__date" type="datetime-local" />
        </div>
        <ul class="status-wrapper">
          <li v-for="status in statuses" :key="status.id" class="status__item">
            <span
              @click="task.status = status.color"
              class="status-inner"
              :style="{ backgroundColor: status.color }"
              :class="{ 'active-color': task.status === status.color }"
            ></span>
          </li>
        </ul>
        <textarea
          v-model="task.description"
          class="modal__description"
          cols="30"
          rows="10"
          placeholder="Description"
        ></textarea>
        <file-upload class="file-upload" />
        <div class="modal__btn-wrapper">
          <base-button @click="emit('close-modal')" color="#cbcbcb" class="modal__btn-back" />
          <base-button :disabled="disabled" @click="store.addTask(task), emit('close-modal')" text="Qo’shish" />
          <base-button
            :disabled="disabled"
            @click="updateTask, emit('close-modal')"
            text="Saqlash"
            class="modal__btn-update"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.active-color {
  border: 2px solid black;
}
.modal {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000033;
  z-index: 100;
}

.modal__inner {
  max-width: 720px;
  width: 100%;
  position: absolute;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
}

.modal__close {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(50%) translateY(-50%);
  border: none;
  background-color: #fff;
  box-shadow: 0px 4px 24px 0px #00000040;
  border-radius: 4px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.modal__title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29.26px;
  margin-bottom: 24px;
}

.modal__top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.modal__input-title {
  max-width: 420px;
  width: 100%;
  margin-right: 24px;
}

.modal__date {
  max-width: 228px;
  padding: 6px 12px;
}

.modal__description {
  margin-bottom: 24px;
}

.file-upload {
  margin-bottom: 24px;
}

input,
textarea {
  border: 1px solid #cbcbcb;
  background-color: transparent;
  padding: 7px 12px 8px;
  display: block;
  border-radius: 4px;
  resize: none;
  width: 100%;
  font-family: inherit;
  line-height: 17.07px;
  font-weight: 500;
  outline: none;
}
input::placeholder,
textarea::placeholder {
  color: #cbcbcb;
}

.modal__btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: end;
}

.modal__btn-back {
  margin-right: 24px;
}

.modal__btn-update {
  margin-left: 24px;
}

.status-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.status__item {
  margin-right: 12px;
  position: relative;
}

.status-inner {
  width: 16px;
  height: 16px;
  display: inline-block;
  border-radius: 100%;
  cursor: pointer;
}
</style>
