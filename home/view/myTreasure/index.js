const request = require("./../../util/request").request;
Page({
    data: {
        window_width: getApp().globalData.window_width,
        treasure_list: [
            {id: 1, imgsrc: "/image/shop.png", title: "", oddsOfWinning: 50, price: 160, time: "2018-09-28 04:00"},
            {id: 1, imgsrc: "/image/shop.png", title: "", oddsOfWinning: 50, price: 160, time: "2018-09-28 04:00"},
            {id: 1, imgsrc: "/image/shop.png", title: "", oddsOfWinning: 50, price: 160, time: "2018-09-28 04:00"},
            {id: 1, imgsrc: "/image/shop.png", title: "", oddsOfWinning: 50, price: 160, time: "2018-09-28 04:00"},
            {id: 1, imgsrc: "/image/shop.png", title: "", oddsOfWinning: 50, price: 160, time: "2018-09-28 04:00"},
            {id: 1, imgsrc: "/image/shop.png", title: "", oddsOfWinning: 50, price: 160, time: "2018-09-28 04:00"}
        ]
    },
    onUnload: function () {

    },
    onLoad: function () {
        //this.getTreasure()
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
    getTreasure:function () {
        request({
            url: '/coupon/list',
            method: "POST"
        }).then(res => {
            this.setData({
                treasure_list: res.data
            });
        })
    }
});
