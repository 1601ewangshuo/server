import Vue from 'vue'
import Router from 'vue-router'

const Index = () =>
    import ('../components/index.vue');
const Detail = () =>
    import ('../components/detail.vue');
const Img = () =>
    import ('../components/img.vue');


Vue.use(Router)

export default new Router({
    routes: [{
        path: "/",
        component: Index
    }, {
        name: "detail",
        path: "/detail",
        component: Detail
    }, {
        name: "img",
        path: "/img",
        component: Img
    }]
})