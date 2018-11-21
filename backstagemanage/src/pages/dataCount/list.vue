<template>
    <div class="panel">
        <el-form :inline="true" :model="formInline" class="panel-title" style="padding-top: 10px;">
            <el-form-item label="交易时间">
                <el-date-picker
                    v-model="formInline.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click="get_table_data()" type="primary">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="panel-body">
            <div>
                <el-tag type="info">最高交易额{{table_data.mixMoney}}</el-tag>
                <el-tag type="info">销售量{{table_data.number}}</el-tag>
            </div>
            <el-table
                :data="table_data"
                v-loading="load_data"
                element-loading-text="拼命加载中"
                border
                style="width: 100%;">
                <el-table-column
                    prop="store.name"
                    label="店铺信息">
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="销售量">
                </el-table-column>
                <el-table-column
                    prop="mixMoney"
                    label="最高交易量">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="销售总额">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {panelTitle, bottomToolBar} from 'components'
    import fetch from 'common/fetch'
    import moment from "moment"

    const formatData = "YYYY-MM-DD HH:mm:ss";
    export default {
        data() {
            return {
                formInline: {},
                value6: "",
                name: "",
                table_data: [],
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
                let startTime = "", endTime = "";
                let times = this.formInline.time;
                if (!!times) {
                    startTime = moment(times[0]).format(formatData);
                    endTime = moment(times[1]).format(formatData);
                }
                this.$http({url: `/data/dataList?startTime=${startTime}&endTime=${endTime}`, method: "get"})
                    .then((res) => {
                        this.table_data = res.data || [],
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
            }
            ,
            change_status(status) {
                console.log(status);
            }
            ,
            //页码选择
            handleCurrentChange(val) {
                this.currentPage = val
                this.get_table_data()
            }
            ,
            //批量选择
            on_batch_select(val) {
                this.batch_select = val
            }
            ,
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
