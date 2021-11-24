<template>
    <navigation-control :show="false" />
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
import NavigationControl from '@/components/navigation-control.vue'
import { defineComponent, onMounted } from 'vue'
import usePostFetchById from '@/core/composables/post/usePostFetchById'
import {useRoute} from 'vue-router'

export default defineComponent({
    name: 'NewsView',
    components: { NavigationControl },
    setup() {

        const {post,updatePostStateById} = usePostFetchById()
        const route = useRoute();
        
        onMounted( async () => {
           await updatePostStateById(Number(route.params.id[0]))
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
