<template>
	<el-container>
		<el-header>
			<page-head loginStatus></page-head>
		</el-header>
		<el-main>
			<h1 style="margin: 30vh 40vw;">设计中...</h1>
		</el-main>
		<el-footer>
			<page-footer></page-footer>
		</el-footer>
	</el-container>	
</template>

<script>
	import pageHead from '@/components/pageHead.vue'
	import pageFooter from '@/components/pageFooter.vue'
	export default {
		// 注册组件
		components: {
			pageHead,
			pageFooter
		}
	}
	
</script>

<style>
</style>
