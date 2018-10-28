const util = require("../../util/util");
const request = require("./../../util/request").request;
const app = getApp();
Page({
    data: {
        window_width: app.globalData.window_width,
        banner_list: [
            {url: "/image/banner.png"}
        ],
        areaNareaNameame: "请选择",
        shopInfo: {},
        category_list: [],
        product_list: [],
        dianZhang_list: []
    },
    onUnload: function () {

    },
    onLoad: function () {
        //获取定位
        app.getLngLat().then(data => {
            let {lng, lat, result} = data;
            app.globalData.currentPosition = result;
            this.setData({
                currentPosition: result
            });
            request({
                url: "/app/getStore",
                method: "get",
                data: {lat, lng}
            }).then(store => {
                let data = store.data;
                let areaName = data.areaName;
                let shopInfo = data.list[0];
                app.globalData.shopInfo = shopInfo;
                app.globalData.areaName = areaName;
                this.setData({
                    shopInfo,
                    areaName
                });
                //店长推荐
                this.getDianZhangRecommend();
            })
        });
        //轮播图
        this.carouselMap();

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
    getDianZhangRecommend: function () {
        request({
            url: '/product/list',
            method: "POST",
            data: {isTop: "1", sid: this.data.shopInfo.id}
        }).then(res => {
            let list = [];
            for (let key in res.data) {
                list = list.concat(res.data[key]);
            }
            this.setData({
                dianZhang_list: list
            });
        })
    },
    carouselMap: function () {
        request({
            url: '/picture/list',
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
                break;
        }
        wx.navigateTo({
            url
        });


        // let data = {};
        // if (target == 2) {
        //     data.sid = this.data.shopInfo.id;
        // }
        // if (target == 1) {
        //
        // }
        // request({
        //     url: httpUrl,
        //     method: "POST",
        //     data: data
        // }).then(res => {
        //     wx.navigateTo({
        //         url
        //     })
        // });
    },
    goToshop: function () {
        //判断是否有商品
        wx.switchTab({
            url: "/view/category/index"
        })
    }
});

