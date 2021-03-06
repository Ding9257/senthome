const util = require("../../util/util.js");
const request = require("./../../util/request").request;
const app = getApp();
Page({
    data: {
        window_width: app.globalData.window_width,
        window_height: app.globalData.window_height,
        hosts: app.globalData.hosts,
        gain: app.globalData.gain,
        userInfo: app.globalData.userInfo,
        shopInfo: app.globalData.shopInfo,
        orderStatusObject: app.globalData.orderStatus || "",
        orderStatus: "",
        activeStatus: "",
        slider_offset: 0,
        slider_left: 0,
        slider_width: 0,
        is_load: false,
        list: [],
        totalPage: 0,
        page: 10,
        currentPage: 1,
        order_flow: '',
        order_list: [],
        orderStatusList: [
            {title: "全部订单", status: ""},
            {title: "待付款", status: 8},
            {title: "待收货", status: 9},
            {title: "退款/售后", status: -1}
        ]
    },
    onUnload: function () {

    },
    onLoad: function (option) {
        let shopInfo = app.globalData.shopInfo;
        let userInfo = app.globalData.userInfo;
        this.setData({
            shopInfo,
            userInfo
        })
        let activeStatus = option.activeStatus;
        if (!util.isEmpty(activeStatus)) {
            let orderStatus = "";
            if (activeStatus == 1) {
                orderStatus = 8
            }
            if (activeStatus == 2) {
                orderStatus = 9
            }
            if (activeStatus == 3) {
                orderStatus = -1
            }
            if (activeStatus == 0) {
                orderStatus = ""
            }
            this.setData({
                activeStatus,
                orderStatus
            });
        }
        this.getOrder();
    },
    onReady: function () {

    },
    onShow: function () {
        let shopInfo = app.globalData.shopInfo;
        let userInfo = app.globalData.userInfo;
        this.setData({
            shopInfo,
            userInfo
        })
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
            url: '/order/list1',
            method: "POST",
            data: {
                //sid: this.data.shopInfo.id,
                status: this.data.orderStatus,
                pageNo: this.data.currentPage,
                userId: this.data.userInfo.userId
            }
        }).then(res => {
            let totalPage = Math.ceil(res.data.count / this.data.page);
            let order_list = this.data.order_list || [];
            order_list = order_list.concat(res.data.orderList.map(item => {
                if (item.resultType == 0) {
                    let countMoney = 0;
                    item.productOrderResultsList.map(product => {
                        countMoney = countMoney + (Math.floor(product.money * this.data.gain * 10) * product.num / 10).toFixed(1) * 1;
                    });
                    item.countMoney = countMoney.toFixed(1);
                }
                return item;
            }));
            this.setData({
                order_list: order_list,
                totalPage
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
            currentPage: 1,
            orderStatus: status,
            order_list: []
        });
        this.getOrder();
    },
    lower: function (e) {
        if (this.data.currentPage < this.data.totalPage) {
            this.setData({
                currentPage: this.data.currentPage + 1
            });
            this.getOrder();
        } else {
            console.log("最大页数", this.data.totalPage);
            return false;
        }
    },
});
