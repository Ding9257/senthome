const request = require("./util/request.js").request;
App({
    onLaunch: function () {
        this.getLngLat().then(data => {
            let {lng, lat, result} = data;
            this.globalData.currentPosition = result;
            this.globalData.coordinate = {lng, lat};
        });
        wx.getSystemInfo({
            success: function (res) {
                this.globalData.window_width = res.windowWidth;
                this.globalData.window_height = res.windowHeight;
            }.bind(this)
        });

        wx.getSetting({
            success: function () {
                wx.getUserInfo({
                    success: function (wxUserInfo) {
                        let user = wxUserInfo.userInfo;
                        wx.login({
                            success: function (loginData) {
                                request({
                                    url: "/customerInfo/login",
                                    method: "POST",
                                    data: {
                                        icon: user.avatarUrl,
                                        userName: user.nickName,
                                        code: loginData.code
                                    }
                                }).then(data => {
                                    let item = data.data;
                                    user.userId = item.userId;
                                    user.phone = item.phone;
                                    getApp().globalData.userInfo = user;
                                })
                            }
                        });
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
        shopInfo: {},
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
        //小区名字
        areaName: "",
        shopCart: {},
        //收货地址
        shippingAddressType: 0,//0自提 1送货上门
        shippingAddress: {},
        //坐标
        coordinate: {},
        open_id: ''
    },
    getLngLat: function () {
        return new Promise((resolve, reject) => {
            wx.getLocation({
                success: function (res) {
                    resolve({lng: res.longitude, lat: res.latitude, result: {}});
                    //逆地理编码
                },
                fail: function (err) {
                    //用户不同意授权获取位置
                    reject(err);
                }
            });
        });
    },
    requestPayment: function (data) {
        return new Promise((resolve, reject) => {
            wx.requestPayment({
                appId: data.appId,
                'timeStamp': data.timeStamp,
                'nonceStr': data.nonceStr,
                'package': data.package,
                'signType': data.MD5,
                'paySign': data.paySign,
                'success': function (res) {
                    resolve(res)
                },
                'fail': function (err) {
                    reject(err)
                },
                'complete': function (res) {
                }
            })
        });
    }
});