const constant = require("../../util/constant.js");
const request = require("./../../util/request").request;

Page({
    data: {
        window_width: getApp().globalData.window_width,
        window_height: getApp().globalData.window_height,
        list: [],
        //商品分类
        categoryList: [],
        categoryId: '',
        currentPage: 1,
        totalPage: 0,
        page: 10,
        shopCart: {},
        productList: []
    },
    onUnload: function () {

    },
    onLoad: function (option) {
        //商品分类
        request({
            url: '/product/typeList',
            method: "POST",
            data: {}
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

    },
    onShow: function () {

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
            data: {type: this.data.categoryId, pageNo: this.data.currentPage}
        }).then((data) => {
            let totalPage = Math.ceil(data.data.count / this.data.page);
            let productList = this.data.productList || [];
            for (let item of data.data.productList) {
                if (!this.data.shopCart[item.id]) {
                    this.data.shopCart[item.id] = {num: 0, otherStock: item.otherStock};
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

        this.setData({
            shopCart: shopCart
        });
    }
});
