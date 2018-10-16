<template>
    <el-dialog title="提示" :visible.sync="dialogOpen" width="600">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="closeDialog">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
  name: 'userDialog',
  data () {
    return {
      dialogOpen: false,
      userInfo: {
        uid: '',
        account: '',
        password: '',
        avator: '',
        org: '',
        role: '',
        name: '',
        status: '',
        tel: '',
        idcard: ''
      }
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
  computed: {
    dialogTitle () {
      return this.type === 'add' ? '添加用户' : '编辑用户'
    }
  },
  watch: {
    dialogOpen (val) {
      if (!val) {
        // 同步open状态解决多次点击问题
        this.$emit('update:open', false)
      }
    },
    open (val) {
      if (val) {
        this.dialogOpen = true
      }
    }
  },
  methods: {
    closeDialog () {
      this.dialogOpen = false
    }
  }
}
</script>
