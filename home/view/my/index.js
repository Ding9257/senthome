import Dialog from "../../dist/dialog/dialog";
import Toast from './../../dist/toast/toast';

const request = require("./../../util/request").request;
const app = getApp();
let _this;
Page({
    data: {
        member_total_amount: parseFloat(0).toFixed(2),
        WAIT_PAY: 0,
        shopInfo: app.globalData.shopInfo,
        WAIT_SEND: 0,
        WAIT_RECEIVE: 0
    },
    onUnload: function () {

    },
    onLoad: function () {
        _this = this;
        this.setData({
            userInfo: getApp().globalData.userInfo,
            shopInfo: app.globalData.shopInfo
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
                }).catch(err => {
                    Toast.fail(err.msg);
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
        this.setData({
            userInfo: app.globalData.userInfo,
            shopInfo: app.globalData.shopInfo
        });
    },
    onHide: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

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
                        app.globalData.userInfo = res.userInfo;
                    },
                    fail: function () {

                    }
                });
            }
        });
    }
});
