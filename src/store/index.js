import Vue from 'vue'
import Vuex from 'vuex'

import login from './modules/login'
import job from './modules/job'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
	login,
	job
  },
  strict: true,
})

export default store
