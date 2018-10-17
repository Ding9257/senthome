const constant = require("../../util/constant.js");
const http = require("../../util/http.js");

Page({
    data: {
        order_status_list: constant.order_status_list,
        window_width: getApp().globalData.window_width,
        slider_offset: 0,
        slider_left: 0,
        slider_width: 0,
        is_load: false,
        list: [],
        order_flow: '',
        order_list: [
            {id:1},
            {id:1},
            {id:1},
            {id:1},{id:1},
            {id:1},
            {id:1}
        ]
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
    handleTab: function (event) {
        var order_flow = event.currentTarget.id;
        var order_list = [];

        for (var i = 0; i < this.data.list.length; i++) {
            if (this.data.list[i].order_flow == order_flow || order_flow == 'ALL') {
                order_list.push(this.data.list[i]);
            }
        }

        this.setData({
            slider_offset: event.currentTarget.offsetLeft,
            order_flow: order_flow,
            order_list: order_list
        });
    }
});
