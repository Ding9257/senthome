const request = require("./util/request.js").request;
const util = require("./util/util");
let _this;
App({
    onShow: function () {
        _this = this;
        wx.getSystemInfo({
            success: function (res) {
                this.globalData.window_width = res.windowWidth;
                this.globalData.window_height = res.windowHeight;
            }.bind(this)
        });
    },
    onLaunch: function () {

    },
    getUserInfo: function () {
        return new Promise((resolve, reject) => {
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
                                resolve(user);
                            })
                        }
                    });
                },
                fail: function (err) {
                    reject(err);
                }
            });
        });
    },
    getDefaultAddress: function (userId) {
        return new Promise((resolve, reject) => {
            request({
                url: "/address/list",
                method: "post",
                data: {userId, status: 0}
            }).then(res => {
                //判断是否有默认收货地址
                if (res.data.length >= 1) {
                    //有默认收货地址
                    let address = res.data[0];
                    resolve(address);
                } else {
                    //无默认收货地址
                    reject({});
                }
            }).catch(err => {
                reject(err)
            })
        })
    },
    getAreaStore: function (areaId, type = 2, lng, lat) {
        return new Promise((resolve, reject) => {
            request({
                url: "/app/getStore",
                method: "get",
                data: {areaId, type, lng, lat}
            }).then(store => {
                let data = store.data;
                let areaName = data.areaName;
                let shopInfo = data.list.length > 0 ? data.list[0] : {};
                getApp().globalData.shopInfo = shopInfo;
                getApp().globalData.areaName = areaName;
                resolve({areaName, shopInfo})
            }).catch(err => {
                reject(err)
            })

        });
    },
    isAuthLocation: function () {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success: function (setok) {
                    if (setok.authSetting["scope.userLocation"]) {
                        resolve(setok)
                    } else {
                        //没授权地理位置
                        reject(setok)
                    }
                },
                fail: function (err) {
                    console.log("getSetting is error", err);
                    reject(err)
                }
            });
        })
    },
    globalData: {
        //收益率
        gain: 1.05,
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
        open_id: '',
        isShowToast: false
    },
    shopCartClear: function () {
        let shopCart = getApp().globalData.shopCart;
        if (!util.isEmpty(shopCart)) {
            for (let id in shopCart) {
                shopCart[id].num = 0;
            }
            getApp().globalData.shopCart = shopCart;
        }
    },
    getLngLat: function () {
        return new Promise((resolve, reject) => {
            wx.getLocation({
                success: function (res) {
                    getApp().globalData.coordinate = {lng: res.longitude, lat: res.latitude};
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