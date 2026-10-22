import { createPinia } from 'pinia'
import { createApp } from 'vue'

// showToast 是函数调用，不是模板标签，插件扫不到，样式要手动引一次
import 'vant/es/toast/style'

import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
