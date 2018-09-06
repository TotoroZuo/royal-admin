<template>
    <div class="user-list-container">
        <div class="search-container">
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
        <div class="list-wrap">
             <el-table
                ref="multipleTable"
                border
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                align="center"
                width="55">
                </el-table-column>
                <el-table-column
                label="日期"
                width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="120">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址"
                show-overflow-tooltip>
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
</template>
<script>
export default {
  name: 'users',
  data () {
    return {
      select: '',
      input5: '',
      currentPage4: 1,
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: []
    }
  },
  methods: {
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
.user-list-container
    padding 15px
.search-left
    float left
.search-right
    float right
.search-container
    padding 15px
    border: 1px solid #ebeef5;
    border-bottom none
.search-container:after
    content ''
    display block
    height 0
    width 100%
    clear both
.single-add
    margin-right 15px
.pagination-wrap
    padding 15px 0
    border: 1px solid #ebeef5;
    border-top none
</style>
