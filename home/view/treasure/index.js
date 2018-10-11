const constant = require("../../util/constant.js");
const http = require("../../util/http.js");

Page({
    data: {
        window_width: getApp().globalData.window_width,
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

    }
});
