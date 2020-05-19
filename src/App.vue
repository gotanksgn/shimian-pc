<template>	
  <div id="app"> 
    <router-view/>
  </div>
</template>

<script>
export default {
	name: 'App',
	metaInfo: {
		// 如果子component中没有定义 metaInfo.title ，会默认使用这个title
		title: '视频面试就上视面 面试更快捷',
		//title:'开发者平台',
		meta:[
			{charset: 'utf-8' },
			{httpEquiv:'X-UA-Compatible',content:'X-UA-Compatible" content="IE=Edge，chrome=1'},
			{name:'viewport',content:'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'}
		]
	}
}
</script>

<style lang="less">
	body{
		margin:0vh;
		position:relative;
		#app{
			font-family: "microsoft yahei";
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			widows: 100%;
			height: 100%;
			.el-container {
				margin: 0vh;
				background-color: #F3F6F8;
				.el-header{
					min-height: 10vh;
					padding:0 !important;
				}
				.el-main{
					min-height: 70vh;
					padding:0 !important;
				}
				
				.el-footer{
					min-height: 20vh;
					padding:0 !important;
				}
			}
		}
		ul li{
			list-style: none; 
		}
	}
</style>
