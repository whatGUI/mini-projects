import Vue from 'vue'
import App from './App.vue'
import router from './router'

// font awesome icon
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faTimes, faSearch, faRandom, faForward, faPlay, faBackward, faPause, faStop, faTrash, faPlus, faArrowLeft, faArrowRight, faSyncAlt,faSpinner,faPaperPlane,faGripLines} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faHtml5, faJs, faCss3Alt, faVuejs } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 引入Vue-FontAwesome
library.add([faGithub, faBars, faTimes, faSearch, faRandom, faForward, faPlay, faBackward, faPause, faStop, faTrash, faPlus, faArrowLeft, faArrowRight,faSyncAlt,faSpinner,faPaperPlane,faGripLines])
library.add([faGithub,faHtml5, faJs, faCss3Alt, faVuejs])
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
