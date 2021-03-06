//导入模块
import axios from 'axios'
import {port_code} from 'common/port_uri'
import router from 'src/router'
import {Message} from 'element-ui'
import store from 'store'
import {SET_USER_INFO} from 'store/actions/type'
import {server_base_url} from 'common/config'

//设置用户信息action
const setUserInfo = function (user) {
    store.dispatch(SET_USER_INFO, user)
}

export default function fetch(options) {
    return new Promise((resolve, reject) => {
        // https://github.com/mzabriskie/axios

        //创建一个axios实例
        const instance = axios.create({
            //设置默认根地址
            baseURL: server_base_url,
            //设置请求超时设置
            timeout: 10000,
            method: "post",
            //设置请求时的header
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!options.method) {
            options.method = "post"
        }
        //请求处理
        instance(options)
            .then(({data}) => {
                console.log(data);
                //请求成功时,根据业务判断状态
                if (data.status === 200) {
                    resolve(data);
                    return false
                } else if (100 === port_code.unlogin) {
                    setUserInfo(null)
                    router.replace({name: "login"})
                }
                Message.warning(data.msg)
                reject(data)
            })
            .catch((err) => {
                //请求失败时,根据业务判断状态
                Message.error('操作失败！')
                reject(err)
            })
    })
}
