import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import Loader from '@/components/app/Loader'

import firebase from 'firebase/app'
import messagePlugin from '@/utils/message.plugin'
import 'firebase/auth'
import 'firebase/database'
import tooltip from '@/directives/tooltip'

import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.directive('tooltip',tooltip);
Vue.component('Loader', Loader)

firebase.initializeApp(
{
  apiKey: "AIzaSyAW70Axzsq4i0GtPySMy1zQ9wrzUkvDa-s",
  authDomain: "vue-todo-vk.firebaseapp.com",
  databaseURL: "https://vue-todo-vk.firebaseio.com",
  projectId: "vue-todo-vk",
  storageBucket: "",
  messagingSenderId: "1023464739197",
  appId: "1:1023464739197:web:246768c991f21fc9473c14"
}
);

let app;

firebase.auth().onAuthStateChanged(()=> {
  if(!app) {
    app =  new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
