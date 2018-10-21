const constant = require("./util/constant.js");
const wechat = require("./util/wechat.js");
const QQMapWX = require('./util/qqmap-wx-jssdk.min.js');
const mapKey = require("./config/index").mapKey;

App({
    onLaunch: function () {
        let that = this;

        let qqmapsdk = new QQMapWX({
            key: mapKey // 必填
        });
        wx.getSystemInfo({
            success: function (res) {
                this.globalData.window_width = res.windowWidth;
                this.globalData.window_height = res.windowHeight;
            }.bind(this)
        });

        wx.authorize({
            scope: "scope.userInfo", success: function (res) {
                wx.getUserInfo({
                    success: function (res) {
                        console.log("getUserInfo:", res);
                        getApp().globalData.userInfo = res.userInfo;
                    }
                });
            }
        });
        wx.login({
            success: function (e) {
                console.log("login", e);
            }
        })

        wx.getSetting({
            success: function (res) {

            },
            fail: function (err) {

            }
        });
        wx.getLocation({
            success: function (res) {
                //逆地理编码
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                    success: function (addressRes) {
                        console.log(addressRes.result.formatted_addresses.recommend);
                        console.log("addressRes", addressRes);
                    },
                    fail: function (err) {
                        console.log(err);
                    }
                });
            }, fail: function (err) {

            }
        });
    },
    globalData: {
        userInfo: {},
        shopInfo: {id: 1},
        orderStatus: {
            "0": "待接单",
            "1": "发货订单",
            "2": "自提订单",
            "3": "待退款",
            "4": "取消订单",
            "5": "失效订单",
            "6": "已退款",
            "7": "完成订单",
            "8": "待付款",
            "9": "待收货"
        },
        window_width: 0,
        window_height: 0,
        shopCart: {},
        open_id: ''
    },
    handleShop: function (arr, type, id) {
        let list = [];
        for (let item of arr) {

        }
        return list;
    }
});