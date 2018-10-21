import Dialog from "../../dist/dialog/dialog";

const constant = require("../../util/constant.js");
const http = require("../../util/http.js");

Page({
    data: {
        color: constant.color,
        member_total_amount: parseFloat(0).toFixed(2),
        WAIT_PAY: 0,
        WAIT_SEND: 0,
        WAIT_RECEIVE: 0
    },
    onUnload: function () {

    },
    onLoad: function () {
        this.setData({
            userInfo: getApp().globalData.userInfo
        });


    },
    onGotUserInfo: function (e) {
        getApp().globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: getApp().globalData.userInfo
        });
        console.log(e.detail.errMsg)
        console.log(e.detail.userInfo)
        console.log(e.detail.rawData)
    },
    onReady: function () {

    },
    onShow: function () {
        this.handleLoad();
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
        http.request({
            is_toast: false,
            url: '/member/my/find',
            data: {},
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].product_image_file = constant.host + data[i].product_image_file;
                    data[i].product_price = data[i].product_price.toFixed(2);
                }

                this.setData({
                    member_total_amount: data.member_total_amount,
                    WAIT_PAY: data.WAIT_PAY,
                    WAIT_SEND: data.WAIT_SEND,
                    WAIT_RECEIVE: data.WAIT_RECEIVE
                });
            }.bind(this)
        });
    },
    customer:function () {
        Dialog.confirm({
            title: '客服电话',
            message:"400123456"
        }).then(() => {

        }).catch(() => {

        });
    },
    getuser:function (e) {
        wx.authorize({
            scope: "scope.userInfo", success: function (res) {
                wx.getUserInfo({
                    success: function (res) {
                        console.log("getUserInfo:", res);
                        getApp().globalData.userInfo = res.userInfo;
                    }
                });
            }
        });
    }
});
