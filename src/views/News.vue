<template>
    <navigation-control @on-search="search" @add-post="showCreateModal"/>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 mx-auto" v-for="post in filterList" :key="post.id">
                <post-list v-bind="post" @post-deleted="fetchPosts" @toggle-view="viewPost" @toggle-update="showUpdateModal"/>
            </div>
        </div>
    </div>
    <news-update-create-modal :post="modalContent" :action="action" @on-post-update="fetchPosts" />
</template>


<script lang="ts">
import { defineComponent,ref,computed,onMounted,reactive} from 'vue'
import PostList from '@/components/news/post-list.vue'
import NewsUpdateCreateModal from '@/components/news/news-update-create-modal.vue'
import {useRouter} from 'vue-router';
import NavigationControl from '@/components/navigation-control.vue'
import RouteName from '@/core/enums/route-name.enum'
import usePostFetchAll from '@/core/composables/post/usePostFetchAll'
import usePostFetchById from '@/core/composables/post/usePostFetchById'
import PostAction from '@/core/enums/post-actions.enum';



export default defineComponent({
    name:"News",
    components:{
        NewsUpdateCreateModal,
        PostList,
        NavigationControl
    },
    setup() {

        const {postLists,fetchPosts} = usePostFetchAll()
        const {modalContent,fetchPostById,clearModalContent} = usePostFetchById();
        const searchItem  = ref<string>('');
        const action  = ref<string>(PostAction.CREATE)
        const showTag = ref<boolean>(true)
        const router = useRouter();
        

        onMounted(()=>{
            fetchPosts()
        })
    
        const search = (event:any) => {
            searchItem.value = event.target.value
        }

        const filterList  = computed(() => {
            return postLists.value.filter( post => post.title.toLowerCase().includes(searchItem.value.toLowerCase()))            
        })


        const viewPost = (postId:number) => {
            router.push({name:RouteName.NewsView,params:{id:postId}});
        }

        const showCreateModal = () => {
            showTag.value = true
            clearModalContent()
            action.value = PostAction.CREATE
        }

        const showUpdateModal = async (postId:number) => {
            action.value = PostAction.UPDATE
            fetchPostById(postId)
        }

    
        return {
            modalContent,
            viewPost,
            showUpdateModal,
            showCreateModal,
            fetchPosts,
            filterList,
            search,
            action
        }
    }
})
</script>

<style scoped>
    #news-search{
        background:transparent;
        border: none;
        border-bottom: 0.1rem solid white;
        outline: none;
        color:white;
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
