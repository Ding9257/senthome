const request = require("./../../util/request").request;
const app = getApp();
Page({
    data: {
        goods: {},
        id: "",
        shopNum: 0,
        current: 0,
        width: app.globalData.window_width,
        height: app.globalData.window_height,
        galleryHeight: 200
    },
    onLoad: function (options) {
        // wx.setNavigationBarTitle({
        //     title: options.product_name//页面标题为路由参数
        // });
        let id = options.id;
        this.setData({
            id
        });
        this.getTreasureDetail(id)
    },
    onShow: function () {

    },
    down: function () {
        let shopNum = this.data.shopNum;
        if (shopNum <= 0) {
            return false;
        }
        shopNum--;
        this.setData({
            shopNum
        });
    },
    add: function () {
        let shopNum = this.data.shopNum;
        //判断不能大于库存

        shopNum++;
        this.setData({
            shopNum
        });
    },
    getTreasureDetail: function (id) {
        request({
            url: '/coupon/findOne',
            method: "POST",
            data: {id}
        }).then(res => {
            let item = res.data;
            let currentTimestamp = moment().valueOf();
            let collectTimestamp = moment(item.collectTime).valueOf();
            let progress = currentTimestamp / item.collectTimestamp * 100;
            item.progress = progress;
            this.setData({
                goods: item
            });
        })
    }
});