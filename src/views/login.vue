<template>
	<el-container>
		<el-header>
			<page-head></page-head>
		</el-header>
		<el-main>
			<div class="login-wrap">
				<el-row>
					<el-col :span="16">
						<!-- <el-image fit="contain" :src="require('@/assets/login/login_bg.png')"></el-image> -->
						<img src="@/assets/login/login_bg.png" alt="background"/>
					</el-col>
					<el-col :span="8">
						<el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="login-container">
							<h3 class="title">登陆即可开启视频面试</h3>
							<el-form-item prop="phone">
								<el-input type="text" v-model="ruleForm.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
							</el-form-item>
							<el-form-item prop="验证码" class="code">
								<el-input v-model="ruleForm.sendcode" placeholder="请输入验证码"></el-input>
								<el-button type="button" @click="sendcode" :disabled="disabled" v-if="disabled==false">发送验证码
								</el-button>
								<el-button type="button" @click="sendcode" :disabled="disabled" v-if="disabled==true">{{btntxt}}
								</el-button>
							</el-form-item>
							<el-form-item style="width:100%;">
								<el-button type="primary" style="width:100%;" @click="login()">登录</el-button>
							</el-form-item>
							<el-form-item class="ysxy">
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
	let loading;
	export default {
		data() {
			return {
				ruleForm: {
					phone: '',
					sendcode: ''
				},
				disabled: false,
				time: 0,
				btntxt: "重新发送",
				rules: {
					phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
					sendcode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
				}
			}
		},
		computed:{
			...mapState('login', ['user','menuList']),
		},
		methods: {
			sendcode(){
				const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
				if (this.ruleForm.phone == '') {
					this.$message({
						message:'手机号不能为空',
						center: true
					})
					return
				}
				if (!reg.test(this.ruleForm.phone)) {
					this.$message({
						message:'请输入正确的手机号',
						center:true
					})
					return
				} else {
					console.log(this.ruleForm.phone);
					this.$message({
						message: '发送成功',
						type: 'success',
						center:true
					});
					this.time = 60;
					this.disabled = true;
					this.timer();
				}
			},
			gotoMain(){
				this.$router.push('/job-manager');
			},
			login(){
				if (this.ruleForm.phone == '') {
					this.$message({
						message:'手机号不能为空',
						center: true
					})
					return
				}else if(this.ruleForm.sendcode == ''){
					this.$message({
						message:'验证码不能为空',
						center: true
					})
					return
				}
				let _this=this;
				loading=_this.$loading();
				setTimeout(()=>{
					_this.$router.push('/job-manager');
					loading.close();
				}, 1500);
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
/* 		.el-image{
			margin-top: 40px;
		} */
		img{
			margin-top: 40px;
			width: 100%;
		}
		.login-container {
			border-radius: 10px;
			margin: 10px auto;
			width: 350px;
			height: 400px;
			padding: 30px 35px 15px 35px;
			background: #fff;
			border: 1px solid #eaeaea;
			text-align: left;
			box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
			.title {
				margin: 50px auto 40px auto;
				text-align: left;
				color: #505458;
			}
			.code{
				.el-input {
					width: 55%;
					border-radius: 0px;
					float: left;
					display: inline-block;
				}
				.el-button {
					width: 45%;
					border-top-left-radius: 0px;
					border-bottom-left-radius: 0px;
					border-left: 0px;
					float: left;
					display: inline-block;
				}
			}
			.ysxy{
				width: 100%;
				text-align: right;
				.el-link{
					font-size: 12px;
				} 
			}
		}
	}
</style>
