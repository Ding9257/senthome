const notification = require('../../util/notification.js');
const constant = require("../../util/constant.js");
const request = require("./../../util/request").request;

Page({
    data: {
        color: constant.color,
        popupStatus:false,
        areaList:{
            province_list: {
                1: '顺义区',
                2: '石景山区',
                3: '东城区',
                4: '西城区',
                5: '朝阳区',
                6: '密云区',
                7: '海淀区'
            }
        },
        selectProv:"选择地区",
        is_load: true,
        is_select: true,
        userId: getApp().globalData.userInfo.userId || "",
        selectTab:"收货地址",
        delivery_list: []
    },
    onUnload: function () {

    },
    onLoad: function (option) {
        this.getAddress();
    },
    onReady: function () {
        console.log("onReady");
    },
    onShow: function () {
        this.getAddress();
    },
    onHide: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    },
    handleLoad: function () {

    },
    handleClick: function (event) {
        var id = event.currentTarget.id
        wx.navigateTo({
            url: `/view/delivery/detail?id=${id}`
        })
    },
    getAddress: function () {
        request({
            url: '/address/list',
            method: "POST",
            data: {userId: this.data.user}
        }).then(res => {
            this.setData({
                delivery_list: res.data
            });
        });
    },
    onChange:function (event) {
        let title = event.detail.title;
        this.setData({
            selectTab:title
        });
    },
    areaSelect:function (e) {
        let selectProv = e.detail.values[0].name;
        this.setData({
            selectProv,
            popupStatus:false
        });
    },
    changePopupStatus:function () {
        this.setData({
            popupStatus: true
        });
    }
});
