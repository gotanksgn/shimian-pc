<template>
	<div class="resume-table">
		<el-table :data="tableData" :stripe="true" class="resume-table-list">
			<el-table-column :min-width="10" class="resume-table-headimg">
				<template slot-scope="scope">
					<el-avatar shape="square" :size="100" :src="scope.row.headimg"></el-avatar>
				</template>
			</el-table-column>
			<el-table-column :min-width="20">
				<template slot-scope="scope">
					<div class="resume-table-name">{{scope.row.name}}</div>
					<div class="resume-table-spec">{{scope.row.spec}}</div>
				</template>
			</el-table-column>	
			<el-table-column :min-width="10" class="resume-table-eduimg">
				<template slot-scope="scope">
					<el-avatar shape="circle" :size="80" :src="scope.row.eduimg"></el-avatar>
				</template>	
			</el-table-column>
			<el-table-column :min-width="15" class="resume-table-edu">
				<template slot-scope="scope">
					{{scope.row.edu}}
				</template>
			</el-table-column>
			<el-table-column :min-width="20" class="resume-table-video">
				<template slot-scope="scope">
					<el-button  @click="playVideoResume(scope.row)">简历<i class="el-icon-video-camera-solid el-icon--right"></i></el-button>
					<el-button @click="playVideoQuestion(scope.row)">问答<i class="el-icon-video-camera el-icon--right"></i></el-button>
				</template>
			</el-table-column>		
			<el-table-column :min-width="20" class="resume-table-btn">
				<template slot-scope="scope">
					<el-button @click="viewResumeInfo()">简历详情</el-button>
					<el-button @click="appointJob(scope.row)">约一下</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title="resumeVideoTitle" :visible.sync="resumeVideoVisible" width="50%" append-to-body destroy-on-close>
			<player-video ref="playerVideo"></player-video>
		</el-dialog>
		<el-dialog :title="jobAppointTitle" :visible.sync="jobAppointVisible" width="50%" append-to-body :top="'1vh'" destroy-on-close>
			<job-appoint ref="jobAppoint"></job-appoint>
		</el-dialog>
	</div>
		
</template>

<script>
	import playerVideo from '@/components/playerVideo.vue'
	import jobAppoint from '@/views/job/jobAppoint.vue'
	export default {
		name:'jobResumes', 	
		data() {
			return {
				tableData: [{
					id:'1',
					name: '张小美',
					headimg:require('@/assets/img/job/headimg/head_1.png'),
					eduimg:require('@/assets/img/job/eduimg/edu_1.png'),
					spec: '计算机科学与技术',
					edu:'中国科技大学',
					videourl:require('@/assets/img/video/190319222227698228.mp4'),
					quesurl:require('@/assets/img/video/190319222227698228.mp4')
				}, {
					id:'2',
					name: '王大妞',
					headimg:require('@/assets/img/job/headimg/head_2.png'),
					eduimg:require('@/assets/img/job/eduimg/edu_3.png'),
					spec: '信息技术',
					edu:'中国人民大学',
					videourl:require('@/assets/img/video/190319222227698228.mp4'),
					quesurl:require('@/assets/img/video/190319222227698228.mp4')
				}, {
					id:'3',
					name: '黄小虎',
					headimg:require('@/assets/img/job/headimg/head_3.png'),
					eduimg:require('@/assets/img/job/eduimg/edu_2.png'),
					spec: '计算机科学与技术',
					edu:'北京大学',
					videourl:require('@/assets/img/video/190319222227698228.mp4'),
					quesurl:require('@/assets/img/video/190319222227698228.mp4')
				}, {
					id:'4',
					name: '赵小军',
					headimg:require('@/assets/img/job/headimg/head_4.png'),
					eduimg:require('@/assets/img/job/eduimg/edu_1.png'),
					spec: '软件工程',
					edu:'西南科技大学',
					videourl:require('@/assets/img/video/190319222227698228.mp4'),
					quesurl:require('@/assets/img/video/190319222227698228.mp4')
				},{
					id:'5',
					name: '李潇潇',
					headimg:require('@/assets/img/job/headimg/head_5.png'),
					eduimg:require('@/assets/img/job/eduimg/edu_2.png'),
					spec: '计算机科学与技术',
					edu:'清华大学',
					videourl:require('@/assets/img/video/190319222227698228.mp4'),
					quesurl:require('@/assets/img/video/190319222227698228.mp4')
				},{
					id:'6',
					name: '马佳佳',
					headimg:require('@/assets/img/job/headimg/head_6.png'),
					eduimg:require('@/assets/img/job/eduimg/edu_3.png'),
					spec: '软件工程',
					edu:'华东师范大学',
					videourl:require('@/assets/img/video/190319222227698228.mp4'),
					quesurl:require('@/assets/img/video/190319222227698228.mp4')
				},{
					id:'7',
					name: '吕龙',
					headimg:require('@/assets/img/job/headimg/head_7.png'),
					eduimg:require('@/assets/img/job/eduimg/edu_1.png'),
					spec: '机械工程',
					edu:'南开大学',
					videourl:require('@/assets/img/video/190319222227698228.mp4'),
					quesurl:require('@/assets/img/video/190319222227698228.mp4')
				}],
				resumeVideoTitle:'视频简历',
				resumeVideoVisible:false,
				jobAppointTitle:'面试预约',
				jobAppointVisible:false
			}
		},
		components: {
			playerVideo,
			jobAppoint
		},
		methods: {
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
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
			},
			viewResumeInfo(){
				this.$alert('该功能正在开发中');
			},
			appointJob(item){
				this.jobAppointTitle="面试预约-"+item.name;
				this.jobAppointVisible=true;
			}
		}
	}
</script>

<style lang="less">
	.resume-table{
		.resume-table-list{
			.el-table__header{
				display: none;
			}
			.el-table_1_column_1{
				text-align: center;
			}
			.el-table_1_column_3  {
				text-align: center;
			}
			.resume-table-name{
				color: #303133;
				font-size: 1.25em;
				padding: 0em 0em 1em 0em;
			}

		}
	}
	
</style>
