<template>
    <div class="panel">
        <panel-title :title="$route.meta.title"></panel-title>
        <div class="panel-body"
             v-loading="load_data"
             element-loading-text="拼命加载中">
            <el-row>
                <el-col :span="12">
                    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                        <el-form-item label="商品名称:">
                            <el-input v-model="form.name" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <el-select v-model="form.type" placeholder="请选择商品分类">
                                <el-option v-for="item in sort" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品图片:">
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
                        <el-form-item label="商品售价:">
                            <el-input type="number" v-model="form.money" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="商品市场价:">
                            <el-input type="number" v-model="form.price" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>

                        <el-form-item label="品牌:">
                            <el-input v-model="form.brand" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="产地:">
                            <el-input v-model="form.area" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="单位:">
                            <el-input v-model="form.unit" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="重量:">
                            <el-input v-model="form.weight" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="商品参数">-->
                        <!--<el-form-item v-for="(param,index) in form.params" :key="index"-->
                        <!--style="padding-bottom: 5px;">-->
                        <!--<el-input v-model="param.key" placeholder="参数名称" style="width: 120px;"></el-input>-->
                        <!--<el-input v-model="param.value" placeholder="参数值" style="width: 120px;"></el-input>-->
                        <!--<el-button @click.prevent="removeParam(index)">删除</el-button>-->
                        <!--</el-form-item>-->
                        <!--</el-form-item>-->

                        <el-form-item>
                            <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">
                                立即提交
                            </el-button>
                            <!--<el-button @click="addParam">新增商品参数</el-button>-->
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
                action: `${this.config.hosts}/app/upload`,
                sort: [],
                form: {},
                route_id: this.$route.params.id,
                load_data: false,
                on_submit_loading: false,
                rules: {
                    name: [{required: true, message: '商品名称不能为空', trigger: 'blur'}]
                }
            }
        },
        created() {
            this.getSort();
            this.route_id && this.get_form_data()
        },
        methods: {
            //获取数据
            get_form_data() {
                this.load_data = true
                this.$http({
                    url: "/product/findOne",
                    data: {id: this.route_id}
                })
                    .then(({data}) => {
                        this.form = data
                        //this.form.type = this.form.type * 1
                        this.load_data = false
                    })
                    .catch(() => {
                        this.load_data = false
                    })
            },
            getSort() {
                this.load_data = true
                this.$http({
                    url: "/productType/list",
                    data: {}
                })
                    .then(({data}) => {
                        this.sort = data
                        this.load_data = false
                    })
                    .catch(() => {
                        this.load_data = false
                    })
            },
            handleAvatarSuccess(response, file, fileList) {
                this.form.img = `/image/${response.data}`;
            },
            removeParam(index) {
                this.form.params.splice(index, 1);
            },
            addParam() {
                this.form.params.push({key: "", index: ""})
            },

            //提交
            on_submit_form() {
                this.$refs.form.validate((valid) => {
                    if (!valid) return false
                    this.on_submit_loading = true
                    let url = "";
                    if (!!this.route_id) {
                        url = "/product/update";
                    } else {
                        url = "/product/save";
                    }
                    this.form.stock = 999
                    this.form.stockWarning = 999
                    this.form.sid = 0
                    this.form.status = 0
                    this.$http({
                        url,
                        data: this.form
                    }).then(({msg}) => {
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
