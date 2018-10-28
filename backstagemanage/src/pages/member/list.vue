<template>
    <div class="panel">
        <panel-title :title="$route.meta.title">
            <el-button @click.stop="on_refresh" size="small">
                <i class="fa fa-refresh"></i>
            </el-button>
        </panel-title>
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
                    label="头像"
                    width="80">
                    <template slot-scope="scope">
                        <img :src="scope.row.icon"/>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="昵称"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="手机号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="注册时间"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="orders"
                    label="成交订单数"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="消费金额"
                    width="120">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="">
                    <template scope="props">
                        <router-link :to="{name: 'memberDetails', params: {id: props.row.id}}" tag="span">
                            <el-button type="info" size="small" icon="edit">详情</el-button>
                        </router-link>
                        <router-link :to="{name: 'memberOrder', params: {id: props.row.id}}" tag="span">
                            <el-button type="info" size="small" icon="edit">订单</el-button>
                        </router-link>
                        <el-button type="info" size="small" icon="edit"
                                   @click="setBlackList(props.row.id,1)">设置黑名单
                        </el-button>
                        <el-button type="info" size="small" icon="edit"
                                   @click="setBlackList(props.row.id,0)">取消黑名单
                        </el-button>
                        <el-button type="info" size="small" icon="edit" @click="delete(props.row.id)">删除</el-button>
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
            setBlackList(id, status) {
                this.$http({url: "/customerInfo/update", data: {userId: id, status}})
                    .then(({msg}) => {
                        this.get_table_data()
                        this.$message.success(msg)
                    })
                    .catch(() => {
                    })
            },
            delete(id) {
                this.$http({url: "/customerInfo/delete", data: {id}})
                    .then(({msg}) => {
                        this.get_table_data()
                        this.$message.success(msg)
                    })
                    .catch(() => {
                    })
            },
            //刷新
            on_refresh() {
                this.get_table_data()
            },
            //获取数据
            get_table_data() {
                this.load_data = true
                this.$http({
                    url: "/customerInfo/list",
                    data: {pageNo: this.currentPage}
                })
                    .then(({data: {productList, pageNo, count}}) => {
                        this.table_data = productList
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
