<script setup lang="ts">
import { ref } from 'vue'
import TaskHeader from '@/components/TaskHeader.vue'
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
  <div>
    <task-header />
    <div>
      <task-component @open-modal="openModal" />
    </div>
    <transition>
      <task-modal v-if="isShow" @close-modal="closeModal" />
    </transition>
  </div>
</template>
