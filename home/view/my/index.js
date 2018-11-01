import Dialog from "../../dist/dialog/dialog";

const constant = require("../../util/constant.js");
const http = require("../../util/http.js");
const request = require("./../../util/request").request;
const app = getApp();
let _this;
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
        _this = this;
        this.setData({
            userInfo: getApp().globalData.userInfo
        });


    },
    onGotUserInfo: function (e) {
        let user = e.detail.userInfo;
        wx.login({
            success: function (loginData) {
                request({
                    url: "/customerInfo/login",
                    method: "POST",
                    data: {
                        icon: user.avatarUrl,
                        userName: user.nickName,
                        code: loginData.code
                    }
                }).then(data => {
                    let item = data.data;
                    user.userId = item.userId;
                    user.phone = item.phone;
                    app.globalData.userInfo = user;
                    _this.setData({
                        userInfo: app.globalData.userInfo
                    });
                })
            }
        });
    },
    out: function () {
        app.globalData.userInfo = {};
        this.setData({
            userInfo: {}
        });
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
    customer: function () {
        Dialog.confirm({
            title: '客服电话',
            message: "400123456"
        }).then(() => {

        }).catch(() => {

        });
    },
    getuser: function (e) {
        wx.authorize({
            scope: "scope.userInfo", success: function (res) {
                wx.getUserInfo({
                    success: function (res) {
                        console.log("getUserInfo:", res);
                        app.globalData.userInfo = res.userInfo;
                    }
                });
            }
        });
    }
});
