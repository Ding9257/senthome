/**
 * Created by lingxi on 2018/1/29.
 */
const body = require('./body');
const file = require('./../file');
const beautify_html = require('js-beautify').html;
let lib = {
    col: (data, type) => {
        let className = data.className || '';
        let str = '';
        str = `<div class="${data.className}">
                    <label>${data.title}</label>\n`;

        if (type == 'add') {
            str += `<input type="text" name="${data.name}" required>`;
        } else if (type == 'edit') {
            str += `<input type="text" name="${data.name}" value="<%= locals.data && data.${data.name}%>" required>`;
        } else if (type == 'info') {
            str += `<span><%= locals.data && data.${data.name}%>测试</span>`;
        }
        str += `
                </div>`;
        return str;
    },
    /**
     * type add、edit、info
     * @param list
     * @param filePath
     * @param type
     */
    main: (list, filePath, type = 'add') => {
        let str = body.head();
        let content_title = type == 'add' ? '添加信息' : type == 'edit' ? '修改信息' : '详细信息';
        str += `<div style="padding: 14px">
                <form action="#" method="post" class="form-check-rule edit_box">
                    <div class="text-center bg-primary edit_title"><h4>${content_title}</h4></div>
                    <div class="container">`;
        for (let i = 0; i < list.length; i++) {
            //判断是否为最后一个元素 并且是奇数
            if (i == (list.length - 1) && i % 2 == 0) {
                list[i].className = 'col-md-5 col-md-offset-1';
                str +=
                    `<div class="row">
                        ${lib.col(list[i], type)}
                    </div>`
            } else {
                //判断奇偶数
                if (i % 2 == 0) {
                    list[i].className = 'col-md-5 col-md-offset-1';
                    str += `<div class="row">${lib.col(list[i], type)}`
                } else {
                    list[i].className = 'col-md-5';
                    str += `${lib.col(list[i], type)}</div>`
                }
            }
        }
        str += `</div>
                <div class="row" style="text-align: center;">
                    <button class="btn btn-success" type="submit">添加</button>
                    <a href="#" class="btn btn-success">返回</a>
                </div>
            </form>
        </div>`;
        str += body.foot();
        str = beautify_html(str);
        file.writeFile(filePath, str);
    },
    list: (list, filePath) => {
        let theadStr = list.map(item => {
            return `<th>${item.title}</th>`
        }).join('\n');

        let tbody = list.map(it => {
            return `<td><%= item.${it.name}%></td>`
        }).join('\n');
        let str = body.head();

        str += `<div class="investment_f">
                <div class="investment_con">
                    <form class="form-inline querybox" action="#">
                        <div class="form-group">
                            <label>XXXXXXXX：</label>
                            <input class="form-input" name="name"/>
                        </div>
                        <button type="submit" class="btn btn-success btn-query">
                            <span class="glyphicon glyphicon-search btn_icon" aria-hidden="true">查询</span>
                        </button>
                    </form>

                    <div class="card card-box">
                        <div class="list-header form-inline">
                            <h4 class="title"><strong>列表</strong></h4>
                            <div class="text-right handle-box">
                                <a href="#" type="button" class="btn btn-success btn-sm">
                                    <span class="glyphicon glyphicon-plus" aria-hidden="true">新增</span>
                                </a>
                            </div>
                        </div>
                        <div class="card-content table-responsive">
                            <table class="table table-box table-condensed table-bordered">
                                <thead class="text-primary">
                                <tr>
                                    ${theadStr}
                                </tr>
                                </thead>
                                <tbody>
                                <% !!locals.list &&list.rows.forEach((item, index)=>{ %>
                                <tr>
                                    ${tbody}
                                </tr>
                                <% }) %>
                                </tbody>
                            </table>
                            <div class="tcdPageCode" style="padding-top: 10px"></div>
                        </div>
                    </div>
                </div>
            </div>`;
        str += body.foot();
        str = beautify_html(str);
        file.writeFile(filePath, str);
    }
}
module.exports = lib;