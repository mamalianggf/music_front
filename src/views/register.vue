<template>
    <div>
        <div class="block">
            <el-image src="/file/home/fox.png" class="demo-register" @click="returnHome">
            </el-image>
        </div>
        <div class="block">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="账号" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="ruleForm.pwd" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPwd">
                    <el-input v-model="ruleForm.confirmPwd" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            var validateRepeatName = (rule, value, callback) => {
                const self = this;
                self.$http.get("/back/user/validateRepeatName?name=" + value)
                    .then(function (res) {
                        if (res.data.status == 204) {
                            callback(new Error(res.data.message));
                        } else if (res.data.status == 500) {
                            callback(new Error(res.data.message));
                        }
                        callback();
                    })
            };
            var validateConfirmPwd = (rule, value, callback) => {
                if (value !== this.ruleForm.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    name: '',
                    pwd: '',
                    confirmPwd: '',
                    email: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {validator: validateRepeatName, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'},
                    ],
                    pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    confirmPwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {validator: validateConfirmPwd, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        let postData = self.$qs.stringify({
                            name: self.ruleForm.name,
                            email: self.ruleForm.email,
                            pwd: self.ruleForm.pwd
                        })
                        self.$http.post("/back/user/register", postData)
                            .then(function (res) {
                                if (res.data.status == 200) {
                                    self.$router.push({name: "login"});
                                }
                                self.$message({
                                    showClose: true,
                                    message: res.data.message,
                                    type: 'warning',
                                    duration: 3000//延迟3秒自动关闭
                                });

                            })
                    } else {
                        return false//校验不通过
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            returnHome() {
                this.$router.push({name: "home"})
            }
        }
    }
</script>

<style scoped>
    .demo-ruleForm {
        width: 400px;
        margin: 20px auto;
    }

    .demo-register {
        width: 100px;
        height: 100px;
        margin: 80px auto;
        display: block;
        cursor: pointer;
    }
</style>