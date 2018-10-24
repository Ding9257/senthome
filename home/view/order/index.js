const constant = require("../../util/constant.js");
const request = require("./../../util/request").request;
const app = getApp();
Page({
    data: {
        order_status_list: constant.order_status_list,
        window_width: app.globalData.window_width,
        shopInfo: app.globalData.shopInfo,
        orderStatusObject: app.globalData.orderStatus || "",
        orderStatus: "",
        slider_offset: 0,
        slider_left: 0,
        slider_width: 0,
        is_load: false,
        list: [],
        order_flow: '',
        order_list: [],
        orderStatusList: [
            {title: "全部订单", status: ""},
            {title: "代付款", status: 1},
            {title: "待收货", status: 2},
            {title: "退款/售后", status: 3}
        ]
    },
    onUnload: function () {

    },
    onLoad: function (option) {
        let orderStatus = option.status;
        console.log("orderStatus", orderStatus);
        this.setData({
            orderStatus
        });
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
            data: {sid: this.data.shopInfo.id, status: this.data.orderStatus}
        }).then(res => {
            this.setData({
                order_list: res.data.orderList
            });
        })
    },
    onChange: function (e) {
        let title = e.detail.title;
        let orderStatusList = this.data.orderStatusList;
        let status = orderStatusList.filter(item => {
            return item.title == title
        })[0].status;
        this.setData({
            orderStatus: status,
            order_list: []
        });
        this.getOrder();
    }
});
