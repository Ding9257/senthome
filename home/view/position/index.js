const constant = require("../../util/constant.js");
const request = require("./../../util/request").request;
const app = getApp();
Page({
    data: {
        color: constant.color,
        popupStatus: false,
        areaList: {
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
        selectProv: "选择地区",
        isSelect: false,
        is_load: true,
        is_select: true,
        shippingAddressType: 2,
        userId: app.globalData.userInfo.userId || "",
        selectTab: "收货地址",
        delivery_list: []
    },
    onUnload: function () {

    },
    onLoad: function (option) {
        let isSelect = option.isSelect;
        console.log(isSelect);
        if (!!isSelect) {
            this.setData({
                isSelect
            });
        }
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
        var id = event.currentTarget.id;
        let isSelect = this.data.isSelect;
        if (!isSelect) {
            wx.navigateTo({
                url: `/view/delivery/detail?id=${id}&isSelect=${isSelect}`
            })
        } else {
            //获取收获地址
            //跳转至  购物车页
            console.log(this.shippingAddressType);
            if (this.data.shippingAddressType == 1 || this.data.shippingAddressType == 2) {
                let address = this.data.delivery_list.filter(item => {
                    return item.id == id
                });
                app.globalData.shippingAddress = address[0];
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
            }
            console.log(app.globalData.shippingAddressType);
            // wx.switchTab({
            //     url: "/view/cart/cart"
            // });
            wx.navigateBack({
                delta: 1
            })
        }
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
    onChange: function (event) {
        let title = event.detail.title;
        let shippingAddressType = 2;
        if (title == "店铺自提") {
            this.getStore();
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
    getStore: function () {
        app.getLngLat().then(data => {
            let {lng, lat, result} = data;
            app.globalData.currentPosition = result;
            request({
                url: "/app/getStore",
                method: "get",
                data: {lat, lng}
            }).then(store => {
                let data = store.data;
                this.setData({
                    shopMention: data.list
                });
            })
        });
    },
    areaSelect: function (e) {
        let selectProv = e.detail.values[0].name;
        this.setData({
            selectProv,
            popupStatus: false
        });
    },
    changePopupStatus: function () {
        this.setData({
            popupStatus: true
        });
    }
});
