import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import News from '@/views/News.vue'; 
import NewsCreate from '@/components/news/NewsCreate.vue';
import NewsView from '@/components/news/NewsView.vue';
import NewsEdit from '@/components/news/NewsEdit.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/news/:id',
    name: 'NewsView',
   
    component: NewsView
  },
  {
    path: '/create',
    name: 'NewsCreate',
    component: NewsCreate
  },
  {
    path: '/edit/:id',
    name: 'NewsEdit',
    component: NewsEdit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
