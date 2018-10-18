const china = require("../../util/china.js");
const constant = require("../../util/constant.js");
const notification = require('../../util/notification.js');
const http = require('../../util/http.js');
const util = require('../../util/util.js');
const request = require("./../../util/request").request;

Page({
    data: {
        id: "",
        color: constant.color,
        address: {},
        is_edit: false,
        is_dialog: false,
        delivery_id: '',
        delivery_name: '',
        delivery_phone: '',
        province_list: [],
        delivery_province: "",
        city_list: [],
        city: "",
        area_list: [],
        delivery_area: "",
        province_city_area: [0, 0, 0],
        delivery_street: '',
        delivery_is_default: false
    },
    onUnload: function () {

    },
    onLoad: function (option) {
        console.log(option);
        let id = option.id;
        if (!!id) {
            this.setData({
                id
            });
            this.getAddress();
        }

        var is_edit = false;
        var delivery_id = '';
        var province_list = [];
        var city_list = [];
        var area_list = [];

        for (var i = 0; i < china.children.length; i++) {
            province_list.push(china.children[i].name);
        }

        for (var i = 0; i < china.children[0].children.length; i++) {
            city_list.push(china.children[0].children[i].name);
        }

        for (var i = 0; i < china.children[0].children[0].children.length; i++) {
            area_list.push(china.children[0].children[0].children[i].name);
        }
        this.setData({
            is_edit: is_edit,
            delivery_id: delivery_id,
            province_list: province_list,
            city_list: city_list,
            area_list: area_list
        });
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
    handlDialogOpen: function () {
        this.setData({
            is_dialog: true
        });
    },
    handlDialogCancel: function () {
        this.setData({
            is_dialog: false
        });
    },
    handlDialogOK: function () {
        var province_index = this.data.province_city_area[0];
        var city_index = this.data.province_city_area[1];
        var area_index = this.data.province_city_area[2];

        var delivery_province = china.children[province_index].name;
        var delivery_city = china.children[province_index].children[city_index].name;
        var delivery_area = china.children[province_index].children[city_index].children[area_index].name;

        this.setData({
            delivery_province: delivery_province,
            city: delivery_city,
            delivery_area: delivery_area,
            is_dialog: false
        });
    },
    handPickerChange: function (event) {
        if (this.data.is_dialog) {
            var province_city_area = event.detail.value;
            var province_index = province_city_area[0];
            var city_index = province_city_area[1];
            var area_index = province_city_area[2];

            if (this.data.province_city_area[0] != province_city_area[0]) {
                city_index = 0;
                area_index = 0;
            } else if (this.data.province_city_area[1] != province_city_area[1]) {
                area_index = 0;
            }

            var city_list = [];
            var area_list = [];

            for (var i = 0; i < china.children[province_index].children.length; i++) {
                city_list.push(china.children[province_index].children[i].name);
            }

            for (var i = 0; i < china.children[province_index].children[city_index].children.length; i++) {
                area_list.push(china.children[province_index].children[city_index].children[i].name);
            }

            this.setData({
                city_list: city_list,
                area_list: area_list,
                province_city_area: [province_index, city_index, area_index]
            });
        }
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
    del:function () {
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
    }
});
