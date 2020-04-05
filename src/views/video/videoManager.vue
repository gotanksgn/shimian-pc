<template>
	<el-container>
		<el-header>
			<page-head loginStatus></page-head>
		</el-header>
		<el-main>
			<div class="vide-manager">
				<el-tabs v-model="activeMenu">
					<el-tab-pane name="wait">
						<span slot="label">待面试<el-badge :value="waitCount"></el-badge></span>
						<el-table :data="waitTableData" class="video-table-list" stripe :show-header="false">
							<el-table-column :min-width="10">
								<template slot-scope="scope">
									<div class="video-table-jobname"><el-tag>{{scope.row.jobname}}</el-tag></div>
									<el-avatar shape="square" :size="100" :src="scope.row.headimg"></el-avatar>
								</template>
							</el-table-column>
							<el-table-column :min-width="20">
								<template slot-scope="scope">
									<div class="video-table-name">{{scope.row.name}}</div>
									<div class="video-table-spec">{{scope.row.spec}}</div>
								</template>
							</el-table-column>
							<el-table-column :min-width="10" class="video-table-eduimg">
								<template slot-scope="scope">
									<el-avatar shape="circle" :size="80" :src="scope.row.eduimg"></el-avatar>
								</template>	
							</el-table-column>
							<el-table-column :min-width="15" class="video-table-edu">
								<template slot-scope="scope">
									{{scope.row.edu}}
								</template>
							</el-table-column>
							<el-table-column :min-width="20" class="video-table-video">
								<template slot-scope="scope">
									<el-button  @click="playVideoResume(scope.row)">简历<i class="el-icon-video-camera-solid el-icon--right"></i></el-button>
									<el-button @click="playVideoQuestion(scope.row)">问答<i class="el-icon-video-camera el-icon--right"></i></el-button>
								</template>
							</el-table-column>	
							<el-table-column :min-width="20" class="video-table-video">
								<template slot-scope="scope">
									<div class="video-table-appointtime"><el-tag type="danger"><i class="el-icon-time"></i>面试时间：{{scope.row.appointtime}}</el-tag></div>
									<el-button @click="enterVideoRoom(scope.row)"  v-loading.fullscreen.lock="fullscreenLoading" 
										element-loading-background="rgba(0, 0, 0, 0.2)" element-loading-spinner="el-icon-loading" element-loading-text="正在进入面试间...">进入房间
									</el-button>
									<el-button @click="cancelInterview(scope.row)">取消面试</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane name="done">
						<span slot="label">已面试<el-badge :value="doneCount" ></el-badge></span>
						<el-table :data="doneTableData" class="video-table-list" stripe :show-header="false">
							<el-table-column :min-width="10">
								<template slot-scope="scope">
									<div class="video-table-jobname"><el-tag>{{scope.row.jobname}}</el-tag></div>
									<el-avatar shape="square" :size="100" :src="scope.row.headimg"></el-avatar>
								</template>
							</el-table-column>
							<el-table-column :min-width="20">
								<template slot-scope="scope">
									<div class="video-table-name">{{scope.row.name}}</div>
									<div class="video-table-spec">{{scope.row.spec}}</div>
								</template>
							</el-table-column>
							<el-table-column :min-width="10">
								<template slot-scope="scope">
									<el-avatar shape="circle" :size="80" :src="scope.row.eduimg"></el-avatar>
								</template>	
							</el-table-column>
							<el-table-column :min-width="15" class="video-table-edu">
								<template slot-scope="scope">
									{{scope.row.edu}}
								</template>
							</el-table-column>
							<el-table-column :min-width="20" class="video-table-video">
								<template slot-scope="scope">
									<el-button  @click="playVideoResume(scope.row)">简历<i class="el-icon-video-camera-solid el-icon--right"></i></el-button>
									<el-button @click="playVideoQuestion(scope.row)">问答<i class="el-icon-video-camera el-icon--right"></i></el-button>
								</template>
							</el-table-column>	
							<el-table-column :min-width="20" class="video-table-result">
								<template slot-scope="scope">
									<el-button @click="interviewResult(scope.row)">面试结果</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane name="cancel">
						<span slot="label">已取消<el-badge :value="cancelCount"></el-badge></span>
						<el-table :data="cancelTableData" class="video-table-list" stripe :show-header="false">
							<el-table-column :min-width="10">
								<template slot-scope="scope">
									<div class="video-table-jobname"><el-tag>{{scope.row.jobname}}</el-tag></div>
									<el-avatar shape="square" :size="100" :src="scope.row.headimg"></el-avatar>
								</template>
							</el-table-column>
							<el-table-column :min-width="20">
								<template slot-scope="scope">
									<div class="video-table-name">{{scope.row.name}}</div>
									<div class="video-table-spec">{{scope.row.spec}}</div>
								</template>
							</el-table-column>
							<el-table-column :min-width="10">
								<template slot-scope="scope">
									<el-avatar shape="circle" :size="80" :src="scope.row.eduimg"></el-avatar>
								</template>	
							</el-table-column>
							<el-table-column :min-width="15">
								<template slot-scope="scope">
									{{scope.row.edu}}
								</template>
							</el-table-column>
							<el-table-column :min-width="20" class="video-table-video">
								<template slot-scope="scope">
									<el-button  @click="playVideoResume(scope.row)">简历<i class="el-icon-video-camera-solid el-icon--right"></i></el-button>
									<el-button @click="playVideoQuestion(scope.row)">问答<i class="el-icon-video-camera el-icon--right"></i></el-button>
								</template>
							</el-table-column>	
							<el-table-column :min-width="20" class="video-table-canceltime">
								<template slot-scope="scope">
									<el-tag type="danger"><i class="el-icon-time"></i>取消时间：{{scope.row.canceltime}}</el-tag>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>
				<el-dialog :title="resumeVideoTitle" :visible.sync="resumeVideoVisible" width="50%" append-to-body destroy-on-close>
					<player-video ref="playerVideo"></player-video>
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
	import playerVideo from '@/components/playerVideo.vue'
	export default {
		name: 'videoWait',
		data() {
			return {
				activeMenu:'wait',
				waitTableData: [{
					id:'1',
					name: '张小美',
					jobname:'研发总监',
					headimg:require('@/assets/img/job/headimg/head_1.png'),
					eduimg:require('@/assets/img/job/eduimg/edu_1.png'),
					spec: '计算机科学与技术',
					edu:'中国科技大学',
					videourl:require('@/assets/img/video/190319222227698228.mp4'),
					quesurl:require('@/assets/img/video/190319222227698228.mp4'),
					appointtime:'2020-04-04 09:00:00'
				}, {
					id:'2',
					name: '王大妞',
					jobname:'秘书',
					headimg:require('@/assets/img/job/headimg/head_2.png'),
					eduimg:require('@/assets/img/job/eduimg/edu_3.png'),
					spec: '信息技术',
					edu:'中国人民大学',
					videourl:require('@/assets/img/video/190319222227698228.mp4'),
					quesurl:require('@/assets/img/video/190319222227698228.mp4'),
					appointtime:'2020-04-04 09:30:00'
				},{
					id:'3',
					name: '黄小虎',
					jobname:'JAVA开发工程师',
					headimg:require('@/assets/img/job/headimg/head_3.png'),
					eduimg:require('@/assets/img/job/eduimg/edu_2.png'),
					spec: '计算机科学与技术',
					edu:'北京大学',
					videourl:require('@/assets/img/video/190319222227698228.mp4'),
					quesurl:require('@/assets/img/video/190319222227698228.mp4'),
					appointtime:'2020-04-04 14:00:00'
				}, {
					id:'4',
					name: '赵小军',
					jobname:'VUE开发工程师',
					headimg:require('@/assets/img/job/headimg/head_4.png'),
					eduimg:require('@/assets/img/job/eduimg/edu_1.png'),
					spec: '软件工程',
					edu:'西南科技大学',
					videourl:require('@/assets/img/video/190319222227698228.mp4'),
					quesurl:require('@/assets/img/video/190319222227698228.mp4'),
					appointtime:'2020-04-04 14:30:00'
				},{
					id:'7',
					name: '吕龙',
					jobname:'JAVA开发工程师',
					headimg:require('@/assets/img/job/headimg/head_7.png'),
					eduimg:require('@/assets/img/job/eduimg/edu_1.png'),
					spec: '机械工程',
					edu:'南开大学',
					videourl:require('@/assets/img/video/190319222227698228.mp4'),
					quesurl:require('@/assets/img/video/190319222227698228.mp4'),
					appointtime:'2020-04-04 16:00:00'
				}],
				doneTableData:[],
				cancelTableData:[],
				resumeVideoTitle:'视频简历',
				resumeVideoVisible:false,
				jobAppointTitle:'面试预约',
				jobAppointVisible:false,
				fullscreenLoading:false
			}
		},
		computed:{
			waitCount(){
				return this.waitTableData.length;
			},
			doneCount(){
				return this.doneTableData.length;
			},
			cancelCount(){
				return this.cancelTableData.length;
			}
		},
		// 注册组件
		components: {
			pageHead,
			pageFooter,
			playerVideo
		},
		methods:{
			enterVideoRoom(item){
				let _this = this;
				console.log(item);
				this.fullscreenLoading = true;
				setTimeout(function(){
					_this.fullscreenLoading = false;
					_this.$router.push('/video-room');
				},1500);
			},
			cancelInterview(item){
				this.$confirm('您要取消该次面试', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						message: '取消成功',
						type: 'success'
					});
					/* item["canceltime"]= this.dateFormat(new Date()); */
					item["canceltime"]= this.$date.format(new Date());
					this.waitTableData.splice(this.waitTableData.indexOf(item),1);
					this.cancelTableData.push(item);
				}).catch(() => {
					
				});
			},
			interviewResult(item){
				console.log(item);
			},
			playVideoResume(item){
				this.resumeVideoVisible=true;
				this.resumeVideoTitle=item.name+"的视频简历";
				this.$nextTick(function(){
					this.$refs.playerVideo.play(item.videourl,item.headimg);
				});
			},
			playVideoQuestion(item){
				this.resumeVideoVisible=true;
				this.resumeVideoTitle=item.name+"的问答视频";
				this.$nextTick(function(){
					this.$refs.playerVideo.play(item.quesurl,require('@/assets/img/logo.png'));
				});
			}
		}
	}
</script>

<style lang="less">
	.vide-manager{
		.el-tabs__header{
			.el-tabs__nav-scroll{
				margin: 1em;
			}
		}
		.el-table__body{
			/* margin: 0vh 0vw; */
			.el-table__row{
				.el-table_1_column_3{
					text-align: right;
				}
				.el-table_1_column_5{
					text-align: center;
				}
				.video-table-name{
					color: #303133;
					font-size: 1.25em;
					padding: 0em 0em 1em 0em;
				}
				.video-table-jobname{
					position: relative;
					margin:0vh 0vw 1vw 0vh;
					text-align: left;
				}
				.video-table-appointtime{
					position: absolute;
					top: 3vh;
				}
				.el-icon-time{
					margin: 0em 0.5em 0em 0em;
				}
			}
		}
		
	}
</style>
