import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventEdit from '../views/event/Edit.vue'
import EventRegister from '../views/event/Register.vue'
import About from '../views/About.vue'
import NotFound from '../views/event/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit
      }
    ]
  },
  {
    path: '/about-us',
    name: 'About',
    component: About,
    alias: '/abc'
  },
  {
    path: '/about',
    redirect: { name: 'About' }
  },
  // {
  //   path: '/event/:id',
  //   redirect: () => {
  //     return { name: 'EventDetails' }
  //   },
  //   children: [
  //     {
  //       path: 'register',
  //       redirect: () => {
  //         return { name: 'EventRegister' }
  //       }
  //     },
  //     {
  //       path: 'edit',
  //       redirect: () => {
  //         return { name: 'EventEdit' }
  //       }
  //     }
  //   ]
  // }
  {
    path: '/event/:afterEvent(.*)',
    redirect: to => {
      return { path: 'events/' + to.params.afterEvent }
    }
  },
  { path: '/:catchAll(.*)', name: 'NotFound', component: NotFound },
  {
    path: '/404/:resource',
    name: '404Resource',
    props: true,
    component: NotFound
  },
  { path: '/network-error', name: 'NetworkError', component: NetworkError }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
