import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/main.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import VueSweetalert2 from 'vue-sweetalert2';
import {
  faPlay,
  faPause,
  faRecordVinyl,
  faAppleAlt,
  faHeadphones,
  faArrowLeft,
  faArrowRight,
  faCommentAlt,
  faVideo,
  faRandom,
  faRedo,
  faHeart,
  faVolumeUp,
  faVolumeMute,
  faList,
  faWindowClose,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faPlay,
  faPause,
  faRecordVinyl,
  faAppleAlt,
  faHeadphones,
  faArrowLeft,
  faArrowRight,
  faCommentAlt,
  faVideo,
  faRandom,
  faRedo,
  faHeart,
  faVolumeUp,
  faVolumeMute,
  faList,
  faWindowClose,
  faEllipsisH,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
