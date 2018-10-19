const constant = require("../../util/constant.js");
const request = require("./../../util/request").request;

Page({
    data: {
        window_width: getApp().globalData.window_width,
        banner_list: [],
        shopId: getApp().globalData.shopInfo.Id,
        category_list: [],
        product_list: [],
        dianZhang_list: []
    },
    onUnload: function () {

    },
    onLoad: function () {
        // wx.clearStorage();
        this.setData({
            shopId: getApp().globalData.shopInfo.Id
        });
        //轮播图
        this.carouselMap();
        //店长推荐
        this.getDianZhangRecommend();

        var category_list = constant.category_list.concat();
        category_list.splice(0, 1);
        category_list.push(constant.category_list[0]);

        this.setData({
            category_list: category_list
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
    getDianZhangRecommend: function () {
        request({
            url: '/product/list',
            method: "POST",
            data: {isTop: "1", sid: this.data.shopId}
        }).then(res => {
            let list = [];
            for (let key in res.data) {
                list = list.concat(res.data[key]);
            }
            this.setData({
                dianZhang_list: list
            });
        })
    },
    carouselMap: function () {
        request({
            url: '/picture/list',
            method: "POST",
            data: {}
        }).then(res => {
            this.setData({
                banner_list: res.data
            });
        })
    }
});
