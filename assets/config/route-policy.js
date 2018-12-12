/**
 * Created by lingxi on 2018/1/12.
 */
const Controllers = require('./../app/controllers');
const config = require('./index');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: path.join(process.cwd(), config.uploadFile.policySrc),
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split(".");
        cb(null, config.uploadFile.systemName + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
const upload = multer({storage: storage});
module.exports = function (app) {
    app.get('/policy/list', Controllers.policy.list);
    app.post('/policy/upload', upload.single('file'), Controllers.policy.upload);

    //新增
    app.get('/policy/add', Controllers.policy.addGet);
    app.post('/policy/add', Controllers.policy.addPost);
    //修改
    app.get('/policy/edit', Controllers.policy.editGet);
    app.post('/policy/edit', Controllers.policy.editPost);

    //停用
    app.get('/policy/disabled', Controllers.policy.disabled);

    app.post('/policy/annexupload', upload.single('file'), Controllers.policy.annexupload);
}