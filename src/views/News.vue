<template>
    <controls @onSearch="search"/>
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
import { defineComponent,ref, reactive, onMounted,computed} from 'vue'
import Controls from '@/components/Controls.vue'
import PostList from '@/components/news/PostList.vue'
import NewsUpdateModal from '@/components/news/NewsUpdateModal.vue'
import {PostService} from '@/core/services/post.service'
import IPost from '@/core/interfaces/post.interface'
import {useRouter} from 'vue-router';


export default defineComponent({
    name:"News",
    components:{
        Controls,
        PostList,
        NewsUpdateModal
    },
    setup() {

       const postLists  = ref<IPost[]>([])
        const searchItem = ref('');

       const modalContent = reactive <IPost>({
           id: '',
           title: '',
           author:'',
           content:'',
           date:''
       })
        
       const router = useRouter();
        
        const fetchPosts = async () =>{
            const result = await PostService.fetchAll().then(res => res.json())
            postLists.value = result;
        }

        const fetchSpecificPost = async (id:number) => {
            const result = await PostService.fetchPostById(id).then(res => res.json())
            modalContent.id = id
            modalContent.title = result.title
            modalContent.author = result.author
            modalContent.content = result.content
            modalContent.date = result.date
        }

        const search = (event:any) => {
            searchItem.value = event.target.value
        }

        const filterList  = computed(() => {
            return postLists.value.filter( post => post.title.toLowerCase().includes(searchItem.value.toLowerCase()))            
        })
      
        onMounted(() =>{
            fetchPosts()
        })  


        const viewPost = (postId:number) => {
           router.push({name:'NewsView',params:{id:postId}});
        }


        const showUpdateModal = (postId:number) => {
            fetchSpecificPost(postId)
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
