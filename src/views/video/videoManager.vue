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
						<el-table :data="waitTableData" class="video-table-list" stripe height="60vh">
							<el-table-column width="80" class="resume-table-headimg">
								<template slot-scope="scope">
									<el-avatar shape="square" :size="60" :src="scope.row.info.profilePicture" @error="true">
										<img src="@/assets/img/job/headimg/head_999.png"/>
									</el-avatar>
								</template>
							</el-table-column>
							<el-table-column width="250" label="面试人">
								<template slot-scope="scope">
									<div class="resume-table-name">{{scope.row.info.fullname}}</div>
									<div>
										<el-tag type="danger" size="mini">{{scope.row.info.age}}岁</el-tag>
										<!-- <el-tag size="mini">{{scope.row.info.city}}</el-tag> -->
										<!-- <el-tag type="warning" size="mini">{{scope.row.info.workLength}}年</el-tag> -->
										<el-tag size="mini" v-if="scope.row.resume && scope.row.resume.edus[0]">{{scope.row.resume.edus[0].degree}}</el-tag>
										<el-tag type="success" size="mini" v-if="scope.row.resume && scope.row.resume.edus[0]">{{scope.row.resume.edus[0].college}}</el-tag>
									</div>
								</template>
							</el-table-column>	
							<el-table-column width="280"  label="面试职位">
								<template slot-scope="scope">
									<div class="resume-table-name">{{scope.row.position.position}}</div>
									<div>
										<el-tag type="danger" size="mini">{{scope.row.position.salary}}</el-tag>
										<el-tag size="mini">{{scope.row.position.city}}</el-tag>
										<el-tag type="warning" size="mini">{{scope.row.position.degree}}</el-tag>
										<el-tag type="success" size="mini">{{scope.row.position.workExp}}</el-tag>
									</div>
								</template>
							</el-table-column>
							<el-table-column width="180"  label="预约面试时间">
								<template slot-scope="scope">
									<div>
										<li class="el-icon-time">&emsp;{{scope.row.appointmentTime}}</li>
									</div>
								</template>
							</el-table-column>
							<el-table-column  label="状态" width="100">
								<template slot-scope="scope">
									<div>
										<li :class="getStateClass(scope.row.state)">&emsp;{{scope.row.state}}</li>
									</div>
								</template>
							</el-table-column>
							<el-table-column min-width="200"  label="操作">
								<template slot-scope="scope">
									<div>
										<el-button v-if="scope.row.state=='已接受'"
											@click="enterVideoRoom(scope.row)"  v-loading.fullscreen.lock="fullscreenLoading"  type="primary" size="mini" round
											element-loading-background="rgba(0, 0, 0, 0.2)" element-loading-spinner="el-icon-loading" element-loading-text="正在进入面试间...">进入房间
										</el-button>
										&emsp;
										<el-popover placement="top" :title="'当前进度:'+scope.row.state" width="200" trigger="click">
											<el-timeline>
												<el-timeline-item  :timestamp="scope.row.createTime">
													{{scope.row.info.fullname}}投递简历
												</el-timeline-item>
												<el-timeline-item  :timestamp="scope.row.appointmentTime">
													{{scope.row.staff.fullname}}预约面试
												</el-timeline-item>
											</el-timeline>
											<el-button size="mini" round  slot="reference" type="warning">查看进度</el-button>
										</el-popover>
										<!-- {{scope.row.roomId}} -->
									</div>
								</template>	
							</el-table-column>	
						</el-table>
					</el-tab-pane>
					<el-tab-pane name="unevaluated">
						<span slot="label">待评价<el-badge :value="unevaluatedCount"></el-badge></span>
						<el-table :data="unevaluatedTableData" class="video-table-list" stripe height="60vh">
							<el-table-column width="80" class="resume-table-headimg">
								<template slot-scope="scope">
									<el-avatar shape="square" :size="60" :src="scope.row.info.profilePicture" @error="true">
										<img src="@/assets/img/job/headimg/head_999.png"/>
									</el-avatar>
								</template>
							</el-table-column>
							<el-table-column width="250" label="面试人">
								<template slot-scope="scope">
									<div class="resume-table-name">{{scope.row.info.fullname}}</div>
									<div>
										<el-tag type="danger" size="mini">{{scope.row.info.age}}岁</el-tag>
										<el-tag size="mini" v-if="scope.row.resume && scope.row.resume.edus[0]">{{scope.row.resume.edus[0].degree}}</el-tag>
										<el-tag type="success" size="mini" v-if="scope.row.resume && scope.row.resume.edus[0]">{{scope.row.resume.edus[0].college}}</el-tag>
										<!-- <el-tag size="mini">{{scope.row.info.city}}</el-tag> -->
										<!-- <el-tag type="warning" size="mini">{{scope.row.info.workLength}}年</el-tag> -->
									</div>
								</template>
							</el-table-column>	
							<el-table-column width="300"  label="面试职位">
								<template slot-scope="scope">
									<div class="resume-table-name">{{scope.row.position.position}}</div>
									<div>
										<el-tag type="danger" size="mini">{{scope.row.position.salary}}</el-tag>
										<el-tag size="mini">{{scope.row.position.city}}</el-tag>
										<el-tag type="warning" size="mini">{{scope.row.position.degree}}</el-tag>
										<el-tag type="success" size="mini">{{scope.row.position.workExp}}</el-tag>
									</div>
								</template>
							</el-table-column>
							<el-table-column width="150"  label="面试官">
								<template slot-scope="scope">
									<div class="resume-table-name">{{scope.row.staff.fullname}}</div>
									<div>
										<el-tag size="mini">{{scope.row.staff.enterpriseName}}</el-tag>
										<el-tag size="mini" type="warning">{{scope.row.staff.positionType}}</el-tag>
									</div>
								</template>
							</el-table-column>
							<el-table-column  label="状态" width="100">
								<template slot-scope="scope">
									<div>
										<li :class="getStateClass(scope.row.state)">&emsp;{{scope.row.state}}</li>
									</div>
								</template>
							</el-table-column>
							<el-table-column min-width="200"  label="操作">
								<template slot-scope="scope">
									<div>
										<el-popover placement="top" :title="'面试评价'" width="200" trigger="click">
											<el-rate show-text></el-rate>
											<el-button size="mini" round  slot="reference" type="primary">评价</el-button>
										</el-popover>
										&emsp;
										<el-popover placement="top" :title="'当前进度:'+scope.row.state" width="200" trigger="click">
											<el-timeline>
												<el-timeline-item  :timestamp="scope.row.createTime">
													{{scope.row.info.fullname}}投递简历
												</el-timeline-item>
												<el-timeline-item  :timestamp="scope.row.appointmentTime">
													{{scope.row.staff.fullname}}预约面试
												</el-timeline-item>
											</el-timeline>
											<el-button size="mini" round  slot="reference" type="warning">查看进度</el-button>
										</el-popover>
										<!-- {{scope.row.roomId}} -->
									</div>
								</template>	
							</el-table-column>								
						</el-table>	
					</el-tab-pane>
					<el-tab-pane name="finish">
						<span slot="label">已结束<el-badge :value="doneCount"></el-badge></span>
						<el-table :data="doneTableData" class="video-table-list" stripe height="60vh">
							<el-table-column width="80" class="resume-table-headimg">
								<template slot-scope="scope">
									<el-avatar shape="square" :size="60" :src="scope.row.info.profilePicture" @error="true">
										<img src="@/assets/img/job/headimg/head_999.png"/>
									</el-avatar>
								</template>
							</el-table-column>
							<el-table-column width="250" label="面试人">
								<template slot-scope="scope">
									<div class="resume-table-name">{{scope.row.info.fullname}}</div>
									<div>
										<el-tag type="danger" size="mini">{{scope.row.info.age}}岁</el-tag>
										<el-tag size="mini" v-if="scope.row.resume && scope.row.resume.edus[0]">{{scope.row.resume.edus[0].degree}}</el-tag>
										<el-tag type="success" size="mini" v-if="scope.row.resume && scope.row.resume.edus[0]">{{scope.row.resume.edus[0].college}}</el-tag>
										<!-- <el-tag size="mini">{{scope.row.info.city}}</el-tag>
										<el-tag type="warning" size="mini">{{scope.row.info.workLength}}年</el-tag> -->
									</div>
								</template>
							</el-table-column>	
							<el-table-column width="300"  label="面试职位">
								<template slot-scope="scope">
									<div class="resume-table-name">{{scope.row.position.position}}</div>
									<div>
										<el-tag type="danger" size="mini">{{scope.row.position.salary}}</el-tag>
										<el-tag size="mini">{{scope.row.position.city}}</el-tag>
										<el-tag type="warning" size="mini">{{scope.row.position.degree}}</el-tag>
										<el-tag type="success" size="mini">{{scope.row.position.workExp}}</el-tag>
									</div>
								</template>
							</el-table-column>
							<el-table-column width="200"  label="预约面试时间">
								<template slot-scope="scope">
									<div>
										<li class="el-icon-time">&emsp;{{scope.row.appointmentTime}}</li>
									</div>
								</template>
							</el-table-column>
							<el-table-column  label="状态">
								<template slot-scope="scope">
									<div>
										<li :class="getStateClass(scope.row.state)">&emsp;{{scope.row.state}}</li>
									</div>
								</template>
							</el-table-column>
						</el-table>	
					</el-tab-pane>
				</el-tabs>
				<el-dialog :visible.sync="videoRoomVisible" fullscreen lock-scroll :show-close="false"
					:width="'65%'" :top="'5vh'" destroy-on-close :close-on-click-modal="false" class="videoRoomDialog">
					<el-row slot="title">
						<el-col :span="4" :offset="1">
							<span>{{videoRoomTitle}}</span>
						</el-col>
						<el-col :span="2" :offset="17">
							<el-button type="danger" size="mini" @click="exitRoom">退出面试间</el-button>
						</el-col>	
					</el-row>
					<video-room ref="videoRoom"></video-room>
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
	import videoRoom from '@/views/video/videoRoom.vue'
	let videoManagerInterval;
	export default {
		name: 'videoManager',
		data() {
			return {
				activeMenu:'wait',
				fullscreenLoading: false,
				videoRoomTitle:'面试间',
				videoRoomVisible:false
			}
		},
		computed:{
			waitTableData:{
				get(){
					return this.$store.state.video.waitList;
				},
				set(v){
					this.$store.commit("video/setWaitList",v);
				}
			},
			unevaluatedTableData:{
				get(){
					return this.$store.state.video.unevaluatedList;
				},
				set(v){
					this.$store.commit("video/setUnevaluatedList",v);
				}
			},
			doneTableData:{
				get(){
					return this.$store.state.video.doneList;
				},
				set(v){
					this.$store.commit("video/setDoneList",v);
				}
			},
			waitCount(){
				return this.$util.common.isEmptyObject(this.waitTableData)?0:this.waitTableData.length
			},
			doneCount(){
				return this.$util.common.isEmptyObject(this.doneTableData)?0:this.doneTableData.length;
			},
			unevaluatedCount(){
				return this.$util.common.isEmptyObject(this.unevaluatedTableData)?0:this.unevaluatedTableData.length;
			}
		},
		// 注册组件
		components: {
			pageHead,
			pageFooter,
			videoRoom
			/* ,playerVideo */
		},
		methods:{
			init:function(){
				console.log("[拉取数据] 获取面试列表 "+new Date().getSeconds());
				this.$store.dispatch("video/getWaitList");
				this.$store.dispatch("video/getUnevaluatedList");
				this.$store.dispatch("video/getDoneList");
			},
			enterVideoRoom:function(item){
				console.log(item);
				this.fullscreenLoading = true;
				this.$store.commit('video/setCurrentInvitation',item);
				this.fullscreenLoading = false;
				this.videoRoomVisible = true;
				this.$nextTick(()=>this.$refs.videoRoom.init());
			},
			cancelInterview:function(item){
				this.$confirm('您要取消该次面试', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						message: '取消成功',
						type: 'success'
					});
					item["canceltime"]= this.$date.format(new Date());
					this.waitTableData.splice(this.waitTableData.indexOf(item),1);
					this.cancelTableData.push(item);
				}).catch(() => {
					
				});
			},
			getStateClass:function(state){
				if(state=='已超时'){
					return "el-icon-warning color_firebrick";
				}else if(state=='未接受'){
					return "el-icon-alarm-clock color_coral";
				}else if(state=='已接受'){
					return "el-icon-success color_seagreen"
				}else if(state=='待评价'){
					return "el-icon-star-on color_coral"
				}
			},
			interviewResult:function(item){
				console.log(item);
			},
			exitRoom:function(){
				this.$confirm('您正在视频面试,退出面试间后将中断与面试人通信', '退出确认', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.videoRoomVisible=false
				})
			}
		},
		created(){
			videoManagerInterval = setInterval(()=>{
				setTimeout(()=>this.init(),500);
			},5000);
			this.init();
		},
		destroyed(){
			clearInterval(videoManagerInterval);
		}
	}
</script>

<style lang="less">
	.vide-manager{
		min-height: 75vh;
		background: #ffffff;
		border-radius: 0rem;
		margin: 1rem 3rem;
		padding: 1rem 2rem;
		.table-field-span{
			margin: 1rem;
		}
		.resume-table-name{
			font-size: 1rem;
			margin-bottom: 0.5rem;
			color:#666666;
		}
		.el-tag{
			font-size: 0.75rem;
			margin-right: 0.5rem;
		}
		.color_firebrick{
			color:firebrick;
		}
		.color_seagreen{
			color:seagreen;
		}
		.color_coral{
			color:coral;
		}
		.videoRoomDialog{
			.el-dialog__header{
				padding: 0vh 0vw;
			}
			.el-dialog__body{
				padding: 1vh 1vw;
			}
		}
		
	}
</style>
