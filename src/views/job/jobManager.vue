<template>
	<el-container>
		<el-header>
			<page-head loginStatus></page-head>
		</el-header>
		<el-main>
			<div class="job-manager">
				<div class="interview-top-wrap">
					<div class="interview-top-border-wrap">
						<dl class="interview-info-wrap">
							<dt>
								<img src="~@/assets/img/job/headimg/head_0.png" alt="avatar">
							</dt>
							<dd>
								<h3>{{hoursTip}}，面试官</h3>
								<p>{{user.name}}</p>
							</dd>
						</dl>
					</div>
				</div>
				<div class="interview-entry-wrap">
					<div class="job-list-root">
						<div class="job-header">
							<el-row>
								<el-col :span="16" class="job-header-pubjob"><a>我发布的职位</a>|<a>{{jobCount}}个</a></el-col>
								<el-col :span="8" class="job-header-createjob"><el-button  icon="el-icon-plus" plain @click="createJob">创建职位</el-button></el-col>
							</el-row>
						</div>
						<div class="job-container">
							<el-row>
								<el-col :span="6" v-for="(item, idx) in jobList" :key="idx">
										<div class="job-item-wrap">
										<div class="job-item-box">
											<img class="job-item-bg" src="~@/assets/img/job/item-wrap-background.png"/>
											<div class="operaable-btn-wrap">
												<a href="javascript:;" class="edit-room" @click="editJob(item)"><span>编辑</span></a>
												<a href="javascript:;" class="del-room" @click="delJob(item)"><span>删除</span></a>
											</div>
											<div class="job-info-wrap">
												<h5>{{item.name}}</h5>
											</div>
											<div class="job-item-btns">
												<el-badge :value="item.resumeCount" :max="99" :hidden="item.resumeCount<=0"><el-button type="primary" plain  @click="openResumes(item)">查看简历</el-button></el-badge>
											</div>
											<!-- <el-badge value="已发布" type="success"></el-badge> -->
										</div>
									</div>
								</el-col>
							</el-row>	
						</div>	
					</div>
				</div>
				<el-dialog :title="jobEditTitle" :visible.sync="jobEditVisible" 
					:width="'65%'" :top="'10vh'" destroy-on-close>
					<job-edit ref="jobEdit"></job-edit>
				</el-dialog>
				<el-dialog :title="jobResumesTitle" :visible.sync="jobResumesVisible" 
					:width="'80%'" :fullscreen="true" destroy-on-close>
					<job-resumes ref="jobResumes"></job-resumes>
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
	import jobEdit from '@/views/job/jobEdit.vue'
	import jobResumes from '@/views/job/jobResumes.vue'
	export default {
		name: 'jobManager',
		data() {
			return {
				user:{
					name:'刘先生'
				},
				jobList:[
					{name:"区域销售总监",id:1,resumeCount:3,jobType: '管理',jobProps: '全职',jobCity: '北京',jobAddress: '北京市西城区广安门甲2号',jobExp:'5-10年',jobDegree:'硕士',jobSales:'20K以上',jobDesc:'负责公司XXXXX区域的销售管理XXXXX'},
					{name:"研发总监",id:2,resumeCount:1,jobType: '管理',jobProps: '全职',jobCity: '上海',jobAddress: '上海市静安区长江路弄2',jobExp:'5-10年',jobDegree:'本科',jobSales:'15K-20K',jobDesc:'负责公司XXXXX区域的研发管理XXXXX'},
					{name:"JAVA开发工程师",id:3,resumeCount:10,jobType: '技术',jobProps: '全职',jobCity: '苏州',jobAddress: '苏州市XXX区XXX路XXX号',jobExp:'3-5年',jobDegree:'本科',jobSales:'10K-15K',jobDesc:'负责XXX研发工作'},
					{name:"VUE开发工程师",id:4,resumeCount:120,jobType: '技术',jobProps: '全职',jobCity: '杭州',jobAddress: '杭州市XXX区XXX路XXX号',jobExp:'3-5年',jobDegree:'本科',jobSales:'10K-15K',jobDesc:'负责XXX研发工作'},
					{name:"PHP开发工程师",id:5,jobType: '技术',jobProps: '全职',jobCity: '上海',jobAddress: 'XXX区XXX路XXX号',jobExp:'3-5年',jobDegree:'本科',jobSales:'10K-15K',jobDesc:'负责XXX研发工作'},
					{name:"NodeJs开发工程师",id:6,jobType: '技术',jobProps: '全职',jobCity: '北京',jobAddress: 'XXX区XXX路XXX号',jobExp:'3-5年',jobDegree:'本科',jobSales:'8K-10K',jobDesc:'负责XXX研发工作'},
					{name:"需求分析师",id:7,jobType: '技术',jobProps: '全职',jobCity: '北京',jobAddress: 'XXX区XXX路XXX号',jobExp:'3-5年',jobDegree:'本科',jobSales:'8K-10K',jobDesc:'负责XXX研发工作'},
					{name:"运维工程师",id:8,resumeCount:21,jobType: '技术',jobProps: '全职',jobCity: '北京',jobAddress: 'XXX区XXX路XXX号',jobExp:'3-5年',jobDegree:'本科',jobSales:'8K-10K',jobDesc:'负责XXX研发工作'},
					{name:"测试工程师",id:9,jobType: '技术',jobProps: '全职',jobCity: '天津',jobAddress: 'XXX区XXX路XXX号',jobExp:'3-5年',jobDegree:'本科',jobSales:'8K-10K',jobDesc:'负责XXX研发工作'},
					{name:"秘书",id:10,resumeCount:32,jobType: '行政',jobProps: '全职',jobCity: '广州',jobAddress: 'XXX区XXX路XXX号',jobExp:'1年以内',jobDegree:'大专',jobSales:'5K-8K',jobDesc:'负责公司XXXXX下XXXX事业部行政工作'},
					{name:"售前工程师",id:11,resumeCount:2,jobType: '销售',jobProps: '全职',jobCity: '北京',jobAddress: 'XXX区XXX路XXX号',jobExp:'3-5年',jobDegree:'本科',jobSales:'15K-20K',jobDesc:'负责公司XXXXX区域的销售和售前工作'}
				],
				jobEditVisible:false,
				jobEditTitle:'创建职位',
				jobResumesVisible:false,
				jobResumesTitle:'简历列表'
			};
		},
		// 注册组件
		components: {
			pageHead,
			pageFooter,
			jobEdit,
			jobResumes
		},
		computed: {
			hoursTip:function(){
				let date=new Date();
				if(date.getHours()>=5 && date.getHours()<12){
					return "早上好"
				}else if(date.getHours()>=12 && date.getHours()<18){
					return "下午好"
				}else{
					return "晚上好"
				}
			},
			jobCount:function(){
				return this.jobList.length;
			}
		},
		methods: {
			createJob: function(){
				this.jobEditTitle='创建职位';
				this.jobEditVisible = true;
				this.$nextTick(function(){
					this.$refs.jobEdit.resetForm();
				});
			},
			delJob: function(job){
				this.$confirm('您要删除该职位', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.jobList.splice(this.jobList.indexOf(job),1);
				}).catch(() => {
					
				});
			},
			editJob: function(item){
				this.jobEditTitle='修改职位';
				this.jobEditVisible = true;
				this.$nextTick(function(){
					this.$refs.jobEdit.editForm(item)
				});
			},
			saveJob:function(){
				this.jobEditVisible = false;
			},
			openResumes:function(item){
				this.jobResumesVisible=true;
				this.jobResumesTitle=item.name+"丨"+(item.resumeCount==undefined?0:item.resumeCount)+"个简历";
				this.$nextTick(function(){
					
				});
			}
		}
	}
