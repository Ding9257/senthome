const constant = require("../../util/constant.js");
const http = require("../../util/http.js");
const request = require("./../../util/request").request;

Page({
    data: {
        window_width: getApp().globalData.window_width,
        window_height: getApp().globalData.window_height,
        list: [],
        category_list: constant.category_list,
        category_id: '',
        product_list: [
            {product_id: 1, product_image_file: "/image/1933457.jpg", product_name: "好的商品", product_price: 20.0},
            {
                product_id: 1,
                product_image_file: "https://cdn2.ettoday.net/images/1933/1933457.jpg",
                product_name: "好的商品",
                product_price: 20.0
            },
            {product_id: 1, product_image_file: "/image/1933457.jpg", product_name: "好的商品", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品1", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品2", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品3", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品4", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品5", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品6", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品7", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品8", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品9", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品", product_price: 20.0},
            {product_id: 1, product_image_file: "", product_name: "好的商品", product_price: 20.0}
        ]
    },
    onUnload: function () {

    },
    onLoad: function (option) {
        var category_id = '';

        if (typeof (option.category_id) != 'undefined') {
            category_id = option.category_id;
        }

        this.setData({
            category_id: category_id
        });
        request({
            url: '/product/list',
            method: "POST",
            data: {}
        }).then((data) => {
            console.log(data);
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
        var category_id = event.currentTarget.id;
        var product_list = [];

        for (var i = 0; i < this.data.list.length; i++) {
            if (this.data.list[i].category_id == category_id || category_id == '') {
                product_list.push(this.data.list[i]);
            }
        }

        this.setData({
            category_id: category_id,
            product_list: product_list
        });
    }
});
