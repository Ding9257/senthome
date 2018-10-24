const request = require("./../../util/request").request;
let app = getApp();
Page({
    data: {
        window_width: app.globalData.window_width,
        window_height: app.globalData.window_height,
        list: [],
        userId: "",
        //商品分类
        categoryList: [],
        categoryId: '',
        currentPage: 1,
        totalPage: 0,
        page: 10,
        shopInfo: app.globalData.shopInfo,
        shopCart: app.globalData.shopCart || {},
        productList: []
    },
    onUnload: function () {

    },
    onLoad: function (option) {
        this.setData({
            userId: app.globalData.userInfo.userId
        });
        //商品分类
        request({
            url: '/product/typeList',
            method: "POST",
            data: {sid: this.shopInfo.id}
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
    onReady: function () {
        console.log("onReady");
    },
    onShow: function () {
        console.log("show");
        this.setData({
            shopCart: app.globalData.shopCart
        });
    },
    onHide: function () {
        console.log("onHide");
    },
    onPullDownRefresh: function () {
        console.log("onPullDownRefresh");
    },
    onReachBottom: function () {
        console.log("onReachBottom");
    },
    onShareAppMessage: function () {
        console.log("onShareAppMessage");
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
            data: {type: this.data.categoryId, pageNo: this.data.currentPage, sid: this.data.shopInfo.id}
        }).then((data) => {
            let totalPage = Math.ceil(data.data.count / this.data.page);
            let productList = this.data.productList || [];
            for (let item of data.data.productList) {
                if (!this.data.shopCart[item.id]) {
                    this.data.shopCart[item.id] = {num: 0, otherStock: item.otherStock, product: item};
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
        let num = shopCart[id].num + 1;
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
    }
});
