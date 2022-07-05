<template>
  <div class="container">
    <div class="row">
        <div class="col-sm-6 my-auto"> 
          <h1>Stephen John Sapalo</h1>
          <h4>News Feed Creator</h4>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit molestias, numquam facilis ea consectetur</p>
          <button class="btn btn-outline-light btn-lg" @click="redirect">Get Started!</button>
        </div>
        <h1>Test</h1>
      <div class="col-sm-6">
        <img src="../assets/socmed.png" alt="Mark Zuckerberg?">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import RouteName from '@/core/enums/route-name.enum'


export default defineComponent({
  name: 'Home',
  setup(){
    const route = useRouter();

    const redirect = () => {
      route.push({name:RouteName.News});
    }

    return{
      redirect
    }
  }
});
</script>

<style scoped>
  img{
    width:95%;
    height: 95%;
  }
  button{
    border-radius: 20px ;
  }
</style>


