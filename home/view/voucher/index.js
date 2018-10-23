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
        let userId = app.globalData.userInfo.id;
        this.setData({
            userId
        });
        this.getOrder();
    },
    onHide: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    },
    getOrder: function () {
        request({
            url: '/coupon/findByCoupon',
            method: "POST",
            data: {userId: this.data.userId}
        }).then(res => {

        })
    }
});
