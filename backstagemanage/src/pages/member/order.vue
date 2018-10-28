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
                    prop="orderId"
                    label="订单编号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="sid"
                    label="店铺编号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="collectCode"
                    label="收货码"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="collectTime"
                    label="收货时间"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="message"
                    label="捎口信"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="tran_id"
                    label="支付唯一标识"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="订单状态"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="orderType"
                    label="订单类型"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="address.name"
                    label="收货人姓名"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="address.phone"
                    label="收货人电话"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="address.contentAddress"
                    label="收货人详细地址"
                    width="120">
                </el-table-column>
            </el-table>
            <bottom-tool-bar>
                <div slot="page">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="10"
                        layout="total, prev, pager, next"
                        :total="total">
                    </el-pagination>
                </div>
            </bottom-tool-bar>
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
                route_id: this.$route.params.id,
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
            this.route_id && this.get_table_data()
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
                    url: "/order/list",
                    data: {userId: this.route_id}
                })
                    .then(({data: {orderList, pageNo, count}}) => {
                        this.table_data = orderList
                        this.currentPage = pageNo
                        this.total = count
                        this.load_data = false
                    })
                    .catch(() => {
                        this.load_data = false
                    })
            },
            //单个删除
            delete_data(item) {
                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.load_data = true
                        this.$fetch.api_table.del(item)
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
            change_status(status) {
                console.log(status);
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
