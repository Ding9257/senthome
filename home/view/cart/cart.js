const request = require("./../../util/request").request;
Page({
    data: {
        carts: [],
        minusStatuses: [],
        userId: 1,
        sendTime:[
            {time:"10:00-12:00"},
            {time:"12:00-14:00"},
            {time:"14:00-16:00"}
        ],
        currenTime:"",
        popupStatus: false,
        selectedAllStatus: false,
        total: '',
        startX: 0,
        itemLefts: []
    },
    onLoad: function (option) {
        let redirectTo = option.redirectTo;
        if(!!redirectTo){
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
        var index = parseInt(e.currentTarget.dataset.index);
        var num = this.data.carts[index]["num"];
        // 如果只有0件了，就删除
        num--;
        var carts = this.data.carts;
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
            let id = this.data.carts[index]["id"];
            carts = carts.splice(index, 1);
            this.delete(id);
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
        console.log(index);
        var num = this.data.carts[index].num;
        // 自增
        num++;
        // 只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 购物车数据
        var carts = this.data.carts;
        carts[index].num = num;
        carts[index].selected = true;
        // 按钮可用状态
        var minusStatuses = this.data.minusStatuses;
        minusStatuses[index] = minusStatus;
        // 将数值与状态写回
        this.setData({
            carts: carts,
            minusStatuses: minusStatuses
        });
        // update database
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
        var carts = this.data.carts;
        // 对勾选状态取反
        carts[index]["selected"] = !selected;
        // 写回经点击修改后的数组
        this.setData({
            carts: carts
        });
        // update database

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
        var cartIds = this.calcIds();
        cartIds = cartIds.join(',');
        wx.navigateTo({
            url: '../../../../order/checkout/checkout?cartIds=' + cartIds + '&amount=' + this.data.total
        });
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
        // auto login

    },
    onShow: function () {
        this.setData({
            popupStatus:false
        });
        this.getShop();
        //this.reloadData();
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
        total = total.toFixed(2);
        // 写回经点击修改后的数组
        this.setData({
            carts: carts,
            total: total
        });
    },
    showGoods: function (e) {
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
        let userId = this.data.userId;
        request({
            url: '/productOrder/list',
            method: "POST",
            data: {}
        }).then(res => {
            console.log(res);
            this.setData({
                carts: res.data
            });
        })
    },
    onClose: function () {
        let popupStatus = this.data.popupStatus;
        this.setData({
            popupStatus: true
        });
    },
    selectTime:function () {
        this.setData({
            popupStatus: true
        });
    },
    time:function (e) {
        let currenTime = e.currentTarget.dataset.time;
        this.setData({
            currenTime,
            popupStatus:false
        });
    }
})