</script>

<style lang="less">	
	.job-manager {
		width: 90vw;
		min-height: 75vh;
		background: #ffffff;
		border-radius: 2em;
		margin: 5vh 0vw 0vh 5vw;
		.interview-top-wrap {
			background: url('~@/assets/img/job/interview-top-wrap.png') no-repeat center / 100% 100%;
			height: auto;
			.interview-top-border-wrap {
				border-bottom: 0.1em solid #f3f3f3;
				height: 20vh;
				.interview-info-wrap{
					float: left;
					dt {
						float: left;
						img {
							width: 9vw;
							height: 16vh;
							margin: 1vh 0vw 0vh 2vw;	
						}
					}
					dd {
						padding: 1vh 10vw 0vh 10vw;
						h3 {
							color: #252525;
							font-size: 1.25em;
							font-weight: normal;
						}
						p {
							color: #999;
							font-size: 1em;
						}
					}
				}
			}
		}
		.interview-entry-wrap{
			.job-header {
				max-width: 95%;
				line-height: 4vh;
				.job-header-pubjob {
					position: relative;
					color: #999;
					a{
						padding: 1em;
					}
					padding: 1vh 0vw 0vh 4vw;
				}
				.job-header-createjob{
					padding: 1vh 0vw 0vh 22vw;
				}
			}
			.job-container{
				.job-item-wrap{
					/* border: 0.1em solid #C8C6C4; */
					padding: 4vh 2vw 4vh 2vw;
					.job-item-box{
						text-align: center;
						min-height: 35vh;
						border: 0.05em solid #C8C6C4;
						border-radius: 0.5em 0.5em 0.5em 0.5em;
						.job-item-bg {
							position: relative;
							z-index: 10;
							width: 18.5vw;
							height: 25vh;
							border-radius: 0.5em 0.5em 0em 0em;
						}
						.operaable-btn-wrap{
							position:relative;
							z-index: 11;
							top:-23vh;
							text-align: right;
							a {
								color: #C8C6C4;
								font-size: 1em;
								text-decoration: none;
								outline: none;
								padding: 0vh 0.5vw 0vh 0vw;
							}
							.edit-room:after{
								content: '|';
								color: #C8C6C4;
								padding: 0vh 0vw 0vh 0.5vw;
							}
						}
						.job-info-wrap{
							position:relative;
							z-index: 11;
							/* top:-16vh; */
							top:-16vh;
							h5{
								color: #FFFFFF;
								font-size: 1.25em;
								font-weight: normal;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
						.job-item-btns{
							position:relative;
							margin: -6em 0vw 1em 0vw;
						}
					}
					
				}
				
			}
		}
	}
</style>
