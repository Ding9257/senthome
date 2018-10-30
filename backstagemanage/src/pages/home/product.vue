<template>
    <div class="panel">
        <el-form :inline="true" :model="formInline" class="panel-title" style="padding-top: 10px;">
            <el-form-item label="时间">
                <el-select v-model="formInline.time" placeholder="请选择">
                    <el-option
                        v-for="item in times"
                        :label="item.name"
                        :value="item.time">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="query()" type="primary">查询</el-button>
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
                    prop="product.id"
                    label="id">
                </el-table-column>
                <el-table-column
                    prop="product.name"
                    label="商品名称">
                </el-table-column>
                <el-table-column
                    prop="num"
                    label="成交数量">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="成交金额">
                    <template scope="props">{{props.row.product.money*props.row.num}}</template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {panelTitle, bottomToolBar} from 'components'
    import fetch from 'common/fetch'
    import moment from "moment"

    const formatData = "YYYY年MM月DD日";
    export default {
        data() {
            return {
                times: [
                    {name: "今天", time: 0},
                    {name: "昨天", time: 1},
                    {name: "近七日", time: 6},
                    {name: "进30天", time: 29}
                ],
                formInline: {time: 0},
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
            let today = moment().format(formatData);
            let startTime = `${today} 00:00:00`;
            let endTime = `${today} 23:59:59`;
            this.get_table_data(startTime, endTime);
        },
        methods: {
            query() {
                let time = this.formInline.time;
                let startTime = "";
                let endTime = "";
                let start = "00:00:00", end = "23:59:59";
                if (time == 0) {
                    let date = moment().format(formatData);
                    startTime = `${date} ${start}`;
                    endTime = `${date} ${end}`;
                }
                if (time == 1) {
                    let date = moment().subtract(time, 'days').format(formatData);
                    startTime = `${date} ${start}`;
                    endTime = `${date} ${end}`;
                }
                if (time == 6 || time == 29) {
                    let endDate = moment().subtract(time, 'days').format(formatData);
                    endTime = `${moment().format(formatData)} ${end}`;
                    startTime = `${endDate} ${start}`;
                }
                this.get_table_data(startTime, endTime)
            },
            //获取数据
            //获取数据
            get_table_data(startTime, endTime) {
                this.load_data = true
                this.$http({
                    url: "/manager/productIndex",
                    data: {startTime, endTime}
                })
                    .then(({data}) => {
                        this.table_data = data;
                        this.load_data = false
                    })
                    .catch(() => {
                        this.load_data = false
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
