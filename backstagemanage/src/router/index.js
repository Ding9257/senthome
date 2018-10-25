import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//import components
//view page warp component
import viewPageComponent from 'pages/App'

//home
import homeComponent from 'pages/home'
//404
import noPageComponent from 'pages/error/404'
//login
import loginComponent from 'pages/user/login'
//base table
import baseTableComponent from 'pages/table/base'
//sort table
import sortTableComponent from 'pages/table/sort'
//save table
import saveTableComponent from 'pages/table/save'
//bar charts
import barChartsComponent from 'pages/charts/bar'
//门店管理
import storeManageComponent from 'pages/storeManagement/manage'
import storeManageAddComponent from "pages/storeManagement/manageAdd"
//商品管理
import productListComponent from 'pages/product/list'
import productAddOrUpdateComponent from 'pages/product/addOrUpdate'
import sortComponent from 'pages/product/sort'
import sortAddorUpdateComponent from 'pages/product/AorU'
//订单管理
import orderListComponent from 'pages/order/list'

Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [
    {
        path: '/404',
        name: 'notPage',
        component: noPageComponent
    },
    {
        path: '*',
        redirect: '/404'
    },
    {
        path: '/user/login',
        name: 'login',
        component: loginComponent
    },
    {
        path: '/',
        redirect: '/home',
        component: viewPageComponent,
        children: [
            {
                path: '/home',
                name: 'home',
                component: homeComponent,
                meta: {
                    title: "主页",
                    auth: true
                }
            },
            //*********demo***********
            {
                path: '/table/base',
                name: 'tableBase',
                component: baseTableComponent,
                meta: {
                    title: "基本表格",
                    auth: true
                }
            },
            {
                path: '/table/sort',
                name: 'tableSort',
                component: sortTableComponent,
                meta: {
                    title: "排序表格",
                    auth: true
                }
            },
            {
                path: '/table/update/:id',
                name: 'tableUpdate',
                component: saveTableComponent,
                meta: {
                    title: "数据修改",
                    auth: true
                }
            },
            {
                path: '/table/add',
                name: 'tableAdd',
                component: saveTableComponent,
                meta: {
                    title: "添加数据",
                    auth: true
                }
            },
            //*********demo***********

            //门店管理
            {
                path: '/storeManagement',
                name: 'storeManage',
                component: storeManageComponent,
                meta: {
                    title: "店铺列表",
                    auth: true
                }
            },
            {
                path: 'storeManagement/add',
                name: "storeManagementAdd",
                component: storeManageAddComponent,
                meta: {
                    title: "添加店铺",
                    auth: true
                }
            },
            {
                path: 'storeManagement/update/:id',
                name: "storeManagementUpdate",
                component: storeManageAddComponent,
                meta: {
                    title: "修改店铺",
                    auth: true
                }
            },
            //商品管理
            {
                path: 'product/list',
                name: "productList",
                component: productListComponent,
                meta: {
                    title: "商品列表",
                    auth: true
                }
            },
            {
                path: 'product/add',
                name: "productAdd",
                component: productAddOrUpdateComponent,
                meta: {
                    title: "添加商品",
                    auth: true
                }
            },
            {
                path: 'product/update/:id',
                name: "productUpdate",
                component: productAddOrUpdateComponent,
                meta: {
                    title: "修改商品",
                    auth: true
                }
            },
            {
                path: 'product/sort',
                name: "productSortList",
                component: sortComponent,
                meta: {
                    title: "分类管理",
                    auth: true
                }
            },
            {
                path: 'product/sort/add',
                name: "productSortAdd",
                component: sortAddorUpdateComponent,
                meta: {
                    title: "添加分类",
                    auth: true
                }
            },
            {
                path: 'product/sort/:id',
                name: "productSortUpdate",
                component: sortAddorUpdateComponent,
                meta: {
                    title: "修改分类",
                    auth: true
                }
            },
            //订单管理
            {
                path: 'order/list',
                name: "orderList",
                component: orderListComponent,
                meta: {
                    title: "订单管理",
                    auth: true
                }
            },
            {
                path: '/charts/bar',
                name: 'chartsBar',
                component: barChartsComponent,
                meta: {
                    title: "柱状图表",
                    auth: true
                }
            }]
    }]

const router = new VueRouter({
    routes,
    mode: 'hash', //default: hash ,history
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
    NProgress.done().start()
    let toName = to.name
    // let fromName = from.name
    let is_login = store.state.user_info.login

    if (!is_login && toName !== 'login') {
        next({
            name: 'login'
        })
    } else {
        if (is_login && toName === 'login') {
            next({
                path: '/'
            })
        } else {
            next()
        }
    }
})

//路由完成之后的操作
router.afterEach(route => {
    NProgress.done()
})

export default router
