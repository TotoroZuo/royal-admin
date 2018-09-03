<template>
    <el-container class="layout-main-container">
        <el-aside width="200px">Aside</el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main><router-view/></el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'mainLayout',
  props: {
    msg: String
  }
}
</script>
<style lang="stylus" scoped>
.layout-main-container
    height 100%
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
