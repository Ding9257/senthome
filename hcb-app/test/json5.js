/**
 * Created by lingxi on 2018/2/8.
 */
const JSON5 = require('json5');
let str = `{name:'xiaoming'}`;
try {
    let obj = JSON5.parse(str);
    console.log(obj.name);
} catch (e) {
    console.log(e);
}