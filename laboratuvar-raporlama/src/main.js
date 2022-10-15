import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/font-awesome/css/all.css'

import '@/assets/style.css'


import appHeader from '@/components/Shared/appHeader';
import appFooter from '@/components/Shared/appFooter';

const app = createApp(App)
app.component('AppHeader', appHeader)
app.component('AppFooter', appFooter)
app.use(router)
app.mount('#app')
