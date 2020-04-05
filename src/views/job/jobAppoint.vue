<template>
	<div class="jobappoint">
		<el-form :model="appointForm" ref="appointForm" label-width="10vw" 
			:label-position="'left'" class="form-appoint" :rules="rules">
			<el-form-item label="预约面试时间" prop="appointTime" required >
				<div class="block">
					<el-date-picker
						v-model="appointForm.appointTime"
						type="datetime"
						placeholder="选择面试时间"
						align="right"
						:picker-options="appointPickerOpts">
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
				<el-input v-model="appointForm.hrNotice" type="textarea" :rows="3">
				</el-input>
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
				<el-input v-model="appointForm.userNotice" type="textarea" :rows="3">
				</el-input>
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
	var todayStart = new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime();
	export default {
		name:'jobAppoint', 
		data() {
			return {
				appointForm: {
					appointTime: '',
					hrName:'刘先生',
					hrPhone:'18801088888',
					hrNotice:'您的同事为您创建了[job]职位的面试安排，请于[time]登陆http://www.shimianpower.com或通过视面APP对候选人进行视频面试。',
					userName:'李女士',
					userPhone:'13588888888',
					userNotice:'仔细看过您的简历，觉得您比较适合我们公司[job]岗位，通知您[time]前登陆视面APP进行线上面试。'
				},
				appointPickerOpts:{
					shortcuts: [{
						text: '今天下午2点',
						onClick(picker) {
							const date = new Date();
							date.setTime(todayStart + 3600*1000*14);
							picker.$emit('pick', date);
						}
					}, {
						text: '明天上午9点',
						onClick(picker) {
							const date = new Date();
							date.setTime(todayStart + 3600*1000*(24+9));
							picker.$emit('pick', date);
						}
					}, {
						text: '明天下午2点',
						onClick(picker) {
							const date = new Date();
							date.setTime(todayStart + 3600*1000*(24+14));
							picker.$emit('pick', date);
						}
					}]
				},
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
		methods:{
			appoint(){
				let _this = this;
				this.$refs.appointForm.validate((valid) => {
					if (valid) {
						this.$alert('预约成功', '', {
							confirmButtonText: '确定',
							callback(){
								_this.close();
							},
						});
					} else {
						return false;
					}
				});
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
