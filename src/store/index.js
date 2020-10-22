import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: [{
                id: 1,
                title: "Make a Vue todo",
                completed: false,
                editing: false,
            },
            {
                id: 2,
                title: "Take Over the world",
                completed: false,
                editing: false,
            },
        ],
        filter: "all",

    },
    mutations: {},
    actions: {},
    modules: {}
})