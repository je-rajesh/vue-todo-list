import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ToDoList from './views/ToDoList.vue'
import store from './store'

Vue.config.productionTip = false;

window.eventBus = new Vue();

new Vue({
    router,

    components: {
        ToDoList
    },

    store,
    render: h => h(App)
}).$mount('#app')