const request = require("../../util/request").request;
const app = getApp();
Page({
    data: {
        window_width: app.globalData.window_width,
        sid: app.globalData.sid,
        userInfo: {},
        voucherList: []
    },
    onUnload: function () {

    },
    onLoad: function (option) {

    },
    onReady: function () {

    },
    onShow: function () {
        let userInfo = app.globalData.userInfo;
        this.setData({
            userInfo
        })
    },
    onHide: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    },
    getPhoneNumber: function (userId) {
        request({
            url: '/coupon/findByCoupon',
            method: "POST",
            data: {userId}
        }).then(res => {
            this.setData({voucherList: res.data})
        })
    },
    updateUserInfo: function (phone) {
        request({
            url: '/coupon/findByCoupon',
            method: "POST",
            data: {...this.data.userInfo, phone}
        }).then(res => {
            wx.navigateBack({
                delta: 1
            })
        })
    },
    getPhoneNumber(e) {
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        wx.navigateBack({
            delta: 1
        })
    }
});
