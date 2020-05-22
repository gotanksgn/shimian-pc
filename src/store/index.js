import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import config from './modules/config.js'
import login from './modules/login'
import job from './modules/job'
import video from './modules/video'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
	config,
	login,
	job,
	video
  },
  strict: true,
  plugins:[
	createPersistedState({
		key:'vuex-shimianpc',
		reducer(modules){
			return{
				config:modules.config
			}
		}
	})
  ]
})

export default store
