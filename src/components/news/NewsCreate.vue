<template>
    <div class="container mx-auto" style="width:50%;">
        <controls />
        <div class="card">
            <div class="card-header">
                Add Post
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" v-model="form.title">
                </div>
                 <div class="mb-3">
                    <label for="author" class="form-label">Author</label>
                    <input type="text" class="form-control" id="author" v-model="form.author">
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">Content</label>
                    <textarea v-model="form.content" class="form-control" id="content" rows="3"></textarea>
                </div>
                 <div class="mb-3">

                </div>
                <button class="btn btn-secondary" @click="onSubmit">Create</button>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent,ref } from 'vue';
import {useRouter} from 'vue-router';
import {PostService} from '@/core/services/post.service';
import Swal from 'sweetalert2';
import {DateHelper} from '@/core/helpers/date-helper';
import Controls from '@/components/Controls.vue'
import IPost from '@/core/interfaces/post.interface'



export default defineComponent({
    name:"NewsCreate",
    components:{
        Controls,
    },
    setup() {
        const tag = ref('')
        const tags = ref([])
        const form = ref({
            title:'',
            author:'',
            content:''
        });
        const router = useRouter();

        const onSubmit = async () => {
            const post : IPost = {
                title : form.value.title,
                author : form.value.author,
                content: form.value.content,    
                date : DateHelper.getCurrentDate()
            }
            const res = await PostService.insertPost(post);
            if(res.statusBool){
                Swal.fire('Successful!',res.message,'success').then(() => {router.push('/news')});
            }else{
                 Swal.fire('Oops!',res.message,'error');
            }
        }

        return{
            form,
            onSubmit
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
