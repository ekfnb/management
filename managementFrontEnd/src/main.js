import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import'./assets/css/global.css'
import axios from 'axios'

//全局导入vue-quill-editor组件，使用富文本
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)


//根路径
// axios.defaults.baseURL = 'http://192.168.1.10:3009'
// Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
