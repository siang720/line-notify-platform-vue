import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/NotFound.vue";
import SignIn from "../views/SignIn.vue";
import Service from "../views/Service.vue";
import SendNotify from "../views/sendNotify.vue";
import historyNotify from "../views/historyNotify.vue";
import draft from "../views/draft.vue";
import Dashboard from "../views/Dashboard.vue"
import store from './../store'

Vue.use(VueRouter);

const routes = [
  {
    path: "/signin",
    name: "sign-in",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "sign-up",
    component: () => import("../views/SignUp.vue"),
  },
  {
    path: "/",
    name: "root",
    redirect: '/signin'
  },
  {
    path: "/dashboard",
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: "/services",
    name: "service",
    component: Service,
  },
  {
    path: "/sendNotify",
    name: "sendNotify",
    component: SendNotify,
  },
  {
    path: "/historyNotify",
    name: "historyNotify",
    component: historyNotify,
  },
  {
    path: "/draft",
    name: "draft",
    component: draft
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound,
  }
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch('fetchCurrentUser')
  next()
})

export default router;
