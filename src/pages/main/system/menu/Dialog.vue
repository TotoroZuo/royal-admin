<template>
    <el-dialog :title="dialogTitle" :visible.sync="dialogOpen"   width="600px">
        <div class="user-dialog-body">
            <el-form ref="userForm" :model="userInfo" :rules="userRules" label-width="85px" label-position='right' size="medium">
                <el-form-item label="上级菜单" prop="name" class="float-label">
                    <el-input v-model="userInfo.name" placeholder="访问地址"></el-input>
                </el-form-item>
                <el-form-item label="菜单层级" prop="org" class="float-label">
                    <el-select v-model="userInfo.org" class="selectOrg" placeholder="菜单层级" :disabled="true">
                    <el-option label="一级菜单" value="1"></el-option>
                    <el-option label="二级菜单" value="2"></el-option>
                    <el-option label="三级菜单" value="3"></el-option>
                    <el-option label="四级菜单" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单名称" prop="account" class="float-label">
                    <el-input v-model="userInfo.account" placeholder="菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" prop="phone" class="float-label">
                    <el-input v-model="userInfo.phone" placeholder="请输入菜单图标名称"></el-input>
                </el-form-item>
                <el-form-item label="排序权重" prop="idcard" class="float-label">
                    <el-input v-model="userInfo.idcard" placeholder="请输入排序权重"></el-input>
                </el-form-item>
                 <div style="clear:both;"></div>
                 <el-form-item label="访问地址" prop="password">
                    <el-input v-model="userInfo.password" placeholder="菜单访问地址"></el-input>
                </el-form-item>
                <el-form-item label="打开方式" prop="isSuper">
                    <el-radio-group v-model="userInfo.isSuper">
                    <el-radio :label="true" >本页</el-radio>
                    <el-radio :label="false">新窗口</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div style="clear:both;"></div>
                <el-form-item label="启用状态" prop="enable">
                    <el-switch v-model="userInfo.enable"></el-switch>
                </el-form-item>

                <el-form-item style="margin-bottom:0;">
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button type="primary" @click="restForm">重置</el-button>
                    <el-button  @click="closeDialog">取消</el-button>
                </el-form-item>

            </el-form>
        </div>
    </el-dialog>
</template>
<script>
// 用户基本信息
import userRules from './userRules.js'
const userInfo = {
  uid: '',
  account: '',
  password: '',
  avator: '',
  org: '',
  role: [],
  name: '',
  enable: true,
  phone: '',
  idcard: '',
  isSuper: false
}
// 默认传入的用户信息
const defaultInfo = { ...userInfo }
export default {
  name: 'menuDialog',
  data () {
    return {
      dialogOpen: false,
      userInfo,
      userRules
    }
  },
  props: {
    type: {
      type: String,
      default: 'add' // add or editor
    },
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
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          this.doSubmitData()
        }
      })
    },
    // 表单进行数据提交
    doSubmitData () {
      const params = { ...this.userInfo }
      if (this.type == 'add') {
        delete params['uid']
      }
    },
    restForm () {
      if (this.type === 'add') {
        this.userInfo = defaultInfo
      } else {
        this.userInfo = { ...this.info }
      }
    },
    handleAvatarSuccess (res, file) {
      this.userInfo.avator = URL.createObjectURL(file.raw)
    },
    handlePictureCardPreview (file) {
      console.log(file)
      this.userInfo.avator = file.url
    }
  },
  computed: {
    dialogTitle () {
      return this.type === 'add' ? '创建用户' : '编辑用户'
    },
    selectInfo () {
      return this.$store.state.user.selectInfo
    }
  },
  watch: {
    dialogOpen (val) {
      if (!val) {
        this.userInfo = defaultInfo
        this.$refs['userForm'].resetFields()
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
    type (val) {
      if (val == 'add') {
        this.userInfo = defaultInfo
      } else {
        this.userInfo = this.selectInfo
      }
    },
    // 大小写转换
    'userInfo.idcard' (val) {
      this.userInfo.idcard = val.toUpperCase()
    }
  }
}
</script>
<style lang="stylus" scoped>
.user-dialog-body {
    max-width: 980px;
    margin: 0 auto;
}
.float-label
    width 50%;
    float left ;

>>> .el-checkbox+.el-checkbox {
    margin-left: 0;
}

.el-checkbox {
    padding-right: 10px;
}
.avatar-uploader
    width 60px
    height 60px
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
>>> .el-select .el-input
    width 100%;
</style>
