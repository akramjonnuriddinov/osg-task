<script setup lang="ts">
// import { useCounterStore } from '@/store'

// const store = useCounterStore()
</script>

<template>
  <!-- <div>
    {{ store.count }}
  </div>
  <button @click="store.increment">add</button> -->
  <div class="container">
    <div class="all-tasks">
      <div v-for="i in 11" :key="i" class="task-wrapper">
        <span class="task-wrapper__day">1</span>
        <ul calss="tasks">
          <li v-for="i in 5" :key="i" class="tasks__item">
            <span>lorem ipsum</span>
            <span class="circle"></span>
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
  background-color: #e05454;
  width: 8px;
  height: 8px;
  border-radius: 100%;
}
</style>
