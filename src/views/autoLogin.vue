<template>
	<div class="el-main">
		<el-row type="flex">
			<el-col :span="6" :offset="1">
				<el-switch v-model="debug" active-text="DEBUG模式" inactive-text="非DEBUG模式"></el-switch>
			</el-col>
			<el-col :span="6" :offset="1">
				<el-switch v-model="autoload" active-text="自动刷新" inactive-text="关闭自动刷新"></el-switch>
			</el-col>
		</el-row>
		<el-row type="flex">
			<el-col :span="2" :offset="1">token:</el-col>
			<el-col :span="20"><el-input v-model="token"></el-input></el-col>
		</el-row>
		<el-row type="flex">
			<el-col :span="2" :offset="1">登陆状态</el-col>
			<el-col :span="2"><el-input v-model="loginstatus"></el-input></el-col>
		</el-row>	
		<el-row type="flex">	
			<el-col :span="2" :offset="1">登陆用户</el-col>
			<el-col :span="2"><el-input v-model="loginuser"></el-input></el-col>
		</el-row>
		<el-row type="flex">
			<el-col :span="4" :offset="1"><el-button type="primary" plain  @click="autologin()" :loading="loginLoading">登陆</el-button></el-col>
		</el-row>
	</div>
</template>

<script>
	import {userinfoApi} from '@/api/loginFun.js'
	export default {
		data() {
			return{
				loginstatus:'未登陆',
				loginuser:'',
				debugToken:'',
				loginLoading:false
			} 
		},
		computed:{
			debug:{
				get(){
					return this.$store.state.config.debug.isOpen;
				},
				set(v){
					if(v===true){
						this.$store.commit("config/openDebug");
					}else{
						this.$store.commit("config/closeDebug");
					}
				}
			},
			token:{
				get(){
					return this.$store.state.config.debug.token;
				},
				set(v){
					this.$store.commit("config/setToken",v);
				}
			},
			autoload:{
				get(){
					return this.$store.state.config.autoLoad;
				},
				set(v){
					if(v===true){
						this.$store.commit("config/openAutoLoad");
					}else{
						this.$store.commit("config/closeAutoLoad");
					}
				}
			}
		},
		created(){
			this.debugToken=this.$util.cookie.get("debugToken");
			console.log('debug='+this.debug);
		},
		methods:{
			autologin:function(){
				if(this.$util.common.isNotEmpty(this.token)){
					this.loginLoading=true;
					this.$util.lstore.set("token",this.token);
					userinfoApi().then(res=>{//获取用户
						if(res.code==0){
							let user=res.data;
							if(user.authFlag==true){
								this.$store.dispatch('login/saveLoginInfo',user);
								setTimeout(()=>{
									this.$router.push('/job-manager');
								},3000);
								this.loginstatus='已登陆';
								this.loginuser=user.fullname;
							}else{
								this.$message.error("用户未实名制");
							}
						}else{
							this.$message.error(res.msg);
						}
					});
				}
			}
		}
	}
</script>

<style lang="less">
	.el-main{
		.el-row{
			margin-top: 1em;
		}
	}
</style>
