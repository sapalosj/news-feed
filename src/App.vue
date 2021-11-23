<template>
    <navigation-bar />
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  <router-view/>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar from '@/components/navigation-bar.vue';
export default defineComponent({
  setup() {
    name:"App"
  },
  components : {
    NavigationBar
  }
})
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

#nav a {
  font-weight: bold;
  color : white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
html, body{
  background-color: #00DBDE;
  background-image: linear-gradient(270deg, #00DBDE 0%, #FC00FF 100%);
}

</style>
