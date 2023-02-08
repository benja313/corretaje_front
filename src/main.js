// =========================================================
// * Vue Material Kit PRO - v1.2.1
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-kit-pro
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "./router";
import Credentials from '@/services/Credentials.service.js'
import MaterialKit from "./plugins/material-kit";

Vue.config.productionTip = false;
const credentials = new Credentials()
// Added Interceptors
Vue.http.interceptors.push(function (request, next) {
  request.headers.set('Authorization', 'Bearer ' + credentials.getToken())
  request.headers.set('Accept', 'application/json')
  next(function (response) {
    // cambiar por ruta en el dominio
    if (response.status === 401 && window.location.href !== 'http://corretaje.site/#/login-page') {
      credentials.clearCredentials()
      window.location.href = ('http://corretaje.site/#/login-page')
    }
  })
})

Vue.use(MaterialKit)
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
