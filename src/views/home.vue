<template>
    <el-container>
        <!--#todo 不写这个行内样式浏览器会莫名出现出现style="height:60px"这个行内样式 -->
        <el-header class="el-header-top" style="height:61px">
            <el-col :span="2" :offset="2" class="div-height">
                <el-image style="width: 60px; height: 60px" src="/file/home/fox.png"></el-image>
            </el-col>
            <el-col :span="2.5" :offset="1" class="div-height">
                <el-menu class="el-menu-demo" default-active="1" :router=true mode="horizontal"
                         @select="handleSelectLeft">
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-menu-item index="2">FoxMusic音乐人</el-menu-item>
                    <el-menu-item index="3">授权查询</el-menu-item>
                    <el-menu-item>
                        <el-input placeholder="请输入内容" suffix-icon="el-icon-search"></el-input>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="2.5" :offset="4" class="div-height">
                <el-menu v-if="user.name == ''" class="el-menu-demo" :router=true mode="horizontal"
                         @select="handleSelectRight">
                    <el-menu-item index="/login">登录</el-menu-item>
                    <el-menu-item index="/register">注册</el-menu-item>
                </el-menu>
                <el-dropdown class="el-dropdown-top" v-else @command="handleCommand">
                    <el-avatar :size="40"
                               src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">个人信息</el-dropdown-item>
                        <el-dropdown-item command="b">我的收藏</el-dropdown-item>
                        <el-dropdown-item command="c">购物车</el-dropdown-item>
                        <el-dropdown-item disabled command="d">待定</el-dropdown-item>
                        <el-dropdown-item divided command="e">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
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
            <div v-for="song in songs" class="song-div">
                <div class="song" style="height: 70px">
                    <div class="song-image-shade">
                        <i class="el-icon-video-play" style="color: white"></i>
                    </div>
                    <el-col :span="3">
                        <el-image :src="song.songImg" class="song-image"></el-image>
                    </el-col>
                    <el-col :span="4">
                        <div class="song-name">
                            <strong>{{song.name}}</strong></div>
                        <div class="song-singer">{{song.singerName}}</div>
                    </el-col>
                    <el-col :span="9">
                        <div class="song-canvas">
                            <el-progress :text-inside="true" :stroke-width="24" :percentage="100"
                                         status="success" style="line-height: 70px"></el-progress>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="song-time">{{song.time}}</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="song-operate">
                            <i class="el-icon-star-off"></i>
                            <i class="el-icon-shopping-cart-full"></i>
                            <i class="el-icon-goods"></i>
                        </div>
                    </el-col>
                </div>
                <div class="song-tag">
                    <el-tag type="info" effect="plain">标签一</el-tag>
                    <el-tag type="info" effect="plain">标签二</el-tag>
                    <el-tag type="info" effect="plain">标签三</el-tag>
                </div>
            </div>
            <div class="block el-pagination-bottom">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-main>
        <div class="advertising-board-left"><!-- 广告位直接放图片 -->
        </div>
        <div class="advertising-board-right">
        </div>
        <!--<el-footer class="el-footer-bottom">Footer</el-footer>-->
    </el-container>
</template>

<script>

    export default {
        name: 'home',
        data() {
            return {
                currentPage: 1,
                pageSize: 3,
                total: 0,
                user: {
                    id: "",
                    name: ""
                },
                songs: []
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
            self.$http.get("/back/song/listSongs?pageNum=" + self.$data.currentPage + "&pageSize=" + self.$data.pageSize)
                .then(function (res) {
                    self.$data.songs = res.data.result.songs.list;
                    self.$data.total = res.data.result.songs.total;
                })

        },
        methods: {
            handleSelectLeft(key, keyPath) {
            },
            handleSelectRight(key, keyPath) {
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
            },
            handleCurrentChange(val) {
                const self = this;
                self.$http.get("/back/song/listSongs?pageNum=" + val + "&pageSize=" + self.$data.pageSize)
                    .then(function (res) {
                        self.$data.songs = res.data.result.songs.list;
                        self.$data.total = res.data.result.songs.total;
                    })
            }
        }
    }
</script>

<style>
    .el-container {
        width: 80%;
        text-align: center;
        margin: 50px auto;
        padding: 0px 0px;
    }

    .el-header-top {
        display: block;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        z-index: 100;
        border-bottom: solid 1px #e6e6e6;
        background-color: white;
    }

    .div-height {
        height: 100%
    }

    .el-dropdown-top {
        height: 40px;
        margin-top: 25%;
    }

    .el-footer {
        line-height: 60px;
        padding: 0px 0px;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .song-div {
        height: 140px;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        padding-top: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .song-tag {
        height: 50px;
        text-align: left;
        padding-left: 50px;
        padding-top: 20px;
    }

    .song-tag .el-tag {
        margin-left: 10px;
    }

    .song {
        position: relative;
    }

    .song-image {
        width: 70px;
        height: 70px;
    }

    .song-image-shade {
        height: 70px;
        line-height: 70px;
        font-size: 30px;
        background-color: #333333;
        opacity: 0.7;
        width: 70px;
        height: 70px;
        position: absolute;
        left: 36px;
        top: 1px;
        z-index: 10;
    }

    .song-name {
        height: 35px;
        line-height: 35px;
        font-size: 18px;
        text-align: left
    }

    .song-singer {
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        text-align: left
    }

    .song-canvas {
        height: 70px;
    }

    .song-time {
        height: 70px;
        line-height: 70px
    }

    .song-operate {
        height: 70px;
        line-height: 70px;
        font-size: 30px
    }

    .song-operate > i {
        margin: 0px 20px;
    }

    .advertising-board-left {
        width: 130px;
        height: 170px;
        position: fixed;
        top: 130px;
        left: 0px;
        background-color: #333333;
    }

    .advertising-board-right {
        width: 130px;
        height: 170px;
        position: fixed;
        top: 130px;
        left: calc(100% - 130px);
        background-color: #333333;
    }

    .el-pagination-bottom {
        marigin-top: 30px
    }

</style>
