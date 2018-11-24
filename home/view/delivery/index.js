const constant = require("../../util/constant.js");
const request = require("./../../util/request").request;
const util = require("../../util/util");
const app = getApp();
Page({
    data: {
        window_width: app.globalData.window_width,
        color: constant.color,
        is_load: true,
        is_select: true,
        userInfo: app.globalData.userInfo,
        delivery_list: []
    },
    onUnload: function () {

    },
    onLoad: function (option) {

    },
    onReady: function () {
        console.log("onReady");
    },
    onShow: function () {
        let userInfo = app.globalData.userInfo;
        this.setData({userInfo});
        this.getAddress();
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
        if (!util.isEmpty(this.data.userInfo.userId)) {
            request({
                url: '/address/list',
                method: "POST",
                data: {userId: this.data.userInfo.userId}
            }).then(res => {
                if (res.data.length == 1 && res.data[0].status != "0") {
                    this.updateAddress(res.data[0].id);
                } else {
                    this.setData({
                        delivery_list: res.data
                    });
                }
            });
        }
    },
    updateAddress: function (id) {
        request({
            url: '/address/update',
            method: "POST",
            data: {id, status: 0}
        }).then(res => {
            this.getAddress();
        });
    }
});
