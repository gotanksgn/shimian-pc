<template>
	<div class="resumeInfo" v-if="info">
		<!-- <el-divider content-position="left">基本信息</el-divider> -->
		<el-row type="flex" justify="space-around">
			<el-col :span="5" >
				<el-avatar shape="square" :size="100" :src="info.profilePicture" @error="true">
					<img src="@/assets/img/job/headimg/head_999.png"/>
				</el-avatar>
			</el-col>
			<el-col :span="9">
				<div class="info-base-col">姓名:&nbsp;{{encrypted?encryptedFullName:info.fullname}}</div>
				<div class="info-base-col">年龄:&nbsp;{{info.age}}</div>
			</el-col>
			<el-col :span="9">
				<div class="info-base-col">电话:&nbsp;{{encrypted?encryptedPhone:info.phone}}</div>
				<div class="info-base-col">邮箱:&nbsp;{{encrypted?encryptedEmail:info.email}}</div>
			</el-col>	
		</el-row>
		<el-divider v-if="target" content-position="left">求职意向</el-divider>
		<template v-if="target">
			<el-row type="flex">
				<el-col :span="3"  :offset="1">
					期望薪资:
				</el-col>
				<el-col :span="8">
					{{target.salary}}
				</el-col>
				<el-col :span="2"  :offset="1">
					地点:
				</el-col>
				<el-col :span="4">
					{{target.city}}
					
				</el-col>
			</el-row>	
			<el-row type="flex">
				<el-col :span="3" :offset="1">
					行业:
				</el-col>
				<el-col :span="8">
					{{target.trade}}
				</el-col>
				<el-col :span="2" :offset="1">
					职位:
				</el-col>
				<el-col :span="4">
					{{target.positionType}}
				</el-col>
			</el-row>
		</template>
		<el-divider v-if="resume.edus&&resume.edus.length>0" content-position="left">教育经历</el-divider>
		<el-row type="flex" v-for="(edu) in resume.edus" :key="edu.id">
			<el-col :span="6" :offset="1" class="info-label-col">
				{{getDateStr(edu.date)}}
			</el-col>
			<el-col :span="4" >
				{{edu.degree}}
			</el-col>
			<el-col :span="6" >
				{{edu.college}}
			</el-col>
			<el-col :span="6" >
				{{edu.major}}
			</el-col>
		</el-row>
		<el-divider v-if="resume.works&&resume.works.length>0" content-position="left">工作经历</el-divider>
		<div v-for="(work) in resume.works" :key="work.id">
			<el-row type="flex">
				<el-col :span="5" :offset="1" class="info-label-col">
					{{getDateStr(work.workTime)}}
				</el-col>
				<el-col :span="18">
					{{work.company}}&nbsp;|&nbsp;{{work.positionType}}&nbsp;|&nbsp;{{work.trade}}
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
		<el-divider v-if="resume.projs&&resume.projs.length>0" content-position="left">项目经验</el-divider>
		<div v-for="(proj) in resume.projs" :key="proj.id">
			<el-row type="flex">
				<el-col :span="5" :offset="1" class="info-label-col">
					{{getDateStr(proj.projTime)}}
				</el-col>
				<el-col :span="18" >
					{{proj.projName}}&nbsp;|&nbsp;{{proj.projRole}}
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
		<el-divider v-if="resume.certs&&resume.certs.length>0" content-position="left">证书技能</el-divider>
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
				info:{}
			}
		},
		computed:{
			encryptedFullName(){
				return this.$util.encrypted.encryptedUserName(this.info.fullname);
			},
			encryptedPhone(){
				return this.$util.encrypted.encryptedPhone(this.info.phone);
			},
			encryptedEmail(){
				return this.$util.encrypted.encryptedEmail(this.info.email);
			},
			target(){
				if(this.info.targets && this.info.targets.length>0){
					return this.info.targets[0];
				}else{
					return {}
				}
			},
			resume(){
				if(this.info.resumes && this.info.resumes.length>0){
					return this.info.resumes[0];
				}else{
					return {}
				}
			}
		},
		props: {
			encrypted:{
				type: Boolean,
				default: false
			}
		},
		methods: {
			view(info){
				// console.log('item=>'+JSON.stringify(info));
				this.info = info;
			},
			getDateStr(dateArray){
				return dateArray[0]+"~"+dateArray[1];
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
