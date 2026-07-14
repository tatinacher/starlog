import { createApp } from 'vue'
import App from './App.vue'
import { setupApp } from './providers'
import './styles/main.css'

const app = createApp(App)
setupApp(app)
app.mount('#app')
