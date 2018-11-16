import Dialog from "../../dist/dialog/dialog";
import Toast from './../../dist/toast/toast';

const request = require("./../../util/request").request;
const util = require("./../../util/util");
const app = getApp();
let _this;
Page({
    data: {
        member_total_amount: parseFloat(0).toFixed(1),
        WAIT_PAY: 0,
        shopInfo: app.globalData.shopInfo,
        userInfo: app.globalData.userInfo,
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
                        userName: util.removeEmoji(user.nickName),
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
                    // wx.navigateTo({
                    //     url:"/view/phone/index"
                    // });
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
        if(app.globalData.isShowToast){
            wx.showToast({
                title: "请先登录",
                icon: 'none',
                duration: 1000,
                mask: true
            });
            app.globalData.isShowToast = false;
        }
        // wx.removeTabBarBadge({
        //     index: 2
        // })
        let userInfo = app.globalData.userInfo;
        this.setData({
            userInfo,
            shopInfo: app.globalData.shopInfo
        });
    },
    onHide: function (e) {

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
    },
    navigator: function (e) {
        if (!util.isEmpty(this.data.userInfo)) {
            let url = e.currentTarget.dataset.url;
            wx.navigateTo({url});
        } else {
            Toast.fail("请登录");
        }
    }
});
