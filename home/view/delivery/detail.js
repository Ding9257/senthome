const constant = require("../../util/constant.js");
const util = require('../../util/util.js');
import Toast from './../../dist/toast/toast';

const app = getApp();

const request = require("./../../util/request").request;

Page({
    data: {
        window_width: app.globalData.window_width,
        id: "",
        color: constant.color,
        address: {},
        isDefault: 0,
        delivery_province: "",
        community: "",//小区
        area: "",
        city: "",
        areaId: "",
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
        CommunityList: {
            province_list: {}
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

        if (contentAddress == '') {
            util.showFailToast({
                title: '请输入详细地址'
            });

            return;
        }
        let city = this.data.city;
        let area = this.data.area;
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
            data: {
                id,
                name,
                phone,
                contentAddress,
                userId: app.globalData.userInfo.userId,
                city,
                address: area,
                status: this.data.isDefault,
                areaId: this.data.areaId
            }
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
            let data = res.data[0]
            this.setData({
                address: data,
                city: data.city,
                isDefault: data.status,
                area: data.address
            });
        });
    },
    del: function () {
        request({
            url: '/address/delete',
            method: "POST",
            data: {id: this.data.id}
        }).then(res => {
            wx.navigateBack({
                delta: 1
            })
        }).catch(err => {
            Toast.fail(err.msg)
        });
    },
    cancel: function () {
        this.setData({
            popupStatus: 0
        });
    },
    handlDialogOpenCity: function () {
        this.setData({
            popupStatus: 2,
            vanPopupList: this.data.cityList
        });
    },
    handlDialogOpenArea: function () {
        this.setData({
            popupStatus: 1,
            vanPopupList: this.data.areaList
        });
    },
    handlDialogOpenCommunity: function () {
        this.setData({
            popupStatus: 3,
            vanPopupList: this.data.CommunityList
        });
    },
    popupSelect: function (e) {
        let name = e.detail.values[0].name;
        if (this.data.popupStatus == 1) {
            //获取该地区下的小区
            this.getCommunity(name);
            this.setData({
                area: name,
                popupStatus: 0
            });
        }
        if (this.data.popupStatus == 2) {
            this.setData({
                city: name,
                popupStatus: 0
            });
        }
        if (this.data.popupStatus == 3) {
            //选择小区
            let areaId = e.detail.values[0].code;
            this.setData({
                areaId,
                community: name,
                popupStatus: 0
            });
        }
    },
    setDefault: function () {
        let isDefault = this.data.isDefault == 0 ? 1 : 0;
        this.setData({
            isDefault
        })
    },
    getCommunity: function (area) {
        request({
            url: "/area/list",
            method: "POST",
            data: {area}
        }).then(data => {
            let province_list = {};
            for (let item of data.data) {
                province_list[item.id] = item.name;
            }
            this.setData({
                CommunityList: {province_list}
            })
        })
    }
});
