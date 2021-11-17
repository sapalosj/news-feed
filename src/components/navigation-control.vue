<template>
    <div id="news-control" class="container">
        <div class="row">
            <div class="col-sm-6">
                <button class="btn btn-outline-light pad circular-btn" @click="prevPage">
                    <i class="fas fa-chevron-left"></i>
                </button>
                 <button class="btn btn-outline-light pad circular-btn" @click="nextPage">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <i class="fas fa-search"></i>   
                <input id="news-search" @keyup="$emit('onSearch',$event)"/>   
            </div>
            <div class="col-sm-6 ">
                 <button id="create-btn" class="btn btn-outline-light" @click="addPost">
                    Add Post
                </button>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import {useRouter} from 'vue-router'
import RouteName from '@/core/enums/route-name.enum'

export default defineComponent({
    name: "NavigationControl",
    emits:['onSearch'],
    setup(props,{emit}) {
        const route = useRouter();
        
        const prevPage = () =>{
            route.go(-1);
        }

        const nextPage = () =>{
            route.go(1);
        }

        const addPost = () => {
            route.push({name:RouteName.NewsCreate});
        }

        return{
            prevPage,
            nextPage,
            addPost
        }
    },
})
</script>

<style scoped>
    #news-search{
        background:transparent;
        border: none;
        border-bottom: 0.1rem solid white;
        outline: none;
        color:white;
        margin-bottom: 2rem;
    }
    .circular-btn{
        border-radius: 50%;
    }

    .pad{
        margin-left: 1rem;
        margin-right: 1rem;
    }

    #create-btn{
        width: 15rem;
        border-radius: 10px;
    }
</style>
