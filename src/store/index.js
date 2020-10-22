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
    mutations: {
        addNewTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editing: false,
            });
            return;
        },

        removeTodo(state, id) {
            state.todos = state.todos.filter(item => item.id != id);
            return;
        },

        updateTodoTitle(state, payload) {
            // state.todos.find(item => item.id == index).title = title;
            var obj = state.todos.find(item => item.id == payload.id);
            if (obj) {
                obj.title = payload.title;
            } else {
                console.log('mistake in title');
            }

            return;
        },

        setCompleted(state, obj) {
            state.todos.find(item => item.id == obj.id).completed = obj.completed;
        },

        checkAllTodos(state, payload) {
            state.todos.forEach((item) => item.completed = payload.completedStatus)
        },

        clearCompletedTodos(state) {
            state.todos = state.todos.filter(item => !item.completed);
        },

        updateFilter(state, payload) {
            state.filter = payload.filter;
        }
    },
    getters: {
        remaining(state) {
            return state.todos.filter((item) => !item.completed).length;
        },

        filter(state) {
            return state.filter;
        },
        anyremaining(state, getters) {
            return getters.remaining != 0;
        },

        todosFiltered(state) {
            var t = [];
            if (state.filter == "all") t = state.todos;
            else if (state.filter == "remaining")
                t = state.todos.filter((todo) => !todo.completed);
            else if (state.filter == "completed")
                t = state.todos.filter((item) => item.completed);

            return t;
        },

        showClearButton(state) {
            return state.todos.filter((item) => item.completed).length > 0;
        },
    },
    actions: {
        // actions are just like mutations just works asynchronously. 
        // look at the commit verb we use it to commit into the components to the store. 
        // but here we are using actions to commit to the store. 
        // in components we'll use dispatch verb. 

        addNewTodo(context, todo) {
            setTimeout(() => {
                context.commit('addNewTodo', todo);
            }, 10000);
            // context.commit('addNewTodo', todo);
        },

        removeTodo(context, id) { context.commit('removeTodo', id) },

        updateTodoTitle(context, payload) {
            context.commit('updateTodoTitle', payload);
        },

        setCompleted(context, obj) { context.commit('setCompleted', obj) },

        checkAllTodos(context, payload) { context.commit('checkAllTodos', payload) },

        clearCompletedTodos(context) { context.commit('clearCompletedTodos') },

        updateFilter(context, payload) { context.commit('updateFilter', payload) }
    },
    modules: {},

})