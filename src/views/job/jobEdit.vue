<template>
	<el-form :model="jobForm" :rules="rules" ref="jobForm" label-width="100px" class="form-job">
		<el-form-item label="职位名称" prop="jobName" required>
			<el-input v-model="jobForm.jobName"></el-input>
		</el-form-item>
		<el-form-item label="职位类别" prop="jobType" required>
			<el-select v-model="jobForm.jobType" placeholder="请选择职位类别">
				<el-option label="技术" value="tech"></el-option>
				<el-option label="销售" value="sales"></el-option>
				<el-option label="文秘" value="civil"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="工作性质" prop="jobProps" required>
			<el-radio-group v-model="jobForm.jobProps">
				<el-radio-button label="全职"></el-radio-button>
				<el-radio-button label="兼职"></el-radio-button>
				<el-radio-button label="实习"></el-radio-button>
				<el-radio-button label="校园"></el-radio-button>
			</el-radio-group>
		</el-form-item>
		<el-row>
			<el-col :span="8">
				<el-form-item label="工作地址" prop="jobCity" required>
					<el-select v-model="jobForm.jobCity">
						<el-option v-for="(item, idx) in jobCityOpts" :key="idx" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="16">
				<el-form-item label="详细地址" prop="jobAddress" required>
					<el-input v-model="jobForm.jobAddress"></el-input>
				</el-form-item>
			</el-col>	
		</el-row>
		<el-row>
			<el-col :span="8">
				<el-form-item label="经验要求" prop="jobExp" required>
					<el-select v-model="jobForm.jobExp" placeholder="请选择经验要求">
						<el-option v-for="(item, idx) in jobExpOpts" :key="idx" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
			</el-col>			
			<el-col :span="8">
				<el-form-item label="最低学历" prop="jobDegree" required>
					<el-select v-model="jobForm.jobDegree" placeholder="请选择学历">
						<el-option v-for="(item, idx) in jobDegreeOpts" :key="idx" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="月薪范围" prop="jobSales" required>
					<el-select v-model="jobForm.jobSales" placeholder="请选择月薪范围">
						<el-option v-for="(item, idx) in jobSalesOpts" :key="idx" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-form-item label="职位描述" prop="jobDesc" required>
			<el-input type="textarea" placeholder="请输入300字内的职位描述"
				v-model="jobForm.jobDesc" maxlength="300" show-word-limit></el-input>
		</el-form-item>	
		<el-form-item class="form-job-btns">
			<el-button-group>
				<el-button type="primary">职位预览</el-button>
				<el-button type="primary" @click="submitForm('jobForm')">立即创建</el-button>
			</el-button-group>			
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name:'jobEdit', 
		data() {
			return {
				jobForm: {
					jobName: '',
					jobType: '',
					jobProps: '全职',
					jobCity: '',
					jobAddress: '',
					jobExp:'',
					jobDegree:'',
					jobSales:'',
					jobDesc:''
				},
				jobCityOpts:['北京','上海','苏州','杭州','天津','广州'],
				jobExpOpts:['应届生','1年以内','1-3年','3-5年','5-10年','10年以上'],
				jobDegreeOpts:['初中及以下','高中','中技','中专','大专','本科','硕士','MBA|EMBA','博士','博士后'],
				jobSalesOpts:['3K-5K','5K-8K','8K-10K','10K-15K','15K-20K'],
				rules: {
					jobName: [
						{ required: true, message: '请输入职位名称', trigger: 'blur' },
						{ min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
					],
					jobType: [
						{ required: true, message: '请选择职位类别', trigger: 'change' }
					],
					jobProps: [
						{ required: true, message: '请选择工作性质', trigger: 'change' }
					],
					jobCity: [
						{ required: true, message: '请选择工作地址', trigger: 'change' }
					],
					jobAddress: [
						{ required: true, message: '请填写详细地址', trigger: 'blur' }
					],
					jobExp: [
						{ required: true, message: '请选择经验要求', trigger: 'change' }
					],
					jobDegree: [
						{ required: true, message: '请选择学历', trigger: 'change' }
					],
					jobSales: [
						{ required: true, message: '请选择月薪范围', trigger: 'change' }
					],
					jobDesc: [
						{ required: true, message: '请填写职位描述', trigger: 'blur' },
						{ max: 600, message: '职位描述不能超过300字', trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm() {
				this.$refs.jobForm.resetFields();
			},
			editForm(name){
				this.jobForm.jobName=name;
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
