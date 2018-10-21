const constant = require("../../util/constant.js");
const request = require("../../util/request").request;
Page({
    data: {
        window_width: getApp().globalData.window_width-20,
        sid: getApp().globalData.sid || "",
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
            url: '/order/list',
            method: "POST",
            data: {sid: this.data.sid, orderStatus: this.data.orderStatus}
        }).then(res => {

        })
    }
});
