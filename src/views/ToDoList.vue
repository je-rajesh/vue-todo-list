<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" class="img-adjustable"/>

    <input type="text" placeholder="What needs to be done!" class="todo-input" v-model="newTodo" @keyup.enter="addNewTodo">

    <div v-for="(todo, index) in todos" :key="index">
        <div class="todo-item">
            <div>{{ todo.title }}</div>
            <div class="remove-todo" @click="removeTodo(index)">&times;</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'to-do-list',  
    data(){
        return {
            newTodo:'',
            todos: [
                {
                    id: 1, 
                    title: 'Make a Vue todo',
                    completed: false, 
                },
                {
                    id: 2, 
                    title: 'Take Over the world',
                    completed: false, 
                }
            ]
        }
    }, 

    methods: {
        addNewTodo(){
            // this.todos.push(this.newTodo);
            if(this.newTodo.trim().length == 0) {
                // alert('helo');
                return ;
            }
            
            var a = {
                id : this.todos.length + 1, 
                title: this.newTodo,
                completed: false,
            };

            this.todos.push(a);
            this.newTodo = '';
        }, 

        removeTodo(id){
            this.todos.splice(id, 1);
        }
    }
}
</script>


<style lang="scss">
.img-adjustable {
  display: block;
  margin: 20px auto;
  height: 80px;
}

.todo-input{
    width: 100%;
    padding: 10px 10px ; 
    font-size: 18px ;
    margin-bottom: 16px;

    &:focus{
        outline: 0;
    }
}

.todo-item{
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.remove-todo{
    cursor: pointer;
    margin-left: 14px;
    font-size: 2rem;
    &:hover{
        color: red;
    }
}
</style>
