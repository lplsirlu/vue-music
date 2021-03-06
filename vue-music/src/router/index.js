import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/page/recommend/recommend'
import Singer from '@/page/singer/singer'
import SingerList from '@/page/singer_list/singer_list'
import RankingList from '@/page/rankingList/rankingList'
import Search from '@/page/search/search'
import User from '@/page/user/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Recommend,
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerList
        }
      ]
    },
    {
      path: '/rank',
      component: RankingList
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/user',
      component: User
    }
  ]
})
