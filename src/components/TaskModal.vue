<script setup lang="ts">
import { reactive } from 'vue'
import { useImage } from '@/composables/useImage'
import { useTaskStore } from '@/store'
import { v4 as uuidv4 } from 'uuid'
import FileUpload from '@/components/FileUpload.vue'
import BaseButton from '@/components/BaseButton.vue'
import type { Task } from '@/types'
import { statuses } from '@/constants'

const store = useTaskStore()
const emit = defineEmits<{
  (event: 'close-modal'): void
}>()
const task = reactive<Task>({
  id: uuidv4(),
  title: '',
  date: '',
  description: '',
  file: '',
  status: '',
})
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
            <input v-model="task.status" :value="status.color" :id="status.color" type="radio" />
            <label :for="status.color" :class="{ 'custom-color': task.status === status.color }"></label>
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
          <base-button @click="store.addTask(task), emit('close-modal')" text="Qo’shish" />
          <base-button v-if="false" @click="store.updateTask(task), emit('close-modal')" text="Saqlash" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
  background-color: #e05454;
  width: 12px;
  height: 12px;
  display: inline-block;
  border-radius: 100%;
}

[type='radio']:checked,
[type='radio']:not(:checked) {
  position: absolute;
  left: -9999px;
}
[type='radio']:checked + label,
[type='radio']:not(:checked) + label {
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
  color: #666;
}
[type='radio']:checked + label:before,
[type='radio']:not(:checked) + label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border: 1px solid #ddd;
  border-radius: 100%;
}
[type='radio']:checked + label:after,
[type='radio']:not(:checked) + label:after {
  content: '';
  width: 12px;
  height: 12px;
  background: green;
  position: absolute;
  top: 4px;
  left: 4px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
[type='radio']:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}
[type='radio']:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}
</style>
