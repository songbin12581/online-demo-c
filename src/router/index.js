import Vue from 'vue';
import Home from "../views/home.vue";
import VueRouter from 'vue-router';
import Classify from "../views/classify.vue";
import Shopping from "../views/shopping.vue";
import Search from "../views/search.vue";

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack() {
  this.back = true;
  this.go(-1);
};
Vue.use(VueRouter);

const routes = [
  {
    path:'/home',
    component:Home,
    children:[
      {
        path:'classify',
        name: 'classify',
        component:Classify
      },
      {
        path:'shopping',
        component:Shopping,
      }
    ],
  },
  {
    path:'/search',
    name: 'search',
    component: Search,
  },
  {
    path:'*',
    redirect:'/home/classify',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
