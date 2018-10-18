const notification = require('../../util/notification.js');
const constant = require("../../util/constant.js");
const request = require("./../../util/request").request;

Page({
    data: {
        color: constant.color,
        is_load: true,
        is_select: true,
        userId: getApp().globalData.userInfo.userId || "",
        delivery_list: []
    },
    onUnload: function () {

    },
    onLoad: function (option) {
        this.getAddress();
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
    handleLoad: function () {

    },
    handleClick: function (event) {
        var id = event.currentTarget.id
        wx.navigateTo({
            url: `/view/delivery/detail?id=${id}`
        })
    },
    getAddress: function () {
        request({
            url: '/address/list',
            method: "POST",
            data: {userId: this.data.user}
        }).then(res => {
            this.setData({
                delivery_list: res.data
            });
        });
    }
});
