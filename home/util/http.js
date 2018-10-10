const constant = require("./constant.js");
const storage = require("./storage.js");
const util = require("./util.js");
const host = require("./../config/index").host;

function request(config) {
    if (typeof (config.is_toast) == 'undefined') {
        config.is_toast = true;
    }

    if (typeof (config.method) == 'undefined') {
        config.method = 'POST';
    }

    if (config.is_toast) {
        // wx.showToast({
        //     title: '加载中..',
        //     icon: 'loading',
        //     mask: true,
        //     duration: constant.duration * 10
        // });
    }
    console.log(2);
    wx.request({
        url: `${host}${config.url}`,
        method: config.method || "GET",
        header: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: config.data,
        success: function (response) {
            config.success(response);
        },
        fail: function (err) {
            config.fail(err);
        }
    });
}

module.exports = {
    request: request
};