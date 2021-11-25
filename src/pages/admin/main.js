import Vue from 'vue'
import App from './App'
import api from '@/api'
import admin_api from '@/api/admin'
import {router, routes} from './router'
import Instance from '@/instance'

Vue.prototype.$api = api
Vue.prototype.$api.admin = admin_api

new Instance(router, routes, App)
