<template>
    <div class="panel">
        <el-form :inline="true" :model="formInline" class="panel-title" style="padding-top: 10px;">
            <el-form-item label="现金券名称">
                <el-input v-model="formInline.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="get_table_data()" type="primary">查询</el-button>
            </el-form-item>
            <el-form-item>
                <router-link :to="{name: 'cashCouponsAdd'}" tag="span">
                    <el-button type="primary" icon="plus" size="small">添加现金券</el-button>
                </router-link>
            </el-form-item>
        </el-form>
        <div class="panel-body">
            <el-table
                :data="table_data"
                v-loading="load_data"
                element-loading-text="拼命加载中"
                border
                style="width: 100%;">
                <el-table-column
                    prop="id"
                    label="id"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="现金券名称"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="售价"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="collectTime"
                    label="截止时间"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="状态"
                    width="120">
                    <template scope="props">{{props.row.status}}</template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="">
                    <template scope="props">
                        <router-link :to="{name: 'cashCouponsUpdate', params: {id: props.row.id}}" tag="span">
                            <el-button type="info" size="small" icon="edit">修改</el-button>
                        </router-link>
                        <el-button type="info" size="small" icon="edit">停止发放</el-button>
                        <el-button type="info" size="small" @click="delete_data(props.row.id)" icon="edit">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {panelTitle, bottomToolBar} from 'components'
    import fetch from 'common/fetch'
    import moment from "moment"

    export default {
        data() {
            return {
                formInline: {},
                name: "",
                table_data: null,
                //当前页码
                currentPage: 1,
                //数据总条目
                total: 0,
                //每页显示多少条数据
                length: 15,
                //请求时的loading效果
                load_data: true,
                //批量选择数组
                batch_select: []
            }
        },
        components: {
            panelTitle,
            bottomToolBar
        },
        created() {
            this.get_table_data()
        },
        methods: {
            //刷新
            on_refresh() {
                this.get_table_data()
            },
            //获取数据
            get_table_data() {
                this.load_data = true
                this.$http({
                    url: "/coupon/list",
                    data: this.formInline
                })
                    .then(({data}) => {
                        let list = [];
                        for (let item of data) {
                            item.status = moment(item.collectTime).valueOf() > moment().valueOf() ? "出售中" : "完成";
                            list.push(item)
                        }
                        this.table_data = list;
                        this.load_data = false
                    })
                    .catch(() => {
                        this.load_data = false
                    })
            },
            //单个删除
            delete_data(id) {
                console.log(id);
                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.load_data = true
                        this.$http({
                            url: "/coupon/delete",
                            data: {id}
                        })
                            .then(({msg}) => {
                                this.get_table_data()
                                this.$message.success(msg)
                                this.load_data = false;
                            })
                            .catch(() => {
                                this.load_data = false;
                            })
                    })
                    .catch(() => {
                    })
            }
        }
    }
</script>
<style>
    .el-form--inline .el-form-item__label {
        display: inline-block;
        float: left;
    }
</style>
