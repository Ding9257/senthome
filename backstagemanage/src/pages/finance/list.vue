<template>
    <div class="panel">
        <el-form :inline="true" :model="formInline" class="panel-title" style="padding-top: 10px;">
            <el-form-item label="账单类型">
                <el-input v-model="formInline.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="账单时间">
                <el-input v-model="formInline.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="账单时间">
                <el-input v-model="formInline.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="query()">下载账单</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script type="text/javascript">
    import {panelTitle, bottomToolBar} from 'components'

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
                this.load_data = true;
                this.$http({url: "/area/list", method: "POST", data: {pageNo: this.currentPage}})
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
