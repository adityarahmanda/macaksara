import Vue from 'vue';
import { NavbarPlugin, ModalPlugin, BTooltip } from 'bootstrap-vue'

Vue.component('BTooltip', BTooltip)
Vue.use(NavbarPlugin)
Vue.use(ModalPlugin)