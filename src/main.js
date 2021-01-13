import Vue from "vue"
import App from "./App.vue"
import axios from "axios"
import VueAxios from "vue-axios"
import icons from "./plugins/icons"
import Icon from 'vue-awesome/components/Icon'
import VuePaginate from "vue-paginate"

Vue.config.productionTip = false

Vue.use(VueAxios, axios);
Vue.use(icons);
Vue.component('v-icon', Icon);
Vue.use(VuePaginate);

new Vue({
  render: h => h(App),
}).$mount('#app')
