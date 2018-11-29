const AV = require('./../../util/av-weapp.js');
const request = require("./../../util/request").request;
const util = require("./../../util/util");
const app = getApp();
var that
Page({
    data: {
        goods: {},
        current: 0,
        gain: app.globalData.gain,
        hosts: app.globalData.hosts,
        num: 0,
        width: getApp().globalData.window_width,
        height: getApp().globalData.window_height,
        id: 0,
        sumPrice: 0,
        galleryHeight: 200
    },
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: options.name//页面标题为路由参数
        });
        that = this;
        var id = options.id;
        this.setData({id});
        this.getGoodsById(id);
    },
    getGoodsById: function (id) {
        request({
            url: '/product/findOne',
            method: "POST",
            data: {id}
        }).then(res => {
            this.handleShopCartById(id);
            res.data.money = (Math.floor(res.data.money * this.data.gain * 10) / 10).toFixed(1);
            that.setData({
                goods: res.data
            });
            this.sumPrice();
        });
    },
    getEvaluateByGoods: function (goodsId) {
    },
    addCart: function () {
        this.insertCart(this.data.goods);
    },
    insertCart: function (goods) {
        var that = this;
        // add cart
        var user = AV.User.current();
        // search if this goods exsit or not.if did exsit then quantity ++ updated cart object;
        // if not, create cart object
        // query cart
        var query = new AV.Query('Cart');
        query.equalTo('user', user);
        query.equalTo('goods', goods);
        // if count less then zero
        query.count().then(function (count) {
            if (count <= 0) {
                // if didn't exsit, then create new one
                var cart = AV.Object('Cart');
                cart.set('user', user);
                cart.set('quantity', 1);
                cart.set('goods', goods);
                cart.save().then(function (cart) {
                    that.showCartToast();
                }, function (error) {
                    console.log(error);
                });
            } else {
                // if exsit, get the cart self
                query.first().then(function (cart) {
                    // update quantity
                    cart.increment('quantity', 1);
                    // atom operation
                    // cart.fetchWhenSave(true);
                    that.showCartToast();
                    return cart.save();
                }, function (error) {
                    console.log(error);
                });
            }
        }, function (error) {

        });
    },
    showCartToast: function () {
        wx.showToast({
            title: '已加入购物车',
            icon: 'success',
            duration: 1000
        });
    },
    previewImage: function (e) {
        wx.previewImage({
            //从<image>的data-current取到current，得到String类型的url路径
            current: this.data.goods.get('images')[parseInt(e.currentTarget.dataset.current)],
            urls: this.data.goods.get('images') // 需要预览的图片http链接列表
        })
    },
    showCart: function () {
        wx.switchTab({
            url: '../../cart/cart'
        });
    },
    add: function (e) {
        let shopCart = app.globalData.shopCart;
        let id = this.data.id;
        let num = this.data.num + 1;
        if (!util.isEmpty(shopCart) && !util.isEmpty(shopCart[id])) {
            shopCart[id].num = num;
            app.globalData.shopCart = shopCart;
        }
        this.setData({
            num: num
        });
        this.sumPrice();
    },
    down: function (e) {
        let shopCart = app.globalData.shopCart;
        let id = this.data.id;
        let num = this.data.num;
        if (num == 0) {

        } else {
            num = num - 1;
        }
        if (!util.isEmpty(shopCart) && !util.isEmpty(shopCart[id])) {
            shopCart[id].num = num;
            app.globalData.shopCart = shopCart;
        }
        this.setData({
            num
        });
        this.sumPrice();
    },
    handleShopCartById: function (id) {
        let shopCart = app.globalData.shopCart;
        if (!util.isEmpty(shopCart) && !util.isEmpty(shopCart[id])) {
            this.setData({
                num: shopCart[id].num
            });
        }
    },
    sumPrice: function () {
        let goods = this.data.goods;
        let num = this.data.num;
        let price = (goods.money * num).toFixed(1);
        this.setData({
            sumPrice: price
        });
    },
    goCart: function () {
        wx.switchTab({
            url: '/view/cart/cart'
        })
    }
});