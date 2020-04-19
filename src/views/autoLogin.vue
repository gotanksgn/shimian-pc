<template>
	<div class="el-main">
		<el-row type="flex">
			<el-col :span="6" :offset="1">
				<el-switch v-model="debug" active-text="DEBUG模式" inactive-text="非DEBUG模式" @change="debugFun(debug)"></el-switch>
			</el-col>
		</el-row>
		<el-row type="flex">
			<el-col :span="2" :offset="1">token:</el-col>
			<el-col :span="20"><el-input v-model="selfToken"></el-input></el-col>
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
				selfToken:'',
				loginLoading:false,
				debug:window.localStorage.getItem("shimian_debug")!=null?window.localStorage.getItem("shimian_debug"):false
			} 
		},
		created(){
			this.selfToken=this.$util.lstore.get("token");
		},
		methods:{
			autologin:function(){
				if(this.selfToken!=null && this.selfToken!=''){
					this.loginLoading=true;
					this.$util.lstore.set("token",this.selfToken);
					this.$util.sstore.set("token",this.selfToken);
					userinfoApi().then(res=>{//获取用户
						if(res.code==0){
							let user=res.data;
							if(user.authFlag==true){
								this.$store.dispatch('login/saveLoginInfo',res.data);
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
			},
			debugFun(mode){
				this.debug=mode;
				window.localStorage.setItem("debug_mode",mode);
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
