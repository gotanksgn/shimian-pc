<template>
	<div class="job-resumes">
		<el-divider content-position="left">共收到{{tableData.length}}份投递</el-divider>
		<el-table :data="tableData" :stripe="true" class="resume-table-list" :height="500">
			<el-table-column :min-width="80" c8lass="resume-table-headimg">
				<template slot-scope="scope">
					<el-avatar shape="square" :size="70" :src="scope.row.headImg" @error="errorHeadImgHandler">
						<img src="@/assets/img/job/headimg/head_999.png"/>
					</el-avatar>
				</template>
			</el-table-column>
			<el-table-column :min-width="120">
				<template slot-scope="scope">
					<div class="resume-table-name resume-table-name-fullname">{{scope.row.name}}</div>
					<div>
						<el-tag type="danger">{{scope.row.age}}岁</el-tag>
						<el-tag>{{scope.row.city}}</el-tag>
					</div>
				</template>
			</el-table-column>	
			<el-table-column :min-width="200" class="resume-table-edu">
				<template slot-scope="scope">
					<div class="resume-table-name">{{scope.row.edu}}</div>
					<div>
						<el-tag type="danger">{{scope.row.degree}}</el-tag>
						<el-tag>{{scope.row.spec}}</el-tag>
					</div>
				</template>
			</el-table-column>
			<el-table-column :min-width="200" class="resume-table-target">
				<template slot-scope="scope">
					<div class="resume-table-name">{{scope.row.positionType}}</div>
					<div>
						<el-tag type="danger">{{scope.row.salary}}</el-tag>
						<el-tag>{{scope.row.targetCity}}</el-tag>
					</div>
				</template>
			</el-table-column>
			<el-table-column :min-width="350" class="resume-table-video">
				<template slot-scope="scope">
					<el-button size="small" @click="playVideo(scope.row,'视频简历')" type="primary" >简历<i class="el-icon-video-camera-solid el-icon--right"></i></el-button>
					<el-button size="small" @click="playVideo(scope.row,'视频问答')" type="primary" >问答<i class="el-icon-video-camera el-icon--right"></i></el-button>
					<el-button size="small" @click="viewResumeInfo(scope.row)" type="primary" >查看简历</el-button>
					<el-button size="small" @click="appointJob(scope.row)" type="danger" >约一下</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title="resumeVideoTitle" :visible.sync="resumeVideoVisible" width="50%" append-to-body destroy-on-close :close-on-click-modal="false">
			<player-video ref="playerVideo"></player-video>
		</el-dialog>
		<el-dialog :title="jobAppointTitle" :visible.sync="jobAppointVisible" width="50%" append-to-body :top="'2vh'" destroy-on-close>
			<job-appoint ref="jobAppoint" :close="closeAppointJobDialog"></job-appoint>
		</el-dialog>
		<el-dialog :title="resumeInfoTitle" :visible.sync="resumeInfoVisible" width="50%" append-to-body :top="'2vh'" destroy-on-close>
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
				resumeVideoTitle:'视频简历',
				resumeVideoVisible:false,
				jobAppointTitle:'面试预约',
				jobAppointVisible:false,
				resumeInfoTitle:'个人简历',
				resumeInfoVisible:false,
				currentData:{}
			}
		},
		computed:{
			...mapState('job',['currentJob']),
			tableData:{
				get(){
					let result =[]; 
					if(this.currentJob.senders!=undefined && this.currentJob.senders!=null){
						this.currentJob.senders.forEach(sender=>{
							if(sender){
								/* for(let i=0;i<=10;i++){ */
								result.push({
										id:sender.id,
										name:sender.info.fullname,
										age:sender.info.age,
										headImg:sender.info.profilePicture,
										city:sender.info.city,
										spec:sender.resume.edus[0].major,
										edu:sender.resume.edus[0].college,
										degree:sender.resume.edus[0].degree,
										positionType:sender.resume.target.positionType,
										trade:sender.resume.target.trade,
										targetCity:sender.resume.target.city,
										salary:sender.resume.target.salary,
										videoid:sender.resume && sender.resume.vcrs && sender.resume.vcrs.length>0?sender.resume.vcrs[0].videoId:'',
										questionid:sender.answerVideoId,
										sender:sender
									}
								)
								/* } */
							}
						});
					}
					return result;
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
							console.log(JSON.stringify(res));
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
			viewResumeInfo(item){
				this.resumeInfoTitle="个人简历-"+item.name;
				this.resumeInfoVisible=true;
				this.$nextTick(function(){
					this.$refs.resumeInfo.view(item.sender.resume);
					this.currentData=item;
				});
			},
			appointJob(item){
				this.jobAppointTitle="面试预约-"+item.name;
				this.jobAppointVisible=true;
				this.$nextTick(function(){
					this.$refs.jobAppoint.edit(item);
				});
				console.log("tableData=>"+JSON.stringify(this.tableData));
			},
			closeAppointJobDialog(){
				this.jobAppointVisible=false;
				this.tableData.splice(this.tableData.indexOf(this.currentData),1);
			},
			errorHeadImgHandler(){
				return true;
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
