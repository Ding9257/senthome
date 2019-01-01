const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var option = {
    "url": "mongodb://192.168.1.100:30001,192.168.1.100:30002,192.168.1.100:30003/test",
    "options": {
        "uri_decode_auth": false,   // 转码验证字符
        "db": {
            "w": 2,                 // 写的复制服务器数
            "wtimeout": 500,        // 写的超时时间
            "j": true,              // 写等待日志磁盘同步
            "slaveOk": true         // 读负载均衡
        },
        "replSet": {
            "rs_name": "myset",     // 副本集名字
            "poolSize": 10,         // 每个服务器连接数
            "socketOptions": {
                //"keepAlive": 2,
                "connectTimeoutMS": 30000,
                "socketTimeoutMS": 500
            }
        }
    },
    "collections": {
        "users": "users",
        "loggers": "loggers",
        "msgs": "msgs",
        "comments": "comments"
    }
};
mongoose.connect(option.url, {
    useNewUrlParser: true, "server": {
        "poolSize": 3,
        "socketOptions": {
            "keepAlive": 1
        }
    }, "replicaSet": "mongoreplset"
}).then(async db => {
    var user = db.model('user', new Schema({
        name: String
    }));
    let book = db.model('book', new Schema({
        name: String
    }));
    let session = null;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        let u = await user.create([{name: 1}], {session});
        let b = await book.create([{name: "sss"}], {session});
        //await session.commitTransaction();
        usercount = await user.countDocuments({});
        console.log("usercount:", usercount);
        bookcount = await book.countDocuments({});
        console.log("bookcount:", bookcount);
        session.endSession();
    } catch (e) {
        console.log(e);
        await session.abortTransaction();
        session.endSession();
    }
});