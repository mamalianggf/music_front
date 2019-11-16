<template>
    <el-container>
        <el-header>
            <el-row style="border-bottom: solid 1px #e6e6e6">
                <el-col :span="2" style="height: 60px">
                    <el-image style="width: 60px; height: 60px" src="/file/home/fox.png"></el-image>
                </el-col>
                <el-col :span="3" style="font-size: 25px">FoxMusic</el-col>
                <el-col :span="2.5" :offset="16" style="height: 60px">

                    <el-menu v-if="user.name == ''" class="el-menu-demo" mode="horizontal" text-color="#333"
                             @select="handleSelect">
                        <el-menu-item index="1">登录</el-menu-item>
                        <el-menu-item index="2">注册</el-menu-item>
                    </el-menu>
                    <el-dropdown v-else style="height: 50px" @command="handleCommand">
                        <el-avatar :size="50"
                                   src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                            <el-dropdown-item command="b">狮子头</el-dropdown-item>
                            <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                            <el-dropdown-item disabled command="d">双皮奶</el-dropdown-item>
                            <el-dropdown-item divided command="e">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-header>

        <el-main>
            <div class="block">
                <el-carousel>
                    <el-carousel-item>
                        <h3 class="large">
                            <el-image src="/file/home/blog1.jpg"></el-image>
                        </h3>
                    </el-carousel-item>
                    <el-carousel-item>
                        <h3 class="large">
                            <el-image src="/file/home/blog2.jpg"></el-image>
                        </h3>
                    </el-carousel-item>
                    <el-carousel-item>
                        <h3 class="large">
                            <el-image src="/file/home/blog3.jpg"></el-image>
                        </h3>
                    </el-carousel-item>
                    <el-carousel-item>
                        <h3 class="large">
                            <el-image src="/file/home/blog4.jpg"></el-image>
                        </h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="block">
                <div class="song">
                    <el-col :span="3">
                        <el-image src="/file/home/logo.png" style="height: 70px;width: 70px"></el-image>
                    </el-col>
                    <el-col :span="4">
                        <div style="height: 35px;line-height: 35px;font-size: 18px;text-align: left">
                            <strong>第一首歌</strong></div>
                        <div style="height: 35px;line-height: 35px;font-size: 14px;text-align: left">歌手</div>
                    </el-col>
                    <el-col :span="8">
                        <div style="height: 70px;background-color: #475669"></div>
                    </el-col>
                    <el-col :span="2">
                        <div style="height: 70px;line-height: 70px">00:39</div>
                    </el-col>
                    <el-col :span="4">
                        <div style="height: 70px;line-height: 70px;font-size: 30px">
                            <i class="el-icon-star-off" style="margin: 0px 20px;"></i>
                            <i class="el-icon-goods" style="margin: 0px 20px;"></i>
                        </div>
                    </el-col>


                </div>
            </div>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="100"
                        layout="prev, pager, next, jumper"
                        :total="1000">
                </el-pagination>
            </div>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>

    export default {
        name: 'home',
        data() {
            return {
                currentPage: 5,
                user: {
                    id: "",
                    name: ""
                }
            };
        },
        created: function () {//初始化时判断是否已经登录过,不能使用箭头函数否则this指向不正确
            const self = this;
            let token = self.$cookies.get("token");
            if (token != null) {
                self.$http.get("/back/user/getUser?token=" + token)
                    .then(function (res) {
                        if (res.data.status == 200) {
                            self.$data.user.name = res.data.result.user.name;
                            self.$data.user.id = res.data.result.user.id;
                        } else {
                            console.log(res.data.message);
                        }
                    })
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                const self = this;
                if (key === "1") {
                    self.$router.push({name: "login"});
                }
                if (key === "2") {
                    self.$router.push({name: "register"});
                }
            },
            handleCommand(command) {
                const self = this;
                if (command == "e") {
                    self.$cookies.remove("token");
                    self.$data.user.name = "";
                    self.$data.user.id = "";
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style>
    .el-container {
        width: 80%;
        margin: 50px auto;
    }

    .el-header, .el-footer {
        color: #333;
        text-align: center;
        line-height: 60px;
        padding: 0px 0px;
    }

    .el-main {
        color: #333;
        text-align: center;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-image {
        width: 100%;
    }

    .song {
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        padding-top: 20px;
        height: 140px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

</style>
