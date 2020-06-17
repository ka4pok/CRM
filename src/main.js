import Vue from 'vue'
import Vuelidate from 'vuelidate/src'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import VueMeta from 'vue-meta'
import router from './router'
import store from './store'
import localizeFilter from './filters/localize.filter'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import messagePlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugin'
import Loader from './components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import tooltipDirective from '../src/directives/tooltip.directive'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.directive('tooltip', tooltipDirective)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: 'AIzaSyAPpnuNRkmQBKASQc3O7GQ35qxTjwmmVOc',
  authDomain: 'vue-crm-7fefc.firebaseapp.com',
  databaseURL: 'https://vue-crm-7fefc.firebaseio.com',
  projectId: 'vue-crm-7fefc',
  storageBucket: 'vue-crm-7fefc.appspot.com',
  messagingSenderId: '917469446413',
  appId: '1:917469446413:web:7e5753a23c7cf74d233044',
  measurementId: 'G-07G8P112L2',
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app')
  }
})
