<template>
    <el-col :span="24" class="main">
        <aside>
            <!--导航菜单-->
            <el-menu :default-active="this.$route.path" @select="handleselect" unique-opened router>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-s-order"></i>
                        <span style="font-size: 15px">中台测试项目</span>
                    </template>
                <el-menu-item index="/task/tasklist"><i class="el-icon-menu"></i>中台测试任务</el-menu-item>
                <el-menu-item index="/task/taskcalendar"><i class="el-icon-s-unfold"></i>任务日历图</el-menu-item>
                    <el-menu-item index="/task/bugcollect"><i class="el-icon-camera"></i>线上bug汇总</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-s-open"></i>
                        <span style="font-size: 15px">中台测试分享</span>
                    </template>
                    <el-menu-item index="/task/share"><i class="el-icon-s-claim"></i>分享汇总</el-menu-item>
                </el-submenu>
                <el-menu-item index="/task/alert"><i class="el-icon-message-solid"></i>警告提示信息</el-menu-item>
<!--                <el-menu-item index="/task/group"><i class="el-icon-s-check"></i>组成员管理</el-menu-item>-->
                <el-menu-item index="/task/group" disabled><i class="el-icon-s-check"></i>组成员管理</el-menu-item>
            </el-menu>
        </aside>
        <section class="content-container">
            <div>
                <el-col :span="24" class="content-wrapper">
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </el-col>
            </div>
        </section>
    </el-col>
</template>

<script>
    export default {
        name: "task",
        data() {
            return {}
        },
        methods: {
            handleselect: function (a, b) {
                console.log(a, b)
            },
        },
        mounted() {
            console.log(this.$route)
        }
    }
</script>

<style scoped lang="scss">
    .main {
        width: 100%;
        display: flex;
        position: absolute;
        top: 60px;
        bottom: 0;
        overflow: hidden;
        margin-left: 0px;

        aside {
            flex: 0 0 200px;
            width: 200px;
            .el-menu {
                height: 100%;
            }
            .el-menu-item{
                font-size: 15px;
                box-sizing:border-box;
                cursor:pointer;
                color: #272727;
            }
        }
        .content-container {
            flex: 1;
            overflow-y: scroll;
            padding: 10px;
        }
    }
</style>
