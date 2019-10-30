<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="100px"
             class="demo-ruleForm">
        <el-form-item label="账号" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
            <el-input v-model="ruleForm.pwd" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                ruleForm: {
                    name: '',
                    pwd: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入账号', trigger: 'blur'}
                    ],
                    pwd: [
                        {required: true, message: '请输入密码', trigger: 'change'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let postData = self.$qs.stringify({
                            name: self.ruleForm.name,
                            pwd: self.ruleForm.pwd
                        })
                        self.$http.post("/user/login", postData)
                            .then(function (res) {
                                self.$router.push({name:"home"});
                            })
                            .catch(function (err) {
                                console.log(err);
                            })
                    } else {
                        //校验不通过
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .demo-ruleForm {
        width: 400px;
        margin: 235px auto;
    }

</style>