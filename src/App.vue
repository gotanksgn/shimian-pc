<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1" class="title-bg">处理中心</el-menu-item>
  <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
</el-menu>

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  data(){
    return {
      show: false,
      show2: false,
      dataList: []
    }
  },

  mounted(){
    //构造方法
    //ajax
    this.titleClass = "title-bg2"
    this.dataList=[{
        label: "姓名",
        value: "司广楠"
      }, {
        label: "年龄",
        value: "123"
      }, {
        label: "性别",
        value: "男"
      }]
  },
  methods: {
    setTitle(title){
      this.title = title;
    },
    getTitle(param){
      console.log(param)
    },
  }
}
</script>

<style>
.title-bg{
  background: red;
}
.title-bg2{
  background: blue;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
