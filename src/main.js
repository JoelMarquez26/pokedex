import './assets/main.css'
import * as bootstrap from 'bootstrap'
import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/bootstrap.min.css'
import '@/assets/js/bootstrap.bundle.min.js'

// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fasHeart, farHeart);

const appfont = createApp(App);
appfont.component('font-awesome-icon', FontAwesomeIcon);

createApp(App).mount('#app')
appfont.mount('#app');