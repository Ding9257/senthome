<template>
    <div class="panel">
        <el-form :inline="true" :model="formInline" class="panel-title" style="padding-top: 10px;">
            <el-form-item label="门店名称">
                <el-input v-model="formInline.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="formInline.address" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="formInline.mobile" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="query()">查询</el-button>
            </el-form-item>
            <el-form-item>
                <router-link :to="{name: 'storeManagementAdd'}" tag="span">
                    <el-button type="primary" icon="plus" size="small">添加数据</el-button>
                </router-link>
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
                    label="店铺id"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="店铺名称"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="店铺电话"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="businessHours"
                    label="营业时间"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="distributionScope"
                    label="配送范围"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="详细地址"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="wxId"
                    label="微信号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="qrCode"
                    label="二维码"
                    width="120">
                    <template slot-scope="scope">
                        <img :src="`${hosts}${scope.row.qrCode}`" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="areaId"
                    label="所属小区编号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="状态"
                    width="120">
                    <template scope="props">{{props.row.status==1?"禁用":"启用"}}</template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="260">
                    <template scope="props">
                        <router-link :to="{name: 'storeManagementUpdate', params: {id: props.row.id}}" tag="span">
                            <el-button type="info" size="small" icon="edit">修改</el-button>
                        </router-link>
                        <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row.id)">
                            删除
                        </el-button>
                        <el-button type="danger" size="small" icon="delete" @click="change_status(props.row.id)">
                            {{props.row.sex==1?"启用":"禁用"}}
                        </el-button>
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

    export default {
        data() {
            return {
                hosts: this.config.hosts,
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
                this.load_data = true;
                this.$http({url: "/store/list", method: "post", data: {pageNo: this.currentPage, ...this.formInline}})
                    .then(({data: {areaList, pageNo, count}}) => {
                        this.table_data = areaList;
                        this.currentPage = pageNo;
                        this.total = count;
                        this.load_data = false;
                    })
                    .catch(() => {
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
                        this.load_data = true;
                        this.$http({
                            url: "/store/delete",
                            data: {id}
                        }).then(({msg}) => {
                            this.get_table_data();
                            this.$message.success(msg);
                        })
                            .catch(() => {
                            })
                    })
                    .catch(() => {
                    })
            },
            change_status(id) {
                this.$http({
                    url: "/store/update",
                    data: {id, status: 1}
                }).then(({msg}) => {
                    this.get_table_data();
                    this.$message.success(msg);
                })
                    .catch(() => {
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
            },
            query() {
                this.currentPage = 1
                this.get_table_data()
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
