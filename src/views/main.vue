<template>
	<el-container>
		<el-header>
			<page-head></page-head>
		</el-header>
		<el-main>
			<job-manager v-if="pageType=='manager'"></job-manager>
			<job-edit v-if="pageType=='edit'"></job-edit>
		</el-main>
		<el-footer>
			<page-footer></page-footer>
		</el-footer>
	</el-container>
</template>

<script>
	import pageHead from '../components/pageHead.vue'
	import pageFooter from '../components/pageFooter.vue'	
	import jobManager from './jobManager.vue'
	import jobEdit from './jobEdit.vue'
	export default {
		data() {
			return {
				pageType:'manager'
			}
		},
		// 注册组件
		components: {
			pageHead,
			pageFooter,
			jobManager,
			jobEdit
		},
		methods:{
			createjob(){
				alert(222);
				this.pageType='edit';
			}
		},
		// 创建完毕状态(里面是操作)
		created() {
		
		}
	}
</script>

<style>
	body{
		margin: 0px;
	}
	
	.el-header {
		background-color: #333;
		color: #fff;
		text-align: center;
		line-height: 70px;
		min-height: 70px;
	}
	
	.el-footer{
		background-color: #333;
		color: #fff;
		text-align: center;
		min-height: 230px;
	}
	
	.el-main {
		background-color: #F3F6F8;
		color: #333;
		min-height: 550px;
		padding: 0px;
	}
	
</style>