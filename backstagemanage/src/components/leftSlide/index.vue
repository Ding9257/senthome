<template>
    <div class="left-side">
        <div class="left-side-inner">
            <router-link to="/" class="logo block">
                <img src="./images/logo.png" alt="AdminX">
            </router-link>
            <el-menu
                class="menu-box"
                theme="dark"
                router
                :default-active="$route.path">
                <div
                    v-for="(item, index) in nav_menu_data"
                    :key="index">
                    <el-menu-item
                        class="menu-list"
                        v-if="typeof item.child === 'undefined'"
                        :index="item.path">
                        <i class="icon fa" :class="item.icon"></i>
                        <span v-text="item.title" class="text"></span>
                    </el-menu-item>
                    <el-submenu
                        :index="item.path"
                        v-else>
                        <template slot="title">
                            <i class="icon fa" :class="item.icon"></i>
                            <span v-text="item.title" class="text"></span>
                        </template>
                        <el-menu-item
                            class="menu-list"
                            v-for="(sub_item, sub_index) in item.child"
                            :index="sub_item.path"
                            :key="sub_index">
                            <!--<i class="icon fa" :class="sub_item.icon"></i>-->
                            <span v-text="sub_item.title" class="text"></span>
                        </el-menu-item>
                    </el-submenu>
                </div>
            </el-menu>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        name: 'slide',
        data() {
            return {
                nav_menu_data: [
                    {
                        title: "主页",
                        path: "/home",
                        icon: "fa-home"
                    },
                    {
                        title: "门店管理",
                        path: "/storeManagement",
                        icon: "fa-home"
                    },
                    {
                        title: "平台管理",
                        path: "/platform",
                        icon: "fa-home",
                        child: [
                            {
                                title: "导航管理",
                                path: "/platform/navigation/list"
                            },
                            {
                                title: "banner管理",
                                path: "/platform/banner/list"
                            }
                        ]
                    },
                    {
                        title: "商品管理",
                        path: "/product",
                        icon: "fa-home",
                        child: [
                            {
                                title: "商品库",
                                path: "/product/list"
                            },
                            {
                                title: "分类管理",
                                path: "/product/sort"
                            }
                        ]
                    },
                    {
                        title: "会员管理",
                        path: "/member",
                        icon: "fa-home"
                    },
                    {
                        title: "订单管理",
                        path: "/order",
                        icon: "fa-home",
                        child: [
                            {
                                title: "订单管理",
                                path: "/order/list"
                            }
                        ]
                    },
                    {
                        title: "现金券管理",
                        path: "/cashCoupons/list",
                        icon: "fa-home",
                    },
                    {
                        title: "表格管理",
                        path: "/table",
                        icon: "fa-table",
                        child: [{
                            title: "基本表格",
                            path: "/table/base"
                        }, {
                            title: "排序表格",
                            path: "/table/sort"
                        }]
                    },
                    {
                        title: "图表管理",
                        path: "/charts",
                        icon: "fa-bar-chart-o",
                        child: [{
                            title: "柱状图表",
                            path: "/charts/bar"
                        }]
                    }]
            }
        }
    }
</script>
