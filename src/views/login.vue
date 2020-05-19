<template>
	<el-container class="login">	
		<el-main class="login-wrap">
			<el-row>
				<el-col :span="8" :offset="14">
					<el-form label-position="left" :model="loginForm" :rules="rules" ref="loginForm"  class="login-container">
						<h3 class="login-container-title">登陆即可开启视频面试</h3>
						<template v-if="loginCache && loginCache==true">
							<el-form-item class="login-container-welcome">
								欢迎您回来,<span class="login-container-welcome-user">{{user.fullname}}</span>
							</el-form-item>
							<el-form-item class="login-container-submit">
								<el-button type="primary"  @click="enterHomePage()" :loading="loginLoading">进入视面</el-button>
							</el-form-item>
						</template>	
						<template v-else>
							<el-form-item prop="phone">
								<el-input type="text" v-model="loginForm.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
							</el-form-item>
							<el-form-item prop="sendcode" class="login-container-code">
								<el-input v-model="loginForm.sendcode" placeholder="请输入验证码" @keyup.enter.native="smsCodeLogin()">
									<el-button slot="append" @click="sendcode" :disabled="disabled">{{btntxt}}</el-button>
								</el-input>
							</el-form-item>
							<el-form-item class="login-container-submit">
								<el-button type="primary"  @click="smsCodeLogin()" :loading="loginLoading">登录</el-button>
							</el-form-item>
						</template>
						<el-form-item class="login-container-ysxy">
							<el-link type="info">《视面用户协议》</el-link>
							<el-link type="info">《隐私协议》</el-link>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-main>
		<el-footer>
			<page-footer></page-footer>
		</el-footer>	
	</el-container>	
</template>

<script>
	import pageFooter from '@/components/pageFooter.vue'
	import {mapState,mapActions} from 'vuex'
	import {smscodeApi,tokenApi,userinfoApi} from '@/api/loginFun.js'
	export default {
		data() {
			let validatePhone = (rule, value, callback) => {
				if(!this.$util.regexp.isMobilePhone(value)){
					callback(new Error('请输入正确的手机号'));	
				}else{
					callback();
				}
			};
			return {
				loginForm: {
					phone: '',
					sendcode: ''
				},
				disabled: false,
				time: 0,
				btntxt: "获取验证码",
				rules: {
					phone: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ validator:validatePhone,trigger:'blur'}
					],
					sendcode: [
						{ required: true, message: '请输入验证码', trigger: 'blur' }
					]
				},
				loginLoading:false,
				loginCache:false
			}
		},
		computed:{
			...mapState('login',['user'])
		},
		methods: {
			...mapActions('login',['saveLoginInfo']),
			sendcode(){
				this.time = 60;
				this.disabled = true;
				this.timer();
				this.$refs.loginForm.validateField('phone',valid=>{
					if(valid==''){
						smscodeApi(this.loginForm.phone).then(res=>{
							if(res.code==0){
								this.$message({
									message: '发送成功',
									type: 'success',
									center:true
								});
							}else{
								this.$message.error('发送失败');
							}
						});

					}
				});
			},
			smsCodeLogin(){
				this.$refs.loginForm.validate((valid)=>{
					if(valid){
						this.loginLoading=true;
						tokenApi(this.loginForm.phone,this.loginForm.sendcode).then(res=>{
							this.tokenCheck(res.data).then(()=>{
								this.enterHomePage();
							}).catch(error=>{
								this.loginLoading=false;
								this.$message.error(error);
							});
						}).catch(()=>{
							this.loginLoading=false;
							this.$message.error("登陆失败");
						});
					}else{
						return false;
					}
				});
			},
			tokenLogin(){
				let token=this.$util.lstore.get('token');
				if(token){
					this.tokenCheck(token).then(()=>{
						this.loginCache = true;
					}).catch(error=>{
						//异常清理了token重新验证码登陆
						console.log('[login]:'+error);
						this.clearLoginCache();
					});
				}else{
					//token无效处理方法
					this.clearLoginCache();
				}
			},
			tokenCheck(token){
				return new Promise((resolve, reject) => {
					this.$util.lstore.set('token',token);
					userinfoApi().then(res=>{
						if(res.code==0){
							let user=res.data;
							if(user.authFlag==true){
								this.saveLoginInfo(res.data);
								resolve(res.data);
							}else{
								reject("您的账号还未实名认证,请前往APP认证后再登陆");
							}
						}else{
							reject(res.msg);
						}
					}).catch(error=>{
						reject(error);
					});
				});
			},
			enterHomePage(){
				setTimeout(()=>{
					this.$router.push(decodeURIComponent(this.$route.query.redirect || '/job-manager'));
				},1000);
			},
			clearLoginCache(){
				this.$util.lstore.del('token');
				this.$util.lstore.del('user');
				this.loginCache = false;
			},
			//60S倒计时
			timer() {
				if (this.time > 0) {
					this.time--;
					this.btntxt = this.time + "s后重新获取";
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.btntxt = "获取验证码";
					this.disabled = false;
				}
			}
		},
		// 注册组件
		components: {
			pageFooter
		},
		// 创建完毕状态(里面是操作)
		created() {
			if(this.$util.common.getExplore()!='Chrome'){
				this.$message({
					message: '浏览器版本过低，页面可能无法正常显示或部分功能无法正常使用，请更换Chrome浏览器',
					type: 'error',
					duration:0
				});
			}
			this.tokenLogin();
		}
	}

</script>

<style lang="less">
	.login{
		height: 120vh;
		background-color: black !important;
		//background: url(~@/assets/img/login/login_bg1.png) #333 no-repeat top center / 90vw auto;
		background: url(~@/assets/img/login/login_bg2.png) #333 no-repeat top center / 90vw auto;
		.login-wrap {
			box-sizing: border-box;
			.login-container {
				min-width: 20rem;
				border-radius: 1rem;
				margin: 10vh 8vw;
				padding: 1rem 2rem;
				background: #fff;
				border: 0.1em solid #eaeaea;
				text-align: left;
				box-shadow: 0 0 2em 0.1em rgba(0, 0, 0, 0.1);
				color: #606266;
				.login-container-title {
					margin: 2rem 0rem;
					text-align: left;
					color: #303133;
				}
				.login-container-welcome{
					.el-form-item__content{
						font-size: 1rem;
						.login-container-welcome-user{
							color: #303133;
						}
					}

				}
				.login-container-submit{
					.el-button {
						width:100%;
					}
				}
				.login-container-ysxy{
					width: 100%;
					text-align: right;
					.el-link{
						font-size: 0.75em;
					} 
				}
			}
		}
		.footer{
			background-color: black;
		}
	}
	
</style>
