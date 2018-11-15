const util = require("../../util/util");
const request = require("./../../util/request").request;
import Toast from './../../dist/toast/toast';

const app = getApp();
Page({
    data: {
        window_width: app.globalData.window_width,
        hosts: app.globalData.hosts,
        imgWidth: 30,
        shopDefaultImg: "/image/new/mr.png",
        banner_list: [
            {url: "/image/banner.png"}
        ],
        areaNareaNameame: "请选择",
        shopCart: {},
        shopInfo: {},
        category_list: [],
        product_list: [],
        dianZhang_list: []
    },
    onUnload: function () {

    },
    onLoad: function (option) {
        if (util.isEmpty(app.globalData.shopInfo)) {
            app.getLngLat().then(LngLat => {
                let {lng, lat} = LngLat;
                app.globalData.coordinate = {lng, lat};
                request({
                    url: "/app/getStore",
                    method: "get",
                    data: {areaId: "", type: 1, lng, lat}
                }).then(store => {
                    let data = store.data;
                    let areaName = data.areaName;
                    let shopInfo = data.list.length > 0 ? data.list[0] : {};
                    app.globalData.shopInfo = shopInfo;
                    app.globalData.areaName = areaName;
                    this.setData({
                        shopInfo,
                        areaName
                    })
                })
            })
        }
    },
    onReady: function () {

    },
    onShow: function () {
        // wx.setTabBarBadge({
        //     index: 2,
        //     text: '10'
        // })
        let shopInfo = app.globalData.shopInfo;
        let areaName = app.globalData.areaName;
        this.setData({
            shopInfo,
            areaName
        })
        if (!util.isEmpty(shopInfo)) {
            this.getDianZhangRecommend();
        }
        //轮播图
        this.carouselMap();
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
                    list = list.concat(items);
                    for (let item of items) {
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

