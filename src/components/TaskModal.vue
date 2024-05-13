<script setup lang="ts">
import { reactive } from 'vue'
import { useImage } from '@/composables/useImage'
import { useTaskStore } from '@/store'
import { v4 as uuidv4 } from 'uuid'
import FileUpload from '@/components/FileUpload.vue'

const store = useTaskStore()
const emit = defineEmits<{
  (event: 'close-modal'): void
}>()

const task = reactive({
  id: uuidv4(),
  title: '',
  color: '',
  date: '',
  description: '',
  file: '',
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
          <input v-model="task.date" class="modal__date" type="date" />
        </div>
        <ul class="circle-wrapper">
          <li v-for="i in 5" :key="i" class="circle"></li>
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
          <button @click="emit('close-modal')" class="modal__btn modal__btn--back">Orqaga</button>
          <button @click="store.addTask(task)" class="modal__btn modal__btn--add">Qo’shish</button>
          <button v-if="false" @click="store.updateTask" class="modal__btn modal__btn--update">Saqlash</button>
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

.circle-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.circle {
  background-color: #e05454;
  width: 12px;
  height: 12px;
  border-radius: 100%;
}

.circle {
  margin-right: 12px;
}

.modal__btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: end;
}

.modal__btn {
  border: none;
  padding: 7px 24px 8px;
  color: #ffffff;
  border-radius: 4px;
  line-height: 17.07px;
  font-weight: 600;
  cursor: pointer;
}

.modal__btn--back {
  margin-right: 24px;
  background-color: #cbcbcb;
}

.modal__btn--add {
  background-color: #39c54f;
}
.modal__btn--update {
  background-color: #39c54f;
}
</style>