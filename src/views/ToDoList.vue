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
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <ToDo
        v-for="(todo) in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :index="todo.id"
        :checkAll="!anyremaining"
      />
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
        <button :class="{ active: filter == 'all' }" @click="setfilter('all')">
          All
        </button>
        <button
          :class="{ active: filter == 'remaining' }"
          @click="setfilter('remaining')"
        >
          Remaining
        </button>
        <button
          :class="{ active: filter == 'completed' }"
          @click="setfilter('completed')"
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
import ToDo from "../components/ToDo";
export default {
  name: "TodoList",
  components: {
    ToDo,
  },
  data() {
    return {
      newTodo: "",
      cacheTodo: {},
      index: 0,
    };
  },

  created() {
    window.eventBus.$on("doneEditing", (title, index) =>
      this.doneEditing(title, index)
    );
    window.eventBus.$on("removeTodo", (index) => this.removeTodo(index)); // no need since mutating data into store directly.
    window.eventBus.$on("setCompleted", (value, index) =>
      this.setCompleted(value, index)
    );
  },

  beforeDestroy() {
    window.eventBus.$off("doneEditing", this.doneEditing);
    window.eventBus.$off("removeTodo", this.removeTodo); // no need since mutating data into store directly.
    window.eventBus.$off("setCompleted", (value, index) =>
      this.setCompleted(value, index)
    );
  },

  mounted() {
    this.index =
      this.$store.state.todos.sort((a, b) => a.id - b.id)[this.$store.state.todos.length - 1].id + 1;
  },

  computed: {
    remaining() {
      return this.$store.getters.remaining;
    },

    filter(){
      return this.$store.getters.filter;
    },
    anyremaining() {
      return this.$store.getters.anyremaining;
    },

    todosFiltered() {
      return this.$store.getters.todosFiltered;
    },

    showClearButton() {
      return this.$store.getters.showClearButton;
    },
  },

  methods: {
    addNewTodo() {
      // this.todos.push(this.newTodo); 
      // changed it to use vuex store.
      if (this.newTodo.trim().length == 0) {
        return;
      }

      var a = {
        id: this.index++,
        title: this.newTodo,
        completed: false,
        editing: false,
      };

      // this.$store.state.todos.push(a); // mutating object directly, bad practice. 
      this.$store.dispatch('addNewTodo', a);
      this.newTodo = '';
    },

    // isPresent(todo) {
    //   for (let i = 0; i < this.$store.state.todos.length; i++) {
    //     if (this.$store.state.todos.todos[i] === todo) return true;
    //   }
    //   return false;
    // },

    removeTodo(id) {
      // this.$store.state.todos.splice(id, 1); // buggy code.
      console.log(id);
      // this.$store.state.todos = this.$store.state.todos.filter(item => item.id !== id);
    },

    doneEditing(title, key) {
      console.log(title, key);
      // this.$store.state.todos.find(item => item.id == key).title = title;
    },

    checkAllTodo() {
      // this.$store.state.todos.forEach((item) => (item.completed = event.target.checked));
      this.$store.commit('checkAllTodos', {completedStatus : event.target.checked});
    },

    clearCompleted() {
      // this.$store.state.todos = this.$store.state.todos.filter((item) => !item.completed);
      this.$store.commit('clearCompletedTodos');
    },

    setCompleted(value, index) {
      console.log(value, index); 
      // this.$store.state.todos.find(item => item.id == index).completed = value;
    },

    setfilter(value) {
      // this.$store.state.filter = value;
      this.$store.commit('updateFilter', {filter: value});
    }
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
  animate__ &:focus {
    outline: 0;
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
