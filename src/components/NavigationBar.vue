<template>
    <nav class="navbar container mb-5">
        <a class="navbar-brand" href="#">
            <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
            News Feed
        </a>
        <ul class="nav justify-content-end">
            <li class="nav-item">
                <a class="nav-link active" href="#" @click="clickHome">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link transparent" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link transparent" href="#">Link</a>
            </li>
        </ul>
    </nav>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import {useRouter} from 'vue-router'

export default defineComponent({
    name: "NavigationBar",
    setup() {
       const route = useRouter();

       const clickHome = () => {
           route.push({path:'/'})
       }

       return{
           clickHome
       }
    }
})
</script>

<style scoped>
    a.navbar-brand{
        margin: 0.5rem;
        color:white;
        font-size:1.2rem;
    }

    nav.navbar li a {
        font-size:1.2rem;
        color: white;
    }

    .transparent {
        color: transparent !important;
    }
    a.nav-link.active {
        border: solid 1px;
        border-radius: 25px;
    }

     a.nav-link:hover {
       background: white;
        color: black;
       cursor: pointer
      
    }
</style>
