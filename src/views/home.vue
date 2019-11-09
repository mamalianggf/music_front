<template>
    <el-container>
        <el-header>
            <el-row style="border-bottom: solid 1px #e6e6e6">
                <el-col :span="2" style="height: 60px">
                    <el-image style="width: 60px; height: 60px" src="/file/home/logo.png"></el-image>
                </el-col>
                <el-col :span="2">欣享音乐</el-col>
                <el-col :span="2.5" :offset="16">
                    <div class="">
                        <el-menu class="el-menu-demo" mode="horizontal" text-color="#333" @select="handleSelect">
                            <el-menu-item index="1">登录</el-menu-item>
                            <el-menu-item index="2">注册</el-menu-item>
                        </el-menu>
                    </div>
                </el-col>
            </el-row>
        </el-header>

        <el-main>
            <div class="block">
                <!--<span class="demonstration">默认 Hover 指示器触发</span>-->
                <el-carousel>
                    <el-carousel-item>
                        <h3 class="large">
                            <el-image src="/file/home/blog1.jpg" ></el-image>
                        </h3>
                    </el-carousel-item>
                    <el-carousel-item>
                        <el-image src="/file/home/blog2.jpg" ></el-image>
                    </el-carousel-item>
                    <el-carousel-item>
                        <el-image src="/file/home/blog3.jpg" ></el-image>
                    </el-carousel-item>
                    <el-carousel-item>
                        <el-image src="/file/home/blog4.jpg" ></el-image>
                    </el-carousel-item>
                </el-carousel>
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
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                const self = this;
                if (key === "1"){
                    self.$router.push({name:"login"});
                }
                if (key === "2"){
                    self.$router.push({name:"register"});
                }
            }
        }
    }
</script>

<style>
    .el-container {
        width: 90%;
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

    .el-carousel__item:nth-child(2n) {
        /*background-color: #99a9bf;*/
    }

    .el-carousel__item:nth-child(2n+1) {
        /*background-color: #d3dce6;*/
    }
</style>
