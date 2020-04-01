/**
* 头部菜单
*/ 
<template>
	<div class="header">
		<el-row>
			<el-col :span="6">
				<a class="logo" href="#">
					<img src="@/assets/img/logo.png" class="header-logo-img" alt="logo">
				</a>
			</el-col>
			<el-col :span="12">
				<el-menu :default-active="'0'"  mode="horizontal" @select="handleSelect" v-if="loginStatus"
					background-color="#333" text-color="#fff" active-text-color="#ffd04b"> 
					<el-menu-item  :index="idx.toString()" v-for="(item, idx) in menuList" :key="idx">
						<a>	
							{{item.label}}
							<el-badge :value="item.count" :max="99" :hidden="item.resumeCount<=0"></el-badge>
						</a>
					</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="6">
				<div class="header-right" v-if="loginStatus">        
					<a class="header-info-text">{{user.fullname}}</a><a class="header-login-status" href="javascript:;" @click="logout()">退出</a>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import {mapState,mapActions} from 'vuex'	
	export default {
		name: 'pageHead',
		data() {
			return {

			};
		},
		props: {
			loginStatus:{
				type: Boolean,
				default: false
			}
		},
		created:function(){
			if(this.loginStatus){
				this.getMenuList();
				this.getLoginUser();
			}
		},
/* 		watch:{
			loginStatus(oldV,newV){
				console.log('old='+oldV+',new='+newV);
			}
		}, */
		computed:{
			...mapState('login', ['user','menuList']),
		},
		methods: {
			...mapActions('login',['getMenuList','getLoginUser']),
			handleSelect(e){
				console.log(e);
			},
			logout(){
				this.$confirm('您要退出视面?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$router.push('/login');
				});
			}
		}
	}
</script>
<style lang="less">
		
	.header{
		text-align: center;
		background-color: #333333;
		.header-logo-img{
			/**float: left;**/
			margin-top: 1vh;
			width: 10vw;
			height: 9vh;
		}
		.el-row{
			.el-menu{
				border-bottom:solid 0 ;
				.el-menu-item{
					font-size: 1.25rem;
					width:30%;
					height: 100%;
					line-height: 10vh;
					.el-badge{
						position:absolute;
						margin:0vh 0vw 0vh 1vw;
					}
				}
			}
		}
		.header-right{
			margin: 4vh 2vw 0vh 10vw;
			font-size: 1rem;
			a {
				text-decoration: none;
				outline: none;
			}
			.header-info-text {
				position: relative;
				color: #fff;
				padding-right: 1vw;
			}
			.header-info-text:after {
				content: '|';
				color: #666;
				position: absolute;
				right: 0vh;
			}
			.header-login-status {
				color: #ffdc36;
				padding: 0vh 0vw 0vh 1vw;
			}
		}
	}

</style>