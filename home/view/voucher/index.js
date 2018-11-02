const request = require("../../util/request").request;
const app = getApp();
Page({
    data: {
        window_width: getApp().globalData.window_width - 20,
        sid: getApp().globalData.sid || "",
        userId: "",
        voucherList: [
            {id: 1, price: 100, factor: "满200使用"},
            {id: 1, price: 100, factor: "满200使用"}
        ]
    },
    onUnload: function () {

    },
    onLoad: function (option) {

    },
    onReady: function () {

    },
    onShow: function () {
        let userId = app.globalData.userInfo.userId;
        this.setData({
            userId
        });
        this.getOrder(userId);
    },
    onHide: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    },
    getOrder: function (userId) {
        request({
            url: '/coupon/findByCoupon',
            method: "POST",
            data: {userId}
        }).then(res => {
            console.log(res);
            this.setData({voucherList: res.data})
        })
    }
});
