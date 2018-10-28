<template>
    <div class="panel">
        <panel-title :title="$route.meta.title"></panel-title>
        <div class="panel-body"
             v-loading="load_data"
             element-loading-text="拼命加载中">
            <el-row>
                <el-col :span="8">
                    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                        <el-form-item label="小区名称:" prop="name">
                            <el-input v-model="form.name" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="小区经度">
                            <el-input v-model="form.lng" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="街道纬度:">
                            <el-input v-model="form.lat" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交
                            </el-button>
                            <el-button @click="$router.back()">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <div class="amap-wrapper">
            <el-amap :center="center" :zoom="zoom" class="amap-box" :events="events" :vid="'amap-vue'"></el-amap>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {panelTitle} from 'components'

    let that;
    export default {
        data() {
            that = this;
            return {
                form: {},
                route_id: this.$route.params.id,
                communityData: this.$route.params.data,
                load_data: false,
                on_submit_loading: false,
                rules: {
                    name: [{required: true, message: '姓名不能为空', trigger: 'blur'}]
                },
                zoom: 12,
                center: [121.59996, 31.197646],
                events: {
                    click(e) {
                        let {lng, lat} = e.lnglat;
                        console.log(that.form);
                        that.form.lng = lng;
                        that.form.lat = lat;
                        // var geocoder = new AMap.Geocoder({
                        //     radius: 1000,
                        //     extensions: "all"
                        // });
                        // geocoder.getAddress([lng, lat], function (status, result) {
                        //     console.log(status);
                        //     console.log(result);
                        // });
                    }
                }
            }
        },
        created() {
            this.route_id && this.get_form_data()
        },
        methods: {
            touchstart(e) {
                console.log(e);
            },
            //获取数据
            get_form_data() {
                this.form = this.communityData
            },
            //时间选择改变时
            on_change_birthday(val) {
                this.$set(this.form, 'birthday', val)
            },
            //提交
            on_submit_form() {
                this.$refs.form.validate((valid) => {
                    if (!valid) return false
                    this.on_submit_loading = true
                    let url = "";
                    if (!!this.route_id) {
                        url = "/area/update";
                    } else {
                        url = "/area/save";
                    }
                    this.$http({
                        url,
                        data: this.form
                    }).then(data => {
                        this.$message.success(data.msg)
                        setTimeout(this.$router.back(), 500)
                    })
                        .catch(() => {
                            this.on_submit_loading = false
                        })
                })
            }
        },
        components: {panelTitle}
    }
</script>
<style>
    .amap-wrapper {
        width: 500px;
        height: 500px;
    }
</style>
