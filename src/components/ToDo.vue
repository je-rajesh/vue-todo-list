<template>
  <div>
    <div>
      <div class="todo-item">
        <div class="todo-item-left">
          <input type="checkbox" v-model="completed" @change="setCompleted" />
          <div v-if="!editing" @dblclick="editTodo" class="todo-item-label" :class="{'completed': this.completed}">
            {{ title }}
          </div>
          <input
            type="text"
            v-model="title"
            class="todo-item-edit"
            v-else
            @blur="doneEditing"
            @keyup.enter="doneEditing"
            @keyup.esc="cancelEditing"
            v-focus
          />
        </div>
        <div class="remove-todo" @click="removeTodo">&times;</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },

    checkAll: {
      type: Boolean,
      required: true,
    },
  },

  watch: {
    checkAll() {
      if (this.checkAll) {
        this.completed = true;
      } else {
        this.completed = this.todo.completed;
      }
    },

    todo() {
      this.title = this.todo.title;
      this.completed = this.todo.completed;
      this.id = this.todo.id;
    },
  },

  data() {
    return {
      title: this.todo.title,
      completed: this.todo.completed,
      cachedTitle: "", // initially empty string, later value will be give.
      editing: false,
      id: this.todo.id,
    };
  },

  methods: {
    editTodo() {
      this.cachedTitle = this.title;
      this.editing = true;
    },

    doneEditing() {
      if (this.title.trim() === "") {
        this.title = this.cachedTitle;
      }
      this.editing = false;
      window.eventBus.$emit("doneEditing", this.title, this.index);
      // this.$store.state.todos.find(item => item.id == this.id).title = this.title; // directly mutating 
      this.$store.commit('updateTodoTitle', {id: this.id, title: this.title});
    },

    removeTodo() {
      window.eventBus.$emit("removeTodo", this.index); // No need since we have now access to global store . 
      // this.$store.state.todos = this.$store.state.todos.filter(item => item.id !== this.id); // removed because directly mutating state 
      // instead following should be done. 
      this.$store.commit('removeTodo', this.id);
    },

    cancelEditing() {
      this.title = this.cachedTitle;
      this.editing = false;
    },

    setCompleted() {
      this.completed = event.target.checked;
      window.eventBus.$emit("setCompleted", this.completed, this.index);
      // this.$store.state.todos.find(item => item.id == this.id).completed = this.completed;
      this.$store.commit('setCompleted',{id: this.id, completed: this.completed});

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
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition-duration: 0.2s;
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
</style>
