<template>
    <div class="panel">
        <panel-title :title="$route.meta.title"></panel-title>
        <div class="panel-body"
             v-loading="load_data"
             element-loading-text="拼命加载中">
            <el-row>
                <el-col :span="12">
                    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                        <el-form-item label="商品名称:" prop="name">
                            <el-input v-model="form.name" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <el-select v-model="form.region" placeholder="请选择商品分类">
                                <el-option v-for="item in sort" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品图片:" prop="name">
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-success="uploadOk"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="商品售价:" prop="name">
                            <el-input v-model="form.money" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="商品市场价:" prop="name">
                            <el-input v-model="form.price" placeholder="请输入内容" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="商品参数">
                            <el-form-item v-for="(param,index) in form.params" :key="index"
                                          style="padding-bottom: 5px;">
                                <el-input v-model="param.key" placeholder="参数名称" style="width: 120px;"></el-input>
                                <el-input v-model="param.value" placeholder="参数值" style="width: 120px;"></el-input>
                                <el-button @click.prevent="removeParam(index)">删除</el-button>
                            </el-form-item>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">
                                立即提交
                            </el-button>
                            <el-button @click="addParam">新增商品参数</el-button>
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
                sort: [{id: 1, name: "分类1"}, {id: 2, name: "分类2"}],
                form: {
                    name: null,
                    dialogVisible: false,
                    dialogImageUrl: "",
                    sex: 1,
                    params: [
                        {value: "", key: ""}
                    ],
                    age: 20,
                    birthday: this.$dateFormat(new Date, "yyyy-MM-dd"),
                    address: null,
                    zip: 412300
                },
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
                this.load_data = true
                this.$fetch.api_table.get({
                    id: this.route_id
                })
                    .then(({data}) => {
                        this.form = data
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
                this.form.params.push({key: "", index: ""})
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
