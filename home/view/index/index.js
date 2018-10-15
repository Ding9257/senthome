const constant = require("../../util/constant.js");
const request = require("./../../util/request").request;

Page({
    data: {
        window_width: getApp().globalData.window_width,
        banner_list: [{
            banner_id: 0,
            banner_image: '/image/1933457.jpg'
        }, {
            banner_id: 1,
            banner_image: '/image/1933457.jpg'
        }, {
            banner_id: 2,
            banner_image: '/image/1933457.jpg'
        }],
        category_list: [],
        product_list: [],
        dianZhang_list: []
    },
    onUnload: function () {

    },
    onLoad: function () {
        // wx.clearStorage();
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
            data: {isTop: "1"}
        }).then(res => {
            let list = [];
            for (let key in res.data) {
                list = list.concat(res.data[key]);
            }
            console.log(list);
            this.setData({
                dianZhang_list: list
            });
        })
    }
});
