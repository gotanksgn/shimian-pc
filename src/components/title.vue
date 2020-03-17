<template>
  <div id="app">
    <img :alt="alt" src="../assets/logo.png">
    <div :class="titleClass"  class="title-bg" @click="getTitle(123123)">
      {{titletitle}}
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      titleClass: "title-bg aaaa aaaa",
      title: "原始title",
      alt: "Vue logo",
    }
  },
  props: {
      titletitle: {
          type: String,
          default: "司广楠"
      }
  },
  mounted(){
    //构造方法
    //ajax
    this.titleClass = "title-bg2"
  },
  methods: {
    setTitle(title){
      this.title = title;
    },
    getTitle(){
        this.$emit("aaaa", "asdasdasdasd")
    },
  }
}
</script>

<style>
.title-bg{
  background: red;
}
.title-bg2{
  background: #aaaaaa;
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
