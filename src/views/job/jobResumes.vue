<template>
	<div class="job-resumes">
		<el-tabs v-model="activeTab">
			<el-tab-pane name="wait">
				<span slot="label">未处理<el-badge :value="waitTableData.length"></el-badge></span>
				<el-table :data="waitTableData" :stripe="true" class="resume-table-list" :height="'70vh'">
					<el-table-column :min-width="80" class="resume-table-headimg">
						<template slot-scope="scope">
							<el-avatar shape="square" :size="60" :src="scope.row.headImg" @error="true">
								<img src="@/assets/img/job/headimg/head_999.png"/>
							</el-avatar>
						</template>
					</el-table-column>
					<el-table-column :min-width="120">
						<template slot-scope="scope">
							<div class="resume-table-name resume-table-name-fullname">{{scope.row.name}}</div>
							<div>
								<el-tag type="danger" v-if="scope.row.age">{{scope.row.age}}岁</el-tag>
								<el-tag v-if="scope.row.city">{{scope.row.city}}</el-tag>
							</div>
						</template>
					</el-table-column>	
					<el-table-column :min-width="200" class="resume-table-edu">
						<template slot-scope="scope">
							<div class="resume-table-name">{{scope.row.edu}}</div>
							<div>
								<el-tag type="danger" v-if="scope.row.degree">{{scope.row.degree}}</el-tag>
								<el-tag v-if="scope.row.spec">{{scope.row.spec}}</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column :min-width="200" class="resume-table-target">
						<template slot-scope="scope">
							<div class="resume-table-name">{{scope.row.positionType}}</div>
							<div>
								<el-tag type="danger" v-if="scope.row.salary">{{scope.row.salary}}</el-tag>
								<el-tag v-if="scope.row.targetCity">{{scope.row.targetCity}}</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column :min-width="400" class="resume-table-video">
						<template slot-scope="scope">
							<el-button size="mini" @click="playVideo(scope.row,'视频简历')" type="primary" round>简历<i class="el-icon-video-camera-solid el-icon--right"></i></el-button>
							<el-button size="mini" @click="playVideo(scope.row,'视频问答')" type="primary" round>问答<i class="el-icon-video-camera el-icon--right"></i></el-button>
							<el-button size="mini" @click="viewStudentInfo(scope.row)" type="warning" round>查看简历</el-button>
							<el-button size="mini" @click="appointJob(scope.row)" type="danger" round>约一下</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane name="appoint">
				<span slot="label">已邀约<el-badge :value="appointTableData.length"></el-badge></span>
				<el-table :data="appointTableData" :stripe="true" class="resume-table-list" :height="'70vh'">
					<el-table-column :min-width="80" class="resume-table-headimg">
						<template slot-scope="scope">
							<el-avatar shape="square" :size="60" :src="scope.row.headImg" @error="true">
								<img src="@/assets/img/job/headimg/head_999.png"/>
							</el-avatar>
						</template>
					</el-table-column>
					<el-table-column :min-width="120">
						<template slot-scope="scope">
							<div class="resume-table-name resume-table-name-fullname">{{scope.row.name}}</div>
							<div>
								<el-tag type="danger" v-if="scope.row.age">{{scope.row.age}}岁</el-tag>
								<el-tag v-if="scope.row.city">{{scope.row.city}}</el-tag>
							</div>
						</template>
					</el-table-column>	
					<el-table-column :min-width="200" class="resume-table-edu">
						<template slot-scope="scope">
							<div class="resume-table-name">{{scope.row.edu}}</div>
							<div>
								<el-tag type="danger" v-if="scope.row.degree">{{scope.row.degree}}</el-tag>
								<el-tag v-if="scope.row.spec">{{scope.row.spec}}</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column :min-width="200" class="resume-table-target">
						<template slot-scope="scope">
							<div class="resume-table-name">{{scope.row.positionType}}</div>
							<div>
								<el-tag type="danger" v-if="scope.row.salary">{{scope.row.salary}}</el-tag>
								<el-tag v-if="scope.row.targetCity">{{scope.row.targetCity}}</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column :min-width="400" class="resume-table-video">
						<template slot-scope="scope">
							<el-button size="mini" @click="playVideo(scope.row,'视频简历')" type="primary" round>简历<i class="el-icon-video-camera-solid el-icon--right"></i></el-button>
							<el-button size="mini" @click="playVideo(scope.row,'视频问答')" type="primary" round>问答<i class="el-icon-video-camera el-icon--right"></i></el-button>
							<el-button size="mini" @click="viewStudentInfo(scope.row)" type="warning" round>查看简历</el-button>
							<el-button size="mini" @click="goVideoRoom(scope.row)" type="success" round>转面试间</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane name="refused">
				<span slot="label">不合适<el-badge :value="refusedTableData.length"></el-badge></span>
				<el-table :data="refusedTableData" :stripe="true" class="resume-table-list" :height="'70vh'">
					<el-table-column :min-width="80" class="resume-table-headimg">
						<template slot-scope="scope">
							<el-avatar shape="square" :size="60" :src="scope.row.headImg" @error="true">
								<img src="@/assets/img/job/headimg/head_999.png"/>
							</el-avatar>
						</template>
					</el-table-column>
					<el-table-column :min-width="120">
						<template slot-scope="scope">
							<div class="resume-table-name resume-table-name-fullname">{{scope.row.name}}</div>
							<div>
								<el-tag type="danger" v-if="scope.row.age">{{scope.row.age}}岁</el-tag>
								<el-tag v-if="scope.row.city">{{scope.row.city}}</el-tag>
							</div>
						</template>
					</el-table-column>	
					<el-table-column :min-width="200" class="resume-table-edu">
						<template slot-scope="scope">
							<div class="resume-table-name">{{scope.row.edu}}</div>
							<div>
								<el-tag type="danger" v-if="scope.row.degree">{{scope.row.degree}}</el-tag>
								<el-tag v-if="scope.row.spec">{{scope.row.spec}}</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column :min-width="200" class="resume-table-target">
						<template slot-scope="scope">
							<div class="resume-table-name">{{scope.row.positionType}}</div>
							<div>
								<el-tag type="danger" v-if="scope.row.salary">{{scope.row.salary}}</el-tag>
								<el-tag v-if="scope.row.targetCity">{{scope.row.targetCity}}</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column :min-width="400" class="resume-table-video">
						<template slot-scope="scope">
							<el-button size="mini" @click="playVideo(scope.row,'视频简历')" type="primary" round>简历<i class="el-icon-video-camera-solid el-icon--right"></i></el-button>
							<el-button size="mini" @click="playVideo(scope.row,'视频问答')" type="primary" round>问答<i class="el-icon-video-camera el-icon--right"></i></el-button>
							<el-button size="mini" @click="viewStudentInfo(scope.row)" type="warning" round>查看简历</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>	
		</el-tabs>	
		<el-dialog :title="resumeVideoTitle" :visible.sync="resumeVideoVisible" width="50%" append-to-body destroy-on-close :close-on-click-modal="false">
			<player-video ref="playerVideo"></player-video>
		</el-dialog>
		<el-dialog :title="jobAppointTitle" :visible.sync="jobAppointVisible" width="50%" append-to-body :top="'2vh'" destroy-on-close>
			<job-appoint ref="jobAppoint" :close="closeAppointJobDialog"></job-appoint>
		</el-dialog>
		<el-dialog :title="studentInfoTitle" :visible.sync="studentInfoVisible" width="50%" append-to-body :top="'2vh'" destroy-on-close>
			<resume-info ref="resumeInfo"></resume-info>
		</el-dialog>
	</div>
