<template>
	<div class="resumeInfo" v-if="resume.info">
		<!-- <el-divider content-position="left">基本信息</el-divider> -->
		<el-row type="flex" justify="space-around">
			<el-col :span="5" >
				<el-avatar shape="square" :size="100" :src="resume.info.profilePicture" @error="errorHeadImgHandler">
					<img src="@/assets/img/job/headimg/head_999.png"/>
				</el-avatar>
			</el-col>
			<el-col :span="9">
				<div class="info-base-col">姓名:{{resume.info.fullname}}</div>
				<div class="info-base-col">年龄:{{resume.info.age}}</div>
			</el-col>
			<el-col :span="9">
				<div class="info-base-col">电话:{{resume.info.phone}}</div>
				<div class="info-base-col">邮箱:{{resume.info.email}}</div>
			</el-col>	
		</el-row>
		<el-divider content-position="left">求职意向</el-divider>
		<el-row type="flex">
			<el-col :span="3"  :offset="1">
				期望薪资:
			</el-col>
			<el-col :span="8">
				{{resume.target.salary}}
			</el-col>
			<el-col :span="2"  :offset="1">
				地点:
			</el-col>
			<el-col :span="4">
				{{resume.target.city}}
				
			</el-col>
		</el-row>	
		<el-row type="flex">
			<el-col :span="3" :offset="1">
				行业:
			</el-col>
			<el-col :span="8">
				{{resume.target.trade}}
			</el-col>
			<el-col :span="2" :offset="1">
				职位:
			</el-col>
			<el-col :span="4">
				{{resume.target.positionType}}
			</el-col>
		</el-row>
		<el-divider content-position="left">教育经历</el-divider>
		<el-row type="flex" v-for="(edu) in resume.edus" :key="edu.id">
			<el-col :span="5" :offset="1" class="info-label-col">
				{{getDateStr(edu.date)}}
			</el-col>
			<el-col :span="5" >
				{{edu.degree}}
			</el-col>
			<el-col :span="5" >
				{{edu.college}}
			</el-col>
			<el-col :span="5" >
				{{edu.major}}
			</el-col>
		</el-row>
		<el-divider content-position="left">工作经历</el-divider>
		<div v-for="(work) in resume.works" :key="work.id">
			<el-row type="flex">
				<el-col :span="5" :offset="1" class="info-label-col">
					{{getDateStr(work.workTime)}}
				</el-col>
				<el-col :span="5" >
					{{work.company}}
				</el-col>
				<el-col :span="5" >
					{{work.positionType}}
				</el-col>
				<el-col :span="5" >
					{{work.trade}}
				</el-col>
			</el-row>
			<el-row type="flex">
				<el-col :span="3" :offset="1" class="info-label-col">
					工作职责:
				</el-col>
				<el-col :span="18" >
					{{work.duty}}
				</el-col>
			</el-row>	
		</div>
		<el-divider content-position="left">项目经验</el-divider>
		<div v-for="(proj) in resume.projs" :key="proj.id">
			<el-row type="flex">
				<el-col :span="5" :offset="1" class="info-label-col">
					{{getDateStr(proj.projTime)}}
				</el-col>
				<el-col :span="5" >
					{{proj.projName}}
				</el-col>
				<el-col :span="5" >
					{{proj.projRole}}
				</el-col>
			</el-row>
			<el-row type="flex">
				<el-col :span="3" :offset="1" class="info-label-col">
					项目描述:
				</el-col>
				<el-col :span="18" >
					{{proj.projDesc}}
				</el-col>
			</el-row>	
		</div>
		<el-divider content-position="left">证书技能</el-divider>
		<el-row type="flex" v-for="(cert) in resume.certs" :key="cert.id">
			<el-col :span="5" :offset="1">
				{{cert.certName}}
			</el-col>
			<el-col :span="5">
				{{cert.certDate}}
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name:'resumeInfo', 	
		data() {
			return {
				resume:{}
			}
		},
		methods: {
			view(item){
				console.log('item=>'+JSON.stringify(item));
				this.resume=item;
			},
			getDateStr(dateArray){
				return dateArray[0]+"~"+dateArray[1];
			},
			errorHeadImgHandler(){
				return true;
			}
		}
		
	}
</script>

<style lang="less">
	.resumeInfo{
		background-color: #ffffff;
		font-size: 0.85rem;
		color: #666666;
		.info-base-col{
			font-size: 1rem;
			margin-bottom: 2rem;
		}
		.info-label-col{
			color: #AAAAAA;
		}
		.el-divider{
			margin: 3rem 0rem 2rem 0rem;
		}
		.el-divider__text{
			font-size: 1.25rem;
			color: #333333;
			font-weight: bolder;
		}
		.el-row{
			margin:1rem 0em 1rem 0em;
		}
	}
</style>
