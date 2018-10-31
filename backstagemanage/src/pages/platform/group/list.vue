<template>
    <div class="panel">
        <panel-title :title="$route.meta.title">
            <el-button @click.stop="on_refresh" size="small">
                <i class="fa fa-refresh"></i>
            </el-button>
            <router-link :to="{name: 'platformGroupAdd'}" tag="span">
                <el-button type="primary" icon="plus" size="small">添加数据</el-button>
            </router-link>
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
                    prop="name"
                    label="名称"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="managerList.userName"
                    label="操作人员"
                    width="100">
                </el-table-column>
                <el-table-column
                    label="状态"
                    width="">
                    <template slot-scope="scope">
                        {{scope.row.status==0?"启用":"禁用"}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="">
                    <template scope="props">
                        <router-link :to="{name: 'platformGroupUpdate', params: {id: props.row.id,data:props.row}}"
                                     tag="span">
                            <el-button type="info" size="small" icon="edit">修改</el-button>
                        </router-link>
                        <el-button type="info" size="small" icon="edit">删除</el-button>
                        <el-button type="info" size="small" @click="change_status(props.row.id,0)" icon="edit">启用
                        </el-button>
                        <el-button type="info" size="small" @click="change_status(props.row.id,1)" icon="edit">禁用
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
                    url: "/groups/list",
                    data: {}
                })
                    .then(({data}) => {
                        this.table_data = data;
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
            change_status(id, status) {
                this.$http({
                    url: "/groups/update",
                    data: {id, status}
                })
                    .then((msg) => {
                        this.$message.success(msg)
                        this.get_table_data();
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
