<template>
	<el-container>
		<el-header>
			<page-head></page-head>
		</el-header>
		<el-main>
			<div class="login-wrap">
				<el-row>
					<el-col :span="16">
						<!-- <el-image fit="contain" :src="require('@/assets/img/login/login_bg.png')"></el-image> -->
						<img src="@/assets/img/login/login_bg.png" alt="background"/>
					</el-col>
					<el-col :span="8">
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
			</div>					
		</el-main>
		<el-footer>
			<page-footer></page-footer>
		</el-footer>
	</el-container>
</template>

<script>
	import pageHead from '../components/pageHead.vue'
	import pageFooter from '../components/pageFooter.vue'
	import { mapState } from 'vuex'
	//let loading;
	export default {
		data() {
			let validatePhone = (rule, value, callback) => {
				const reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;
				if(!reg.test(value)){
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
				loginLoading:false
			}
		},
		computed:{
			...mapState('login', ['user','menuList'])
			
		},
		methods: {
			sendcode(){
				this.$refs.loginForm.validateField('phone',valid=>{
					if(valid==''){
						this.$message({
							message: '发送成功',
							type: 'success',
							center:true
						});
						this.time = 60;
						this.disabled = true;
						this.timer();
					}
				});
			},
			gotoMain(){
				this.$router.push('/job-manager');
			},
			login(){
				this.$refs.loginForm.validate((valid)=>{
					if(valid){
						let _this=this;
						this.loginLoading=true;
						setTimeout(()=>{
							_this.$router.push('/job-manager');
						}, 1500);
					}else{
						return false;
					}
				});
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
			pageHead,
			pageFooter
		},
		// 创建完毕状态(里面是操作)
		created() {
		
		}
	}

</script>

<style scoped lang="less">
	.login-wrap {
		box-sizing: border-box;
		img{
			margin: 12vh 0vw 0vh 0vw;
			width: 105%;
		}
		.login-container {
			border-radius: 2vh;
			margin: 8vh 0vw 0vh 3vw;
			width:25vw;
			min-height: 48vh;
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
/* 				.el-input {
					width: 55%;
					float: left;
					display: inline-block;
	
				}
				.el-button {
					width: 45%;
					float: left;
					display: inline-block;
				} */
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
</style>
