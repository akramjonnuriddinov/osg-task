<script setup lang="ts">
import type { BaseButton } from '@/types'
const props = withDefaults(defineProps<BaseButton>(), {
  color: '#39c54f',
  text: 'Orqaga',
})
</script>

<template>
  <button class="modal__btn">{{ props.text }}</button>
</template>

<style scoped>
.modal__btn {
  border: none;
  padding: 7px 24px 8px;
  color: #ffffff;
  border-radius: 4px;
  line-height: 17.07px;
  font-weight: 600;
  cursor: pointer;
  background-color: v-bind(color);
}
</style>
