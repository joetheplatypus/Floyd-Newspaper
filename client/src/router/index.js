import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import CreatePost from '@/components/CreatePost'
import ViewPost from '@/components/ViewPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/new',
      name: 'CreatePost',
      component: CreatePost
    },
    {
      path: '/posts/:postId',
      name: 'ViewPost',
      component: ViewPost
    },
    {
      path: '/:category?',
      name: 'Home',
      component: HomePage
    }
  ]
})
