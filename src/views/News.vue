<template>
    <navigation-control @onSearch="search"/>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 mx-auto" v-for="post in filterList" :key="post.id">
                <post-list v-bind="post" @postDeleted="fetchPosts" @toggleView="viewPost" @toggleUpdate="showUpdateModal"/>
            </div>
        </div>
    </div>
    <news-update-modal :post="modalContent" @onPostUpdate="fetchPosts"/>
</template>


<script lang="ts">
import { defineComponent,ref,computed,onMounted} from 'vue'
import PostList from '@/components/news/post-list.vue'
import NewsUpdateModal from '@/components/news/news-update-modal.vue'
import {useRouter} from 'vue-router';
import NavigationControl from '@/components/navigation-control.vue'
import RouteName from '@/core/enums/route-name.enum'
import usePostFetchAll from '@/core/composables/post/usePostFetchAll'
import usePostFetchById from '@/core/composables/post/usePostFetchById'



export default defineComponent({
    name:"News",
    components:{
        NewsUpdateModal,
        PostList,
        NavigationControl
    },
    setup() {

        const {postLists,fetchPosts} = usePostFetchAll()
        const {modalContent,fetchPostById} = usePostFetchById();
        const searchItem = ref('');
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

        const showUpdateModal = async (postId:number) => {
            fetchPostById(postId)
        }

        return {
            postLists,
            modalContent,
            viewPost,
            showUpdateModal,
            fetchPosts,
            filterList,
            search
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
