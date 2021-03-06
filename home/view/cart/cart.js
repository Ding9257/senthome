const request = require("./../../util/request").request;
const util = require("./../../util/util");
import Toast from './../../dist/toast/toast';

const app = getApp();
Page({
    data: {
        window_width: app.globalData.window_width,
        window_height: app.globalData.window_height,
        message: "",
        carts: [],
        hosts: app.globalData.hosts,
        timeLimit: {
            province_list: {
                1: '10:00-12:00',
                2: '12:00-14:00',
                3: '14:00-16:00'
            }
        },
        minusStatuses: [],
        userId: 1,
        currenTime: "",
        popupStatus: false,
        userInfo: app.globalData.userInfo,
        shopInfo: {},
        shippingAddress: {},
        shippingAddressType: 2,
        selectedAllStatus: false,
        total: '',
        startX: 0,
        itemLefts: []
    },
    onLoad: function (option) {
        let shopInfo = app.globalData.shopInfo;
        this.setData({
            shopInfo
        })
        let redirectTo = option.redirectTo;
        if (!!redirectTo) {
            wx.navigateTo({
                url: redirectTo
            })
        }
    },
    bindMinus: function (e) {
        // loading提示
        wx.showLoading({
            title: '操作中',
            mask: true
        });
        let index = parseInt(e.currentTarget.dataset.index);
        let num = this.data.carts[index]["num"];
        // 如果只有0件了，就删除
        num--;
        let carts = this.data.carts;
        let id = this.data.carts[index]["id"];
        if (num >= 1) {
            // 只有大于一件的时候，才能normal状态，否则disable状态
            var minusStatus = num <= 1 ? 'disabled' : 'normal';
            // 购物车数据
            carts[index]["num"] = num;
            // 按钮可用状态
            var minusStatuses = this.data.minusStatuses;
            minusStatuses[index] = minusStatus;
            // 将数值与状态写回
            this.setData({
                carts: carts,
                minusStatuses: minusStatuses
            });
        } else {
            carts.splice(index, 1);
            this.setData({
                carts: carts
            });
        }
        let shopCart = app.globalData.shopCart;
        if (!util.isEmpty(shopCart[id])) {
            shopCart[id].num = num;
            app.globalData.shopCart = shopCart;
        }
        wx.hideLoading();
        this.sum();
    },
    bindPlus: function (e) {
        wx.showLoading({
            title: '操作中',
            mask: true
        });
        var index = parseInt(e.currentTarget.dataset.index);
        var num = this.data.carts[index].num;
        let otherStock = this.data.carts[index].otherStock;
        //判断不能大于库存
        if (num == otherStock) {
            Toast.fail("已达最大库存");
            wx.hideLoading();
            return false;
        }
        // 自增
        num++;
        // 只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 购物车数据
        var carts = this.data.carts;
        carts[index].num = num;
        //carts[index].selected = true;
        // 按钮可用状态
        var minusStatuses = this.data.minusStatuses;
        minusStatuses[index] = minusStatus;
        // 将数值与状态写回
        this.setData({
            carts: carts,
            minusStatuses: minusStatuses
        });
        var id = this.data.carts[index]["id"];
        let shopCart = app.globalData.shopCart;
        if (!util.isEmpty(shopCart[id])) {
            shopCart[id].num = num;
            app.globalData.shopCart = shopCart;
        }
        wx.hideLoading();
        this.sum();
    },
    bindManual: function (e) {
        wx.showLoading({
            title: '操作中',
            mask: true
        });
        var index = parseInt(e.currentTarget.dataset.index);
        var carts = this.data.carts;
        var num = parseInt(e.detail.value);
        carts[index]["quantity"] = num;
        // 将数值与状态写回
        this.setData({
            carts: carts
        });

        wx.hideLoading();

        this.sum();
    },
    bindManualTapped: function () {
        // 什么都不做，只为打断跳转
    },
    bindCheckbox: function (e) {
        wx.showLoading({
            title: '操作中',
            mask: true
        });
        /*绑定点击事件，将checkbox样式改变为选中与非选中*/
        //拿到下标值，以在carts作遍历指示用
        var index = parseInt(e.currentTarget.dataset.index);
        //原始的icon状态
        var selected = this.data.carts[index]["selected"] || false;
        let selectedAllStatus = this.data.selectedAllStatus;
        if (selectedAllStatus && selected) {
            selectedAllStatus = false;
        }
        var carts = this.data.carts;
        // 对勾选状态取反
        carts[index]["selected"] = !selected;
        // 写回经点击修改后的数组
        this.setData({
            carts: carts,
            selectedAllStatus
        });

        wx.hideLoading();

        this.sum();
    },
    bindSelectAll: function () {
        wx.showLoading({
            title: '操作中',
            mask: true
        });
        // 环境中目前已选状态
        var selectedAllStatus = this.data.selectedAllStatus;
        // 取反操作
        selectedAllStatus = !selectedAllStatus;
        // 购物车数据，关键是处理selected值
        var carts = this.data.carts;
        // 遍历
        for (var i = 0; i < carts.length; i++) {
            carts[i]["selected"] = selectedAllStatus;
            // update selected status to db
        }
        this.setData({
            selectedAllStatus: selectedAllStatus,
            carts: carts
        });
        wx.hideLoading();
        this.sum();
    },
    bindCheckout: function () {
        //登录
        if (util.isEmpty(this.data.userInfo)) {
            Toast.fail('请登录');
            return false
        }
        //选择地址
        if (this.data.shippingAddressType == 2) {
            Toast.fail('请选择地址');
            return false
        }
        let carts = this.data.carts;
        // 计算总金额
        let total = 0, list = [];
        for (var i = 0; i < carts.length; i++) {
            if (carts[i].selected || this.data.selectedAllStatus) {
                list.push(carts[i]);
                total += carts[i].num * 1 * carts[i].product.money * 1;
            }
        }
        total = total.toFixed(1);
        if (this.data.shippingAddressType == 1 && total < 20) {
            Toast.fail('送货上门需大于20元');
            return false
        }
        let message = this.data.message;
        if (total != 0) {
            let product = JSON.stringify(list);
            wx.navigateTo({
                url: `/view/payment/index?typeOrder=0&total=${total}&product=${product}&message=${message}`
            });
        } else {
            Toast.fail('请选择商品');
        }
    },
    delete: function (id) {
        request({
            url: '/productOrder/delete',
            method: "GET",
            data: {id}
        }).then(res => {
        });

    },
    calcIds: function () {
        // 遍历取出已勾选的cid
        // var buys = [];
        var cartIds = [];
        for (var i = 0; i < this.data.carts.length; i++) {
            if (this.data.carts[i]["selected"]) {
                // 移动到Buy对象里去
                // cartIds += ',';
                cartIds.push(this.data.carts[i]["objectId"]);
            }
        }
        if (cartIds.length <= 0) {
            wx.showToast({
                title: '请勾选商品',
                icon: 'success',
                duration: 1000
            })
        }
        return cartIds;
    },
    reloadData: function () {

    },
    onShow: function () {
        this.setData({
            popupStatus: false
        });
        let shippingAddress = app.globalData.shippingAddress;
        let userInfo = app.globalData.userInfo;
        let shopInfo = app.globalData.shopInfo;
        let shippingAddressType = app.globalData.shippingAddressType;
        this.setData({
            shippingAddressType,
            userInfo,
            shopInfo,
            shippingAddress
        });
        this.getShop();
        //this.reloadData();
    },
    onReady: function () {
        let shippingAddressType = app.globalData.shippingAddressType;
        this.setData({
            shippingAddressType
        });
    },
    sum: function () {
        var carts = this.data.carts;
        // 计算总金额
        var total = 0;
        for (var i = 0; i < carts.length; i++) {
            if (carts[i].selected) {
                total += carts[i].num * 1 * carts[i].product.money * 1;
            }
        }
        total = total.toFixed(1);
        // 写回经点击修改后的数组
        this.setData({
            total: total
        });
    },
    showGoods: function (e) {
        return false;
        // 点击购物车某件商品跳转到商品详情
        var objectId = e.currentTarget.dataset.objectId;
        wx.navigateTo({
            url: '../goods/detail/detail?objectId=' + objectId
        });
    },
    touchStart: function (e) {
        var startX = e.touches[0].clientX;
        this.setData({
            startX: startX,
            itemLefts: []
        });
    },
    touchMove: function (e) {
        return false;
        var index = e.currentTarget.dataset.index;
        var movedX = e.touches[0].clientX;
        var distance = this.data.startX - movedX;
        var itemLefts = this.data.itemLefts;
        itemLefts[index] = -distance;
        this.setData({
            itemLefts: itemLefts
        });
    },
    touchEnd: function (e) {
        var index = e.currentTarget.dataset.index;
        var endX = e.changedTouches[0].clientX;
        var distance = this.data.startX - endX;
        // button width is 60
        var buttonWidth = 60;
        if (distance <= 0) {
            distance = 0;
        } else {
            if (distance >= buttonWidth) {
                distance = buttonWidth;
            } else if (distance >= buttonWidth / 2) {
                distance = buttonWidth;
            } else {
                distance = 0;
            }
        }
        var itemLefts = this.data.itemLefts;
        itemLefts[index] = -distance;
        this.setData({
            itemLefts: itemLefts
        });
    },
    getShop: function () {
        let data = this.handleShopCart([], app.globalData.shopCart);
        if (!util.isEmpty(data.currentShop) && util.isEmpty(this.data.userInfo)) {
            app.globalData.isShowToast = true;
            wx.switchTab({
                url: '/view/my/index'
            })
        }
        this.setData({
            carts: data.currentShop
        });
        this.defaultSelected();
    },
    defaultSelected: function () {
        var selectedAllStatus = true;
        var carts = this.data.carts;
        for (var i = 0; i < carts.length; i++) {
            carts[i]["selected"] = selectedAllStatus;
        }
        this.setData({
            selectedAllStatus: true,
            carts: carts
        });
        this.sum();
    },
    onClose: function () {
        let popupStatus = this.data.popupStatus;
        this.setData({
            popupStatus: true
        });
    },
    selectTime: function () {
        this.setData({
            popupStatus: true
        });
    },
    time: function (e) {
        let currenTime = e.detail.values[0].name;
        this.setData({
            currenTime,
            popupStatus: false
        });
    },
    cancel: function () {
        this.setData({
            popupStatus: false
        });
    },
    handleShopCart: function (shop = [], cache = {}) {
        let list = [];
        if (!util.isEmpty(cache)) {
            for (let id in cache) {
                if (!!cache[id] && cache[id].num > 0) {
                    shop.push({
                        id: id, num: cache[id].num, product: cache[id].product, otherStock: cache[id].otherStock
                    });
                }
            }
        }
        return {currentShop: shop, shopCart: cache};
    },
    go_to_cat: function () {
        wx.switchTab({
            url: '/view/category/index'
        });
    },
    message_put: function (e) {
        let message = e.detail.value;
        this.setData({message});
    }
})