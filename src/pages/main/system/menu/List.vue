<template>
    <div class="user-list-container">
        <div class="search-container">
            <div class="search-container-top">
                <div class="search-left">
                    <el-button type="primary"  size="medium" icon="el-icon-circle-plus-outline" class="single-add" @click="showAddUser">添加</el-button>
                    <el-button-group>
                        <el-button type="primary"  size="medium" icon="el-icon-circle-plus-outline">添加</el-button>
                        <el-button type="primary"  size="medium" icon="el-icon-delete">删除</el-button>
                    </el-button-group>
                </div>
                <div class="search-right">
                    <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                        <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="餐厅名" value="1"></el-option>
                        <el-option label="订单号" value="2"></el-option>
                        <el-option label="用户电话" value="3"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </div>
            <div class="search-path-box">
                <el-button type="text">返回上一级</el-button>
                <span role="presentation" class="el-breadcrumb__separator">|</span>
                <div  aria-label="Breadcrumb" role="navigation" class="el-breadcrumb menu-breadcrumb">
                    <span  class="el-breadcrumb__item">
                        <span role="link" class="el-breadcrumb__inner is-link">根目录</span>
                        <i class="el-breadcrumb__separator el-icon-arrow-right "></i>
                    </span>
                    <span  class="el-breadcrumb__item">
                    <span role="link" class="el-breadcrumb__inner">活动管理</span>
                    <i class="el-breadcrumb__separator el-icon-arrow-right "></i>
                    </span>
                    <span class="el-breadcrumb__item">
                    <span role="link" class="el-breadcrumb__inner">活动列表</span>
                    <i class="el-breadcrumb__separator el-icon-arrow-right "></i>
                    </span>
                    <span  class="el-breadcrumb__item" aria-current="page">
                        <span role="link" class="el-breadcrumb__inner">活动详情</span>
                        <i class="el-breadcrumb__separator el-icon-arrow-right "></i>
                    </span>
                </div>
                <!-- <el-breadcrumb separator-class="el-icon-arrow-right " class="menu-breadcrumb">
                    <el-breadcrumb-item :to="{ path: '/' }">根目录</el-breadcrumb-item>
                    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb> -->
            </div>

        </div>
        <div class="list-wrap">
            <el-table
            ref="menuList"
            :data="tableData5"
            border
            style="width: 100%">

            <el-table-column
                type="selection"
                align="center"
                width="55">
            </el-table-column>
            <el-table-column
                label="序号"
                width="60"
                align="center"
            >
                <template slot-scope="props">
                    {{props.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column
                label="图标"
                align="center"
                width="60">
                <template slot-scope="props">
                    <i class="material-icons">{{props.row.icon}}</i>
                </template>
            </el-table-column>
            <el-table-column
                label="菜单名称"
                width="200"
                align="center"
                >
                <template slot-scope="props">
                    <el-button type="text" @click="showDetail(props.row)">{{props.row.name}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="父级菜单"
                width="200"
                align="center"
                prop="parent">
            </el-table-column>
            <el-table-column
                label="访问地址"
                prop="path">
            </el-table-column>

            <el-table-column
                label="状态"
                width="100"
                align="center"
                >
                <template slot-scope="props">
                    <el-tooltip :content="'点击' + (props.row.status ? '禁用':'启用') +'菜单'" placement="top">
                        <el-switch
                            v-model="props.row.status"
                            active-color="#13ce66"
                            inactive-color="#C0CCDA">
                        </el-switch>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column type="expand" width="60" label="详情">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="list-table-expand">
                        <el-form-item label="菜单ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="排序权重">
                            <span>{{ props.row.weight }}</span>
                        </el-form-item>
                        <el-form-item label="菜单图标">
                            <span> <i class="material-icons">{{props.row.icon}}</i></span>
                        </el-form-item>
                        <el-form-item label="菜单名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="父级菜单">
                            <span>{{ props.row.parent }}</span>
                        </el-form-item>
                        <el-form-item label="访问地址">
                            <span>{{ props.row.path }}</span>
                        </el-form-item>
                        <el-form-item label="状态">
                            <span>
                                <el-tag type="success" size="medium" v-if="props.row.status">已启用</el-tag>
                                <el-tag type="danger" size="medium" v-else>已禁用</el-tag>
                            </span>
                        </el-form-item>
                        <el-form-item label="菜单描述">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
                 <template slot-scope="props">
                     <el-button type="text" size="small" >编辑</el-button>
                     <el-button type="text" size="small" >删除</el-button>
                 </template>
            </el-table-column>
        </el-table>

        </div>
        <div class="pagination-wrap">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="prev, pager, next, jumper,total, sizes"
            :total="400">
            </el-pagination>
        </div>
        <!-- 用户添加编辑组件 -->
        <menu-dialog :open.sync="openDialog"  :type.sync="dialogType" />
    </div>
</template>
<script>
import menuDialog from '@/pages/main/system/menu/Dialog.vue' // 添加组件
export default {
  name: 'menus',
  components: {
    menuDialog
  },
  data () {
    return {
      openDialog: false,
      dialogType: 'add',
      select: '',
      input5: '',
      value5: '',
      currentPage4: 1,
      tableData5: [{
        id: '12987122',
        num: 1,
        icon: 'home',
        path: '/system/menus',
        weight: 100,
        name: '菜单',
        status: true,
        desc: '荷兰优质淡奶，奶香浓而不腻',
        parent: '主页',
        parentPath: '/'
      }],
      multipleSelection: []
    }
  },
  methods: {
    showEditorUser () {
      this.dialogType = 'editor'
      const userInfo = {
        uid: 'aaa',
        account: 'sssss',
        password: 'sssssss',
        avator: '',
        org: 'org1',
        role: [],
        name: '做龙飞',
        enable: true,
        phone: '',
        idcard: '',
        isSuper: false
      }
      this.$store.commit('user/setSelect', userInfo)
      if (this.openDialog) {
        this.openDialog = false
      }
      this.openDialog = true
    },
    showAddUser () {
      this.dialogType = 'add'
      if (this.openDialog) {
        this.openDialog = false
      }
      this.openDialog = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    showDetail (row) {
      this.$refs.menuList.toggleRowExpansion(row)
    }
  }
}
</script>

<style lang="stylus" scoped>
.user-list-container {
    padding: 15px;
}

.search-left {
    float: left;
}

.search-right {
    float: right;
}

.search-container {
    padding: 15px;
    border: 1px solid #ebeef5;
    border-bottom: none;
    padding-bottom 0
}

.search-container-top:after {
    content: '';
    display: block;
    height: 0;
    width: 100%;
    clear: both;
}

.single-add {
    margin-right: 15px;
}

.pagination-wrap {
    padding: 15px 0;
    border: 1px solid #ebeef5;
    border-top: none;
}

.menu-breadcrumb
    display inline-block
    vertical-align top
    height 40px
    line-height 40px
</style>
