<template>
    <el-container class="manage-container" v-bind:style="manageContainer">
        <el-header class="manage-header">FoxMusicAdmin</el-header>
        <el-container class="manage-middle">
            <el-aside class="manage-aside" width="201px">
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        :router=true>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>歌曲</span>
                        </template>
                        <el-menu-item-group>
                            <!--<template slot="title">分组一</template>-->
                            <el-menu-item index="/manage/song">歌曲管理</el-menu-item>
                            <el-menu-item index="1-2">歌曲审核</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="manage-main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "manage",
        data() {
            return {
                manageContainer: ''
            };
        },
        created: function () {
            let height = window.innerHeight;
            this.$data.manageContainer = "height:" + height + "px";
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }

        }
    }
</script>

<style scoped>
    .manage-header {
        height: 60px;
        line-height: 60px;
        font-size: x-large;
        background-color: #475669;
    }

    .manage-aside {
        background-color: #545c64;
    }

    .manage-main {
        background-color: white;
        padding: 40px
    }

</style>