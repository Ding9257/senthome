const request = require("../../util/request").request;
const app = getApp();
Page({
    data: {
        window_width: getApp().globalData.window_width - 20,
        sid: getApp().globalData.sid || "",
        userId: "",
        voucherList: []
    },
    onUnload: function () {

    },
    onLoad: function (option) {

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
    getPhoneNumber: function (userId) {
        request({
            url: '/coupon/findByCoupon',
            method: "POST",
            data: {userId}
        }).then(res => {
            this.setData({voucherList: res.data})
        })
    },
    getPhoneNumber(e) {
        console.log(e);
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        wx.navigateBack({
            delta: 1
        })
    }
});
