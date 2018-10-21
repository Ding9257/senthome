const constant = require("./constant.js");
const storage = require("./storage.js");

function isPhone(phone) {
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
        return false;
    }
    return true;
}

function showSuccessToast(config) {
    wx.showToast({
        title: config.title,
        icon: 'success',
        mask: true,
        duration: constant.duration,
        success: config.success
    });
}

function showFailToast(config) {
    wx.showToast({
        title: config.title,
        image: '/image/info.png',
        mask: true,
        duration: constant.duration,
        success: config.success
    });
}

function isEmpty(o) {
    if (o == undefined) {
        return true;
    }
    if (o == null) {
        return true;
    }
    if (o === "") {
        return true;
    }
    if (o instanceof Object) {
        for (var x in o) {
            return false;
        }
        return true;
    }
    if (o instanceof Array) {
        if (o.length == 0) {
            return true;
        }
        return false;
    }
    return false;
}


module.exports = {
    isPhone: isPhone,
    isEmpty: isEmpty,
    showSuccessToast: showSuccessToast,
    showFailToast: showFailToast
};