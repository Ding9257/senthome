<template>
    <div class="panel">
        <el-form :inline="true" :model="formInline" class="panel-title" style="padding-top: 10px;">
            <el-form-item label="订单状态">
                <el-select v-model="formInline.status" placeholder="请选择">
                    <el-option
                        v-for="item in orderStatus"
                        :label="item.name"
                        :value="item.status">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单号">
                <el-input v-model="formInline.orderId" placeholder="订单号"></el-input>
            </el-form-item>
            <el-form-item label="用户编号">
                <el-input v-model="formInline.userId" placeholder="用户编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="on_refresh()" type="primary">查询</el-button>
            </el-form-item>
        </el-form>
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
                    prop="createTime"
                    label="下单时间"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="orderId"
                    label="订单编号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="countMoney"
                    label="订单金额"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="sname"
                    label="商家名称"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="address.name"
                    label="收货姓名"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="address.phone"
                    label="收获电话"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="address.contentAddress"
                    label="详细地址"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="状态"
                    width="120">
                    <template scope="props">
                        {{orderStatus.filter(item=>{return item.status == props.row.status})[0].name}}
                    </template>
                </el-table-column>
                <el-table-column v-
                                 label="操作"
                                 width="">
                    <template scope="props" v-if="props.row.status==3">
                        <!--<el-button type="info" @click="remark(props.row.id)" size="small" icon="edit">备注</el-button>-->
                        <el-button type="info" @click="refund(props.row.id,6)" size="small" icon="edit">确认退款</el-button>
                        <el-button type="info" @click="refund(props.row.id,9)" size="small" icon="edit">取消退款</el-button>
                    </template>
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
    import {mapGetters, mapActions} from 'vuex'
    import {GET_USER_INFO} from 'store/getters/type'
    import {SET_USER_INFO} from 'store/actions/type'

    export default {
        data() {
            return {
                orderStatus: [
                    {status: "", name: "全部"},
                    {status: 0, name: "待接单"},
                    {status: 1, name: "发货订单"},
                    {status: 2, name: "自提订单"},
                    {status: 3, name: "待退款"},
                    {status: 4, name: "取消订单"},
                    {status: 5, name: "失效订单"},
                    {status: 6, name: "已退款"},
                    {status: 7, name: "完成订单"},
                    {status: 8, name: "待付款"},
                    {status: 9, name: "待收货"}
                ],
                formInline: {status: ""},
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
        computed: {
            ...mapGetters({
                get_user_info: GET_USER_INFO
            })
        },
        methods: {
            ...mapActions({
                set_user_info: SET_USER_INFO
            }),
            remark(id) {
            },
            close(id) {
                this.load_data = true
                this.$http({
                    url: "/order/delete",
                    data: {id, managerId: this.get_user_info.user.id}
                })
                    .then(({data: {count, pageNo, orderList}}) => {
                        this.table_data = orderList
                        this.currentPage = pageNo
                        this.total = count
                        this.load_data = false
                    })
                    .catch((err) => {
                        this.load_data = false
                    })
            },
            refund(id, status) {
                this.load_data = true
                this.$http({
                    url: "/order/update",
                    data: {id, managerId: this.get_user_info.user.id, status}
                })
                    .then(({data}) => {
                        this.load_data = false
                        this.get_table_data()
                    })
                    .catch((err) => {
                        this.load_data = false
                    })
            },
            //刷新
            on_refresh() {
                this.get_table_data()
            },
            //获取数据
            get_table_data() {
                this.load_data = true
                let param = this.formInline;
                param.pageNo = this.currentPage;
                this.$http({
                    url: "/order/list",
                    data: param
                })
                    .then(({data: {count, pageNo, orderList}}) => {
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
