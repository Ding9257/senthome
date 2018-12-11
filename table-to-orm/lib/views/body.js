/**
 * Created by lingxi on 2018/1/29.
 */
let lib = {
    head: () => {
        let str = '';
        str = `
<!DOCTYPE html>
<html>
<%- include ./../public/header %>
<body>
<div class="wrapper">
    <%- include ./../public/sidebar %>
    <div class="main-panel">
        <%- include ./../public/nav %>
        <div class="content" style="margin-top: 5px;">`;
        return str;
    },
    foot: () => {
        let str = `
        </div>
    </div>
</div>
</body>
</html>`;
        return str;
    }
};
module.exports = lib;