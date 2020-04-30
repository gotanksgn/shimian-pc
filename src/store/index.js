import Vue from 'vue'
import Vuex from 'vuex'

import login from './modules/login'
import job from './modules/job'
import video from './modules/video'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
	login,
	job,
	video
  },
  strict: true,
})

export default store
