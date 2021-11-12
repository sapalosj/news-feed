<template>
    <div class="card mx-auto post-card my-2">
        <div class="card-body">
            <div class="card-title">
                <h5 class="d-inline">{{ postContent.title}}</h5>
                <div class="float-end details-text">
                     <span class="mx-2">
                        <i class="fas fa-user-circle"></i>
                        {{ postContent.author }}
                    </span>
                    <span class="mx-3">
                        <i class="fas fa-calendar"></i>
                        {{ postContent.date }}
                    </span>
                </div>
            </div>
            <div class="test">
                <h6 class="card-text"> {{ postContent.content }}
                </h6>
            </div>
            
        </div>
        <div class="card-footer">
            <span class="badge rounded-pill bg-secondary mx-1">#Trending</span>
            <span class="badge rounded-pill bg-secondary mx-1">#WTF</span>
            <span class="float-end">
                <button class="btn btn-outline-secondary mx-1" @click="toggleView(postContent.id)">
                   <i class="fas fa-external-link-alt"></i>
                </button>
                <!-- data-bs-toggle="modal" data-bs-target="#staticBackdrop" -->
                 <button class="btn btn-outline-secondary mx-1"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="toggleUpdate(postContent.id)">
                    <i class="far fa-edit"></i>
                </button>
                <button class="btn btn-outline-secondary mx-1" @click="toggleDelete(postContent.id)">
                    <i class="far fa-trash-alt"></i>
                </button>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,PropType,ref} from 'vue'
import Swal from 'sweetalert2'
import IPost from '@/core/interfaces/post.interface';
import {PostService} from '@/core/services/post.service';

export default defineComponent({
    name: "Post",
    emits: ['postDeleted','toggleView','toggleUpdate'],
    props:{
        id: {
            type: Number
        },
        title: {
            type: String
        },
        author: {
            type: String
        },
        content: {
            type: String
        },
        date: {
            type: String
        }
    },
    setup(props,{emit}) {
        
        const postContent = props;
        

        const toggleDelete = async (id:number) => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then(async (result) => {
                if(result.isConfirmed){
                    const res = await PostService.deletePost(id);
                    if(res.statusBool){
                        emit('postDeleted')
                    }
                }
            })
        }

        const toggleView = (id:number) => {
            emit('toggleView',id)
        }

        const toggleUpdate = (id:number) => {
            emit('toggleUpdate',id)
        }

        return{
            postContent,
            toggleDelete,
            toggleView,
            toggleUpdate
        }
    }
})
</script>

<style scoped>
    div{
        color:#696969;
        text-align: left;
    }

    .post-card{
        width:75%;
    }

    .details-text{
        font-size: 0.8rem;
    }

    .card-text{
        max-height: 20px;
        overflow: hidden;
    }

</style>
