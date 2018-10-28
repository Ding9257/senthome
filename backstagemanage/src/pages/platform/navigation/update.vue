<template>
    <div class="panel">
        <panel-title :title="$route.meta.title"></panel-title>
        <div class="panel-body"
             v-loading="load_data"
             element-loading-text="拼命加载中">
            <el-row>
                <el-col :span="12">
                    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                        <el-form-item label="标题:" prop="name">
                            <el-input v-model="form.title" placeholder="" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="图标:">
                            <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :file-list="fileList"
                                :on-success="handleAvatarSuccess"
                            >
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="slogan:" prop="name">
                            <el-input v-model="form.slogan" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="排序:">
                            <el-input v-model="form.order" placeholder="请输入内容" style="width: 250px;"></el-input>
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
                imageUrl: "https://www.sciencealert.com/images/2018-03/processed/666_web_600.jpg",
                sort: [{id: 1, name: "分类1"}, {id: 2, name: "分类2"}],
                fileList: [
                    {url: "https://www.sciencealert.com/images/2018-03/processed/666_web_600.jpg"}
                ],
                form: {},
                navData: this.$route.params.data,
                route_id: this.$route.params.id,
                load_data: false,
                on_submit_loading: false,
                rules: {
                    name: [{required: true, message: '姓名不能为空', trigger: 'blur'}]
                }
            }
        },
        created() {
            this.route_id && this.get_form_data()
        },
        methods: {
            //获取数据
            get_form_data() {
                this.form = this.navData;
            },
            removeParam(index) {
                this.form.params.splice(index, 1);
            },
            addParam() {
                this.form.params.push({key: "", index: ""})
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log(this.imageUrl);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            uploadOk(response, file, fileList) {
                console.log(response);
                console.log(file);
                console.log(fileList);
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
                    this.$fetch.api_table.save(this.form)
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
<style>
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
