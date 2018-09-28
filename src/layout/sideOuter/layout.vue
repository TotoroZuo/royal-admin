<template>
    <el-container class="layout-main-container">
        <el-aside :width="menuWith" class="layout-aside ">
            <!-- logo -->
            <div class="aside-logo">
                <img src="../../assets/totoro-logo.png"  alt="胖龙猫">
            </div>
            <!-- 菜单 -->
            <el-menu :default-active="active" class="layout-menu" :collapse="menuOpen">

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
                 <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">系统设置</span>
                    </template>
                    <el-menu-item index="5-0">用户管理</el-menu-item>
                    <el-menu-item index="5-0">部门管理</el-menu-item>
                    <el-menu-item index="5-1">菜单管理</el-menu-item>
                    <el-menu-item index="5-2">角色管理</el-menu-item>
                    <el-menu-item index="5-4">接口管理</el-menu-item>
                </el-submenu>
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
                            <avator class="header-avator" color="#b3c0d1"  size="30">
                                A
                            </avator>
                            <el-dropdown class="accountDropmenu">
                                <a  class="header-account">
                                   <span class="accountName">admin</span>
                                </a>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>基本资料</el-dropdown-item>
                                    <el-dropdown-item>修改密码</el-dropdown-item>
                                    <el-dropdown-item divided @click.native="doLogout">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
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
                    </div>
                </div>
            </el-header>
            <el-main class="layout-main">
                <root-path/>
                <div class="royal-paper royal-paper-2  ">
                    <router-view/>
                </div>
            </el-main>
            <el-footer class="layout-footer" height="40px">
                © {{curYear}} <a href="https://github.com/TotoroZuo/royal-admin">{{copyRight}}</a>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
import setting from '@/config.js' // 配置文件
import avator from '@/components/Avator.vue' // 头像组件
import rootPath from '@/components/RouterPath.vue' // 当前路径
const thisYear = new Date().getFullYear()
export default {
  name: 'mainLayout',
  props: {
    msg: String
  },
  components: {
    avator,
    rootPath
  },
  data () {
    return {
      menuOpen: false,
      copyRight: setting.copyRight,
      curYear: thisYear,
      menuWith: '201px'
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
          this.menuWith = '201px'
        }
      }, 0)
    },
    doLogout () {
      this.$store.commit('user/clear')
      this.$router.push({ name: 'login' })
    },
    // 获取菜单列表
    getMenuList () {
      const param = { token: this.$store.user.token }
      this.$apis.menu.getList(param).then((res) => {
        this.$store.commit('menu/setList', res.data)
      })
    }
  },
  computed: {
    active () {
      return this.$store.state.menu.active
    }
  }
}
</script>
<style lang="stylus" scoped>
    @import './layout.styl'
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
