<template>
    <div class="container mx-auto" style="width:50%;">
        <controls />
        <div class="card">
            <div class="card-header">
                Add Post
            </div>
            <div class="card-body">
                <div class="needs-validation">
                    <div class="mb-3 has-validation">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" class="form-control has-validation" id="title" v-model="form.title" required>
                        <div class="invalid-feedback">
                            Please provide a title!.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="author" class="form-label">Author</label>
                        <input type="text" class="form-control has-validation" id="author" v-model="form.author" required>
                        <div class="invalid-feedback">
                            Please enter author!.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="content" class="form-label">Content</label>
                        <textarea v-model="form.content" class="form-control has-validation" id="content" rows="3" required></textarea>
                        <div class="invalid-feedback">
                            A content is a must!
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Tags</label>
                    
                        <smart-tagz :on-changed="tagValue" :theme="{primary: '#6c757d',background: '#eaf1f8',tagTextColor: '#fff',
                            }"
                        />
                    </div>
                    <button class="btn btn-secondary" @click="onSubmit">Create</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent,ref } from 'vue';
import {useRouter} from 'vue-router';
import Swal from 'sweetalert2';
import controls from '@/components/navigation-control.vue'
import { SmartTagz } from "smart-tagz";
import "smart-tagz/dist/smart-tagz.css";
import RouteName from '@/core/enums/route-name.enum'
import usePostCreate from '@/core/composables/post/usePostCreate'
import IPost from '@/core/interfaces/post.interface';

export default defineComponent({
    name:"NewsCreate",
    components:{
        controls,
        SmartTagz
    },
    setup() {
        const {insertPost} = usePostCreate();
        const tag  = ref<string[]>(['']);
        const form  = ref<IPost>({
            title:'',
            author:'',
            content:'',
            date:''
        });
        const router = useRouter();

        const onSubmit = async () : Promise<void> => {
            if( isFormValid() ){
                const res = await insertPost(form,tag)
                if(res.status){
                    Swal.fire('Successful!',res.message,'success').then(() => {router.push({name:RouteName.News})});
                }else{
                    Swal.fire('Oops!',res.message,'error');
                }
            }
        }

        const isFormValid  = () : boolean => {
            let forms = document.querySelectorAll('.has-validation');
            let valid = true;
            Array.prototype.slice.call(forms).forEach(function (form) {
                form.classList.remove('is-invalid')
                if(form.value == ''){
                    form.classList.add('is-invalid')
                    valid = false
                }  
            })
            return valid;
        }


        const tagValue = (tagsArray : string[]) => {
            tag.value = tagsArray
        }

        return{
            form,
            onSubmit,
            tagValue
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
