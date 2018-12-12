const roleAuth = module.exports = {};
var auth = require('./auth');
/*判断是否有权限*/
roleAuth.authObj = function (collections) {
    //权限对象
    var len = collections.length;
    var authObj = {
        //订单管理
        order_upload_file: len > 0 ? auth.isAuth(collections, '/uploadfile/contract') : false,//作业岗上传附件
        order_isupdate_submit: len > 0 ? auth.isAuth(collections, '/order/isupdate') : false,//作业岗提交按钮
        order_approved_state: len > 0 ? auth.isAuth(collections, '/order/changestates') : false,//审批岗处理订单审批状态

        //融资管理
        batch_manage: len > 0 ? auth.isAuth(collections, '/batch/list') : false,//审批岗 融资管理
        batch_update_info: len > 0 ? auth.isAuth(collections, '/batch/:id') : false,//审批岗 更新批次信息
        batch_create_txt: len > 0 ? auth.isAuth(collections, '/batch/txt/:id') : false,//审批岗 生成txt文件

        //保单管理
        policy_upload: len > 0 ? auth.isAuth(collections, '/policy/upload') : false,//上传文件
        policy_annexupload: len > 0 ? auth.isAuth(collections, '/policy/annexupload') : false,//上传附件
        policy_add: len > 0 ? auth.isAuth(collections, '/policy/add') : false,//新增
        policy_edit: len > 0 ? auth.isAuth(collections, '/policy/edit') : false,//修改
        policy_disabled: len > 0 ? auth.isAuth(collections, '/policy/disabled') : false,//停用


    }
    return authObj;
}