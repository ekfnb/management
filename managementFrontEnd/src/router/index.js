import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welicome from '../components/welicome.vue'
import User from '../components/user/user.vue'
import OrdinaryUsers from '../components/user/ordinaryUsers.vue'
import PreRelease from '../components/pre_release/pre_release.vue'
import ReleaseList from '../components/pre_release/release_list.vue'
import PreExamine from '../components/pre_examine/pre_examine.vue'
import ExamineList from '../components/pre_examine/examine_list.vue'
import ExamineResults from '../components/pre_examine/examine_results.vue'
import PreSuccess from '../components/pre_success/pre_success.vue'
import SuccessList from '../components/pre_success/success_list.vue'
import PreFail from '../components/pre_fail/pre_fail.vue'
import FailList from '../components/pre_fail/fail_list.vue'
import UpdateProject from '../components/pre_release/update_project.vue'
import UpdateExamine from '../components/pre_examine/update_examine.vue'
import UpdateSuccess from '../components/pre_success/update_success.vue'
import UpdateFail from '../components/pre_fail/update_fail.vue'
import PojectProposal from '../components/pre_release/poject_proposal.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    component:Home,
    redirect:'/welcome',
    children:[{path:'/welcome',component:Welicome},
      {path:'/user', component: User },
      {path:'/ordinaryUsers',component:OrdinaryUsers},
      {path:'/pre_release',component:PreRelease},
      {path:'/release_list',component:ReleaseList},
      {path:'/poject_proposal',component:PojectProposal},
      {path:'/pre_examine',component:PreExamine},
      {path:'/examine_list',component:ExamineList},
      {path:'/examine_results',component:ExamineResults},
      {path:'/pre_success',component:PreSuccess},
      {path:'/success_list',component:SuccessList},
      {path:'/pre_fail',component:PreFail},
      {path:'/fail_list',component:FailList},
      {path:'/update_project',component:UpdateProject},
      {path:'/update_examine',component:UpdateExamine},
      {path:'/update_success',component:UpdateSuccess},
      {path:'/update_fail',component:UpdateFail}
    ]
  },
]

const router = new VueRouter({
  routes
})
//挂载路由守卫
router.beforeEach((to,from,next)=>{
  //to访问路径，from需要跳转的路由，next表示放行（回调函数）
  if(to.path === '/login') return next();
  const tokenStr = sessionStorage.getItem('token');
  if(!tokenStr) return next('/login');
  next();
})

export default router
