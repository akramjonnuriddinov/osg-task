import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
// import VueDraggable from 'vue-draggable'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
// app.use(VueDraggable)
app.mount('#app')
