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
    actions: {},
    modules: {},
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
    }
})