<template>
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title">Edit Post</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" v-model="content.title">
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">Author</label>
                <input type="text" class="form-control" id="author" v-model="content.author">
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea v-model="content.content" class="form-control" id="content" rows="3"></textarea>
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="update" >Update</button>
          </div>
        </div>
    </div>
  </div>
</template>


<script lang="ts">
import IPost from '@/core/interfaces/post.interface';
import usePostUpdate from '@/core/composables/post/usePostUpdate'
import { defineComponent, PropType,ref } from 'vue'
import Swal from 'sweetalert2'

export default defineComponent({
    name:'NewsUpdateModal',
    emits:['onPostUpdate'],
    props : {
        post :{
          type:Object  as PropType<IPost>,
          default: {
            id: '',
            title : '',
            author : '',
            content: '',
          }
        }
    },
    setup(props,{emit}) {
        const content = ref(props.post);

        const {updatePost} = usePostUpdate();

        const update = async () => {
          const res = await updatePost(content)
          if(res.status){
            Swal.fire('Updated!', res.message,'success')
            emit('onPostUpdate')
          }else{
             Swal.fire('Error', res.message,'error')
          }
        }
        return {
          content,
          update
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
