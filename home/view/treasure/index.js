const request = require("./../../util/request").request;
const moment = require("./../../util/moment");
Page({
    data: {
        window_width: getApp().globalData.window_width,
        status: 0,
        banner_list: [{
            banner_id: 0,
            banner_image: '/image/1933457.jpg'
        }, {
            banner_id: 1,
            banner_image: '/image/1933457.jpg'
        }, {
            banner_id: 2,
            banner_image: '/image/1933457.jpg'
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
                let collectTimestamp = moment(collectTime).valueOf();
                let progress = currentTimestamp / collectTimestamp * 100;
                item.progress = progress;
                list.push(item);
            }
            this.setData({
                treasure_list: list
            });
        })
    }
});
