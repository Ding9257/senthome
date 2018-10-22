const constant = require("./util/constant.js");
const request = require("./util/request.js").request;
const QQMapWX = require('./util/qqmap-wx-jssdk.min.js');
const mapKey = require("./config/index").mapKey;
const qqmapsdk = new QQMapWX({
    key: mapKey // 必填
});
let that;
App({
    onLaunch: function () {
        that = this;
        this.getLngLat().then(data => {
            console.log("getLngLat", data);
            let {lng, lat, result} = data;
            this.globalData.currentPosition = result;
            this.globalData.coordinate = {lng, lat};
            //获取附近店铺信息
            //this.getNearbyPosition();
        });
        wx.getSystemInfo({
            success: function (res) {
                this.globalData.window_width = res.windowWidth;
                this.globalData.window_height = res.windowHeight;
            }.bind(this)
        });
        wx.login({
            success: function (e) {
                console.log("login", e);
            }
        });
        wx.getSetting({
            success: function (res) {
                wx.getUserInfo({
                    success: function (res) {
                        getApp().globalData.userInfo = res.userInfo;
                    }
                });
            },
            fail: function (err) {
                console.log("getSetting is error", err);
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
        //附近店铺
        nearbyStore: {},
        //用户当前位置
        currentPosition: "",
        shopCart: {},
        //坐标
        coordinate: {},
        open_id: ''
    },
    getLngLat: function () {
        return new Promise((resolve, reject) => {
            wx.getLocation({
                success: function (res) {
                    //逆地理编码
                    qqmapsdk.reverseGeocoder({
                        location: {
                            latitude: res.latitude,
                            longitude: res.longitude
                        },
                        success: function (addressRes) {
                            resolve({lng: res.longitude, lat: res.latitude, result: addressRes.result});
                        },
                        fail: function (err) {
                            reject(err);
                        }
                    });
                },
                fail: function (err) {
                    //用户不同意授权获取位置
                    reject(err);
                }
            });
        });
    },
    getNearbyPosition: function () {
        request({
            url: "",
            method: "POST",
            data: {}
        }).then()
    }
});