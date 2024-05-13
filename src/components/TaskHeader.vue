<script setup lang="ts">
import { useImage } from '@/composables/useImage'
interface Weeks {
  id: string
  name: string
}

const emit = defineEmits<{
  (event: 'open-modal'): void
}>()

const weeks: Weeks[] = [
  {
    id: '1',
    name: 'Dushanba',
  },
  {
    id: '2',
    name: 'Seshanba',
  },
  {
    id: '3',
    name: 'Chorshanba',
  },
  {
    id: '4',
    name: 'Payshanba',
  },
  {
    id: '5',
    name: 'Juma',
  },
  {
    id: '6',
    name: 'Shanba',
  },
  {
    id: '7',
    name: 'Yakshanba',
  },
]
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <div class="month">
        <div class="month__btn-wrapper">
          <button class="month__btn">
            <img class="month__btn-img" :src="useImage('left-btn.svg')" alt="Month change left" />
          </button>
          <span class="month__btn-text">Sentabr</span>
          <button class="month__btn">
            <img class="month__btn-img" :src="useImage('right-btn.svg')" alt="Month change right" />
          </button>
        </div>

        <div class="month__btn-wrapper">
          <button class="month__btn">
            <img class="month__btn-img" :src="useImage('left-btn.svg')" alt="Year change left" />
          </button>
          <span class="month__btn-text">2024</span>
          <button class="month__btn">
            <img class="month__btn-img" :src="useImage('right-btn.svg')" alt="Year change right" />
          </button>
        </div>

        <button @click="emit('open-modal')" class="plus-btn">
          <img :src="useImage('plus-btn.svg')" alt="Add task" />
        </button>
      </div>
      <ul class="weeks">
        <li v-for="week in weeks" :key="week.id" class="weeks__item">{{ week.name }}</li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding-top: 48px;
  padding-bottom: 12px;
}

.month {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: 32px;
}

.month__btn-wrapper {
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  margin-right: 32px;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19.5px;
}

.month__btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.4 ease;
}
.month__btn:hover {
  opacity: 0.8;
}

.month__btn-text {
  margin-left: 12px;
  margin-right: 12px;
}

.plus-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #39c54f;
  border: none;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.4 ease;
}
.plus-btn:hover {
  opacity: 0.8;
}

.weeks {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  font-size: 16px;
  line-height: 19.5px;
}

.weeks__item {
  text-align: center;
  max-width: 240px;
  width: 100%;
}
</style>
