import Toast from "../../dist/toast/toast"

const request = require("./../../util/request").request;
import Dialog from './../../dist/dialog/dialog';

let _this;
Page({
    data: {
        window_width: getApp().globalData.window_width,
        sid: getApp().globalData.sid || "",
        order: {},
        id: "",
        orderStatus: getApp().globalData.orderStatus
    },
    onUnload: function () {

    },
    onLoad: function (option) {
        let id = option.id;
        this.setData({
            id
        });
        this.getOrder(id);
    },
    onReady: function () {

    },
    onShow: function (option) {
        _this = this;
    },
    onHide: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {
    },
    getOrder: function (id) {
        request({
            url: '/order/findOne',
            method: "POST",
            data: {id}
        }).then(res => {
            let total = 0;
            res.data.productOrderResultsList.forEach(item => {
                total = total + item.price * item.num
            });
            res.data.total = total;
            this.setData({
                order: res.data
            });
        });
    },
    del: function () {
        Dialog.confirm({
            title: '确定要删除订单吗？'
        }).then(() => {
            request({
                url: `/order/delete`,
                method: "POST",
                data: {id: this.data.id}
            }).then(res => {
                wx.navigateBack({
                    delta: 1
                })
            });
        }).catch(() => {

        });
    },
    paymentCancel: function () {
        Dialog.confirm({
            title: '确定要取消当前订单吗？'
        }).then(() => {
            request({
                url: `/order/update`,
                method: "POST",
                data: {id: this.data.id, status: 4}
            }).then(res => {
                this.getOrder(this.data.id);
            });
        }).catch(() => {

        });
    },
    paidCancel: function () {
        Dialog.alert({
            message: '客观，小店已接单，无法取消订单~'
        }).then(() => {
            // on close
        });
    },
    goPayment: function () {
        let againPayment = this.data.order;
        request({
            url: "/weChat/toTakeWxCar",
            method: "POST",
            data: againPayment
        }).then(res => {
            app.requestPayment(res.data).then(ok => {
                Toast.fail("支付成功");
                _this.change_status(againPayment.orderId, 0).then(() => {
                    _this.getOrder(_this.data.id)
                });
            }).catch(err => {
                Toast.fail(err.msg);
            })
        })
    },
    change_status: function (orderId, status) {
        return request({
            url: "/order/update",
            method: "POST",
            data: {orderId, status}
        })
    },
});
