<template>
    <div class="panel">
        <div class="panel-body" style="width: 300px;">
            <el-form label-position="left" inline class="demo-table-expand">
                <div>
                    <el-form-item label="头像">
                        <span><img :src="table_data.icon"/></span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="昵称">
                        <span>{{ table_data.userName }}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="手机号">
                        <span>{{ table_data.phone }}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="注册时间">
                        <span>{{ table_data.createTime }}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="黑名单">
                        <span>{{ table_data.status==0?"不是":"是" }}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="活动范围">
                        <span>{{ table_data.address }}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="备注">
                        <span>{{ table_data.desc }}</span>
                    </el-form-item>
                </div>
            </el-form>
            <el-button @click="$router.back()">返回</el-button>
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
                    url: "/customerInfo/findOne",
                    data: {id: this.route_id}
                })
                    .then(({data}) => {
                        this.table_data = data[0]
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
