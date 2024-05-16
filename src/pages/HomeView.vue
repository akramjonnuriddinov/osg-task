<script setup lang="ts">
import { ref } from 'vue'
import TaskComponent from '@/components/TaskComponent.vue'
import TaskModal from '@/components/TaskModal.vue'
import { useTaskStore } from '@/store'

const store = useTaskStore()
const isShow = ref(false)
const closeModal = () => {
  isShow.value = false
}
const openModal = () => {
  isShow.value = true
  store.isUpdate = false
  store.id = ''
}
</script>

<template>
  <task-component @open-modal="openModal" />
  <task-modal v-if="isShow" @close-modal="closeModal" />
  <transition> </transition>
</template>
