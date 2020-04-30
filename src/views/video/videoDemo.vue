<template>
	<div>
		<el-input  v-model="channelId"></el-input>
		<el-input  v-model="userName"></el-input>
		<el-input  v-model="remoteUserName"></el-input>
		<el-button @click="info">获取设备信息</el-button>
		<el-input type="textarea" rows="2" :value="deviceInfo"></el-input>
		<el-button @click="getUserlist">获取用户列表</el-button>
		<el-input type="textarea" rows="2" :value="userlist"></el-input>
		<el-button @click="support">获取支持结果</el-button>
		<el-input type="textarea" rows="2" :value="supportInfo"></el-input>
		<el-button @click="openLocal">打开本地视频</el-button>
		<el-button @click="publishStream">推流</el-button>
		<el-button @click="openRemote">打开远程视频</el-button>
		<el-row>
			<el-col :span="11">
				<div class="local-video">
					本地视频:
					<video autoplay playsinline ref="localVideo"></video>
				</div>
			</el-col>
			<el-col :span="11">
				<div class="remote-video">
					远程视频:
					<video autoplay playsinline ref="remoteVideo"></video>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	var aliWebrtc = new window.AliRtcEngine();
	export default {
		name: 'videoRoom',
		data() {
			return {
				deviceInfo:'',
				userlist:'',
				supportInfo:'',
				userName:'184266506184509440',
				remoteUserName:'184389596193310720',
				channelId:'c64a4050-4b36-454b-ada1-9ac9b25a6f45'
			}
		},
		created(){
			console.log(this.$util.date.getTime());
			if(this.support()){
				console.log('初始化完成');
			}
		},
		methods:{
			info(){
					aliWebrtc.getDevices().then((re)=>{
					this.deviceInfo=JSON.stringify(re);
				}).catch((error)=>{ 
					alert(error.message)
				});
			},
			rtcAuth(){
				let _this = this;
				let apiUrl = 'https://mianshipower.com:9090/employ-aliyun-server/api/rtc/auth/token?roomid='+this.channelId+'&userid='+this.userName;
				const $http = _this.$axios.create({
					apiUrl
				});
				return new Promise(function (resolve, reject) {
					$http.get(apiUrl).then(response=>{
						_this.authInfo = JSON.stringify(response.data.data)
						console.log('5:'+JSON.stringify(response.data));
						response.data.data.channel = _this.channelId;
						console.log('7:'+JSON.stringify(response.data));
						resolve(response.data.data);
					}).catch(function (error) {
						console.log('error=>'+JSON.stringify(error));
						reject(error);
					});
				});
			},
			support(){
				aliWebrtc.isSupport().then(re => {
					this.supportInfo=JSON.stringify(re);
					console.log(this.supportInfo);
					return true;
				}).catch(error => {
					this.supportInfo=JSON.stringify(error);
				})
			},
			openLocal(){
				console.log(this.$refs.localVideo);
				
/* 				aliWebrtc.on("onJoin", (publisher) => {
					if(publisher.userId){
						console.log(publisher.userId);
					}
					//重置订阅状态
					//默认订阅远端音频和视频大流，但需要调用subscribe才能生效
					//这里取消默认订阅，根据需求进行订阅
					aliWebrtc.configRemoteAudio(publisher.userId, false);
					aliWebrtc.configRemoteCameraTrack(publisher.userId, false, false);
					// showAlert(publisher.displayName + "加入房间","success");
					console.log(publisher.displayName + "加入房间");
				}); */
				
				
				/* this.rtcAuth().then((authInfo) => {
					console.log('authInfo='+JSON.stringify(authInfo));
					//3. 加入房间 默认推音频视频流
					aliWebrtc.joinChannel(authInfo, userName).then(() => {
						console.log('加入房间成功');
						// 4. 发布本地流
						aliWebrtc.configLocalAudioPublish = true;
						aliWebrtc.configLocalCameraPublish = true;
						aliWebrtc.publish().then((res) => {
							console.log('1:'+JSON.stringify(res));
						}, (error) => {
							console.log('2:'+JSON.stringify(error));
						});
					}).catch((error) => {
						console.log('3:'+JSON.stringify(error));
					})
				}).catch((error) => {
					console.log(error);
					console.log('4:'+JSON.stringify(error));
				}); */
				aliWebrtc.startPreview(this.$refs.localVideo).then(() => {
					console.log("[开启预览成功]")
				}).catch((error) => { 
					console.log("[开启预览失败]"+ error.message);
				});
			},
			publishStream(){
				this.rtcAuth().then((authInfo) => {
					console.log('authInfo='+JSON.stringify(authInfo));
					//3. 加入房间 默认推音频视频流
					aliWebrtc.joinChannel(authInfo, this.userName).then(() => {
						console.log('加入房间成功');
						// 4. 发布本地流
						aliWebrtc.configLocalAudioPublish = true;
						aliWebrtc.configLocalCameraPublish = true;
						aliWebrtc.publish().then(() => {
							console.log('推流成功');
							/* console.log('1:'+JSON.stringify(res)); */
						}, (error) => {
							console.log('2:'+JSON.stringify(error));
						});
					}).catch((error) => {
						console.log('3:'+JSON.stringify(error));
					})
				}).catch((error) => {
					console.log(error);
					console.log('4:'+JSON.stringify(error));
				});
			},
			openRemote(){
				console.log("准备打开远程视频...");
				console.log(this.$refs.remoteVideo)
				aliWebrtc.configRemoteCameraTrack(this.remoteUserName, true, true);
				aliWebrtc.configRemoteAudio(this.remoteUserName, true);
				aliWebrtc.subscribe(this.remoteUserName).then(
					console.log('订阅成功')
				).catch((error) => {
					console.log('订阅失败'+error.message);
				});
				aliWebrtc.setDisplayRemoteVideo(this.remoteUserName, this.$refs.remoteVideo, 1);
			},
			getUserlist(){
				let userListTemp = aliWebrtc.getUserList();
				console.log('U:'+userListTemp); 
				this.userlist= JSON.stringify(userListTemp);
			},
			initialization(userId) {
				if (aliWebrtc) {
					aliWebrtc.configRemoteAudio(userId, false);
					aliWebrtc.configRemoteCameraTrack(userId, false, false);
					aliWebrtc.configRemoteScreenTrack(userId, false);
				}
			}
		}
	}
</script>
	
<style lang="less">
	.local-video{
		margin-left: 2vw;
		video{
			height: 40vh;
			width: 30vw;
			display: block;
			background-color: red;
		}
	}
	.remote-video{
		margin-left: 2vw;
		video{
			height: 40vh;
			width: 30vw;
			display: block;
			background-color: green;
		}
	}

</style>
