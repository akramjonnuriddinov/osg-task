<script setup lang="ts">
import { ref } from 'vue'
// import TaskHeader from '@/components/TaskHeader.vue'
// import TaskComponent from '@/components/TaskComponent.vue'
import TaskModal from '@/components/TaskModal.vue'
import Calendar from '@/components/Calendar.vue'

const isShow = ref(false)
const closeModal = () => {
  isShow.value = false
}
const openModal = () => {
  isShow.value = true
}
</script>

<template>
  <div>
    <!-- <task-header @open-modal="openModal" /> -->
    <div>
      <!-- <task-component @open-modal="openModal" /> -->
      <Calendar @open-modal="openModal" />
    </div>
    <transition>
      <task-modal v-if="isShow" @close-modal="closeModal" />
    </transition>
  </div>
</template>
