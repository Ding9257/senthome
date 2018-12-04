const request = require("./../../util/request").request;
const moment = require("./../../util/moment");
const util = require("./../../util/util");
let app = getApp();
Page({
    data: {
        window_width: getApp().globalData.window_width,
        result: 0,
        treasure_list: []
    },
    onUnload: function () {

    },
    onLoad: function () {

    },
    onReady: function () {

    },
    onShow: function () {
        this.getTreasure()
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
        let result = this.data.result;
        let tempResult = result;
        request({
            url: '/coupon/findByUserId',
            method: "POST",
            data: {userId: app.globalData.userInfo.userId, result}
        }).then(res => {
            let list = [];
            for (let tempItem of res.data) {
                let item = tempItem.coupon;
                let currentTimestamp = moment().valueOf();
                let collectTimestamp = moment(item.collectTime).valueOf();
                let progress = currentTimestamp / collectTimestamp * 100;
                tempItem.progress = progress.toFixed(1) * 1;
                tempItem.oddsOfWinning = 0;
                if (!util.isEmpty(item.couponDrools)) {
                    let couponDrools = item.couponDrools;
                    for (let i = 0; couponDrools.length > i; i++) {
                        let {people, rate, num} = couponDrools[i];
                        if (i == 0) {
                            tempItem.oddsOfWinning = rate;
                        }
                        if (num > people) {
                            tempItem.oddsOfWinning = rate;
                        } else {
                            continue;
                        }
                    }
                }
                if (tempResult == 2 && currentTimestamp > collectTimestamp) {
                    list.push(tempItem);
                } else {
                    list.push(tempItem);
                }
            }
            this.setData({
                treasure_list: list
            });
        })
    },
    onChange: function (e) {
        if (e.detail.title == "正在夺宝") {
            this.setData({
                result: 0
            });
        }
        if (e.detail.title == "成功夺宝") {
            this.setData({
                result: 1
            });
        }
        if (e.detail.title == "夺宝失败") {
            this.setData({
                result: 2
            });
        }
        this.getTreasure();
    }
});
