const constant = require("../../util/constant.js");
const http = require("../../util/http.js");

Page({
    data: {
        window_width: getApp().globalData.window_width,
        window_height: getApp().globalData.window_height,
        list: [],
        category_list: constant.category_list,
        category_id: '',
        product_list: [
            {product_id: 1, product_image_file: "/image/1933457.jpg", product_name: "好的商品", product_price: 20.0},
            {product_id: 1, product_image_file: "https://cdn2.ettoday.net/images/1933/1933457.jpg", product_name: "好的商品", product_price: 20.0},
            {product_id: 1, product_image_file: "/image/1933457.jpg", product_name: "好的商品", product_price: 20.0},
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

        // http.request({
        //     url: '/product/all/list',
        //     data: {
        //
        //     },
        //     success: function (data) {
        //         for (var i = 0; i < data.length; i++) {
        //             data[i].product_image_file = constant.host + data[i].product_image_file;
        //
        //             data[i].product_price = data[i].product_price.toFixed(2);
        //         }
        //
        //         var product_list = [];
        //         for (var i = 0; i < data.length; i++) {
        //             if (data[i].category_id == this.data.category_id || this.data.category_id == '') {
        //                 product_list.push(data[i]);
        //             }
        //         }
        //
        //         this.setData({
        //             list: data,
        //             product_list: product_list
        //         });
        //     }.bind(this)
        // });
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
