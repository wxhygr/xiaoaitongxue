import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import dayjs from 'dayjs'
import service from "./http"
import countTo from 'vue-count-to'
import VCharts from 'v-charts'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import myUpload from 'vue-image-crop-upload';
import JsonExcel from 'vue-json-excel'
import lodash from 'lodash'
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
        key: 'f7616f229fa30e9bc6bd67ec4e20e3ef',
        plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
        v: '1.4.4',
        uiVersion: '1.0'
    })
    // '''
    // key： 高德的key（自己申请）

// plugin： 引用的插件（根据需要引入）

// v： 高德SDK 版本

// uiVersion：UI库 版本



Vue.prototype.$lodash = lodash
Vue.use(mavonEditor)
Vue.component('downloadExcel', JsonExcel)
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.prototype.$axios = service
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')