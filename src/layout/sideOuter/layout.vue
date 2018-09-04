<template>
    <el-container class="layout-main-container">
        <el-aside :width="menuWith" class="layout-aside ">
            <!-- logo -->
            <div class="aside-logo">
                <img src="../../assets/totoro-logo.png"  alt="胖龙猫">
            </div>
            <!-- 菜单 -->
            <el-menu default-active="1-4-1" class="layout-menu" :collapse="menuOpen">

                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航一</span>
                    </template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    <el-submenu index="1-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <!-- 右侧部分 -->
        <el-container class="right-main-container">
            <el-header class="layout-header" height="50px">
                <a href="javascript:;" class="aside-toggle" @click="toggleOpenMenu">
                    <i class="material-icons" v-show="menuOpen">keyboard_arrow_right </i>
                    <i class="material-icons" v-show="!menuOpen">keyboard_arrow_left</i>
                </a>
                <div class="layout-header-content">
                    <!-- <div class="header-content-left">
                        <a  class="header-icons" v-if="menuOpen" @click="toggleOpenMenu">
                            <i class="material-icons">format_indent_increase</i>
                        </a>
                        <a   class="header-icons" @click="toggleOpenMenu" v-else>
                            <i class="material-icons">format_indent_decrease</i>
                        </a>
                    </div> -->
                    <div class="header-content-middle">
                        追求简约美感的后台管理系统集成方案
                    </div>
                    <div class="header-content-right">
                            <el-tooltip content="消息通知" placement="bottom" effect="light">
                                <a  class="header-icons">
                                    <el-badge :value="0" class="notice-nums">
                                        <i class="material-icons">notifications_none</i>
                                    </el-badge>
                                </a>
                            </el-tooltip>
                            <el-tooltip content="错误日志" placement="bottom" effect="light">
                                <a  class="header-icons">
                                    <i class="material-icons">bug_report</i>
                                </a>
                            </el-tooltip>
                            <el-tooltip content="操作日志" placement="bottom" effect="light">
                                <a  class="header-icons">
                                    <i class="material-icons">g_translate</i>
                                </a>
                            </el-tooltip>
                            <el-tooltip content="帮助中心" placement="bottom" effect="light">
                                <a  class="header-icons">
                                    <i class="material-icons">help_outline</i>
                                </a>
                            </el-tooltip>
                            <el-dropdown class="accountDropmenu">
                                <a  class="header-account">
                                   <span class="accountName">admin</span>
                                </a>
                                <!-- <span class="el-dropdown-link">
                                    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                                </span> -->
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>基本资料</el-dropdown-item>
                                    <el-dropdown-item>修改密码</el-dropdown-item>
                                    <el-dropdown-item divided>退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>

                    </div>
                </div>
            </el-header>
            <el-main><router-view/></el-main>
            <el-footer class="layout-footer" height="40px">
                © {{curYear}} <a href="https://github.com/TotoroZuo/royal-admin">{{copyRight}}</a>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
import setting from '@/config.js'
const thisYear = new Date().getFullYear()
export default {
  name: 'mainLayout',
  props: {
    msg: String
  },
  data () {
    return {
      menuOpen: false,
      copyRight: setting.copyRight,
      curYear: thisYear,
      menuWith: '220px'
    }
  },
  methods: {
    toggleOpenMenu () {
      this.menuOpen = !this.menuOpen
      this.changeMenuWidth()
    },
    changeMenuWidth () {
      setTimeout(() => {
        if (this.menuOpen) {
          this.menuWith = '66px'
        } else {
          this.menuWith = '220px'
        }
      }, 0)
    }
  }
}
</script>
<style lang="stylus" scoped>
.layout-menu
    border none
    height calc(100% - 50px)
.layout-aside
    border-right: 1px solid #dcdfe6

.aside-toggle
    position absolute
    width: 16px;
    height: 50px
    top: 200px;
    left: 0px;
    background: #dcdfe6;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;

.aside-toggle:before,.aside-toggle:after
    display: block;
    content: "";
    position: absolute;
    left: 0;
    width: 0;
    height: 0;
    border-width: 13px 0 13px 10px;
    border-style: solid;
    border-color: transparent transparent transparent #dcdfe6;

.aside-toggle:before {
    top: -11px;
}
.aside-toggle:after {
    bottom: -11px;
}
.aside-toggle>i
    font-size 16px
    line-height 50px
    &:hover
       color: #409EFF;
.layout-main-container
    height 100vh
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 400px;
  }
.aside-logo
    height 50px
    padding-top 10px
    box-sizing border-box
    text-align center
    border-bottom  1px solid #dcdfe6
.aside-logo img
    width  40px
.right-main-container
    background-color rgb(240,243,247)
.layout-header
    height 60px
    text-align center
    background #fff
    border-bottom  1px solid #dcdfe6
    position relative
.layout-footer
    height 40px
    text-align center
    line-height 40px
    font-size 13px
.layout-header-content
    display flex
.header-content-left,.header-content-right
    width 500px
    text-align right
.header-content-middle
    flex 1
    line-height 50px
    color #909399
    text-align left
.header-icons
    width 40px
    height 40px
    margin-top 5px
    padding 10px
    box-sizing border-box
    display inline-block
    line-height 24px
    cursor pointer
    margin-right 20px
    &:hover
        color: #409EFF;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
.material-icons
    color #606266
    font-size 20px
.header-account
    display inline-block
    vertical-align middle
.accountDropmenu
    vertical-align top
.accountName
    display inline-block
    vertical-align middle
    cursor pointer
    padding 5px
    box-sizing border-box
    margin-top 5px
    height 40px
    line-height 30px
    color #409EFF
    &:hover
        color: #409EFF;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
</style>
<style lang="stylus">
.notice-nums .el-badge__content.is-fixed
    top -5px
    right 5px
.notice-nums .el-badge__content
    font-size 9px
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
