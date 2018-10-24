const constant = require("../../util/constant.js");
const util = require('../../util/util.js');
const request = require("./../../util/request").request;

Page({
    data: {
        id: "",
        color: constant.color,
        address: {},
        delivery_province: "",
        city: "",
        delivery_area: "",
        popupStatus: 0,//0关闭  1打开区域 2 打开城市
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
        cityList: {
            province_list: {
                1: '北京市',
                2: '上海市',
                3: '重庆市',
                4: '天津市'
            }
        },
        vanPopupList: {},
        province_city_area: [0, 0, 0],
        delivery_street: '',
        isSelect: false,
        delivery_is_default: false
    },
    onUnload: function () {

    },
    onLoad: function (option) {
        let id = option.id;
        let isSelect = option.isSelect;
        if (!!id) {
            this.setData({
                id,
                isSelect
            });
            this.getAddress();
        }
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
    handlDialogOpenArea: function () {
        this.setData({
            popupStatus: 1,
            vanPopupList: this.data.areaList
        });
    },
    handleSubmit: function (event) {
        var name = event.detail.value.name;
        var phone = event.detail.value.phone;
        var contentAddress = event.detail.value.contentAddress;

        if (name == '') {
            util.showFailToast({
                title: '请输入收货人'
            });

            return;
        }

        if (phone == '') {
            util.showFailToast({
                title: '请输入手机号码'
            });

            return;
        } else {
            if (!util.isPhone(phone)) {
                util.showFailToast({
                    title: '手机格式不对'
                });

                return;
            }
        }

        if (this.data.area == '') {
            util.showFailToast({
                title: '请选择省市区'
            });

            return;
        }

        if (contentAddress == '') {
            util.showFailToast({
                title: '请输入详细地址'
            });

            return;
        }
        let city = this.data.city;
        let prov = this.data.delivery_province;
        let area = this.data.delivery_area;
        let url = "";
        let id = this.data.id;
        if (!!id) {
            url = '/address/update'
        } else {
            url = '/address/save'
        }
        request({
            url,
            method: "POST",
            data: {id, name, phone, contentAddress, userId: getApp().globalData.userInfo.userId, city}
        }).then(res => {
            wx.navigateBack({
                delta: 1
            })
        });
    },
    getAddress: function () {
        request({
            url: '/address/list',
            method: "POST",
            data: {id: this.data.id}
        }).then(res => {
            this.setData({
                address: res.data[0]
            });
        });
    },
    del: function () {
        return false;
        request({
            url: '/address/list',
            method: "POST",
            data: {id: this.data.id}
        }).then(res => {
            this.setData({
                address: res.data[0]
            });
        });
    },
    popupSelect: function (e) {
        let name = e.detail.values[0].name;
        let address = this.data.address;
        if (this.data.popupStatus == 1) {
            address.areaName = name;
            this.setData({
                address,
                popupStatus: 0
            });
        } else {
            address.cityName = name;
            this.setData({
                address,
                popupStatus: 0
            });
        }
    },
    handlDialogOpenCity: function () {
        this.setData({
            popupStatus: 2,
            vanPopupList: this.data.cityList
        });
    }
});
