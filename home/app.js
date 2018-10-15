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
        wx.getUserInfo({
            success: function (res) {
                console.log(res);
                getApp().globalData.userInfo = res.userInfo;
            }
        });
        // wx.authorize({
        //     scope: "scope.userInfo", success: function (res) {
        //         console.log("authorize is ok ", res);
        //     }
        // });
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
        shopInfo: {},
        window_width: 0,
        window_height: 0,
        open_id: ''
    }
});