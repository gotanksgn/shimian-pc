<template>
	<div class="jobappoint">
		<el-form :model="appointForm" ref="appointForm" label-width="10vw" 
			:label-position="'left'" class="form-appoint" :rules="rules">
			<el-form-item label="预约面试时间" prop="appointTime" required >
				<div class="block">
					<el-date-picker v-model="appointForm.appointTime"
						type="datetime" placeholder="选择面试时间" align="right" @change="setNotice">
					</el-date-picker>
				</div>
			</el-form-item>
			<h3>通知面试官</h3>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="面试官" prop="hrName" required>
						<el-input v-model="appointForm.hrName" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="面试官电话" prop="hrPhone" required>
						<el-input v-model="appointForm.hrPhone" readonly></el-input>
					</el-form-item>
				</el-col>	
			</el-row>
			<el-form-item label="通知内容" prop="hrNotice" required>
				<el-input v-model="appointForm.hrNotice" type="textarea" :rows="2"></el-input>
			</el-form-item>
			<h3>通知候选人</h3>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="候选人" prop="userName" required>
						<el-input v-model="appointForm.userName" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="候选人电话" prop="userPhone" required>
						<el-input v-model="appointForm.userPhone" readonly></el-input>
					</el-form-item>
				</el-col>	
			</el-row>
			<el-form-item label="通知内容" prop="userNotice" required>
				<el-input v-model="appointForm.userNotice" type="textarea" :rows="2"></el-input>
			</el-form-item>
			<el-form-item class="form-appoint-btns">
				<el-button-group>
					<el-button type="primary" @click="appoint()">立即预约</el-button>
				</el-button-group>			
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {createInvitationApi} from '@/api/interviewFun.js'
	import {mapActions} from 'vuex'
	export default {
		name:'jobAppoint', 
		data() {
			return {
				appointForm: {
					appointTime: '',
					hrName:'',
					hrPhone:'',
					hrNotice:'',
					userName:'',
					userPhone:'',
					userNotice:''
				},
				sender:{},
				rules: {
					appointTime: [
						{required: true,message: '请选择预约时间', trigger: 'blur', type: 'date'}
					],
					hrName: [
						{ required: true, message: '请填写面试官姓名', trigger: 'blur' }
					],
					hrPhone: [
						{ required: true, message: '请填写面试官电话', trigger: 'blur' }
					],
					hrNotice: [
						{ required: true, message: '通知内容不能为空', trigger: 'blur' }
					],
					userName: [
						{ required: true, message: '请填写候选人姓名', trigger: 'blur' }
					],
					userPhone: [
						{ required: true, message: '请填写候选人电话', trigger: 'blur' }
					],
					userNotice: [
						{ required: true, message: '通知内容不能为空', trigger: 'blur' }
					]
				}
			}
		},
		props: {
			close: {
				type: Function,
				default: null
			}
		},
		computed:{
			
		},
		methods:{
			...mapActions('job',['getJobList']),
			appoint(){
				this.$refs.appointForm.validate((valid) => {
					if (valid) {
						createInvitationApi({
							source: 'EN',
							studentInfoId:this.sender.info.id,
							studentResumeId: this.sender.resume.id,
							enterprisePositionId: this.sender.position.id,
							enterpriseStaffId: this.sender.staff.id,
							senderId:this.sender.id,
							appointmentTime:this.$util.date.format(this.appointForm.appointTime),
							remark:this.appointForm.userNotice
						}).then(()=>{
							this.$message({
								message: '预约成功,可前往面试间查看面试进度',
								type: 'success',
								center:true
							})
							this.close();
							this.getJobList();
						});
					} else {
						return false;
					}
				});
			},
			edit(item){
				this.sender=item.sender;
				this.appointForm.hrName=this.sender.staff.fullname;
				this.appointForm.hrPhone=this.sender.staff.phone;
				this.appointForm.userName=this.sender.info.fullname;
				this.appointForm.userPhone=this.sender.info.phone;
			},
			setNotice(){
				if(this.appointForm.appointTime==undefined || this.appointForm.appointTime==null){
					return;
				}else{
					let dateStr = this.$util.date.format(this.appointForm.appointTime,"yyyy/MM/dd hh:mm");
					this.appointForm.hrNotice="您的同事为您创建了["+this.sender.position.position+"]职位的面试安排，请于["+dateStr+"]前登陆http://www.shimianpower.com或通过视面APP对候选人进行视频面试。"
					this.appointForm.userNotice="仔细看过您的简历，觉得您比较适合我们公司["+this.sender.position.position+"]岗位，通知您["+dateStr+"]前登陆视面APP进行线上面试。";
				}
			}
		}
	}
	
</script>

<style lang="less">
	.jobappoint{
		.form-appoint{
			.form-appoint-btns{
				text-align: right;
			}
		}
	}
</style>
