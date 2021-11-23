import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home.vue'
import News from '@/views/news.vue'; 
import NewsView from '@/components/news/news-view.vue';
import RouteName from '@/core/enums/route-name.enum';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteName.Home,
    component: Home
  },
  {
    path: '/news',
    name:  RouteName.News,
    component: News
  },
  {
    path: '/news/:id',
    name:  RouteName.NewsView,
    component: NewsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
