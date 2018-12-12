/**
 * Created by lingxi on 2017/12/29.
 */
const Controllers = require('./../app/controllers');
const config = require('./index');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: path.join(process.cwd(), config.uploadFile.src),
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split(".");
        cb(null, config.uploadFile.systemName + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
const upload = multer({storage: storage});
module.exports = function (app) {
    app.all('/order/*', Controllers.order.main);

    app.get('/order/pushOrder', Controllers.order.pushOrderGet);
    app.post('/order/pushOrder', Controllers.order.pushOrder);//诺远订单推送接口

    app.get('/order/list', Controllers.order.list);//订单展示页
    app.get('/order/listinfo', Controllers.order.listinfo);//订单展示页
    app.get('/order/isupdate', Controllers.order.isupdate);//是否上传附件
    app.post('/order/changestates', Controllers.order.changeStates);//更改订单审批状态
    app.get('/file/download', Controllers.order.download);//下载文件

    app.post('/uploadfile/contract', upload.single('file'), Controllers.order.contractUpload)//上传采购合同

    app.post('/order/Approved', Controllers.order.Approved);//快速订单审批结果
    app.get('/order/Approved', Controllers.order.ApprovedGet);

    app.post('/listed/result', Controllers.order.listedResule);//快速挂牌结果
    app.get('/listed/result', Controllers.order.listedResuleGet);//快速挂牌结果

    app.get('/batch/list', Controllers.batch.list) // 批次列表
    app.get('/batch/:id', Controllers.batch.get)
    app.post('/batch/:id', Controllers.batch.put)
    app.get('/batch/txt/:id', Controllers.batch.txtPage);
    app.post('/batch/txt/:id', Controllers.batch.txtPage);
}