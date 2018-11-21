<template>
    <div class="panel">
        <panel-title :title="$route.meta.title"></panel-title>
        <div class="panel-body">
            <el-table
                :data="table_data"
                v-loading="load_data"
                element-loading-text="拼命加载中"
                style="width: 4550px;">
                <el-table-column
                    prop="toDayVolume"
                    label="今日成交量"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="toDayMoney"
                    label="今日成交额"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="toDayAverage"
                    label="今日人均消费"
                    width="">
                </el-table-column>

                <el-table-column
                    prop="yestDayVolume"
                    label="昨天成交量"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="yestDayMoney"
                    label="昨天成交额"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="yestDayAverage"
                    label="昨天人均消费"
                    width="">
                </el-table-column>

                <el-table-column
                    prop="weekDayVolume"
                    label="近七日成交量"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="weekDayMoney"
                    label="近七日成交额"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="weekDayAverage"
                    label="近七日人均消费"
                    width="">
                </el-table-column>

                <el-table-column
                    prop="monthDayVolume"
                    label="近1月成交量"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="monthDayMoney"
                    label="近1月成交额"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="monthDayAverage"
                    label="近1月人均消费"
                    width="">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {panelTitle, bottomToolBar} from 'components'
    import moment from "moment"

    const formatData = "YYYY-MM-DD";
    export default {
        data() {
            return {
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
                let start = "00:00:00", end = "23:59:59";
                let toDayTime = moment().format(formatData);
                let toDay = `${toDayTime} ${start} - ${toDayTime} ${end}`;
                let yestDayTime = moment().subtract(1, 'days').format(formatData);
                let yestDay = `${yestDayTime} ${start} - ${yestDayTime} ${end}`;
                let weekDayTime = moment().subtract(6, 'days').format(formatData);
                let weekDay = `${weekDayTime} ${start} - ${toDayTime} ${end}`;
                let monthDayTime = moment().subtract(30, 'days').format(formatData);
                let monthDay = `${monthDayTime} ${start} - ${toDayTime} ${end}`;
                let query = `?toDay=${toDay}&yestDay=${yestDay}&weekDay=${weekDay}&monthDay=${monthDay}`;
                this.$http({
                    url: "/order/listOrder" + query,
                    method: "get"
                })
                    .then((data) => {
                        this.table_data = [data.data]
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
