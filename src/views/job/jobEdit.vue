<template>
	<div>
	<el-form :model="jobForm" :rules="rules" ref="jobForm" label-width="8vw" class="form-job">
		<el-form-item label="职位名称" prop="position" required>
			<el-input v-model="jobForm.position"></el-input>
		</el-form-item>
		<el-form-item label="职位类别" prop="positionType" required>
			<el-cascader v-model="jobForm.positionType" placeholder="请选择职位类别" :options="jobTypeOpts" :props="{expandTrigger:'hover'}"></el-cascader>
		</el-form-item>
		<el-form-item label="工作性质" prop="jobProps" required>
			<el-radio-group v-model="jobForm.jobProps">
				<el-radio-button v-for="(item, idx) in jobPropsOpts" :key="idx" :label="item" :value="item"></el-radio-button>
			</el-radio-group>
		</el-form-item>
		<el-row>
			<el-col :span="8">
				<el-form-item label="工作地址" prop="city" required>
					<el-select v-model="jobForm.city">
						<el-option-group v-for="group in jobCityOpts" :key="group.label" :label="group.label">
							<el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-option-group>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="16">
				<el-form-item label="详细地址" prop="address" required>
					<el-input v-model="jobForm.address"></el-input>
				</el-form-item>
			</el-col>	
		</el-row>
		<el-row>
			<el-col :span="8">
				<el-form-item label="经验要求" prop="workExp" required>
					<el-select v-model="jobForm.workExp" placeholder="请选择经验要求">
						<el-option v-for="(item, idx) in jobExpOpts" :key="idx" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
			</el-col>			
			<el-col :span="8">
				<el-form-item label="最低学历" prop="degree" required>
					<el-select v-model="jobForm.degree" placeholder="请选择学历">
						<el-option v-for="(item, idx) in jobDegreeOpts" :key="idx" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="月薪范围" prop="salary" required>
					<el-select v-model="jobForm.salary" placeholder="请选择月薪范围">
						<el-option v-for="(item, idx) in jobSalesOpts" :key="idx" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-form-item label="职位描述" prop="positionDesc" required>
			<el-input type="textarea" placeholder="请输入300字内的职位描述"
				v-model="jobForm.positionDesc" maxlength="300" show-word-limit></el-input>
		</el-form-item>
		<el-form-item label="职位问题" prop="question">
			<el-input placeholder="请输入20字内的职位问题" v-model="jobForm.question" maxlength="20" show-word-limit></el-input>
		</el-form-item>	
		<el-form-item class="form-job-btns">
			<el-button-group>
				<el-button type="primary" @click="submitForm()">职位保存</el-button>
				<!-- <el-button type="success" @click="publishForm('jobForm')">职位发布</el-button> -->
			</el-button-group>			
		</el-form-item>
	</el-form>
	</div>
</template>

<script>
	export default {
		name:'jobEdit', 
		data() {
			return {
				jobTypeOpts:require('@/data/work-function-data.js'),
				jobPropsOpts:require('@/data/work-type-data.js'),
				jobCityOpts:require('@/data/city-data.js'),
				jobExpOpts:require('@/data/work-exp-data.js'),
				jobDegreeOpts:require('@/data/degree-data.js'),
				jobSalesOpts:require('@/data/work-salary-data.js'),
				rules: {
					position: [
						{ required: true, message: '请输入职位名称', trigger: 'blur' },
						{ min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
					],
					positionType: [
						{ required: true, message: '请选择职位类别', trigger: 'change' }
					],
					jobProps: [
						{ required: true, message: '请选择工作性质', trigger: 'change' }
					],
					city: [
						{ required: true, message: '请选择工作地址', trigger: 'change' }
					],
					address: [
						{ required: true, message: '请填写详细地址', trigger: 'blur' }
					],
					workExp: [
						{ required: true, message: '请选择经验要求', trigger: 'change' }
					],
					degree: [
						{ required: true, message: '请选择学历', trigger: 'change' }
					],
					salary: [
						{ required: true, message: '请选择月薪范围', trigger: 'change' }
					],
					positionDesc: [
						{ required: true, message: '请填写职位描述', trigger: 'blur' },
						{ max: 600, message: '职位描述不能超过300字', trigger: 'blur' }
					],
					question:[
						{ max: 60, message: '职位描述不能超过30字', trigger: 'blur' }
					]
				},
				jobForm:{
					position: '',
					positionType: '',
					jobProps: '全职',
					city:'',
					address:'',
					workExp:'',
					degree:'',
					salary:'',
					positionDesc:'',
					question:''
				}
			};
		},
		computed:{

		},
		created(){
			
		},
		methods: {
			submitForm() {
				this.$refs.jobForm.validate((valid) => {
					if (valid) {
						this.$store.dispatch('job/savePosition',this.jobForm).then(()=>{
							this.$message({
								message: '职位保存成功',
								type: 'success',
								center:true
							});
							this.handleClose();
						}).catch(error=>{
							this.$message.error('职位保存失败：'+error.msg);
						});
					} else {
						return false;
					}
				});
			},
			publishForm() {
				this.$refs.jobForm.validate((valid) => {
					if (valid) {
						this.$message({
							message: '职位发布成功',
							type: 'success',
							center:true
						});
					} else {
						return false;
					}
				});
			},
			editForm(item){
				item.jobProps="全职";
				Object.assign(this.jobForm,item);
			}, 
			handleClose() {
				this.$emit('handleClose');
			}
		}
	}
</script>

<style lang="less">
	.form-job{
		.form-job-btns{
			text-align: right;
		}
	}
</style>
