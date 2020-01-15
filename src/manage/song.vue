<template>
    <el-container class="container-song">
        <div>
            <el-table
                    :data="songs"
                    :border=true
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="src"
                        label="地址">
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page.currentPage"
                    :page-size="page.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="page.total">
            </el-pagination>
        </div>
    </el-container>
</template>

<script>
    export default {
        name: "song",
        data() {
            return {
                page: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
                },
                songs: []
            }
        },
        created() {
            const self = this;
            self.$http.get("/back/song/listSongs?pageNum=" + self.$data.page.currentPage + "&pageSize=" + self.$data.page.pageSize)
                .then(function (res) {
                    self.$data.songs = res.data.result.songs.list;
                    self.$data.page.total = res.data.result.songs.total;
                })
        },
        methods: {
            handleSizeChange(val) {
            },
            handleCurrentChange(val) {
                const self = this;
                self.$http.get("/back/song/listSongs?pageNum=" + val + "&pageSize=" + self.$data.page.pageSize)
                    .then(function (res) {
                        self.$data.songs = res.data.result.songs.list;
                        self.$data.page.total = res.data.result.songs.total;
                    })
            },
        }
    }
</script>

<style scoped>
    .container-song {
        width: 100%;
        padding: 50px auto
    }
</style>