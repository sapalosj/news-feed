<template>
    <div class="container mx-auto" style="width:50%;">
        <controls />
        <div class="card">
            <div class="card-header">
                Edit Post
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" v-model="post.title">
                </div>
                 <div class="mb-3">
                    <label for="author" class="form-label">Author</label>
                    <input type="text" class="form-control" id="author" v-model="post.author">
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">Content</label>
                    <textarea v-model="post.content" class="form-control" id="content" rows="3"></textarea>
                </div>
                <button class="btn btn-secondary" @click="onUpdate">Update</button>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, PropType,ref } from 'vue'
import {useRoute,useRouter}  from 'vue-router'
import Controls from '@/components/Controls.vue'
import {PostService} from '@/core/services/post.service'
import Swal from 'sweetalert2'


export default defineComponent({
    name: 'NewsEdit',
    components:{
        Controls
    },
    setup() {

        const router = useRouter();
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

        const onUpdate = async () => {
            const resource = {
                title : post.value.title,
                author: post.value.author,
                content: post.value.content
            }

          const res = await PostService.updatePost(route.params.id,resource)   
          
            if(res.statusBool){
                Swal.fire('Updated!', res.message,'success')
                router.push({name:'News'})
            }
        }

        return{
            post,
            onUpdate
        }
    },
})
</script>

<style scoped>
   div{
        color:#696969;
        text-align: left;
    }
</style>
