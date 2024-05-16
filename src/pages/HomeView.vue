<script setup lang="ts">
import { ref } from 'vue'
import TaskComponent from '@/components/TaskComponent.vue'
import TaskModal from '@/components/TaskModal.vue'

const isShow = ref(true)
const closeModal = () => {
  isShow.value = false
}
const openModal = () => {
  isShow.value = true
}
</script>

<template>
  <task-component @open-modal="openModal" />
  <task-modal v-if="isShow" @close-modal="closeModal" />
  <transition> </transition>
</template>
