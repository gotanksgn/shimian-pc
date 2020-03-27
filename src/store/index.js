import Vue from 'vue'
import Vuex from 'vuex'

import data from './modules/data'
import login from './modules/login.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    data,
	login
  },
  strict: true,
})

export default store
