const request = require("./../../util/request").request;
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
        request({
            url: '/coupon/findByUserId',
            method: "POST",
            data: {userId: app.globalData.userInfo.id, result: this.data.result}
        }).then(res => {
            this.setData({
                treasure_list: res.data
            });
        })
    },
    onClickDisabled: function (e) {
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
