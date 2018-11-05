const app = getApp();
const request = require("./../../util/request").request;
import Toast from './../../dist/toast/toast';

Page({
    data: {
        window_width: app.globalData.window_width,
        window_height: app.globalData.window_height,
        sid: app.globalData.shopInfo.id,
        luckBagMoneyList: {},
        category_list: [],
        selectLuckBag: {},
        luckBagTotalPrice: 0
    },
    onUnload: function () {

    },
    onLoad: function () {
        this.setData({
            sid: app.globalData.shopInfo.id
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
                sid: this.data.sid
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
                let tempProfit = item.profit;
                let profit = tempProfit.substring(0, tempProfit.length - 1) * 0.1;
                item.luckBagMoney = (luckBagMoney * profit).toFixed(2);
                list.push(item);
                //otherStock  剩余库存
                luckBagMoneyList[item.id] = {num: 0, luckBagMoney, otherStock: item.stock, luckBag: item};
            }
            this.setData({
                category_list: list,
                luckBagMoneyList
            });
        })
    },
    down: function (e) {
        let selectLuckBag = this.data.selectLuckBag;
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
        if (num == otherStock) {
            Toast.fail("已达最大库存");
            return false;
        }
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
    },
    bindCheckout: function () {
        let selectLuckBag = [];
        let cache = this.data.luckBagMoneyList;
        for (let id in cache) {
            if (!!cache[id] && cache[id].num > 0) {
                selectLuckBag.push({
                    id: id, num: cache[id].num, luckBagMoney: cache[id].luckBagMoney, product: cache[id].luckBag
                });
            }
        }
        wx.navigateTo({
            url: `/view/payment/index?typeOrder=1&total=${this.data.luckBagTotalPrice}&product=${JSON.stringify(selectLuckBag)}`
        });
    },
    go_to_payment: function () {

    }
});