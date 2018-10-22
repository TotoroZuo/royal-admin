/*
 * @Description: 功能模块/接口管理
 * @Author: Long maomao
 * @Date: 2018-10-22 16:51:23
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-10-22 17:28:19
 * @Email: zlf@zuolongfei.me
 */

<template>
    <div class="role-list-container">
        <div class="role-list-left">
            <div class="role-left-title">
                <span class="role-title-content">功能模块</span>
                <el-button class="add-group-btn" type="text" v-show="!chooseRole">创建模块</el-button>
                <el-button class="add-group-btn" type="text" v-show="chooseRole">删除</el-button>
                <el-button class="add-group-btn" type="text" v-show="chooseRole">编辑</el-button>
            </div>
            <ul class="role-list-box">
                    <li  @click="doChooseRole('')" :class="{'role-list-active':!chooseRole}">
                         全部
                    </li>

                    <draggable v-model="roleList">
                        <transition-group name="drag-list">
                            <li v-for="element in roleList" :key="element.id" @click="doChooseRole(element.id)" :class="{'role-list-active':element.id==chooseRole? true : false}">
                                {{element.name}}
                            </li>
                        </transition-group>
                    </draggable>

            </ul>
        </div>
        <div class="role-list-right">
            <div class="search-container">
                <div class="search-container-top">
                    <div class="search-left">
                        <el-button type="primary"  size="medium" icon="el-icon-circle-plus-outline" class="single-add">添加</el-button>
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

            </div>
            <div class="list-wrap">
                <el-table
                :data="tableData5"
                border
                style="width: 100%">

                <el-table-column
                    type="selection"
                    align="center"
                    width="60">
                </el-table-column>
                <el-table-column
                    label="序号"
                    width="65"
                    align="center">
                    <template slot-scope="props">
                        {{props.$index + 1}}
                    </template>
                </el-table-column>

                <el-table-column
                    label="接口名称"
                    width="200"
                    align="center">
                    <template slot-scope="props">
                        <el-button type="text">{{props.row.name}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="所属页面"
                    width="200"
                    align="center"
                    prop="parent">
                </el-table-column>
                <el-table-column
                    label="接口地址"
                    prop="path">
                </el-table-column>
                <el-table-column
                    label="调用次数"
                    width="80"
                    align="center"
                    prop="num">
                </el-table-column>
                <el-table-column
                    label="状态"
                    width="100"
                    align="center"
                    >
                    <template slot-scope="props">
                        <el-tooltip :content="'点击' + (props.row.status ? '禁用':'启用') +'接口'" placement="top">
                            <el-switch
                                v-model="props.row.status"
                                active-color="#13ce66"
                                inactive-color="#C0CCDA">
                            </el-switch>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column type="expand" width="65" label="详情">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="接口ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="排序权重">
                                <span>{{ props.row.weight }}</span>
                            </el-form-item>

                            <el-form-item label="接口名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="所属页面">
                                <span>{{ props.row.parent }}</span>
                            </el-form-item>
                            <el-form-item label="访问地址">
                                <span>{{ props.row.path }}</span>
                            </el-form-item>
                            <el-form-item label="调用次数">
                                <span>{{ props.row.num }}</span>
                            </el-form-item>
                            <el-form-item label="状态">
                                <span>
                                    <el-tag type="success" size="medium" v-if="props.row.status">已启用</el-tag>
                                    <el-tag type="danger" size="medium" v-else>已禁用</el-tag>
                                </span>
                            </el-form-item>
                            <el-form-item label="接口描述">
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
        </div>
        <div class="clear"></div>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  name: 'api',
  components: {
    draggable
  },
  data () {
    return {
      roleName: '',
      chooseRole: '',
      roleList: [
        {
          id: 1,
          name: '角色一',
          active: false
        },
        {
          id: 2,
          name: '角色二',
          active: true
        },
        {
          id: 3,
          name: '角色三',
          active: false
        }
      ],
      select: '',
      input5: '',
      value5: '',
      currentPage4: 1,
      tableData5: [
        {
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
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    doChooseRole (id) {
      this.chooseRole = id
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.role-list-container {
    padding: 15px;
    box-sizing border-box;
}

.role-list-left {
    float left;
    width: 240px;
    min-width 240px;
    margin-right 15px;
    background: #fff;
    border: 1px solid #ebeef5;
}

.role-list-right {

    overflow:hidden;
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

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand >>> label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.role-left-title {
    padding: 0 15px;
    height: 66px;
    line-height: 66px;
}

.role-list-box {
    // width 100%
    margin: 0;
    padding: 0;
    list-style: none;
}

.role-list-box li {
    text-align: center;
    padding: 15px;
    border-top: 1px solid #ebeef5;
    cursor: move;
    color: #606266;
}

.role-list-box li:last-child {
    border-bottom: 1px solid #ebeef5;
}

.role-list-box li:hover {
    color: #303133;
    background-color: #ecf5ff;
}

.role-list-box li.role-list-active {
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: 1px dashed #3a8ee6;
    background-color: #ecf5ff;
    color: #303133;
}
.add-group-btn
    float: right;
    padding: 3px 0;
    margin-top:22px;
</style>
