import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import CreatePost from '@/components/CreatePost'
import ViewPost from '@/components/ViewPost'
import EditPost from '@/components/EditPost'
import PreviewPost from '@/components/PreviewPost'
import Dashboard from '@/components/Dashboard'

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
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/posts/:postId',
      name: 'ViewPost',
      component: ViewPost
    },
    {
      path: '/posts/:postId/edit',
      name: 'EditPost',
      component: EditPost
    },
    {
      path: '/posts/:postId/preview',
      name: 'PreviewPost',
      component: PreviewPost
    },
    {
      path: '/:category?',
      name: 'Home',
      component: HomePage
    }
  ]
})
