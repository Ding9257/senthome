const app = getApp();
const request = require("./../../util/request").request;
import Dialog from './../../dist/dialog/dialog';
import Toast from "./../../dist/toast/toast"

let _this;
Page({
    data: {
        window_width: app.globalData.window_width,
        sid: app.globalData.sid || "",
        gain: app.globalData.gain,
        order: {},
        id: "",
        orderStatus: app.globalData.orderStatus
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
            res.data.productOrderResultsList = res.data.productOrderResultsList.map(item => {
                if (res.data.resultType == 0) {
                    total = total + (Math.floor(item.money * this.data.gain * 10) * item.num / 10).toFixed(1) * 1;
                    item.money = (Math.floor(item.money * this.data.gain * 10) / 10).toFixed(1);
                }
                if (res.data.resultType == 1) {
                    total = total + (Math.floor(item.money * item.num * 10) / 10).toFixed(1) * 1;
                    item.money = (Math.floor(item.money * 10) / 10).toFixed(1);
                }

                return item;
            });
            res.data.total = total.toFixed(1);
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
                data: {id: this.data.id, status: 3}
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
        let url = "";
        if (againPayment.resultType == 0) {
            url = "/weChat/toTakeWxCarReset";
        } else {
            url = "/weChat/toTakeWxBlessReset";
        }
        request({
            url,
            method: "POST",
            data: againPayment
        }).then(res => {
            app.requestPayment(res.data).then(ok => {
                Toast.success("支付成功");
                _this.change_status(againPayment.orderId, 0).then(() => {
                    _this.getOrder(_this.data.id)
                });
            }).catch(err => {
                Toast.fail("付款失败");
            })
        })
    },
    failCancel:function () {
        Dialog.confirm({
            title: '确定要取消当前订单吗？'
        }).then(() => {
            request({
                url: `/order/update`,
                method: "POST",
                data: {id: this.data.id, status: 5}
            }).then(res => {
                this.getOrder(this.data.id);
            });
        }).catch(() => {

        });
    },
    change_status: function (orderId, status) {
        let data = {orderId, status};
        if (status == 0) {
            data.collectCode = Math.random().toString().slice(-6);
        }
        return request({
            url: "/order/update",
            method: "POST",
            data: data
        })
    },
});