</template>

<script>
	import playerVideo from '@/components/playerVideo.vue'
	import jobAppoint from '@/views/job/jobAppoint.vue'
	import resumeInfo from '@/views/job/resumeInfo.vue'
	import {mapState} from 'vuex' 
	import {getVodPlayApi} from '@/api/videoFun.js'
	export default {
		name:'jobResumes', 	
		data() {
			return {
				activeTab:'wait',
				resumeVideoTitle:'视频简历',
				resumeVideoVisible:false,
				jobAppointTitle:'面试预约',
				jobAppointVisible:false,
				studentInfoTitle:'个人简历',
				studentInfoVisible:false,
				currentData:{}
			}
		},
		computed:{
			...mapState('job',['currentJob']),
			waitTableData:{
				get(){
					return this.getTableData('wait');
				}
			},
			appointTableData:{
				get(){
					return this.getTableData('appoint');
				}
			},
			refusedTableData:{
				get(){
					return this.getTableData('refused');
				}
			}
		},
		components: {
			playerVideo,
			jobAppoint,
			resumeInfo
		},
		methods: {
			playVideo(item,videoType){
				this.$nextTick(function(){
					let sources=[];
					let videoId = item.videoid;
					if(videoType=='视频问答'){
						videoId=item.questionid;
					}
					if(videoId!=undefined && videoId!=null && videoId!=''){
						getVodPlayApi({"videoId":videoId}).then(res=>{
							// console.log(JSON.stringify(res));
							res.data.playInfoList.forEach(playInfo=>{
								sources.push({
									type:"video/"+playInfo.format,
									src:playInfo.playURL
								});
							});
							this.resumeVideoVisible=true;
							this.resumeVideoTitle=item.name+"的"+videoType;
							this.$nextTick(function(){
								this.$refs.playerVideo.play(sources,'');
							});
						}).catch(error=>{
							console.log("获取视频失败:"+JSON.stringify(error));
							this.$alert("获取视频失败");
						});
					}else{
						this.$alert("未上传"+videoType);
					}
				});
			},
			viewStudentInfo(item){
				this.studentInfoTitle="个人简历-"+item.name;
				this.studentInfoVisible=true;
				this.$nextTick(function(){
					this.$refs.resumeInfo.view(item.sender.info);
					this.currentData=item;
				});
			},
			appointJob(item){
				this.jobAppointTitle="面试预约-"+item.name;
				this.jobAppointVisible=true;
				this.$nextTick(function(){
					this.$refs.jobAppoint.edit(item);
				});
				// console.log("waitTableData=>"+JSON.stringify(this.waitTableData));
			},
			closeAppointJobDialog(){
				this.jobAppointVisible=false;
				this.waitTableData.splice(this.waitTableData.indexOf(this.currentData),1);
				this.appointTableData.push(this.currentData);
			},
			getTableData(type){
				let list=[];
				let senders = this.currentJob && this.currentJob.senders?this.currentJob.senders:[];
				let sender;
				for(let i=0;i<senders.length;i++){
					sender = senders[i];
					if(type && type == 'wait' && sender && (sender.state=='SENT' || sender.state=='READ')){
						list.push(this.senderDataToResume(sender));
					}else if(type && type == 'appoint' && sender && sender.state=='INVITED'){
						list.push(this.senderDataToResume(sender));
					}else if(type && type == 'refused' && sender && sender.state=='REFUSED'){
						list.push(this.senderDataToResume(sender));
					}
				}
				return list;
			},
			senderDataToResume(sender){
				let data = {};
				if(sender){
					data.id=sender.id;
					if(sender.info){
						data.name=sender.info.fullname;
						data.age=sender.info.age;
						data.headImg=sender.info.profilePicture;
						data.city=sender.info.city;
						if(sender.info.targets && sender.info.targets.length>0){
							data.positionType=sender.info.targets[0].positionType;
							data.trade=sender.info.targets[0].trade;
							data.targetCity=sender.info.targets[0].city;
							data.salary=sender.info.targets[0].salary;
						}
						if(sender.info.vcrs && sender.info.vcrs.length>0){
							data.videoid=sender.info.vcrs[0].videoId;
						}
					}
					if(sender.resume){
						if(sender.resume.edus && sender.resume.edus.length>0){
							data.spec=sender.resume.edus[0].major;
							data.edu=sender.resume.edus[0].college;
							data.degree=sender.resume.edus[0].degree;
						}
					}
					data.questionid=sender.answerVideoId;
					data.sender=sender;
				}
				return data;
			},
			goVideoRoom(){
				this.$router.push('/video-manager');
			}
		}
	}
</script>

<style lang="less">
	.job-resumes{
		min-height: 50vh;
		.resume-table-list{
			.el-table__header{
				display: none;
			}
			.el-table_1_column_1{
				text-align: center;
			}
			.el-table_1_column_3  {
				text-align: left;
			}
			.resume-table-name{
				color: #666666;
				font-size: 1.1em;
				padding: 0em 0em 1em 0em;
			}
			.resume-table-name-fullname{
				color: #333333;
				font-size: 1.25em;
			}
			.el-tag{
				margin-right: 0.5em;
				font-size: 0.75em;
			}

		}
	}
	
</style>
