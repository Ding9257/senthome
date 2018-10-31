<template>
    <div class="panel">
        <panel-title :title="$route.meta.title"></panel-title>
        <div class="panel-body"
             v-loading="load_data"
             element-loading-text="拼命加载中">
            <el-row>
                <el-col :span="12">
                    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                        <el-form-item label="售空图标:">
                            <el-upload
                                class="avatar-uploader"
                                :action="action"
                                name="files"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess1"
                            >
                                <img v-if="form.sellOut" :src="`${hosts}${form.sellOut}`" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="加载图标:">
                            <el-upload
                                class="avatar-uploader"
                                :action="action"
                                name="files"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess2"
                            >
                                <img v-if="form.loading" :src="`${hosts}${form.loading}`" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
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
            this.get_form_data()
        },
        methods: {
            //获取数据
            get_form_data() {
                this.load_data = true
                this.$http({
                    url: "/icon/list",
                    data: {}
                })
                    .then(({data}) => {
                        this.form = {
                            sellOut: data[0].url,
                            loading: data[1].url
                        }
                        this.load_data = false
                    })
                    .catch(() => {
                        this.load_data = false
                    });
            },
            removeParam(index) {
                this.form.params.splice(index, 1);
            },
            addParam() {
                this.form.params.push({key: "", index: ""})
            },
            handleAvatarSuccess1(response, file) {
                this.form.sellOut = `/image/${response.data}`;
                this.on_submit_form(1,this.form.sellOut)
            },
            handleAvatarSuccess2(response, file) {
                this.form.loading = `/image/${response.data}`;
                this.on_submit_form(2,this.form.loading)
            },
            //提交
            on_submit_form(id, url) {
                this.$http({
                    url: "/icon/update",
                    data: {id, url}
                })
                    .then(({msg}) => {
                        this.$message.success(msg);
                    })
                    .catch(() => {

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
