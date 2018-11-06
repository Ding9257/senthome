const request = require("./../../util/request").request;
const util = require("./../../util/util");
const moment = require("./../../util/moment");
const app = getApp();
Page({
    data: {
        window_width: app.globalData.window_width,
        hosts: app.globalData.hosts,
        status: 0,
        banner_list: [{
            banner_id: 0,
            banner_image: '/image/banner.png'
        }],
        treasure_list: []
    },
    onUnload: function () {

    },
    onLoad: function () {
        this.getTreasure();
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
    getTreasure: function () {
        request({
            url: '/coupon/list',
            method: "POST",
            data: {}
        }).then(res => {
            let list = [];
            for (let item of res.data) {
                let currentTimestamp = moment().valueOf();
                let collectTimestamp = moment(item.collectTime).valueOf();
                let progress = currentTimestamp / collectTimestamp * 100;
                item.progress = progress.toFixed(2) * 1;
                item.oddsOfWinning = 0;
                if (!util.isEmpty(item.couponDrools)) {
                    for (let i = 0; item.couponDrools.length; i++) {
                        let {people, rate} = item.couponDrools[i];
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
    }
});
