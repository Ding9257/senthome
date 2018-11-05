const request = require("./../../util/request").request;
const app = getApp();
import Toast from "../../dist/toast/toast";

Page({
    data: {
        member_total_amount: parseFloat(0).toFixed(2),
        WAIT_PAY: 0,
        WAIT_SEND: 0,
        total: 0,
        luckBagTotalPrice: 0,
        productList: [],
        userInfo: app.globalData.userInfo,
        message: "",
        shopInfo: {},
        couponList: {},
        couponProvinceList: {
            1: '10:00-12:00',
            2: '12:00-14:00',
            3: '14:00-16:00'
        },
        popupStatus: false,
        productOrder: [],
        //代金券编号
        cid: "",
        //代金券实际减少的金额
        couponPrice: 0,
        couponText: "",
        couponUseNum: 0,
        typeOrder: 0,
        WAIT_RECEIVE: 0
    },
    onUnload: function (data) {

    },
    openPopup: function () {
        if (this.data.couponUseNum > 0) {
            this.setData({
                popupStatus: true
            });
        }
    },
    cancel: function () {
        this.setData({
            popupStatus: false
        });
    },
    offer: function (e) {
        let id = e.detail.values[0].code;
        let cid = this.data.couponList[id].cid;
        let coupon = this.data.couponList[id].coupon;
        let couponPrice = coupon.reduceMoney;
        let couponText = `满${coupon.money}减${couponPrice}`;
        this.setData({
            cid, couponPrice, couponText,
            popupStatus: false
        });
    },
    onLoad: function (data) {
        let total = data.total || 0;
        let productList = JSON.parse(data.product);
        let typeOrder = data.typeOrder;
        let message = data.message;
        console.log(message);
        let productOrder = [];
        for (let item of productList) {
            productOrder.push({pid: item.id, num: item.num});
        }
        this.setData({
            productList,
            productOrder,
            typeOrder,
            message,
            total
        });
    },
    getCoupon: function () {
        request({
            url: "/coupon/findByCoupon",
            method: "POST",
            data: {userId: this.data.userInfo.userId}
        }).then(data => {
            let object = {};
            let list = {};
            let total = this.data.total;
            let couponUseNum = 0;
            for (let item of data.data) {
                if (total >= item.coupon.money) {
                    couponUseNum++;
                    object[item.id] = `满${item.coupon.money}减${item.coupon.reduceMoney}`;
                    list[item.id] = item;
                }
            }
            if (couponUseNum > 0) {
                this.setData({
                    couponProvinceList: {province_list: object},
                    couponUseNum,
                    couponList: list
                })
            }
        })
    },
    onReady: function () {

    },
    onShow: function () {
        this.setData({
            shopInfo: app.globalData.shopInfo,
            userInfo: app.globalData.userInfo
        });
        this.getCoupon();
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
            productOrder: this.data.productOrder,
            cid: this.data.cid,
            couponPrice: this.data.couponPrice
        };
        wx.login({
            success: function (res) {
                let code = res.code;
                request({
                    url: "/customerInfo/code",
                    method: "get",
                    data: {code}
                }).then(codeOk => {
                    request({
                        url: "/weChat/toTakeWxCar",
                        method: "POST",
                        data
                    }).then(data => {
                        app.requestPayment(data.data).then(ok => {
                            wx.navigateTo({
                                url: `/view/order/index?activeStatus=2`
                            });
                        }).catch(err => {
                            Toast.fail(err.msg);
                            wx.navigateTo({
                                url: `/view/order/index?activeStatus=1`
                            });
                        })
                    }).catch(e => {
                        Toast.fail(e.msg);
                    })
                })
            },
            fail: function (loginErr) {
                Toast.fail(loginErr.errMsg)
            }
        });

    },
    message_put: function (e) {
        let message = e.detail.value;
        this.setData({message});
    }
});
