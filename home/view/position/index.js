const constant = require("../../util/constant.js");
const request = require("./../../util/request").request;
const util = require("../../util/util");
const app = getApp();
Page({
    data: {
        color: constant.color,
        window_width: app.globalData.window_width,
        popupStatus: false,
        areaList: {
            province_list: {
                110000: '北京市'
            },
            city_list: {
                110100: '顺义区',
                110200: '石景山区',
                110300: '东城区',
                110400: '西城区',
                110500: '朝阳区',
                110600: '密云区',
                110700: '海淀区'
            }
        },
        selectProv: "选择地区",
        isSelect: false,
        is_load: true,
        is_select: true,
        shippingAddressType: 2,
        userInfo: app.globalData.userInfo,
        selectTab: "收货地址",
        delivery_list: [],
        shopMention: []
    },
    onUnload: function () {

    },
    onLoad: function (option) {
        let isSelect = option.isSelect;
        if (!!isSelect) {
            this.setData({
                isSelect
            });
        }
    },
    onReady: function () {

    },
    onShow: function () {
        let userInfo = app.globalData.userInfo;
        this.setData({userInfo});
        this.getAddress();
        this.getDistrict();
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
    cancel: function () {
        this.setData({
            popupStatus: false
        });
    },
    handleClick: function (event) {
        var id = event.currentTarget.id;
        let isSelect = this.data.isSelect;
        if (!isSelect) {
            wx.navigateTo({
                url: `/view/delivery/detail?id=${id}&isSelect=${isSelect}`
            })
        } else {
            //获取收获地址
            //跳转至  购物车页
            if (this.data.shippingAddressType == 1 || this.data.shippingAddressType == 2) {
                let address = this.data.delivery_list.filter(item => {
                    return item.id == id
                });
                app.globalData.shippingAddress = address[0];
                app.globalData.areaName = address[0].distributionScope;
                let shippingAddressType = 1;
                app.globalData.shippingAddressType = shippingAddressType;
                this.setData({
                    shippingAddressType
                });
            } else {
                let address = this.data.shopMention.filter(item => {
                    return item.id == id
                });
                let shippingAddressType = 0;
                app.globalData.shippingAddressType = shippingAddressType;
                this.setData({
                    shippingAddressType
                });
                app.globalData.shopInfo = address[0];
                app.globalData.areaName = address[0].distributionScope;
            }
            wx.navigateBack({
                delta: 1
            })
        }
    },
    getDistrict: function () {
        request({
            url: "/area/getDistrict",
            method: "get",
            data: {...app.globalData.coordinate}
        }).then(data => {
            let selectProv = data.data;
            this.setData({
                selectProv
            });
            this.getStore(selectProv, "北京市");
        })
    },
    getAddress: function () {
        if (!util.isEmpty(this.data.userInfo.userId)) {
            request({
                url: '/address/list',
                method: "POST",
                data: {userId: this.data.userInfo.userId}
            }).then(res => {
                this.setData({
                    delivery_list: res.data
                });
            });
        }
    },
    onChange: function (event) {
        let title = event.detail.title;
        let shippingAddressType = 2;
        if (title == "店铺自提") {
            //this.getStore();
            shippingAddressType = 0;
        } else {
            this.getAddress()
            shippingAddressType = 1;
        }
        this.setData({
            selectTab: title,
            shippingAddressType
        });
    },
    getStore: function (area, city) {
        request({
            url: "/area/listStore",
            method: "post",
            data: {area, city, lngs: app.globalData.coordinate.lng, lats: app.globalData.coordinate.lat}
        }).then(data => {
            let list = [];
            for (let item of data.data) {
                let distance = item.juli;
                distance = (distance / 1000).toFixed(1);
                item.distance = distance;
                list.push(item);
            }
            this.setData({
                shopMention: list
            });
        });
    },
    areaSelect: function (e) {

        console.log(e);
        let city = e.detail.values[0].name;
        let selectProv = e.detail.values[1].name;
        this.setData({
            selectProv,
            popupStatus: false
        });
        this.getStore(selectProv, city);
    },
    changePopupStatus: function () {
        this.setData({
            popupStatus: true
        });
    }
});
