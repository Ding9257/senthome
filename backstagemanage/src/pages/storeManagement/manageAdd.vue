<template>
    <div class="panel">
        <panel-title :title="$route.meta.title"></panel-title>
        <div class="panel-body"
             v-loading="load_data"
             element-loading-text="拼命加载中">
            <el-row>
                <el-col :span="8">
                    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                        <el-form-item label="店铺名称:" prop="name">
                            <el-input v-model="form.name" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="店铺Logo:">
                            <el-upload
                                class="avatar-uploader"
                                :action="action"
                                name="files"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                            >
                                <img v-if="form.img" :src="`${hosts}${form.img}`" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="状态:">
                            <el-select v-model="form.status" placeholder="请选择">
                                <el-option
                                    v-for="item in status"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="店铺电话:">
                            <el-input v-model="form.mobile" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="营业时间:">
                            <el-time-picker
                                v-model="form.openTime"
                                is-range
                                @blur="openTimeChange"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="选择时间范围">
                            </el-time-picker>
                        </el-form-item>
                        <el-form-item label="配送范围:">
                            <el-select v-model="form.areaId" placeholder="请选择">
                                <el-option
                                    v-for="item in ranges"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="详细地址:">
                            <el-input v-model="form.address" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="微信号:">
                            <el-input v-model="form.wxId" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="二维码:">-->
                        <!--<el-upload-->
                        <!--class="avatar-uploader"-->
                        <!--:action="action"-->
                        <!--name="files"-->
                        <!--:show-file-list="false"-->
                        <!--:on-success="handleAvatarrCodeSuccess"-->
                        <!--&gt;-->
                        <!--<img v-if="form.qrCode" :src="form.qrCode" class="avatar">-->
                        <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                        <!--</el-upload>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="所属小区编号:">-->
                        <!--<el-input v-model="form.areaId" placeholder="请输入内容" style="width: 250px;"></el-input>-->
                        <!--</el-form-item>-->
                        <el-form-item>
                            <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交
                            </el-button>
                            <el-button @click="$router.back()">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <!--<div class="amap-wrapper">-->
        <!--<el-amap :center="center" :zoom="zoom" class="amap-box" :events="events" :vid="'amap-vue'"></el-amap>-->
        <!--</div>-->
    </div>
</template>
<script type="text/javascript">
    import {panelTitle} from 'components'
    import moment from "moment"

    export default {
        data() {
            return {
                hosts: this.config.hosts,
                ranges: [
                    // {name: "一千米", value: "1"},
                    // {name: "三千米", value: "3"},
                    // {name: "五千米", value: "5"}
                ],
                status: [
                    {name: "正常", value: "0"},
                    {name: "禁用", value: "1"}
                ],
                action: this.config.fileUploadUrl,
                form: {},
                imageUrl: "",
                route_id: this.$route.params.id,
                load_data: false,
                dialogImageUrl: '',
                on_submit_loading: false,
                rules: {
                    name: [{required: true, message: '姓名不能为空', trigger: 'blur'}]
                },
                zoom: 12,
                center: [121.59996, 31.197646],
                events: {
                    click(e) {
                        let {lng, lat} = e.lnglat;
                        console.log(e);
                        var geocoder = new AMap.Geocoder({
                            radius: 1000,
                            extensions: "all"
                        });
                        geocoder.getAddress([lng, lat], function (status, result) {
                            console.log(status);
                            console.log(result);
                        });
                    }
                }
            }
        },
        created() {
            this.get_community()
            this.route_id && this.get_form_data()
        },
        methods: {
            touchstart(e) {
                console.log(e);
            },
            //获取数据
            get_form_data() {
                this.load_data = true
                this.$http({
                    url: "/store/findOne",
                    method: "post",
                    data: {id: this.route_id}
                })
                    .then(({data}) => {
                        this.form = data
                        this.form.areaId = data.areaId * 1
                        this.form.openTime
                        this.load_data = false
                    })
                    .catch(() => {
                        this.load_data = false
                    })
            },
            get_community() {
                this.$http({url: "/area/list", method: "POST", data: {pageNo: 1}})
                    .then(({data: {areaList}}) => {
                        this.ranges = areaList
                    })
            },
            //时间选择改变时
            openTimeChange() {
                console.log(this.form.openTime);
                this.form.businessHours = `${moment(this.form.openTime[0]).format("HH:mm:ss")}-${moment(this.form.openTime[1]).format("HH:mm:ss")}`
                console.log(this.form.businessHours);
                //this.form.businessHours = moment(this.openTime).format("YYYY-MM-DD HH:mm:ss");
            },
            handleAvatarSuccess(response, file) {
                this.form.img = `/image/${response.data}`;
            },
            handleAvatarrCodeSuccess(response) {
                this.form.qrCode = `/image/${response.data}`;
            },
            //提交
            on_submit_form() {
                this.$refs.form.validate((valid) => {
                    if (!valid) return false
                    this.on_submit_loading = true
                    let url = "";
                    if (!!this.route_id) {
                        url = "/store/update";
                    } else {
                        url = "/store/save";
                    }
                    this.$http({
                        url,
                        data: this.form
                    }).then((data) => {
                        this.$message.success(data.msg)
                        setTimeout(this.$router.back(), 500)
                    })
                        .catch(() => {
                            this.on_submit_loading = false
                        })
                })
            }
        }
        ,
        components: {
            panelTitle
        }
    }
</script>
<style>
    .amap-wrapper {
        width: 500px;
        height: 500px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
