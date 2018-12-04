import Toast from "./../../dist/toast/toast";

const moment = require("./../../util/moment");
const request = require("./../../util/request").request;
const app = getApp();
let _this;
Page({
    data: {
        goods: {},
        hosts: app.globalData.hosts,
        id: "",
        shopNum: 0,
        current: 0,
        winnerUser: [],
        isShowWinning: false,
        width: app.globalData.window_width,
        height: app.globalData.window_height,
        galleryHeight: 200
    },
    onLoad: function (options) {
        _this = this;
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
    goBuy: function () {
        let data = this.data;
        let cid = data.id;
        let userId = app.globalData.userInfo.userId;
        let num = data.shopNum;
        request({
            url: '/weChat/toTakeWxCoupon',
            method: "POST",
            data: {cid, userId, num, status: 0, result: 0}
        }).then(data => {
            console.log(data);
            app.requestPayment(data.data).then(ok => {
                _this.updateTreasure(data.data.id);
                Toast.fail("购买成功");
                setTimeout(() => {
                    wx.switchTab({
                        url: '/view/index/index'
                    });
                }, 500)
            }).catch(err => {
                Toast.fail(err.msg);
            })
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
            item.isOver = false;
            item.progress = 100;
            //判断活动是否结束
            if (currentTimestamp >= collectTimestamp) {
                this.getWinnerUser(item.ids);
                item.isOver = true;
            } else {
                let progress = currentTimestamp / collectTimestamp * 100;
                item.progress = progress.toFixed(1) * 1;
            }
            this.setData({
                goods: item
            });
        })
    },
    getWinnerUser: function (ids) {
        request({
            url: '/customerInfo/coupon',
            method: "get",
            data: {ids}
        }).then(res => {
            let list = [];
            for (let key in res.data) {
                list.push({name: key, phone: res.data[key]})
            }
            this.setData({
                winnerUser: list,
                isShowWinning: true
            })
        })
    },
    onClose: function () {
        this.setData({
            isShowWinning: false
        })
    },
    updateTreasure: function (id) {
        request({
            url: '/coupon/updateOrder',
            method: "POST",
            data: {id, status: 1}
        }).then(res => {

        })
    }
});