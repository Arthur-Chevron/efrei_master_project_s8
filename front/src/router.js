import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)

const VueLogin = () => import("./views/Login")
const VueSignup = () => import("./views/Signup")
const VueBrowser = () => import("./views/Browser")
const Vue404 = () => import("./views/Error404")

// attribution des paths
const Login = { path: '/', name: "Login", component: VueLogin}
const Signup = { path: '/signup', name: "Signup", component: VueSignup}
const Browser = { path: '/browser', name: "Browser", component: VueBrowser}
const Error = { path: '/:catchAll(.*)', name: "ErrorPage", component: Vue404}


// 1. Définition des routes
const routes = [
    Login,
    Signup,
    Browser,
    /* always at the end */
    Error
]

export default new Router({
    mode: "history",
    routes,
    scrollBehavior (){return { x: 0, y: 0 }}
})