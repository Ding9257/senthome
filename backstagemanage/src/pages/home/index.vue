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
                    prop="volume"
                    label="成交量">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="成交额">
                </el-table-column>
                <el-table-column
                    prop="Average"
                    label="人均消费">
                </el-table-column>
            </el-table>
        </div>
        <div class="panel-body">
            <div>近七日价格走势</div>
            <charts :options="optionC" style="height: 400px"></charts>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {panelTitle, bottomToolBar, charts} from 'components'
    import fetch from 'common/fetch'
    import moment from "moment"

    const formatData = "YYYY-MM-DD";
    let _this;
    export default {
        data() {
            _this = this;
            return {
                times: [
                    {name: "今天", time: 0},
                    {name: "昨天", time: 1},
                    {name: "近七日", time: 6},
                    {name: "进30天", time: 29}
                ],
                formInline: {time: 0},
                startTime: "",
                endTime: "",
                optionB: null,
                optionC: null,
                xAxis_data: [],
                //成交量
                volume_data: [],
                //成交额
                money_data: [],
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
            bottomToolBar,
            charts
        },
        created() {
            this.handleTime();
            this.get_nearly_seven_days()
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
            get_nearly_seven_days() {
                let arr = [0, 1, 2, 3, 4, 5, 6];
                let q = [];
                let start = "00:00:00", end = "23:59:59";
                for (let value of arr) {
                    let date = moment().subtract(value, 'days').format(formatData);
                    this.xAxis_data.push(date);
                    q.push(_this.$http({
                        url: "/manager/orderIndex",
                        data: {startTime: `${date} ${start}`, endTime: `${date} ${end}`}
                    }))
                }
                Promise.all(q).then(res => {
                    for (let {data} of  res) {
                        this.volume_data.push(data.volume);
                        this.money_data.push(data.money);
                    }
                    setTimeout(_this.create_chartsC, 500)
                })
            },
            create_chartsC() {
                this.optionC = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['成交额', '成交量']
                    },
                    grid: {
                        left: '16px',
                        right: '16px',
                        bottom: '16px',
                        top: '40px',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.xAxis_data
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '成交额',
                            type: 'line',
                            data: this.money_data
                        },
                        {
                            name: '成交量',
                            type: 'line',
                            data: this.volume_data
                        }
                    ]
                }
            },
            handleTime() {
                let today = moment().format(formatData);
                let startTime = `${today} 00:00:00`;
                let endTime = `${today} 23:59:59`;
                this.get_table_data(startTime, endTime)
            },
            //刷新
            on_refresh() {
                this.get_table_data()
            },
            //获取数据
            get_table_data(startTime, endTime) {
                this.load_data = true
                this.$http({
                    url: "/manager/orderIndex",
                    data: {startTime, endTime}
                })
                    .then(({data}) => {
                        this.table_data = [{...data}];
                        console.log(this.table_data);
                        this.load_data = false
                    })
                    .catch(() => {
                        this.load_data = false
                    })
            },
            //单个删除
            delete_data(id) {
                console.log(id);
                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.load_data = true
                        this.$http({
                            url: "/coupon/delete",
                            data: {id}
                        })
                            .then(({msg}) => {
                                this.get_table_data()
                                this.$message.success(msg)
                                this.load_data = false;
                            })
                            .catch(() => {
                                this.load_data = false;
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
