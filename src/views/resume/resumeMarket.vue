<template>
	<el-container>
		<el-header>
			<page-head loginStatus></page-head>
		</el-header>
		<el-main>
			<div class="resume-market">
				<el-form ref="searchForm" :model="searchForm" label-width="6rem" class="resume-search">
					<el-form-item label="职位搜索">
						<el-cascader placeholder="试试搜索：Java" :options="jobTypeOpts" filterable :filter-method="positionSearch"  @change="searchResumes"></el-cascader>
					</el-form-item>
				</el-form>	
				<el-divider></el-divider>
				<el-row class="resume-row">
					<el-col :span="5" v-for="(resume, index) in resumesTable" :key="resume.id" :offset="index%4 > 0 ? 1 : 0">
						<el-card class="resume-item" shadow="always">
							<div slot="header" class="resume-item-header">
								{{encryptedName(resume.info.fullname)}}<el-link class="resume-item-header-info" :underline="false" @click="viewResumeInfo(resume)"><i class="el-icon-tickets el-icon--right"></i></el-link>
							</div>
							<el-avatar :size="60" :src="resume.info.profilePicture" @error="true">
								<img src="@/assets/img/job/headimg/head_999.png"/>
							</el-avatar>
							<div class="resume-item-info">
								<el-row>
									<el-col :span="24" class="resume-item-info-tag">
										<el-tag type="primary" v-if="resume.info.age" size="mini">{{resume.info.age}}岁</el-tag>
										<el-tag type="danger" v-if="resume.info.workStatus" size="mini">{{resume.info.workStatus}}</el-tag>
										<el-tag type="success" v-if="resume.info.city" size="mini">当前在{{resume.info.city}}</el-tag>
										<el-tag type="primary" v-if="resume.info.workLength" size="mini">{{resume.info.workLength}}年经验</el-tag>
										<el-tag type="warning" v-if="resume.target && resume.target.positionType" size="mini">{{resume.target.positionType}}</el-tag>
										<el-tag type="danger" v-if="resume.target && resume.target.salary" size="mini">{{resume.target.salary}}</el-tag>
										<el-tag type="success" v-if="resume.edus && resume.edus.length>0 && resume.edus[0].college" size="mini">{{resume.edus[0].college}}</el-tag>
										<el-tag type="warning" v-if="resume.edus && resume.edus.length>0 && resume.edus[0].degree" size="mini">{{resume.edus[0].degree}}</el-tag>
									</el-col>
								</el-row>	
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-dialog :title="resumeInfoTitle" :visible.sync="resumeInfoVisible" width="50%" append-to-body :top="'2vh'" destroy-on-close>
					<resume-info ref="resumeInfo" encrypted></resume-info>
				</el-dialog>
			</div>			
		</el-main>
		<el-footer>
			<page-footer></page-footer>
		</el-footer>
	</el-container>	
</template>

<script>
	import pageHead from '@/components/pageHead.vue'
	import pageFooter from '@/components/pageFooter.vue'
	import resumeInfo from '@/views/job/resumeInfo.vue'
	import {getResumesBySearchKeyApi} from '@/api/studentFun.js'
	export default {
		data() {
			return {
				jobTypeOpts:require('@/data/work-function-data.js'),
				searchForm:{
					posintionType:'Java'
				},
				resumeInfoTitle:'个人简历',
				resumeInfoVisible:false,
				resumesTable:[]
			}
		},
		created(){
			this.searchResumes(this.searchForm.posintionType);
		},
		methods:{
			searchResumes(searchKeyArgs){
				let searchKey= searchKeyArgs && searchKeyArgs.length>0?searchKeyArgs[searchKeyArgs.length-1]:"@";
				getResumesBySearchKeyApi({"searchKey":searchKey}).then(res=>{
					this.resumesTable=res.data
				});
			},
			positionSearch(node,keyword){
				return node.value.toLowerCase().indexOf(keyword.toLowerCase()) === 0;
			},
			viewResumeInfo(item){
				this.resumeInfoTitle="个人简历-"+this.$util.encrypted.encryptedUserName(item.info.fullname);
				this.resumeInfoVisible=true;
				this.$nextTick(function(){
					this.$refs.resumeInfo.view(item);
				});
			},
			encryptedName(fullname){
				return this.$util.encrypted.encryptedUserName(fullname);
			}
		},
		// 注册组件
		components: {
			pageHead,
			pageFooter,
			resumeInfo
		}
	}
	
</script>

<style lang="less">
	.resume-market{
		width: 95vw;
		min-height: 75vh;
		background: #ffffff;
		border-radius: 2em;
		margin: 2rem;
		.resume-search{
			width:35vw;
			padding: 2rem 0rem 0rem 1rem;
			font-weight: bold;
			.resume-search-positiontype{
				.el-input__inner{
					height: 1.5rem;
				}
			}
		}
		.resume-row{
			margin-left: 4vw;
			.resume-item{
				height: 19rem;
				background-color:#ffffff !important;
				background: url(~@/assets/img/resume/resume_bg.png) #333 no-repeat top center / 100% auto;
				margin: 1rem 0rem 1rem 0rem;
				padding-top: 1rem;
				text-align: center;
				.resume-item-header{
					color:#666666;
					font-weight: bold;
					font-family: "microsoft yahei";
					.resume-item-header-info{
						color: #688ac2;
						font-size: 1.25rem;
						font-weight: bold;
						font-family: "microsoft yahei";
						margin: 0rem 0rem 0.25rem 0.25rem;
					}
				}
				.resume-item-info{
					.resume-item-info-name{
						font-size: 1.25rem;
						color: #666666;
						font-family: "microsoft yahei";
					}
					.resume-item-info-tag{
						text-align: left;
						margin-left: 1rem;
						.el-tag{
							margin:0.5rem 0rem 0rem 0.5rem;
						}
					}
				}
			}
		}
		
	}
</style>
