//导入模块
import * as api_file from './file'
import * as api_table from './table'
import * as api_user from './user'
import fetch from 'common/fetch'

const apiObj = {
    api_file,
    api_table,
    fetch,
    api_user
}

const install = function (Vue) {
    if (install.installed) return
    install.installed = true

    //定义属性到Vue原型中
    Object.defineProperties(Vue.prototype, {
        $fetch: {
            get() {
                return apiObj
            }
        }
    })
    Object.defineProperties(Vue.prototype, {
        $http: {
            get() {
                return fetch
            }

        }
    })
}

export default {
    install
}
