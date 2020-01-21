import Vue from 'vue';
import Router from "vue-router";
import routes from "./routes";
import store from '@/store';
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes
});


router.beforeEach((to, from, next) => {
    // to.meta && setTitle(to.meta.title)
    store.dispatch('authorization').then(() => {
        if (to.name === 'login') next({path: '/task/tasklist'})
        else next()
    }).catch(() => {
        if (to.name != 'login') next({ path: '/login'})
        else next()
    })

})

router.afterEach((to, from) => {

})

export default router;
