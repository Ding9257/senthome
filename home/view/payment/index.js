const constant = require("../../util/constant.js");
const request = require("./../../util/request").request;
const app = getApp();
import Toast from "../../dist/toast/toast";

Page({
    data: {
        color: constant.color,
        member_total_amount: parseFloat(0).toFixed(2),
        WAIT_PAY: 0,
        WAIT_SEND: 0,
        total: 0,
        luckBagTotalPrice: 0,
        productList: [],
        userInfo: {},
        shopInfo: {},
        productOrder: [],
        //代金券实际减少的金额
        couponPrice: 0,
        //代金券编号
        cid: "",
        typeOrder: 0,
        WAIT_RECEIVE: 0
    },
    onUnload: function (data) {

    },
    onLoad: function (data) {
        let total = data.total || 0;
        let productList = JSON.parse(data.product);
        let typeOrder = data.typeOrder;
        let productOrder = [];
        for (let item of productList) {
            productOrder.push({pid: item.id, num: item.num});
        }
        this.setData({
            userInfo: app.globalData.userInfo,
            shopInfo: app.globalData.shopInfo,
            productList,
            productOrder,
            typeOrder,
            total
        });


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
    bindCheckout: function () {
        let userInfo = this.data.userInfo;
        let shopInfo = this.data.shopInfo;
        //判断是否使用代金券
        let data = {
            userId: userInfo.userId,
            sid: shopInfo.id,
            aid: app.globalData.shippingAddress.id,
            message: this.data.delivery_street,
            status: 0,
            orderType: app.globalData.shippingAddressType,
            typeOrder: this.data.typeOrder,
            productOrder: this.productOrder,
            cid: this.data.cid,
            couponPrice: this.data.couponPrice
        };
        request({
            url: "/weChat/toTakeWxCar",
            method: "POST",
            data
        }).then(data => {
            console.log(data);
            app.requestPayment(data).then(ok => {
                wx.navigateTo({
                    url: `/view/order/index?status=2`
                });
            }).catch(err => {
                wx.navigateTo({
                    url: `/view/order/index?status=1`
                });
            })
        }).catch(e => {
            Toast.fail(e.msg);
        })
    }
});
