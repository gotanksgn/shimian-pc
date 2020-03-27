/**
* 头部菜单
*/ 
<template>
	<div class="header">
		<el-row>
			<el-col :span="6">
				<a class="logo" href="#">
					<img src="../assets/logo.png" class="header-logo-img" alt="logo">
				</a>
			</el-col>
			<el-col :span="12">
				<el-menu :default-active="'0'"  mode="horizontal" @select="handleSelect" v-if="user.id!=null"
					background-color="#333" text-color="#fff" active-text-color="#ffd04b"> 
					<el-menu-item  :index="idx.toString()" v-for="(item, idx) in menuList" :key="idx">
						<a>	{{item.label}}
							<el-badge v-if="item.count>0" :value="item.count" :max="99"></el-badge>
						</a>
					</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="6">
				<div class="header-right" v-if="user.id!=null">        
					<a class="header-info-text">{{user.fullname}}</a><a class="header-login-status" href="javascript:;">退出</a>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import { mapState} from 'vuex'	
	export default {
		name: 'pageHead',
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('login', ['user','menuList']),
		},
		methods: {
			
		}
	}
</script>
<style scoped="scoped">
	.header .header-logo-img{
		/**float: left;**/
		margin-top: 8px;
		width: 120px;
		height: 50px;
	}
	
	.header .el-menu--horizontal>.el-menu-item{
		height: 70px;
		line-height: 70px;
	}
	
	.header .el-menu-item {
		padding: 0 60px;
	}
	
	.header .el-badge{
		padding: 0px 10px 5px;
	}
	
	.header .header-right a {
		text-decoration: none;
		outline: none;
	}
	
	.header .header-info-text {
		position: relative;
		color: #fff;
		font-size: 14px;
		padding-right: 20px;
	}
	
	.header .header-info-text:after {
		content: '|';
		color: #666;
		position: absolute;
		right: 0;
		top: 2.5px;
		line-height: 1em;
	}
	
	.header .header-login-status {
		color: #ffdc36;
		font-size: 14px;
		padding-left: 20px;
	}

</style>