/**
 * Created by zzmhot on 2017/3/23.
 *
 * 主程序入口
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:19
 * @Copyright(©) 2017 by zzmhot.
 *
 */

//导入样式
import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
import 'element-ui/lib/theme-default/index.css'
//导入Vue框架
import Vue from 'vue'
//导入element组件
import ElementUI from 'element-ui'
//导入组件
import router from './router'
//导入状态管理器
import store from 'store'
//导入请求框架
import api from './api'
//导入自定义插件
import Plugins from 'plugins'
//导入主视图文件
import App from './App'
//导入mock数据
import './mock'
//设置全局变量host
import {server_base_url} from './common/config'
//导入地图
import VueAMap from 'vue-amap';

//使用element-ui
Vue.use(ElementUI)

//使用自定义插件
Vue.use(Plugins)

//使用api
Vue.use(api)

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
    key: 'f8cd8911be9467783cf843d2feedc8fc',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', "Geocoder"],
    v: '1.4.4'
});
//发布后是否显示提示
Vue.config.productionTip = false
Vue.prototype.config = {hosts: server_base_url};

//是否开启工具调试
Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
    router,
    store,
    ...App
}).$mount('mainbody')
