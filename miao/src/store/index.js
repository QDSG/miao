import Vue from 'vue'
import Vuex from 'vuex'
import city from './city'
import user from './user'
import goods from './goods'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
		city,
		user,
    goods,
    }
})
