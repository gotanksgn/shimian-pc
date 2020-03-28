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
								<el-col :span="12" class="job-create"><el-button icon="el-icon-plus" @click="create">创建职位</el-button></el-col>
							</el-row>
						</div>    
						<div class="job-container">  
							<div class="job-content">
								<ul class="clearfix">
									<li v-for="(item, idx) in jobList" :key="idx">
										<div class="job-item-wrap">
											<div class="job-item-header">
												<img src="@/assets/job/item-wrap-background.png" alt="background">
												<div class="operaable-btn-wrap">
													<a href="javascript:;" class="edit-room"><span>编辑</span></a>
													<a href="javascript:;" class="del-room"><span>删除</span></a>
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
	export default {
		name: 'JobManager',
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
				]
				
			};
		},
		// 注册组件
		components: {
			pageHead,
			pageFooter
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
			create(){
				this.$parent.createjob();
			}
		}
	}
</script>

<style scoped="scoped">
	
	.interview-container {
		width: 1154px;
		min-height: 580px;
		background: #ffffff;
		border-radius: 10px;
		margin: 40px auto 40px;
	}
	
	.interview-container .interview-top-wrap {
		background: url(../../assets/job/interview-top-wrap.png) no-repeat center / 100% 100%;
	}
	
	.interview-container .interview-top-wrap .interview-top-border-wrap {
		border-bottom: 1px solid #f3f3f3;
		margin: 0 40px;
		height: 135px;
	}
	
	.interview-container .interview-top-wrap .interview-top-border-wrap dl.interview-info-wrap {
		float: left;
		padding: 0px 30px;
	}
	
	.interview-container .interview-top-wrap .interview-top-border-wrap dl.interview-info-wrap dt {
		float: left;
	}
	
	.interview-container .interview-top-wrap .interview-top-border-wrap dl.interview-info-wrap dt img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}
	
	.interview-container .interview-top-wrap .interview-top-border-wrap dl.interview-info-wrap dd {
		padding-left: 130px;
	}
	
	.interview-container .interview-top-wrap .interview-top-border-wrap dl.interview-info-wrap dd h3 {
		color: #252525;
		font-size: 20px;
		font-weight: normal;
	}
	
	.interview-container .interview-top-wrap .interview-top-border-wrap dl.interview-info-wrap dd p {
		color: #999;
		font-size: 16px;
	}
	
	.interview-entry-wrap .job-header {
		width: 1024px;
		line-height: 60px;
		margin: 0 auto;
	}
	.interview-entry-wrap .job-header .job-create{
		text-align: right;
	}
	.interview-entry-wrap .job-header .job-info-text {
		position: relative;
		color: #666;
		font-size: 14px;
		padding-right: 30px;
	}
	
	.interview-entry-wrap .job-header .job-info-text:after {
		content: '|';
		color: #999;
		position: absolute;
		right: 0;
		top: 2.5px;
		line-height: 1em;
	}
	
	.interview-entry-wrap .job-header .job-info-status {
		color: #999;
		font-size: 14px;
		padding-left: 30px;
	}
	
	.interview-entry-wrap .job-container .job-content ul {
		padding: 10px 32px 0;
	}
	
	.interview-entry-wrap .job-container .job-content ul li {
		float: left;
		width: 25%;
	}
	
	.interview-entry-wrap .job-container .job-content ul li .job-item-wrap {
		margin: 0 auto;
		padding-bottom: 40px;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		width: 220px;
		background: #ffffff;
	}
	
	.interview-entry-wrap .job-container .job-content ul li .job-item-wrap .job-item-header {
		position: relative;
		width: 220px;
		height: 197px;
	}
	
	.interview-entry-wrap .job-container .job-content ul li .job-item-wrap .job-item-header img {
		width: 220px;
		height: 197px;
		border-radius: 10px 10px 0 0;
	}
	
	.interview-entry-wrap .job-container .job-content ul li .job-item-wrap .job-item-header .operaable-btn-wrap {
		position: absolute;
		right: 4px;
		top: 2px;
		padding-top: 8px;
	}
	
	.interview-entry-wrap .job-container .job-content ul li .job-item-wrap .job-item-header .operaable-btn-wrap a {
		color: #C8C6C4;
		font-size: 14px;
		text-decoration: none;
		outline: none;
	}
	
	.interview-entry-wrap .job-container .job-content ul li .job-item-wrap .job-item-header .operaable-btn-wrap a span {
		vertical-align: middle;
		margin: 5px;
	}
	
	.interview-entry-wrap .job-container .job-content ul li .job-item-wrap .job-item-header .operaable-btn-wrap .edit-room:after{
		content: '|';
		color: #C8C6C4;
	}
	
	
	.interview-entry-wrap .job-container .job-content ul li .job-item-wrap .job-item-header .job-info-wrap {
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 0 20px 20px 20px;
	}
	
	.interview-entry-wrap .job-container .job-content ul li .job-item-wrap .job-item-header .job-info-wrap h5 {
		color: #fff;
		font-size: 20px;
		line-height: 26px;
		margin: 0;
		padding: 0;
		font-weight: normal;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 180px;
	}
	
	.interview-entry-wrap .job-container .job-content ul li .job-item-wrap .job-item-header .job-info-wrap p {
		color: #C8C6C4;
		padding-top: 5px;
		font-size: 16px;
		min-height: 20px;
	}
	
	.interview-entry-wrap .job-container .job-content ul li .job-item-wrap .job-item-btns {
		border: 1px solid #000000;
		border: 1px solid rgba(0, 0, 0, 0.1);
		padding: 15px 0 15px;
		text-align: center;
		border-radius: 0 0 10px 10px;
	}
	
	.interview-entry-wrap .job-container .job-content p.load-more-wrap {
		display: none;
		padding: 10px 0;
		text-align: center;
	}
	
	.interview-entry-wrap .job-container .job-content p.load-more-wrap a {
		color: #666;
		font-size: 16px;
		outline: none;
	}
	
</style>
