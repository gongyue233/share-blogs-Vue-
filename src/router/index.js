import Vue from 'vue'
import VueRouter from 'vue-router';
import store from '../store';
window.store = store;

Vue.use(VueRouter)

const routes = [
  {
    name:'index',
    path:'/',
    component:()=>import('../pages/Index.vue')
  },
  {
    name:'create',
    path:'/create',
    component:()=>import('../pages/Create.vue'),
    meta:{requireLogin: true}
  },
  {
    name:'detail',
    path:'/detail/:blogId',
    component:()=>import('../pages/Detail.vue'),
  },
  {
    name:'edit',
    path:'/edit/:blogId',
    component:()=>import('../pages/Edit.vue'),
    meta:{requireLogin: true}
  },
  {
    name:'login',
    path:'/login',
    component:()=>import('../pages/Login.vue'),
  },
  {
    name:'register',
    path:'/register',
    component:()=>import('../pages/Register.vue'),
  },
  {
    name:'my',
    path:'/my',
    component:()=>import('../pages/My.vue'),
    meta:{requireLogin: true}
  },
  {
    name:'user',
    path:'/user/:userId',
    component:()=>import('../pages/User.vue')
  },
  
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin)) { //到了有meta的路径
    
    store.dispatch('checkLogin').then(res=>{      
      if (!res) { //如果未登录就跳转到/login，通过得到vuex的store对象来得到isLogin
        next({
          path: '/login',
          query: { redirect: to.fullPath } //
        })
      } else {       
        next()
      }
    })
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
