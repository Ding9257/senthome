const util = require("../../util/util");
const request = require("./../../util/request").request;
import Toast from './../../dist/toast/toast';

let _this;
const app = getApp();
Page({
    data: {
        window_width: app.globalData.window_width,
        gain: app.globalData.gain,
        hosts: app.globalData.hosts,
        imgWidth: 30,
        shopDefaultImg: "/image/new/mr.png",
        banner_list: [
            {url: "/image/banner.png"}
        ],
        areaNareaNameame: "请选择",
        shopCart: {},
        shopInfo: {},
        userInfo: {},
        category_list: [],
        product_list: [],
        dianZhang_list: []
    },
    onUnload: function () {

    },
    onLoad: function (option) {
        _this = this;
    },
    onReady: function () {

    },
    onShow: function () {
        // wx.setTabBarBadge({
        //     index: 2,
        //     text: '10'
        // })
        if (util.isEmpty(app.globalData.shopInfo)) {
            this.getShopInfo();
        }
        let shopInfo = app.globalData.shopInfo;
        let areaName = app.globalData.areaName;
        let userInfo = app.globalData.userInfo;
        this.setData({
            shopInfo,
            userInfo,
            areaName
        })
        if (!util.isEmpty(shopInfo)) {
            this.getDianZhangRecommend();
        }
        //轮播图
        this.carouselMap();
    },
    getShopInfo: function () {
        let lng, lat;
        app.getLngLat().then(LngLat => {
            lng = LngLat.lng;
            lat = LngLat.lat;
            app.globalData.coordinate = {lng, lat};
            app.getUserInfo().then(userInfo => {
                _this.setData({
                    userInfo
                })
                app.getDefaultAddress(userInfo.userId).then(address => {
                    app.getAreaStore(address.areaId, 2, lng, lat).then(({areaName, shopInfo}) => {
                        _this.setData({
                            areaName, shopInfo
                        });
                        _this.getDianZhangRecommend();
                    });
                })
            });
        }).catch(err => {
            app.getAreaStore("", 1, lng, lat).then(({areaName, shopInfo}) => {
                _this.setData({
                    areaName, shopInfo
                })
                _this.getDianZhangRecommend();
            });
        })
    },
    onHide: function () {
        console.log("onHide");
    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    },
    getDianZhangRecommend: function () {
        request({
            url: '/product/list',
            method: "POST",
            data: {isTop: "1", sid: this.data.shopInfo.id}
        }).then(res => {
            let list = [];
            let shopCart = app.globalData.shopCart;
            for (let key in res.data) {
                let items = res.data[key];
                if (!util.isEmpty(items)) {
                    for (let item of items) {
                        item.money = (item.money * this.data.gain).toFixed(1);
                        list.push(item);
                        if (util.isEmpty(shopCart[item.id])) {
                            shopCart[item.id] = {num: 0, otherStock: item.stock, product: item};
                        }
                    }
                }

            }
            app.globalData.shopCart = shopCart;
            this.setData({
                dianZhang_list: list,
                shopCart
            });
        })
    },
    carouselMap: function () {
        request({
            url: '/icon/list',
            method: "POST",
            data: {}
        }).then(res => {
            if (!util.isEmpty(res.data)) {
                this.setData({
                    banner_list: res.data
                });
            }
        })
    },
    goToTreasure: function () {
        //判断是否有数据
        wx.navigateTo({
            url: '/view/treasure/index'
        })
    },
    goToTarget: function (e) {
        let target = e.currentTarget.dataset.target;
        let url = "", httpUrl = "";
        let data = {};
        switch (target * 1) {
            case 0:
                url = "/view/category/index";
                httpUrl = "/product/typeList";
                break;
            case 1:
                url = "/view/treasure/index";
                httpUrl = "/coupon/list";
                break;
            case 2:
                url = "/view/luckBag/index";
                httpUrl = "/blessing/list";
                data.sid = this.data.shopInfo.id;
                break;
        }
        request({
            url: httpUrl,
            method: "post",
            data
        }).then(data => {
            if (util.isEmpty(this.data.userInfo)) {
                app.globalData.isShowToast = true;
                wx.switchTab({
                    url: '/view/my/index'
                })
            } else {
                if (target == 2) {
                    if (data.data.count > 0) {
                        wx.navigateTo({
                            url
                        });
                    } else {
                        Toast.fail('店铺装修中');
                    }
                }
                if (target == 1) {
                    if (data.data.length > 0) {
                        wx.navigateTo({
                            url
                        });
                    } else {
                        Toast.fail('店铺装修中');
                    }
                }
            }
        })
    },
    goToshop: function () {
        //判断是否有商品
        let shopInfo = app.globalData.shopInfo;
        request({
            url: '/product/typeList',
            method: "POST",
            data: {sid: shopInfo.id, status: 1}
        }).then((data) => {
            if (data.data.length > 0) {
                wx.switchTab({
                    url: "/view/category/index"
                })
            } else {
                Toast.fail('店铺装修中');
            }
        }).catch(err => {
            console.log(err);
        });
    },
    addShop: function (e) {
        let id = e.target.dataset.id;
        let shopCart = this.data.shopCart;
        let num = shopCart[id].num;
        let otherStock = shopCart[id].otherStock;
        //判断不能大于库存
        if (num == otherStock) {
            Toast.fail("已达最大库存");
            return false;
        }
        num++;
        shopCart[id].num = num;
        app.globalData.shopCart = shopCart;
        this.setData({
            shopCart
        })
    }
});

