<template>
    <navigation-control @on-search="search" @add-post="showCreateModal"/>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 mx-auto" v-for="post in filterList" :key="post.id">
                <post-list v-bind="post" @post-deleted="fetchPosts" @toggle-view="viewPost" @toggle-update="showUpdateModal"/>
            </div>
        </div>
    </div>
    <news-update-create-modal :post="post" :action="action" @on-post-update-or-create="fetchPosts" />
</template>


<script lang="ts">
import { defineComponent,ref,computed,onMounted,reactive} from 'vue'
import PostList from '@/components/news/post-list.vue'
import NewsUpdateCreateModal from '@/components/news/news-update-create-modal.vue'
import {useRouter} from 'vue-router'
import NavigationControl from '@/components/navigation-control.vue'
import RouteName from '@/core/enums/route-name.enum'
import usePostFetchAll from '@/core/composables/post/use-post-fetch-all'
import usePostFetchById from '@/core/composables/post/use-post-fetch-by-id'
import PostAction from '@/core/enums/post-actions.enum'
import IPost from '@/core/interfaces/post.interface'



export default defineComponent({
    name:"News",
    components:{
        NewsUpdateCreateModal,
        PostList,
        NavigationControl
    },
    setup() {

        const {postLists,fetchPosts} = usePostFetchAll()
        
        const post  = ref <IPost>({
            title:'',
            author:'',
            content:'',
            date:'',
            tags: []
        });

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
            const { post: result} = await usePostFetchById(postId);
            post.value.id = result.value.id
            post.value.title = result.value.title
            post.value.author = result.value.author
            post.value.content = result.value.content
            post.value.date = result.value.date
            post.value.tags = result.value.tags
        }

        const clearModalContent = () => {
          post.value.id = undefined,
          post.value.title = '',
          post.value.author = '',
          post.value.content = '',
          post.value.date = '',
          post.value.tags = []
        }

    
        return {
            post,
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
