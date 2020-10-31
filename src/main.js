/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-26 00:49:22
 * @LastEditTime: 2020-08-29 19:09:48
 * @LastEditors: aiyoudiao
 * @FilePath: \code\src\main.js
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// import VeLine from 'v-charts/lib/line.common'
import VueDraggableResizable from 'vue-draggable-resizable'
import VueDragResize from 'vue-drag-resize'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import VCharts from 'v-charts'
import dayjs from 'dayjs'
import dataV from '@jiaminghi/data-view'
import vueParticles from 'vue-particles'

Vue.prototype.$dayjs = dayjs

Vue.use(VCharts)
Vue.use(dayjs)
Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.component('vue-drag-resize', VueDragResize)

Vue.use(vueParticles)

Vue.use(dataV)

/* import { scrollBoard, loading, fullScreenContainer } from '@jiaminghi/data-view'
Vue.use(scrollBoard)
Vue.use(loading)
Vue.use(fullScreenContainer) */
// Vue.component(VeLine.name, VeLine)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
