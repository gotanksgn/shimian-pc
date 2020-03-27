<template>
<el-container>
	<el-header>
		<page-head></page-head>
	</el-header>
	<el-main>
		<el-button type="danger" @click="login">登陆系统</el-button>
	</el-main>
	<el-footer>
		<page-footer></page-footer>
	</el-footer>
</el-container>
</template>

<script>
	import pageHead from '../components/pageHead.vue'
	import pageFooter from '../components/pageFooter.vue'
	import { mapState,mapActions } from 'vuex'
	let loading;
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState('login', ['user','menuList']),
		},
		methods: {
			...mapActions('login', ['getLoginUser','getMenuList']),
			goToMain(){
				this.$router.push('/main')
			},
			login(){
				this.openLoading();
				this.getMenuList();
				this.getLoginUser();
				this.$router.push('/main');
				this.closeLoading();
			},
			openLoading(){
				loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
			},
			closeLoading(){
				loading.close();
			}
		},
		// 注册组件
		components: {
			pageHead,
			pageFooter
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
