/*
 * @Description: 常见问题 添加修改
 * @Author: Long maomao
 * @Date: 2018-10-22 14:47:25
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-10-23 17:44:15
 * @Email: zlf@zuolongfei.me
 */

<template>
    <el-dialog :title="dialogTitle" :visible.sync="dialogOpen"   width="850px">
        <div class="user-dialog-body">
            <el-form ref="apiForm" :model="Info" :rules="apiRules" label-width="85px" label-position='right' size="medium">

                <el-form-item label="问题标题" prop="title" >
                    <el-input v-model="Info.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="解决方案" prop="noticeContent">
                    <div class="dialog-editor-wrap">
                        <vue-editor v-model="Info.noticeContent" :options="editorOptions"></vue-editor>
                    </div>
                </el-form-item>

                <el-form-item style="margin-bottom:0;">
                    <el-button type="primary" @click="onSubmit">发布</el-button>
                    <el-button  @click="restForm">重置</el-button>
                    <el-button  @click="closeDialog">取消</el-button>
                </el-form-item>

            </el-form>
        </div>
    </el-dialog>
</template>
<script>

// 菜单基本信息
import apiRules from './apiRules.js'
import vueEditor from '@/components/Editor.vue'
const Info = {
  hid: 'aaa', // ID
  title: '', // 标题
  content: '<p>dfadadad</p>' // 正文
}
// 默认传入的用户信息
const defaultInfo = { ...Info }
const editorOptions = {
  uploadImgServer: '/upload'
}
export default {
  name: 'help-dialog',
  components: {
    vueEditor
  },
  data () {
    return {
      dialogOpen: false,
      Info,
      apiRules,
      editorOptions,
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      menuTreeData: [ {
        id: 'a',
        label: 'a',
        level: 1,
        children: [ {
          id: 'aa',
          label: 'aa',
          level: 2
        }, {
          id: 'ab',
          label: 'ab',
          level: 2
        } ]
      }, {
        id: 'b',
        label: 'b',
        level: 1
      }, {
        id: 'c',
        label: 'c',
        level: 1
      } ]
    }
  },
  props: {
    // 显示内容 add 新增 editor 编辑
    type: {
      type: String,
      default: 'add' // add or editor
    },
    // 控制模态框开关
    open: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 关闭对话框
    closeDialog () {
      this.dialogOpen = false
    },
    // 进行表单校验
    onSubmit () {
      this.$refs['apiForm'].validate((valid) => {
        if (valid) {
          this.doSubmitData()
        }
      })
    },
    // 表单进行数据提交
    doSubmitData () {
      const params = { ...this.Info }
      if (this.type == 'add') {
        delete params['aid']
      }
    },
    /**
     * @description: 重置表单信息
     */
    restForm () {
      if (this.type === 'add') {
        this.Info = defaultInfo
      } else {
        this.Info = { ...this.selectInfo }
      }
    },
    /**
     * @description: 改变菜单层级
     */
    changPathDeep (node, instanceId) {
      this.Info.pathDeep = node.level
    },
    handleAvatarSuccess (res, file) {
      this.Info.subPic = URL.createObjectURL(file.raw)
    },
    handlePictureCardPreview (file) {
      console.log(file)
      this.Info.subPic = file.url
    }
  },
  mounted () {
    this.Info.author = this.userInfo.userName
  },
  computed: {
    /**
     * @description:变化标题
     */
    dialogTitle () {
      return this.type === 'add' ? '创建常见问题' : '编辑常见问题'
    },
    /**
     * @description 获取选中菜单详情
     */
    selectInfo () {
      return this.$store.state.options.selectApi
    },
    /**
     * @description 获取用户信息
     */
    userInfo () {
      return this.$store.state.user.info
    }
  },
  watch: {
    dialogOpen (val) {
      if (!val) {
        this.Info = defaultInfo
        this.$refs['apiForm'].resetFields()
        // 同步open状态解决多次点击问题
        this.$emit('update:open', false)
        this.$emit('update:type', 'add')
      }
    },
    // 监听模态框开关
    open (val) {
      if (val) {
        this.dialogOpen = true
      }
    },
    // 监控是添加还是编辑
    type (val) {
      if (val == 'add') {
        this.Info = defaultInfo
      } else {
        this.Info = { ...this.selectInfo }
      }
    },
    'Info.noticeContent' (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="stylus" scoped>
.user-dialog-body {
    max-width: 980px;
    margin: 0 auto;
}

.float-label {
    width: 50%;
    float: left;
}

>>> .el-checkbox+.el-checkbox {
    margin-left: 0;
}

.el-checkbox {
    padding-right: 10px;
}

.avatar-uploader {
    width: 60px;
    height: 60px;
}

>>> .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

>>> .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

>>> .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
}

>>> .avatar {
    width: 60px;
    height: 60px;
    display: block;
}

>>> .el-select .el-input {
    width: 100%;
}

>>> .vue-treeselect__control {
    border-radius: 2px;
    border: 1px solid #dcdfe6;
    height: 34px;
    line-height: 34px;
}

>>> .vue-treeselect__control:focus, .vue-treeselect__control:active {
    border-color: #409EFF;
    outline: 0;
}

>>> .vue-treeselect__menu {
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
}
.dialog-editor-wrap
 width 100%
>>> .w-e-toolbar
    flex-wrap: wrap;
</style>
