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

const authorized = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser.id === -1) {
    next('/signin')
    return
  }
  next()
}

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
    component: Dashboard,
    beforeEnter: authorized
  },
  {
    path: "/services",
    name: "service",
    component: Service,
    beforeEnter: authorized
  },
  {
    path: "/sendNotify",
    name: "sendNotify",
    component: SendNotify,
    beforeEnter: authorized
  },
  {
    path: "/historyNotify",
    name: "historyNotify",
    component: historyNotify,
    beforeEnter: authorized
  },
  {
    path: "/draft",
    name: "draft",
    component: draft,
    beforeEnter: authorized
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

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['sign-up', 'sign-in']
  // 如果 token 無效則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }
  // 如果 token 有效則轉址到餐聽首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/dashboard')
    return
  }
  next()
})

export default router;
