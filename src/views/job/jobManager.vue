<template>
	<el-container>
		<el-header>
			<page-head loginStatus></page-head>
		</el-header>
		<el-main>
			<div class="interview-container">
				<div class="interview-top-wrap">
					<div class="interview-top-border-wrap">
						<dl class="interview-info-wrap">
							<dt>
								<img src="@/assets/job/headimg.png" alt="avatar">
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
								<el-col :span="12" class="job-info"><a class="job-info-text">我发布的职位</a><a class="job-info-status">4个</a></el-col>
								<el-col :span="12" class="job-create"><el-button icon="el-icon-plus" @click="createJob">创建职位</el-button></el-col>
							</el-row>
						</div>    
						<div class="job-container">  
							<div class="job-content">
								<ul class="job-content-ul">
									<li v-for="(item, idx) in jobList" :key="idx" class="job-content-li">
										<div class="job-item-wrap">
											<div class="job-item-header">
												<img src="@/assets/job/item-wrap-background.png" alt="background">
												<div class="operaable-btn-wrap">
													<a href="javascript:;" class="edit-room" @click="editJob(item.name)"><span>编辑</span></a>
													<a href="javascript:;" class="del-room" @click="delJob(item)"><span>删除</span></a>
												</div>
												<div class="job-info-wrap">
													<h5>{{item.name}}</h5>
												</div>
											</div>
											<div class="job-item-btns">
												<el-button round>进入</el-button>
											</div>
										</div>
									</li>
								</ul>
								<p class="load-more-wrap"><a data-selector="load-more" class="load-more" href="javascript:;">点击加载更多...</a></p>
							</div>
						</div>
					</div>
				</div>
				<el-dialog title="创建职位" :visible.sync="dialogFormVisible" width="65%">
					<job-edit ref="jobEdit"></job-edit>
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
	export default {
		name: 'jobManager',
		data() {
			return {
				user:{
					name:'刘先生'
				},
				jobList:[
					{name:"区域销售总监",id:111},
					{name:"研发总监",id:222},
					{name:"JAVA开发工程师",id:333},
					{name:"VUE开发工程师",id:444}
				],
				dialogFormVisible:false
			};
		},
		// 注册组件
		components: {
			pageHead,
			pageFooter,
			jobEdit
		},
		computed: {
			hoursTip:function(){
				let date=new Date();
				if(date.getHours()>=0 && date.getHours()<12){
					return "上午好"
				}else if(date.getHours()>=12 && date.getHours()<18){
					return "下午好"
				}else{
					return "晚上好"
				}
			}
		},
		methods: {
			createJob(){
				this.dialogFormVisible = true;
				if(this.$refs.jobEdit!=undefined){
					this.$refs.jobEdit.resetForm();
				}
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
			editJob: function(name){
				this.dialogFormVisible = true;
				this.$refs.jobEdit.editForm(name);
			}
		}
	}
</script>

<style scoped="scoped" lang="less">	
	.interview-container {
		width: 1154px;
		min-height: 580px;
		background: #ffffff;
		border-radius: 10px;
		margin: 40px auto 40px;
		.interview-top-wrap {
			background: url(../../assets/job/interview-top-wrap.png) no-repeat center / 100% 100%;
			.interview-top-border-wrap {
				border-bottom: 1px solid #f3f3f3;
				margin: 0 40px;
				height: 135px;
				.interview-info-wrap{
					float: left;
					padding: 0px 30px;
					dt {
						float: left;
						img {
							width: 100px;
							height: 100px;
							border-radius: 50%;
						}
					}
					dd {
						padding-left: 130px;
						h3 {
							color: #252525;
							font-size: 20px;
							font-weight: normal;
						}
						p {
							color: #999;
							font-size: 16px;
						}
					}
				}
			}
		}
		.interview-entry-wrap{
			.job-header {
				width: 1024px;
				line-height: 60px;
				margin: 0 auto;
				.job-create{
					text-align: right;
				}
				.job-info-text {
					position: relative;
					color: #666;
					font-size: 14px;
					padding-right: 30px;
				}
				.job-info-text:after {
					content: '|';
					color: #999;
					position: absolute;
					right: 0;
					top: 2.5px;
					line-height: 1em;
				}
				.job-info-status {
					color: #999;
					font-size: 14px;
					padding-left: 30px;
				}
			}
			.job-container{
				.job-content{
					.job-content-ul {
						padding: 10px 32px 0;
						.job-content-li {
							float: left;
							width: 25%;
							.job-item-wrap {
								margin: 0 auto;
								padding-bottom: 40px;
								-moz-box-sizing: border-box;
								box-sizing: border-box;
								width: 220px;
								background: #ffffff;
								.job-item-header {
									position: relative;
									width: 220px;
									height: 197px;
									img {
										width: 220px;
										height: 197px;
										border-radius: 10px 10px 0 0;
									}
									.operaable-btn-wrap {
										position: absolute;
										right: 4px;
										top: 2px;
										padding-top: 8px;
										a {
											color: #C8C6C4;
											font-size: 14px;
											text-decoration: none;
											outline: none;
											span {
												vertical-align: middle;
												margin: 5px;
											}
										}
										.edit-room:after{
											content: '|';
											color: #C8C6C4;
										}
									}
									.job-info-wrap {
										position: absolute;
										left: 0;
										bottom: 0;
										padding: 0 20px 20px 20px;
										h5 {
											color: #fff;
											font-size: 20px;
											line-height: 26px;
											margin: 0;
											padding: 0;
											text-align: center;
											font-weight: normal;
											overflow: hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
											width: 180px;
										}
										p {
											color: #C8C6C4;
											padding-top: 5px;
											font-size: 16px;
											min-height: 20px;
										}
									}
								}
								.job-item-btns {
									border: 1px solid #000000;
									border: 1px solid rgba(0, 0, 0, 0.1);
									padding: 15px 0 15px;
									text-align: center;
									border-radius: 0 0 10px 10px;
								}
							}
						}
					}
					.load-more-wrap{
						display: none;
						padding: 10px 0;
						text-align: center;
						a {
							color: #666;
							font-size: 16px;
							outline: none;
						}
					}
				}
			}
		}
	}
</style>
