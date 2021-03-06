const request = require("./../../util/request").request;
const util = require("./../../util/util");
const moment = require("./../../util/moment");
const app = getApp();
Page({
    data: {
        window_width: app.globalData.window_width,
        hosts: app.globalData.hosts,
        status: 0,
        orderType: "",
        banner_list: [{url: "/image/banner.png"}],
        treasure_list: []
    },
    onUnload: function () {

    },
    onLoad: function () {

    },
    onReady: function () {

    },
    onShow: function () {
        this.getBannerList();
        this.getTreasure();
    },
    onHide: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    },
    getTreasure: function () {
        request({
            url: '/coupon/list',
            method: "POST",
            data: {orderType: this.data.orderType}
        }).then(res => {
            let list = [];
            for (let item of res.data) {
                let currentTimestamp = moment().valueOf();
                let collectTimestamp = moment(item.collectTime).valueOf();
                let progress = currentTimestamp / collectTimestamp * 100;
                item.progress = progress.toFixed(1) * 1;
                item.oddsOfWinning = 0;
                if (!util.isEmpty(item.couponDrools)) {
                    for (let i = 0; i < item.couponDrools.length; i++) {
                        let {people, rate, num} = item.couponDrools[i];
                        if (i == 0) {
                            item.oddsOfWinning = rate;
                        }
                        if (num > people) {
                            item.oddsOfWinning = rate;
                        } else {
                            continue;
                        }
                    }
                }
                list.push(item);
            }
            this.setData({
                treasure_list: list
            });
        })
    },
    onChange: function (event) {
        let title = event.detail.title;
        let orderType = this.data.orderType;
        if (title == "热门夺宝") {
            orderType = "";
        }
        if (title == "即将结束") {
            orderType = 1;
        }
        if (title == "金额降序") {
            orderType = 2;
        }
        this.setData({
            orderType
        });
        this.getTreasure();
    },
    getBannerList: function () {
        request({
            url: '/icon/list',
            method: "POST",
            data: {type: 1}
        }).then(res => {
            if (!util.isEmpty(res.data)) {
                this.setData({
                    banner_list: res.data
                });
            }
        })
    }
});
