<template>
    <div class="panel">
        <panel-title :title="$route.meta.title"></panel-title>
        <div class="panel-body"
             v-loading="load_data"
             element-loading-text="拼命加载中">
            <el-row>
                <el-col :span="12">
                    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                        <el-form-item label="现金券名称:" prop="name">
                            <el-input v-model="form.name" placeholder="" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="使用时间限制">
                            <el-date-picker
                                v-model="form.useTime"
                                type="datetime"
                                @change="useTimeChange"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="缩略图:">
                            <el-upload
                                class="avatar-uploader"
                                :action="action"
                                name="files"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                            >
                                <img v-if="form.img" :src="form.img" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="售卖时间限制:">
                            <el-date-picker
                                v-model="form.selltime"
                                type="datetimerange"
                                @change="sellTimeChange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="售价:">
                            <el-input v-model="form.price" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="规则设置">
                            <el-form-item v-for="(param,index) in form.couponDrools" :key="index"
                                          style="padding-bottom: 5px;">
                                <el-input v-model="param.people" placeholder="人数" style="width: 120px;"></el-input>
                                <el-input v-model="param.rate" placeholder="中奖概率" style="width: 120px;"></el-input>
                                <el-input v-model="param.rateRobot" placeholder="机器概率" style="width: 120px;"></el-input>
                                <el-button @click.prevent="removeParam(index)">删除</el-button>
                            </el-form-item>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">
                                立即提交
                            </el-button>
                            <el-button @click="addParam">新增规则</el-button>
                            <el-button @click="$router.back()">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {panelTitle} from 'components'
    import ElFormItem from "element-ui/packages/form/src/form-item";
    import moment from "moment"

    export default {
        data() {
            return {
                action: this.config.fileUploadUrl,
                form: {
                    couponDrools: [
                        {people: "", rate: "", rateRobot: ""}
                    ]
                },
                usetime: "",
                route_id: this.$route.params.id,
                load_data: false,
                on_submit_loading: false,
                rules: {
                    name: [{required: true, message: '名称不能为空', trigger: 'blur'}]
                }
            }
        },
        created() {
            this.route_id && this.get_form_data()
        },
        methods: {
            //获取数据
            get_form_data() {
                this.load_data = true
                this.$http({
                    url: "/coupon/findOne",
                    data: {id: this.route_id}
                })
                    .then(({data}) => {
                        this.form = data
                        console.log(moment(data.times));
                        this.form.useTime = moment(data.times);
                        this.load_data = false
                    })
                    .catch(() => {
                        this.load_data = false
                    })
            },
            removeParam(index) {
                this.form.params.splice(index, 1);
            },
            addParam() {
                this.form.params.push({people: "", rate: "", rateRobot: ""})
            },
            handleAvatarSuccess(response, file, fileList) {
                this.form.img = `/image/${response.data}`;
            },
            useTimeChange() {
                this.form.times = moment(this.form.useTime).format("YYYY年MM月DD日 HH:mm:ss")
            },
            sellTimeChange() {
                let startTime = this.form.selltime[0];
                let endTime = this.form.selltime[1];
                let createTime = moment(startTime).format("YYYY年MM月DD日 HH:mm:ss");
                let collectTime = moment(endTime).format("YYYY年MM月DD日 HH:mm:ss");
                this.form.createTime = createTime;
                this.form.collectTime = collectTime;
            },
            //提交
            on_submit_form() {
                this.$refs.form.validate((valid) => {
                    if (!valid) return false
                    this.on_submit_loading = true
                    let url = "";
                    if (!!this.route_id) {
                        url = "/coupon/update";
                    } else {
                        url = "/coupon/save";
                    }
                    this.$http({
                        url,
                        data: this.form
                    })
                        .then(({msg}) => {
                            this.$message.success(msg)
                            setTimeout(this.$router.back(), 500)
                        })
                        .catch(() => {
                            this.on_submit_loading = false
                        })
                })
            }
        },
        components: {
            ElFormItem,
            panelTitle
        }
    }
</script>
