<template>
    <div class="panel">
        <panel-title :title="$route.meta.title"></panel-title>
        <div class="panel-body"
             v-loading="load_data"
             element-loading-text="拼命加载中">
            <el-row>
                <el-col :span="12">
                    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                        <el-form-item label="排序:">
                            <el-input v-model="form.orders" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="广告标题:" prop="title">
                            <el-input v-model="form.title" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="缩略图:">
                            <el-upload
                                class="avatar-uploader"
                                :action="action"
                                name="files"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                            >
                                <img v-if="form.name" :src="`${hosts}${form.name}`" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="广告连接:">
                            <el-input v-model="form.url" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="显示状态:">
                            <el-radio v-model="form.status" label="0">显示</el-radio>
                            <el-radio v-model="form.status" label="1">隐藏</el-radio>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">
                                立即提交
                            </el-button>
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

    export default {
        data() {
            return {
                hosts: this.config.hosts,
                action: this.config.fileUploadUrl,
                sort: [{id: 1, name: "分类1"}, {id: 2, name: "分类2"}],
                form: {orders: ""},
                route_id: this.$route.params.id,
                bannerData:
                this.$route.params.data,
                load_data:
                    false,
                on_submit_loading:
                    false,
                rules:
                    {
                        title: [{required: true, message: '广告标题不能为空', trigger: 'blur'}]
                    }
            }
        },
        created() {
            this.route_id && this.get_form_data()
        },
        methods: {
            //获取数据
            get_form_data() {
                this.form = this.bannerData;
            },
            removeParam(index) {
                this.form.params.splice(index, 1);
            },
            addParam() {
                this.form.params.push({key: "", index: ""})
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleAvatarSuccess(response, file, fileList) {
                this.form.name = `/image/${response.data}`;
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
                        url = "/picture/update";
                    } else {
                        url = "/picture/save";
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
