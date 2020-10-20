<template>
  <div id="app">
  
    <!-- to show routes here just uncomment following lines.  -->
    <!-- <router-link to="home">Home</router-link> | 
    <router-link to="about">About</router-link> -->
   
    <router-view />
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.container{
  max-width: 600px;
  margin: 0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.img-adjustable{
  display: block;
  margin: 20px auto;
  height: 80px;
}
</style>
