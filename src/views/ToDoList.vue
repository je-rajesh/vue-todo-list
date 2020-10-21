<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" class="img-adjustable" />

    <input
      type="text"
      placeholder="What needs to be done!"
      class="todo-input"
      v-model="newTodo"
      @keyup.enter="addNewTodo"
    />

    <transition-group
      name="fade"
      enter-active-class="animate__animated animate__fadeInUp"
    >
      <div v-for="(todo, index) in todosFiltered" :key="index">
        <div class="todo-item">
          <div class="todo-item-left">
            <input type="checkbox" v-model="todo.completed" />
            <div
              v-if="!todo.editing"
              @dblclick="editTodo(todo)"
              :class="{ completed: todo.completed, 'animate__animated animate__fadeOutDown': !isPresent(todo)  }"
              class="todo-item-label"
            >
              {{ todo.title }}
            </div>
            <input
              type="text"
              v-model="todo.title"
              class="todo-item-edit"
              v-else
              @blur="doneEditing(todo)"
              @keyup.enter="doneEditing(todo)"
              @keyup.esc="cancelEditing(todo)"
              v-focus
            />
            <div></div>
          </div>
          <div class="remove-todo" @click="removeTodo(index)">&times;</div>
        </div>
      </div>
    </transition-group>

    <div class="extra-container">
      <div>
        <label>
          <input
            type="checkbox"
            :checked="!anyremaining"
            @change="checkAllTodo"
          />
          check all</label
        >
      </div>
      <div>{{ remaining }} items left</div>
    </div>

    <div class="extra-container">
      <div>
        <button :class="{ active: filter == 'all' }" @click="filter = 'all'">
          All
        </button>
        <button
          :class="{ active: filter == 'remaining' }"
          @click="filter = 'remaining'"
        >
          Remaining
        </button>
        <button
          :class="{ active: filter == 'completed' }"
          @click="filter = 'completed'"
        >
          Completed
        </button>
      </div>

      <div>
        <transition name="fade">
          <button v-if="showClearButton" @click="clearCompleted">
            clear completed
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  data() {
    return {
      newTodo: "",
      cacheTodo: {},
      todos: [
        {
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
    };
  },

  computed: {
    remaining() {
      return this.todos.filter((item) => !item.completed).length;
    },

    anyremaining() {
      return this.remaining != 0;
    },

    todosFiltered() {
      var t = [];
      if (this.filter == "all") t = this.todos;
      else if (this.filter == "remaining")
        t = this.todos.filter((todo) => !todo.completed);
      else if (this.filter == "completed")
        t = this.todos.filter((item) => item.completed);

      return t;
    },

    showClearButton() {
      return this.todos.filter((item) => item.completed).length > 0;
    },
  },

  methods: {
    addNewTodo() {
      // this.todos.push(this.newTodo);
      if (this.newTodo.trim().length == 0) {
        return;
      }

      var a = {
        id: this.todos.length + 1,
        title: this.newTodo,
        completed: false,
        editing: false,
      };

      this.todos.push(a);
      this.newTodo = "";
    },

    isPresent(todo){
        for(let i = 0; i< this.todos.length; i++) {
            if(this.todos[i] === todo) return true;
        }
        return false;
    },

    removeTodo(id) {
      this.todos.splice(id, 1);
    },

    toggleEditing(todo) {
      todo.editing = !todo.editing;
    },

    doneEditing(todo) {
      if (todo.title.trim() === "") {
        todo.title = this.cacheTodo.title;
      }
      todo.editing = false;
    },

    editTodo(todo) {
      this.cacheTodo = Object.assign({}, todo);
      todo.editing = true;
    },
    cancelEditing(todo) {
      todo.title = this.cacheTodo.title;
      todo.editing = false;
    },

    checkAllTodo() {
      this.todos.forEach((item) => (item.completed = event.target.checked));
    },

    clearCompleted() {
      this.todos = this.todos.filter((item) => !item.completed);
    },
  },

  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus();
      },
    },
  },
};
</script>


<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");

.img-adjustable {
  display: block;
  margin: 20px auto;
  height: 80px;
}

.todo-input {
  width: 100%;
  padding: 10px 10px;
  font-size: 18px;
  margin-bottom: 16px;
animate__
  &:focus {
    outline: 0;
  }
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remove-todo {
  cursor: pointer;
  margin-left: 14px;
  font-size: 2rem;
  &:hover {
    color: red;
  }
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: "Avenir", "Helvetica", Arial, sans-serif;

  &:focus {
    outline: none;
  }
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;

  &:hover {
    background-color: lightgreen;
  }

  &:focus {
    outline: none;
  }

  &.active {
    background: lightgreen;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
