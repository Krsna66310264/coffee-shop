import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import './style.css'
import App from './App.vue'
import router from './router'
import BackHeader from './components/CoffeeHeader.vue' // Import Component เข้ามา
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue' // [เพิ่ม] Import


const app = createApp(App) // สร้าง App
const pinia = createPinia() // สร้าง Pinia
pinia.use(piniaPluginPersistedstate) // เพิ่ม plugin เก็บ state ลง localStorage

app.use(pinia) // ใช้งาน Pinia (ต้องมาก่อน router)
app.use(router) // ใช้งาน Router

app.use(CkeditorPlugin) // [เพิ่ม] เปิดใช้งาน CKEditor ผ่าน app instance [2]

// ลงทะเบียน Global Component ใน Vue 3 [2]
app.component('back-header', BackHeader)
app.mount('#app') // แปะลงไปที่ id="app" ใน index.html