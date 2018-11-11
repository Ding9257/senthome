const request = require("./util/request.js").request;
const util = require("./util/util");
App({
    onLaunch: function () {
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
                                        userName: util.removeEmoji(user.nickName),
                                        code: loginData.code
                                    }
                                }).then(data => {
                                    let item = data.data;
                                    user.userId = item.userId;
                                    user.phone = item.phone;
                                    getApp().globalData.userInfo = user;
                                    this.getDefaultAddress(item.userId);
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
    getDefaultAddress: function (userId) {
        request({
            url: "/address/list",
            method: "post",
            data: {userId, status: 0}
        }).then(res => {
            //判断是否有默认收货地址
            if (res.data.length >= 1) {
                //有默认收货地址
                let address = res.data[0];
                let areaId = address.areaId;
                this.getAreaStore(areaId, 2);
            } else {
                //无默认收货地址
                this.getAreaStore("", 1);
            }
        })
    },
    getAreaStore: function (areaId, type = 2) {
        this.getLngLat().then(LngLat => {
            let {lng, lat} = LngLat;
            request({
                url: "/app/getStore",
                method: "post",
                data: {areaId, type, lng, lat}
            }).then(store => {
                let data = store.data;
                let areaName = data.areaName;
                let shopInfo = data.list[0];
                app.globalData.shopInfo = shopInfo;
                app.globalData.areaName = areaName;
            })
        })
    },
    globalData: {
        userInfo: {},
        shopInfo: {},
        orderStatus: {
            "0": "已支付",//待接单
            "1": "已发货",//发货订单
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
        hosts: "https://www.shunbokj.cn:8080",
        //小区名字
        areaName: "",
        shopCart: {},
        //收货地址
        shippingAddressType: 2,//0自提 1送货上门 2带选择
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
                'appId': data.appId,
                'timeStamp': data.timeStamp,
                'nonceStr': data.nonceStr,
                'package': data.package,
                'signType': "MD5",
                'paySign': data.paySign,
                'success': function (res) {
                    resolve(res)
                },
                'fail': function (err) {
                    console.log(err);
                    reject(err)
                },
                'complete': function (res) {
                }
            })
        });
    }
});