<template>
    <controls />
    <div class="container">
        <div class="card mx-auto">
            <div class="card-header">
                <h1 class="card-title">{{ post.title }}</h1>
                <span class="mx-1">
                    <i class="fas fa-user-circle"></i>
                    <p class="card-text d-inline mx-1">{{ post.author }}</p>
                </span>
                <span class="mx-1 float-end">
                     <i class="fas fa-calendar"></i>
                    <p class="card-text d-inline mx-1">{{ post.date }}</p>
                </span>
            </div>
            <div class="card-body">
                  <p>{{ post.content }}</p>
            </div>
            </div>
    </div>
</template>

<script lang="ts">
import Controls from '@/components/Controls.vue'
import IPost from '@/core/interfaces/post.interface';
import { PostService } from '@/core/services/post.service';
import { defineComponent, onMounted, PropType,ref } from 'vue'
import {useRoute} from 'vue-router'

export default defineComponent({
    components: { Controls },
    setup() {
        const route = useRoute();
        const post = ref({
            title:'',
            author:'',
            content:'',
            date:''
        });
        onMounted( async () => {
           const result =  await PostService.fetchPostById(route.params.id).then(res =>  res.json())
            post.value = result
        })

        return{
            post
        }
    },
})
</script>

<style scoped>
    .card{
        color:#696969;
        width: 80%;
        text-align: left;
    }
</style>
