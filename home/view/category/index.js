const request = require("./../../util/request").request;
import Toast from './../../dist/toast/toast';

let app = getApp();
Page({
    data: {
        window_width: app.globalData.window_width,
        window_height: app.globalData.window_height,
        hosts: app.globalData.hosts,
        shopDefaultImg: "/image/new/zw.png",
        list: [],
        userId: "",
        //商品分类
        categoryList: [],
        categoryId: '',
        currentPage: 1,
        totalPage: 0,
        page: 10,
        tab_JG_status: 0,
        orderTitle: "综合排序",
        orderType: "",
        shopInfo: app.globalData.shopInfo,
        shopCart: app.globalData.shopCart || {},
        productList: []
    },
    onUnload: function () {

    },
    onLoad: function (option) {

    },
    onReady: function () {

    },
    onShow: function () {
        let productList = [];
        this.setData({
            shopCart: app.globalData.shopCart,
            currentPage: 1,
            productList
        });
        let shopInfo = app.globalData.shopInfo;
        this.setData({
            shopInfo
        })
        request({
            url: '/product/typeList',
            method: "POST",
            data: {sid: shopInfo.id, status: 1}
        }).then((data) => {
            this.setData({
                categoryList: data.data,
                categoryId: data.data[0]
            });
            this.getShop();
        }).catch(err => {
            console.log(err);
        });
    },
    onHide: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    },
    handleCategory: function (event) {
        //选择的商品分类
        var categoryId = event.currentTarget.id;
        var productList = [];
        let currentPage = 1;
        this.setData({
            categoryId: categoryId,
            currentPage: currentPage,
            productList
        });
        this.getShop();
    },
    getShop: function () {
        request({
            url: '/product/listType',
            method: "POST",
            data: {
                type: this.data.categoryId,
                pageNo: this.data.currentPage,
                sid: this.data.shopInfo.id,
                status: 1,
                orderType: this.data.orderType
            }
        }).then((data) => {
            if (!data.data.count > 0) {
                wx.showToast({
                    title: "店铺装修中",
                    icon: 'none',
                    duration: 1000,
                    mask: true
                })
                wx.switchTab({
                    url: '/view/index/index'
                });
            }
            let totalPage = Math.ceil(data.data.count / this.data.page);
            let productList = this.data.productList || [];
            for (let item of data.data.productList) {
                if (!this.data.shopCart[item.id]) {
                    this.data.shopCart[item.id] = {num: 0, otherStock: item.stock, product: item};
                }
            }
            this.setData({
                productList: productList.concat(data.data.productList),
                totalPage: totalPage,
            });
        }).catch(err => {
            console.log(err);
        });
    },
    upper: function (e) {
        return false;
        if (this.data.currentPage != 1) {
            this.setData({
                currentPage: this.data.currentPage - 1
            });
            this.getShop();
        } else {
            return false;
        }
    },
    lower: function (e) {
        if (this.data.currentPage != this.data.totalPage) {
            this.setData({
                currentPage: this.data.currentPage + 1
            });
            this.getShop();
        } else {
            console.log("最大页数", this.data.totalPage);
            return false;
        }
    },
    add: function (e) {
        let id = e.currentTarget.id;
        let shopCart = this.data.shopCart;
        let num = shopCart[id].num;
        let otherStock = shopCart[id].otherStock;
        //判断不能大于库存
        if (num == otherStock) {
            Toast.fail("已达最大库存");
            return false;
        }
        num++;
        shopCart[id].num = num;
        app.globalData.shopCart = shopCart;
        this.setData({
            shopCart: shopCart
        });
    },
    down: function (e) {
        let id = e.currentTarget.id;
        let shopCart = this.data.shopCart;
        let num = shopCart[id].num;
        if (num == 0) {

        } else {
            shopCart[id].num = num - 1;
        }
        app.globalData.shopCart = shopCart;
        this.setData({
            shopCart: shopCart
        });
    },
    addShop: function (param) {
        let {id, num} = param;
        request({
            url: "/productOrder/save",
            method: "POST",
            data: {id, num, userId: this.data.userId}
        }).then(res => {

        });
    },
    tabSelectZH: function () {
        this.setData({
            orderType: "",
            currentPage: 1,
            productList: [],
            orderTitle: "综合排序"
        });
        this.getShop();
    },
    tabSelectJG: function () {
        let tab_JG_status = this.data.tab_JG_status;
        let orderTitle = this.data.orderTitle;
        let orderType = this.data.orderType;
        if (orderTitle == "按价格") {
            orderType = orderType == 1 ? 2 : 1;
        } else {
            if (tab_JG_status == 0) {
                orderType = 1;
            } else {
                orderType = tab_JG_status;
            }
        }
        this.setData({
            tab_JG_status: orderType,
            orderType,
            currentPage: 1,
            productList: [],
            orderTitle: "按价格"
        });
        this.getShop();
    },
    tabSelectXL: function () {
        this.setData({
            orderType: 3,
            orderTitle: "按销量",
            currentPage: 1,
            productList: []
        });
        this.getShop();
    }
});
