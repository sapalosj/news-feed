<template>
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title">{{ defineAction() }} Post</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control has-validation" id="title" v-model="content.title">
                <div class="invalid-feedback">
                  Please provide a title!.
                </div>
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">Author</label>
                <input type="text" class="form-control has-validation" id="author" v-model="content.author">
                <div class="invalid-feedback">
                  Please provide an author!.
                </div>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea v-model="content.content" class="form-control has-validation" id="content" rows="3"></textarea>
                <div class="invalid-feedback">
                  A content is a must!
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Tags</label>
                <smart-tags :tags="content.tags" @on-change="tagValue"/>
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="removeValidation">Close</button>
              <button type="button" class="btn btn-primary" @click="updateOrCreate" >{{ defineAction() }}</button>
          </div>
        </div>
    </div>
  </div>
</template>


<script lang="ts">
import IPost from '@/core/interfaces/post.interface';
import usePostUpdate from '@/core/composables/post/usePostUpdate'
import usePostCreate from '@/core/composables/post/usePostCreate'
import { defineComponent, PropType,ref } from 'vue'
import Swal from 'sweetalert2'
import PostAction from '@/core/enums/post-actions.enum';
import SmartTags from '@/components/smart-tags.vue'

export default defineComponent({
    name:'NewsUpdateCreateModal',
    components:{
      SmartTags
    },
    emits:['on-post-update'],
    props : {
        post :{
          type:Object  as PropType<IPost>,
          default: {
            id: '',
            title : '',
            author : '',
            content: '',
            tags: [] as string[]
          }
        },
        action: {
           type : String,
           default : PostAction.CREATE
        }
    },
    setup(props,{emit}) {

        const tag  = ref<string[]>([]);
        const content = ref<IPost>(props.post);
        const {updatePost} = usePostUpdate()
        const {insertPost} = usePostCreate()

        const updateOrCreate = async () => {
          if(isFormValid()){
            const res = props.action == PostAction.CREATE ?  await insertPost(content,tag.value) : await updatePost(content,tag.value)
            if(res.status){
              Swal.fire('Success!', res.message,'success')
              emit('on-post-update')
            }else{
              Swal.fire('Error', res.message,'error')
            }
          }
        }

        const defineAction = () => {
           return props.action ==  PostAction.CREATE ? 'Create' : 'Update'
        }

        const tagValue = (tagsArray : string[]) => {
            tag.value = tagsArray
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

        const removeValidation = () => {
            let forms = document.querySelectorAll('.has-validation');
            Array.prototype.slice.call(forms).forEach(function (form) {
                form.classList.remove('is-invalid')
            })
        }

      

        return {
          tag,
          content,
          updateOrCreate,
          tagValue,
          defineAction,
          removeValidation
        }
    }
})
</script>

<style scoped>
  div{
        color:#696969;
        text-align: left;
    }
</style>
