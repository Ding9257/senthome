/**
 * Created by home on 2017/5/12.
 */
const crypto = require('crypto');
const fs = require('fs');
const util = require('util');
const path = require('path');
module.exports = lib = {};
//提取状态码
lib.outPutStatusCode = function (str) {
    var statusCode = "";
    str.replace(/<h1>(.*)<\/h1>/g, function (first, second) {
        statusCode = second;
        ;
    });
    return statusCode
}
//提取描述信息
lib.outPutMessage = function (str) {
    var message = "";
    str.replace(/description<\/b> <u>(.*)<\/u>/g, function (first, second) {
        message = second;
    });
    return message;
}
/**
 * 是否是字符串
 *
 * @param {any} obj
 * @returns
 */
lib.isString = function (obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
};

/**
 * 是否是数值
 *
 * @param {any} obj
 * @returns
 */
lib.isNumber = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Number]';
};

/**
 * 是否是个数组
 * @type {Boolean}
 */
lib.isArray = Array.isArray;

/**
 * 是否是个对象
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
lib.isObject = function (obj) {
    if (Buffer.isBuffer(obj)) {
        return false;
    }
    return toString.call(obj) === '[object Object]';
};

lib.datetime = function (date, format) {
    if (format === undefined) {
        if (date === undefined) {
            return Math.floor(Date.now() / 1000);
        } else if (lib.isString(date)) {
            date = date || new Date();
            return Math.floor(new Date(date).getTime() / 1000);
        }
        return NaN;
    } else {
        format = format || 'yyyy-mm-dd hh:mi:ss';
        var fn = function fn(d, f) {
            var Week = ['日', '一', '二', '三', '四', '五', '六'];
            f = f.replace(/yyyy|YYYY/, d.getFullYear());
            f = f.replace(/yy|YY/, d.getYear() % 100 > 9 ? (d.getYear() % 100).toString() : '0' + d.getYear() % 100);
            f = f.replace(/mi|MI/, d.getMinutes() > 9 ? d.getMinutes().toString() : '0' + d.getMinutes());
            f = f.replace(/mm|MM/, d.getMonth() + 1 > 9 ? (d.getMonth() + 1).toString() : '0' + (d.getMonth() + 1));
            f = f.replace(/m|M/g, d.getMonth() + 1);
            f = f.replace(/w|W/g, Week[d.getDay()]);
            f = f.replace(/dd|DD/, d.getDate() > 9 ? d.getDate().toString() : '0' + d.getDate());
            f = f.replace(/d|D/g, d.getDate());
            f = f.replace(/hh|HH/, d.getHours() > 9 ? d.getHours().toString() : '0' + d.getHours());
            f = f.replace(/h|H/g, d.getHours());
            f = f.replace(/ss|SS/, d.getSeconds() > 9 ? d.getSeconds().toString() : '0' + d.getSeconds());
            return f;
        };
        if (date && lib.isNumber(date)) {
            var newDate = new Date();
            newDate.setTime(date * 1000);
            return fn(newDate, format);
        }
        if (date && lib.isString(date)) {
            return fn(new Date(Date.parse(date)), format);
        }
        return fn(new Date(), format);
    }
}
lib.md5 = function (str) {
    let ins = crypto.createHash('md5');
    ins.update(str, 'utf8');
    return ins.digest('hex');
};
lib.hmac = function (str) {
    let ins = crypto.createHmac('md5', 'isu20171218');
    ins.update(str, 'utf8');
    return ins.digest('hex');
}
lib.threeMD5Sing = function (obj, MD5key) {
    if (util.isObject(obj) && !util.isArray(obj)) {
        let stringifyPrimitive = function (v) {
            switch (typeof v) {
                case 'string':
                    return v;

                case 'boolean':
                    return v ? 'true' : 'false';

                case 'number':
                    return isFinite(v) ? v : '';

                default:
                    return '';
            }
        };
        let sep = '&';
        let eq = '=';
        let str = Object.keys(obj).sort().map(k => {
            var ks = stringifyPrimitive(k) + eq;
            if (Array.isArray(obj[k])) {
                return obj[k].map(function (v) {
                    return ks + stringifyPrimitive(v);
                }).join(sep);
            } else {
                return ks + stringifyPrimitive(obj[k]);
            }
        }).join(sep);
        str = `${str}&key=${MD5key}`;
        console.log(`MD5签名字符串：${str}`);
        return lib.md5(str).toUpperCase();
    }
    return '';
}

lib.fastMD5Sign = function (obj, parameter, MD5key) {
    if (util.isObject(obj) && !util.isArray(obj)) {
        let stringifyPrimitive = function (v) {
            switch (typeof v) {
                case 'string':
                    return v;

                case 'boolean':
                    return v ? 'true' : 'false';

                case 'number':
                    return isFinite(v) ? v : '';

                default:
                    return '';
            }
        };
        let str = Object.keys(obj).sort().map(k => {
            var ks = stringifyPrimitive(k);
            if (Array.isArray(obj[k])) {
                return obj[k].map(function (v) {
                    return ks + stringifyPrimitive(v);
                }).join('');
            } else {
                return ks + stringifyPrimitive(obj[k]);
            }
        }).join('');
        str = `${str}${parameter}`;
        console.log(`MD5签名字符串：${str}`);
        return lib.hmac(str).toUpperCase();
    }
    return '';
}
/**
 * 判断是否为ajax请求
 * @param req
 * @returns {boolean}
 */
