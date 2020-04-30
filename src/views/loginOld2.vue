<template>
	<el-container class="login">	
		<el-main class="login-wrap">
			<el-row>
				<el-col :span="8" :offset="14">
					<el-form label-position="left" :model="loginForm" :rules="rules" ref="loginForm"  class="login-container">
						<h3 class="login-container-title">登陆即可开启视频面试</h3>
						<el-form-item prop="phone">
							<el-input type="text" v-model="loginForm.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
						</el-form-item>
						<el-form-item prop="sendcode" class="login-container-code">
							<el-input v-model="loginForm.sendcode" placeholder="请输入验证码">
								<el-button slot="append" @click="sendcode" :disabled="disabled">{{btntxt}}</el-button>
							</el-input>
						</el-form-item>
						<el-form-item class="login-container-submit">
							<el-button type="primary"  @click="login()" :loading="loginLoading">登录</el-button>
						</el-form-item>
						<el-form-item class="login-container-ysxy">
							<el-link type="info">《视面用户协议》</el-link>
							<el-link type="info">《隐私协议》</el-link>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-main>
		<el-footer>
			<el-row class="footer-content">
					<el-col :span="4" :offset="1" class="footer-content-download">
						<img src="@/assets/img/JRZf.png" alt="duomian"/>
					</el-col>
			</el-row>
			<el-row class="footer-copyright">
				<el-col :span="12">{{footData.company}}</el-col>
				<el-col :span="6">{{footData.icp}}</el-col>
				<el-col :span="6">{{footData.copyright}}</el-col>
			</el-row>
		</el-footer>	
	</el-container>	
</template>

<script>
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
				footData:{
					company:"北京龙马中外企业家服务有限公司",
					icp:"京ICP备17053558号-2",
					copyright:"Copyright ©2019-2022"	
				}
			}
		},
		computed:{
			...mapState('login', ['user','menuList'])
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
			login(){
				this.$refs.loginForm.validate((valid)=>{
					if(valid){
						this.loginLoading=true;
						tokenApi(this.loginForm.phone,this.loginForm.sendcode).then(res=>{
							this.loginTo(res);
						}).catch(()=>{
							this.$message.error("登陆失败");
						});
					}else{
						return false;
					}
				});
			},
			loginTo(res){
				if(res.code==0){
					//token赋值
					this.$util.lstore.set('token',res.data);
					userinfoApi().then(res=>{//获取用户
						if(res.code==0){
							let user=res.data;
							if(user.authFlag==true){
								this.saveLoginInfo(res.data);
								setTimeout(()=>{
									this.$router.push('/job-manager');
								},1000);
							}else{
								setTimeout(()=>{
									this.$message.error("您的账号还未实名认证,请前往APP认证后再登陆");
									this.loginLoading=false;
								},1000);
							}
						}else{
							this.$message.error(res.msg);
							setTimeout(()=>{
								this.loginLoading=false;
							},1000);
						}
					});
				}else{
					this.$message.error(res.msg);
					setTimeout(()=>{
						this.loginLoading=false;
					},1000);
				}
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
		},
		// 创建完毕状态(里面是操作)
		created() {
		
		}
	}

</script>

<style lang="less">
	.login{
		width: 100vw;
		height:100vh;
		background-color: #01081b !important;
		@media screen and (max-width: 960px){
			background: url(~@/assets/img/login/login_bg1.png) #333 no-repeat top left / 864px 486px;
		}
		@media screen and (min-width: 960px) and (max-width: 1440px) {
			/* background: url(~@/assets/img/login/login_bg1.png) #333 no-repeat top left / 1366px 622px; */
			background: url(~@/assets/img/login/login_bg1.png) #333 no-repeat top center / 1105px 622px;
		}
		@media screen and (min-width:1440px) {
			background: url(~@/assets/img/login/login_bg1.png) #333 no-repeat top center / 1728px 936px;
		}
		.login-wrap {
				box-sizing: border-box;
				.login-container {
					border-radius: 2vh;
					margin: 5rem 0rem 0rem 8rem;
					@media screen and (max-width: 960px){
						width:150px;
					}
					@media screen and (min-width: 960px) and (max-width: 1440px) {
						width:300px;
					}
					@media screen and (min-width:1440px) {
						width:400px;
					}
					padding: 3vh 2vw 0vh 2vw;
					background: #fff;
					border: 0.1em solid #eaeaea;
					text-align: left;
					box-shadow: 0 0 2em 0.1em rgba(0, 0, 0, 0.1);
					.login-container-title {
						margin: 7vh auto 7vh auto;
						text-align: left;
						color: #505458;
					}
					.login-container-code{

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
		.el-footer{
			.footer-content{
				.footer-content-download{
					img{
						width: 5rem;
					}
				}
			}
			.footer-copyright{
				position: absolute;
				bottom: 0rem;
				right: 4rem;
				width: 40rem;
				color: #AAAAAA;
				font-size: 0.5rem;
				margin-top: 0vh;
				text-align: right;
			}
		}	
		
	}
	
</style>
