<template>
    <div class="panel">
        <div class="panel-body">
            <el-table
                :data="table_data"
                v-loading="load_data"
                element-loading-text="拼命加载中"
                border
                @selection-change="on_batch_select"
                style="width: 100%;">
                <el-table-column
                    prop="id"
                    label="id"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="cid"
                    label="代金券编号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="num"
                    label="数量"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="状态"
                    width="">
                    <template scope="props">{{props.row.status==1?"已付款":"未支付"}}</template>
                </el-table-column>
                <el-table-column
                    prop=""
                    label="结果"
                    width="">
                    <template scope="props">{{props.row.result==1?"已中奖":props.row.result==2?"已失败":"参与中"}</template>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="customerInfo"
                    label="用户信息"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="coupon"
                    label="代金券"
                    width="">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {panelTitle, bottomToolBar} from 'components'
    import fetch from 'common/fetch'

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
                    url: "/extension/findOne",
                    data: {}
                }).then(({data}) => {
                    this.table_data = data
                    this.load_data = false
                }).catch(() => {
                    this.load_data = false
                })
            },
            //单个删除
            delete_data(id) {
                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.load_data = true
                        this.$http({
                            url: "/managerInfo/delete",
                            data: {id}
                        })
                            .then(({msg}) => {
                                this.get_table_data()
                                this.$message.success(msg)
                            })
                            .catch(() => {
                            })
                    })
                    .catch(() => {
                    })
            },
            change_status(id, status) {
                this.$http({
                    url: "/managerInfo/update",
                    data: {id, status}
                }).then(({msg}) => {
                    this.$message.success(msg)
                    this.get_table_data()
                })
            },
            //页码选择
            handleCurrentChange(val) {
                this.currentPage = val
                this.get_table_data()
            },
            //批量选择
            on_batch_select(val) {
                this.batch_select = val
            },
            //批量删除
            on_batch_del() {
                this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.load_data = true
                        this.$fetch.api_table.batch_del(this.batch_select)
                            .then(({msg}) => {
                                this.get_table_data()
                                this.$message.success(msg)
                            })
                            .catch(() => {
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
