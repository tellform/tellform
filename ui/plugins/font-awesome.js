import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default () => {
  library.add(faUserCircle)

  Vue.component('font-awesome-icon', FontAwesomeIcon)
}
