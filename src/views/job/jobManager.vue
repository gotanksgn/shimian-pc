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
								<!-- <img src="~@/assets/img/job/headimg/head_0.png" alt="avatar"> -->
								<el-avatar shape="square" :size="80" :src="staff.profilePicture" @error="errorHeadImgHandler">
									<img src="@/assets/img/job/headimg/head_0.png"/>
								</el-avatar>
							</dt>
							<dd>
								<h3>{{hoursTip}}，面试官</h3>
								<p>{{staff.fullname}}</p>
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
												<h5>{{item.position||'未知'}}</h5>
											</div>
											<div class="job-item-btns">
												<el-badge :value="getSenderCount(item.senders)" :hidden="getSenderCount(item.senders)==0" :max="99" ><el-button type="primary" plain  @click="openResumes(item)">查看简历</el-button></el-badge>
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
					<job-edit ref="jobEdit" @handleClose="closeJob"></job-edit>
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
	import {mapState,mapActions} from 'vuex'
	export default {
		name: 'jobManager',
		data() {
			return {
				jobEditVisible:false,
				jobEditTitle:'创建职位',
				jobResumesVisible:false
				
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
			...mapState('login', ['user']),
			...mapState('job', ['jobList','hoursTip','jobDialog','staff','jobResumesTitle']),
			jobCount:function(){
				return this.jobList.length;
			}
		},
		created(){
			this.getHoursTip();
			this.getStaffInfo();
			this.getJobList();
		},
		methods: {
			...mapActions('job',['deletePosition','getHoursTip','getJobList','getJob','getStaffInfo']),
			createJob: function(){
				this.jobEditTitle='创建职位';
				this.jobEditVisible = true;
			},
			delJob: function(job){
				this.$confirm('该职位下已投递'+this.getSenderCount(job.senders)+'个简历,您要删除该职位', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deletePosition(job).then(()=>{
						this.$message({
							message: '删除成功',
							type: 'success'
						});
					}).catch(()=>{
						this.$message.error("删除失败");
					});
				}).catch(() => {
					return false;
				});
			},
			editJob: function(item){
				this.jobEditTitle='修改职位';
				this.jobEditVisible = true;
				this.$nextTick(function(){
					this.$refs.jobEdit.editForm(item);
					this.$store.commit('job/setCurrentPosition',item);
				});
			},
			saveJob:function(){
				this.jobEditVisible = false;
			},
			openResumes:function(item){
				this.jobResumesVisible=true;
				this.jobResumesTitle=item.position+"丨"+this.getSenderCount(item.senders)+"个简历";
				this.getJob(item);
			},
			closeJob:function(){
				this.jobEditVisible = false;
			},
			getSenderCount:function(senderList){
				return senderList==undefined||senderList==null?0:senderList.length;
			},
			errorHeadImgHandler(){
				return true;
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
						margin-left: 2em;
						margin-top: 1em;
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
