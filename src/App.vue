<template>
  <div id="app"> 
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	
	body{
		margin:0px;
		position:relative;
	}
	
	ul li{
		list-style: none; 
	}
	
	.el-container {
		margin: 0px;
		background-color: #F3F6F8;
	}
	
	.el-header{
		padding:0px;
	}
	
	.el-main{
		min-height: 360px;
	}
	
	.el-footer{
		padding:0px;
	}
</style>