lib.isAjax = function (req) {
    return req.headers['x-requested-with'] === 'XMLHttpRequest';
}

lib.typeof = function (obj) {
    var class2type = {};
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function (e, i) {
        class2type["[object " + e + "]"] = e.toLowerCase();
    });
    if (obj == null) {
        return String(obj);
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}

/**
 * 检查对象是否为空
 *
 * @param {*} obj
 * @returns {boolean}
 */
lib.isEmpty = function (obj) {
    if (obj === undefined || obj === null || obj === '' || obj === 'null') {
        return true;
    } else if (lib.isString(obj)) {
        //\s 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。
        return obj.replace(/(^\s*)|(\s*$)/g, '').length === 0;
    } else if (lib.isNumber(obj)) {
        return isNaN(obj);
    } else if (lib.isArray(obj)) {
        return obj.length === 0;
    } else if (lib.isObject(obj)) {
        for (var key in obj) {
            return !key && !0;
        }
        return true;
    }
    return false;
};

/**
 * 判断对象中是否存在某属性，当不存在时返回该属性
 * @param obj
 * @param arr
 */
lib.isObjInProperty = (obj, arr) => {
    if (util.isObject(obj) && util.isArray(arr)) {
        let str = '';
        arr.forEach(item => {
            if (!Object.prototype.hasOwnProperty.call(obj, item)) {
                str = item;
                return false;
            }
        })
        return str;
    } else {
        throw new Error('数据类型错误')
    }
}

/**
 * 验证参数是否符合预期
 * @param obj
 * @param arr
 * @param Md5Key
 * @returns {*}
 */
lib.verifyParam = (obj, arr, Md5Key) => {
    let str = lib.isObjInProperty(obj, arr);
    console.log(str);
    if (!!str && str != 'sign') {
        lib.log('参数缺失', str);
        return {
            code: '000002',
            returns: {}
        }
    }
    //快速签名
    let sign_k = obj.sign;
    delete obj.sign;
    //诺远签名
    let sign_n = lib.threeMD5Sing(obj, Md5Key);
    lib.log('快速签名', sign_k);
    lib.log('诺远签名', sign_n);

    if (sign_k != sign_n) {
        lib.log('签名错误', sign_n);
        return {
            code: '000002',
            returns: {}
        }
    } else {
        return ''
    }
}

lib.log = (des, info) => {
    if (process.env.NODE_ENV == 'development') {
        console.log(`${des}：${info}`);
    }
}

lib.isPOST = (req) => {
    return req.method === 'POST';
}


lib.writeFile = function (filePath, str) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filePath, str, err => {
            if (!err) resolve(filePath);
            else reject(err);
        })
    })
}

lib.sources = function (source, base) { // source => target
    return Object.assign(source, ...Object.keys(base).map(function (key) {
        if (source[base[key]]) return {[key]: source[base[key]]}
    }))
};