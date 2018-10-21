const constant = require("../../util/constant.js");
const request = require("./../../util/request").request;

Page({
    data: {
        window_width: getApp().globalData.window_width,
        sid: getApp().globalData.shopInfo.id,
        luckBagMoneyList: {},
        category_list: [],
        luckBagTotalPrice: 0
    },
    onUnload: function () {

    },
    onLoad: function () {
        this.setData({
            sid: getApp().globalData.shopInfo.id
        });
        //获取福袋
        this.getLuckBag();
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
    getLuckBag: function () {
        request({
            url: '/blessing/list',
            method: "POST",
            data: {
                sid: this.data.sid,
                status: 1
            }
        }).then(res => {
            let luckBagMoneyList = this.data.luckBagMoneyList || {};
            //计算福袋价格
            let list = [];
            for (let item of res.data.blessingList) {
                let luckBagMoney = 0;
                for (let product of item.productList) {
                    luckBagMoney = luckBagMoney + product.money * 1;
                }
                item.luckBagMoney = luckBagMoney;
                list.push(item);
                //otherStock  剩余库存
                luckBagMoneyList[item.id] = {num: 0, luckBagMoney, otherStock: item.otherStock};
            }
            this.setData({
                category_list: list,
                luckBagMoneyList
            });
        })
    },
    down: function (e) {
        let id = e.currentTarget.id;
        let luckBagMoneyList = this.data.luckBagMoneyList;
        let num = luckBagMoneyList[id].num;
        //判断不能大于库存
        if (num <= 0) {
            return false;
        }
        luckBagMoneyList[id].num = num - 1;
        this.setData({
            luckBagMoneyList
        });
        this.countLuckBagTotalPrice();
    },
    add: function (e) {
        let id = e.currentTarget.id;
        let luckBagMoneyList = this.data.luckBagMoneyList;
        let num = luckBagMoneyList[id].num;
        let otherStock = luckBagMoneyList[id].otherStock;
        //判断不能大于库存
        // if (num == otherStock) {
        //     return false;
        // }
        luckBagMoneyList[id].num = num + 1;
        this.setData({
            luckBagMoneyList
        });
        this.countLuckBagTotalPrice();
    },
    countLuckBagTotalPrice: function () {
        let luckBagTotalPrice = 0;
        let luckBagMoneyList = this.data.luckBagMoneyList;
        for (let key in luckBagMoneyList) {
            let product = luckBagMoneyList[key];
            luckBagTotalPrice = luckBagTotalPrice + (product.num * product.luckBagMoney);
        }
        luckBagTotalPrice = luckBagTotalPrice.toFixed(2)
        this.setData({
            luckBagTotalPrice
        });
    }
});