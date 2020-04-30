<template>
	<el-container>
		<el-main>
			<div class="video-room">
				<el-row>
					<el-col :span="7" class="userinfo" v-if="invitation">
							<el-row type="flex">
								<el-col :span="6">
									<div class="userinfo-label"><i class="el-icon-time"></i>面试时间</div>
								</el-col>
								<el-col :span="18">
									<div class="userinfo-text">{{invitation.appointmentTime}}</div>
								</el-col>
							</el-row>
							<el-row type="flex" >
								<el-col :span="6">
									<div class="userinfo-label">面试岗位</div>
								</el-col>
								<el-col :span="18">
									<div class="userinfo-text">{{invitation.position.position}}</div>
								</el-col>
							</el-row>
							<el-row type="flex">
								<el-col :span="6" class="userinfo-headimg">
									<el-avatar shape="square" :size="55" :src="invitation.info.profilePicture" @error="true">
										<img src="@/assets/img/job/headimg/head_999.png"/>
									</el-avatar>
								</el-col>
								<el-col :span="18" class="userinfo-nameinfo">
									<el-row type="flex" >
										<el-col :span="24">
											<div class="userinfo-nameinfo-name">{{invitation.info.fullname}}<i class="el-icon-female"></i><!-- <i class="el-icon-male" v-else></i> --></div>
										</el-col>
									</el-row>
									<el-row type="flex" >
										<el-col :span="24">
											<div class="userinfo-nameinfo-degree">{{invitation.resume.edus[0].degree}}/{{invitation.info.age}}岁</div>
										</el-col>
									</el-row>
								</el-col>	
							</el-row>
							<el-row type="flex" >
								<el-col :span="6">
									<div class="userinfo-label">联系方式</div>
								</el-col>
								<el-col :span="18">
									<div class="userinfo-text">{{invitation.info.phone}}</div>
								</el-col>
							</el-row>	
							<el-divider content-position="left"></el-divider>
							<div class="userinfo-work">
								<div v-for="(work, idx) in invitation.resume.works" :key="idx">
									<el-row type="flex">
										<el-col :span="24" class="userinfo-work-company">
											{{work.company}}
										</el-col>
									</el-row>
									<el-row type="flex">
										<el-col :span="24" class="userinfo-work-job">
											<el-tag type="danger" size="small"><i class="el-icon-time"></i> {{work.workTime[0]}} ~ <i class="el-icon-time"></i> {{work.workTime[1]}}</el-tag>
											<el-tag size="small">{{work.positionType}}</el-tag>
										</el-col>	
									</el-row>
									<el-row type="flex">
										<el-col :span="24" class="userinfo-work-desc">
											<p>{{work.duty}}</p>
										</el-col>	
									</el-row>
								</div>
							</div>
					</el-col>	
					<el-col :span="14" :offset="1">
						<el-row type="flex">
							<el-col :span="18">
								<div class="rtcRemoteVideoBox">
									<video autoplay playsinline ref="remoteVideo" class="rtcRemoteVideo"></video>
								</div>
							</el-col>	
							<el-col :span="6">
								<div class="rtcLocalVideoBox">	
									<video autoplay playsinline ref="localVideo" class="rtcLocalVideo"></video>
								</div>	
							</el-col>
							<div class="video-run-info" v-if="videoStatus=='checking'">
								<el-row type="flex">
									<el-col :span="24">
										<p class="video-run-info-title">面试官，欢迎参加此次面试</p>
									</el-col>
								</el-row>
								<el-row type="flex">
									<el-col :span="24">
										<p class="video-run-info-sectitle">{{videoEnterInfo}}</p>
									</el-col>
								</el-row>
								<el-row type="flex">
									<el-col :span="24" class="video-run-info-check">
										<el-row type="flex">
											<el-col :span="3" :offset="10">
												<p class="video-run-info-check-label">协议检测</p>
											</el-col>
											<el-col :span="2">	
												<p class="video-run-info-check-text" :class="checkStatus(supportCheck.https)">[{{supportCheck.https}}]</p>
											</el-col>	
										</el-row>
										<el-row type="flex">
											<el-col :span="3" :offset="10">
												<p class="video-run-info-check-label">浏览器检测</p>
											</el-col>
											<el-col :span="4">	
												<p class="video-run-info-check-text" :class="checkStatus(supportCheck.browser)">[{{supportCheck.browser}}]</p>
											</el-col>	
										</el-row>
										<el-row type="flex">
											<el-col :span="3" :offset="10">
												<p class="video-run-info-check-label">音频设备检测</p>
											</el-col>
											<el-col :span="4">	
												<p class="video-run-info-check-text" :class="checkStatus(supportCheck.audio)">[{{supportCheck.audio}}]</p>
											</el-col>	
										</el-row>
										<el-row type="flex">
											<el-col :span="3" :offset="10">
												<p class="video-run-info-check-label">视频设备检测</p>
											</el-col>
											<el-col :span="4">	
												<p class="video-run-info-check-text" :class="checkStatus(supportCheck.video)">[{{supportCheck.video}}]</p>
											</el-col>	
										</el-row>																				
									</el-col>	
								</el-row>	
							</div>
							<div class="video-run-info" v-else-if="videoStatus=='waiting' || videoStatus=='connecting'">
								<el-row type="flex">
									<el-col :span="24">
										<p class="video-run-info-wait">{{waitInfo}}</p>
									</el-col>
								</el-row>
							</div>	
						</el-row>
					</el-col>
				</el-row>
				<div class="video-room-btns" v-if="videoStatus!='checking'">
					<el-row>
						<el-col :span="8" :offset="3">
							<el-button type="danger" @click="callUser()" :loading="callingFlag"  size="small" round icon="el-icon-phone" v-if="videoStatus=='waiting'">{{callingFlag?'呼叫中...':'呼叫'}}</el-button>
							<el-button type="danger" @click="connectVideo()" :loading="callingFlag"  size="small" round icon="el-icon-video-camera" v-else-if="videoStatus=='connecting'">{{callingFlag?'连接中...':'开始面试'}}</el-button>
							<el-button type="danger" @click="cancelVideoConfirm()" :loading="callingFlag" size="small" round icon="el-icon-switch-button" v-else>{{callingFlag?'挂断中...':'挂断'}}</el-button>
							<!-- <el-button type="warning" @click="remark()" size="small" icon="el-icon-edit" round>备注</el-button> -->
						</el-col>
						<el-col :span="4" :offset="8" class="video-room-btns-video">
							<el-link icon="el-icon-camera-solid" :underline="false" v-if="videoOpen" title="关闭本地视频" type="danger" @click="closeLocalVideo"></el-link>
							<el-link icon="el-icon-camera-solid" :underline="false" v-else title="打开本地视频" type="info" @click="openLocalVideo"></el-link>
							<el-popover placement="top" width="200" trigger="click">
									音量调节<el-slider v-model="micVol"></el-slider>
									<el-link icon="el-icon-set-up" slot="reference" :underline="false"  title="音量调节" type="warning"></el-link>
							</el-popover>
							<el-link icon="el-icon-microphone" :underline="false" v-if="micOpen" @click="micSwitch" title="麦克风开关" type="primary"></el-link>
							<el-link icon="el-icon-turn-off-microphone" :underline="false" class="video-room-btns-closemirc" v-else @click="micSwitch" title="麦克风开关" type="info"></el-link>
						</el-col>	
					</el-row>	
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import {rtcAuthApi} from '@/api/videoFun.js'
	import {pushCallApi} from '@/api/interviewFun.js'
	//定义aliWebrtc服务
	var aliWebrtc = new window.AliRtcEngine();
	//订阅用户调度
	var loopSubScribeUserInterval;
	export default {
		name: 'videoRoom',
		data() {
			return {
				videoStatus:'checking',
				micVol:45,
				micOpen:true,
				videoOpen:false,
				videoEnterInfo:'检测通过后即可进行视频面试',
				supportCheck:{
					isSupported:'',
					https:'检测中',
					browser:'检测中',
					audio:'检测中',
					video:'检测中'
				},
				callingFlag:false
			}
		},
		computed:{
			invitation:{
				get(){
					return this.$store.state.video.currentInvitation;
				},
				set(v){
					this.$store.commit("video/setCurrentInvitation",v);
				}
			},
			caller(){
				return{
					invitationId:this.invitation.id,
					roomId:this.invitation.roomId,
					sourceClientId:'cli_'+this.invitation.staff.phone,
					sourceId:this.invitation.staff.id,
					sourcePhone:this.invitation.staff.phone,
					sourceType: "web",
					targetType: "app",
					targetId:this.invitation.info.id,
					targetPhone:this.invitation.info.phone
				}
			},
			waitInfo(){
				return this.videoStatus=='connecting'?"面试人已加入房间":"等待面试人进入面试间"
			}
		},
		watch:{
			
		},
		beforeDestroy(){
			//离开频道
			this.leaveChannel().then(()=>this.closeLocalVideo());
		},
		methods:{
			init(){
				this.initWebRtc().then(authInfo=>this.initGoEasyMsg().then(()=>{
					//打开本地视频
					this.openLocalVideo();
					//加入房间,成功后轮询查用户订阅
					//this.joinChannel(authInfo).then(()=>this.publishStream(true,true).then(()=>this.loopSubScribeUser()));
					//只加入房间
					this.joinChannel(authInfo);
				}).catch(error=>{
					//goeasy初始化失败
					console.log("goeasy_error=>"+JSON.stringify(error));
				})).catch(error=>{
					//webrtc初始化失败
					console.log("webrtc_error=>"+JSON.stringify(error));
				})
			},
			initGoEasyMsg(){
				let _this = this;
				return new Promise((resolve)=> {
					this.$goEasy.subscribe({
					channel: this.caller.sourceClientId,
						onMessage: function (message) {
							console.log("您有新消息：channel：" + message.channel + " 内容：" + message.content);
							let obj = JSON.parse(message.content);
							console.log(obj);
							if(_this.videoStatus=='waiting' && obj.action=='JOIN'){
								_this.videoStatus='connecting';
								_this.callingFlag=false;
							}else if(obj.action=='LEAVE'){
								_this.videoStatus='waiting';
							}else{
								// do nothing
							}
						},
						onSuccess: function () {
							console.log("Channel订阅成功。");
						},
						onFailed: function (error) {
							console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
						}
					});
					resolve();
				});
			},
			initWebRtc(){
				return new Promise((resolve, reject)=> {
					aliWebrtc.isSupport().then((res)=> {
						/* console.log("this.caller.roomId="+this.caller.roomId+",this.caller.sourceId="+this.caller.sourceId); */
						this.setSupportInfo(res).then(()=>{
							//获取授权信息
							this.rtcAuth(this.caller.roomId,this.caller.sourceId).then(authInfo=>{
								//有用户加入房间时
								aliWebrtc.on("onJoin", (publisher) => {
									console.log("用户加入房间:"+publisher.displayName);
								});
								//用户离开房间
								aliWebrtc.on("onLeave", (publisher) => {
									console.log("用户离开房间:"+publisher.displayName);
								});
								//用户推流
								aliWebrtc.on("onPublisher", (publisher) => {
									console.log("用户开启视频:"+publisher.displayName);
									this.subScribeUser(publisher.displayName);
								});
								//用户关闭推流
								aliWebrtc.on("onUnPublisher", (publisher) => {
									console.log("用户关闭视频:"+publisher.displayName);
								});
								//用户被退出
								aliWebrtc.on("onBye",(message) =>{
									var msg;
									switch (message.code) {
										case 1: msg = "被服务器踢出";
										break;
										case 2: msg = "频道关闭";
										break;
										case 3: msg = "您在其他端已登录,已将其它端踢下线";
										break;
										default: msg = "onBye";
									}
									this.$message.error(msg);
									console.log("被退出:"+msg);
								});
								//用户异常
								aliWebrtc.on("onError", (error) => {
									var msg = error && error.message ? error.message : error;
									if (msg && msg.indexOf("no session") > -1) {
										//登陆异常，需要重登陆
										msg = "请重新登录：" + msg;
									}else if(error.code == 15) {
										msg = "没有开启H5兼容";
									}else if(error.type === "publish") {
										//推流异常，需要重新推流
										msg = "推流异常";
									}else if(error.type === "subscribe") {
										//订阅异常，需要重订阅
										msg = "订阅异常"
									}
									this.$message.error(msg);
									console.log("用户异常:"+msg);
								});
								resolve(authInfo);
							}).catch(err=>reject(err));
						});
					}).catch(err=>{
						this.setSupportInfo(err).then(()=>reject(err));
					})
				});
			},
			loopSubScribeUser(){
				loopSubScribeUserInterval = setInterval(()=>setTimeout(()=>{
					let userList= aliWebrtc.getUserList();
					if(userList && userList.length>0){
						let user = userList[0];
						//订阅该用户
						console.log("user=>"+JSON.stringify(user));
						if(user && user.streamConfigs && user.streamConfigs.length>0){
							let videoSub =  user.streamConfigs.filter(e=>e.label=='sophon_video_camera_large')[0];
							if(videoSub.state=='active'){
								if(videoSub.subscribed==false){
									this.subScribeUser(user.userId);
								}else{
									console.log("已订阅,无需订阅");
								}
							}else{
								console.log("用户未开视频");
							}
						}
					}else{
						console.log("当前无用户在线");
					}
				},0),5000);				
			},			
			micSwitch(){
				this.micOpen = !this.micOpen;
			},
			checkStatus(status){
				if(status=='检测中'){
					return 'video-run-info-check-text-wait';
				}else if(status=='通过'){
					return 'video-run-info-check-text-success';
				}else if(status=='不通过'){
					return 'video-run-info-check-text-error';
				}else{
					return 'video-run-info-check-text-error';
				}
			},
			setSupportInfo(result){
				return new Promise((resolve)=>{
					const checkDics=['https','browser','audio','video'];
					let idx = 0;
					let interval = setInterval(() => {
						if(idx==checkDics.length){
							this.supportCheck.isSupported=result.isSupported;
							clearInterval(interval);
							resolve();
						}else{
							if(checkDics[idx]=='https'){
								if(result.errorCode==10021){
									this.supportCheck.https="不通过";
								}else{
									this.supportCheck.https="通过";
								}
							}else if(checkDics[idx]=='browser'){
								if(result.errorCode==10024 || result.errorCode==10020 || result.browser!='Chrome'){
									this.supportCheck.browser='不通过';
								}else{
									this.supportCheck.browser='通过';
								}
							}else if(checkDics[idx]=='audio'){
								this.supportCheck.audio = result.audioDevice?'通过':'不通过';
							}else if(checkDics[idx]=='video'){
								this.supportCheck.video = result.videoDevice?'通过':'不通过';
							}
						}
						idx++;
					},500);
				});
			},
			rtcAuth(roomid,userid){
				/* console.log("roomid="+roomid+",userid="+userid); */
				return new Promise((resolve, reject)=> {
					rtcAuthApi({"roomid":roomid,"userid":userid}).then(response=>{
						response.data.channel = roomid;
						resolve(response.data);
					}).catch(function (error) {
						reject(error);
					});
				});
			},
			joinChannel(authInfo){
				return new Promise((resolve, reject)=> {
					aliWebrtc.joinChannel(authInfo, this.caller.sourceId).then(() => {
						pushCallApi({
							"sourceClientId":this.caller.sourceClientId,
							"targetPhone":this.caller.targetPhone,
							"action":'JOIN',
							"sourceType": this.caller.sourceType,
							"targetType": this.caller.targetType,
							"timestamp":this.$util.date.getTime(),
							"invitationId":this.caller.invitationId
						}).then(()=>{
							//this.$message("加入房间成功");
							resolve();
						});
					}).catch(error=>{
						console.log("加入房间失败");
						reject(error);
					})
				});
			},
			leaveChannel(){
				return new Promise((resolve, reject)=> {
					aliWebrtc.leaveChannel().then(()=>{
						pushCallApi({
							"sourceClientId":this.caller.sourceClientId,
							"targetPhone":this.caller.targetPhone,
							"action":'LEAVE',
							"sourceType": this.caller.sourceType,
							"targetType": this.caller.targetType,
							"timestamp":this.$util.date.getTime(),
							"invitationId":this.caller.invitationId
						}).then(()=>{
							//this.$message("离开房间成功");
							resolve();
						});
					}).catch(error=>{
						console.log("离开房间失败");
						reject(error);
					});
				});
			},
			publishStream(audioSwitch,CameraSwitch){
				return new Promise((resolve, reject)=> {
					this.micOpen=audioSwitch;
					this.videoOpen=CameraSwitch;
					aliWebrtc.configLocalAudioPublish = audioSwitch;
					aliWebrtc.configLocalCameraPublish = CameraSwitch;
					aliWebrtc.publish().then(() => {
						//this.$message("推流成功");
						resolve();
					}, (error) => {
						console.log('推流失败');
						reject(error);
					});
				});
			},
			subScribeUser(remoteUserName){
				aliWebrtc.configRemoteCameraTrack(remoteUserName, true, true);
				aliWebrtc.configRemoteAudio(remoteUserName, true);
				aliWebrtc.subscribe(remoteUserName).then(()=>{
					this.$message({message:"用户已拨通,即将开始面试",type: 'success'});
					this.callingFlag=false;
					this.videoStatus='done';
					clearInterval(loopSubScribeUserInterval);
				}).catch((error) => {
					console.log('订阅失败'+error.message);
				});
				aliWebrtc.setDisplayRemoteVideo(remoteUserName, this.$refs.remoteVideo, 1);				
			},
			unSubscribeUser(remoteUserName){
				aliWebrtc.unSubscribe(remoteUserName).then(()=>{
					
				}).catch(error=>{
					console.log('退订失败'+error.message);
				})
			},
			openLocalVideo(){
				aliWebrtc.startPreview(this.$refs.localVideo).then(() => {
					this.videoStatus='waiting';
					this.videoOpen=true;
					//this.$message("已打开本地视频");
				}).catch((error) => { 
					console.log("[打开本地视频失败]"+ error.message);
				}); 
			},
			closeLocalVideo(){
				aliWebrtc.stopPreview(this.$refs.localVideo).then(() => {
					//this.$message("已关闭本地视频");
					this.videoOpen=false;
				}).catch((error) => { 
					console.log("[关闭本地视频成功]"+ error.message);
				});
			},
			callUser(){
				this.callingFlag=true;
				pushCallApi({
					"sourceClientId":this.caller.sourceClientId,
					"targetPhone":this.caller.targetPhone,
					"action":'CALL',
					"sourceType": this.caller.sourceType,
					"targetType": this.caller.targetType,
					"timestamp":this.$util.date.getTime(),
					"invitationId":this.caller.invitationId
				}).then(()=>{
					setTimeout(()=>{
						if(this.videoStatus=='waiting'){
							this.$message.error("未拨通用户,呼叫挂断");
							this.cancelVideo();
						}
					},60000);
				}).catch(error=>{
					console.log(JSON.stringify(error));
				});
			},
			connectVideo(){
				this.callingFlag=true;
				this.publishStream(true,true).then(()=>{
					this.startVideo().then(()=>{
						this.loopSubScribeUser();
					});
				});
			},
			cancelVideoConfirm(){
				this.$confirm('您要挂断该次通话', '挂断提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					this.cancelVideo();
				});
			},
			startVideo(){
				return new Promise((resolve)=> {
					pushCallApi({
						"sourceClientId":this.caller.sourceClientId,
						"targetPhone":this.caller.targetPhone,
						"action":'START',
						"sourceType": this.caller.sourceType,
						"targetType": this.caller.targetType,
						"timestamp":this.$util.date.getTime(),
						"invitationId":this.caller.invitationId
					}).then(()=>{
						resolve();
					});
				});
			},
			cancelVideo(){
				this.callingFlag = true;
				pushCallApi({
					"sourceClientId":this.caller.sourceClientId,
					"targetPhone":this.caller.targetPhone,
					"action":'HANGUP',
					"timestamp":this.$util.date.getTime(),
					"invitationId":this.caller.invitationId
				}).then(()=>{
					this.publishStream(false,false).then(()=>{
						setTimeout(()=>{
							this.callingFlag = false;
							this.videoStatus='connecting';
						},2000);
					})
				}).catch(error=>{
					console.log(JSON.stringify(error))
				});
			}
		},
		// 注册组件
		components: {
		}
		
	}
</script>
	
<style lang="less">
	.video-room{
		background: #FFFFFF;
		margin: 2vh 2vw;
		border-radius: 2rem;
		height: 85vh;
		.userinfo{
			margin: 2vh 0vw 0vh 5vw;
			.el-row{
				margin-top: 1vh;
				font-size: 0.85rem;
				color: #666666;
				.userinfo-label{
					color: #333333;
					font-weight: bold;
					text-align: left;
					i{
						position: absolute;
						font-weight: bolder;
						left: -1.1rem;
						top:0.2rem;
					}
				}
				.userinfo-text{
				}
				.userinfo-headimg{
					text-align: left;
				}
				.userinfo-nameinfo{
					text-align: left;
					.el-icon-male{
						margin: 0vh 1vw;
						font-weight: bolder;
						color:#ffaaff;
					}
					.el-icon-female{
						margin: 0vh 1vw;
						font-weight: bolder;
						color:#00aaff;
					}
					.userinfo-nameinfo-name{
						font-size: 1rem;
						
					}
					.userinfo-nameinfo-degree{
						font-size: 0.75rem;
					}
				}
			}
			.userinfo-work{
				height: 40vh;
				overflow-y: scroll;
				.userinfo-work-company{
					
				}
				.userinfo-work-job{
					.el-tag{
						margin: 0em 1em 0em 0em;
					}
				}
				.userinfo-work-desc{
					font-size: 0.8em;
				}
			}
		}	
		.rtcRemoteVideoBox{
			background-color: #000000;
			border: 0.1em solid #000000;
			height: 70vh;
			box-shadow: 0.1em 0.1em 0.1em 0.1em #000000;
			position: relative;
			.rtcRemoteVideo{
				object-fit: cover;
				height: calc(600 / 850 * 100vh);
				width: 100%;
				display: block;
				background-color: #000000;
			}
		}
		.rtcLocalVideoBox{
			background-color: #000000;
			border: 0.1em solid #000000;
			height: 70vh;
			box-shadow: 0.1em 0.1em 0.1em 0.1em #000000;
			position: relative;
			.rtcLocalVideo{
				/* height: calc(602 / 850 * 100vh); */
				width: 100%;
				display: block;
				background-color: #000000;
			}
		}
		
		.video-run-info{
			width: 100%;
			position: absolute;
			text-align: center;
			.video-run-info-title{
				font-size: 1.5rem;
				font-weight: bolder;
				color: #FFFFFF;
			}
			.video-run-info-sectitle{
				font-size: 1rem;
				color: #AAAAAA;
			}
			.video-run-info-check{
				text-align: left;
				.video-run-info-check-label{
					font-size: 0.75em;
					color: #F3F6F8;
				}
				.video-run-info-check-text{
					font-size: 0.75em;
					color: #F3F6F8;
				}
				.video-run-info-check-text-success{
					color:#42B983;
				}
				.video-run-info-check-text-error{
					color:#FF0000;
				}
				.video-run-info-check-text-wait{
					color:#FFDC36;
				}
			}
			.video-run-info-wait{
				font-size: 1.5rem;
				font-weight: bolder;
				color: #FFFFFF;
				margin-top: 10rem;
			}
			
		}
		
		.video-room-btns{
			.video-room-btns-video{
				text-align: right;
				.el-link{
					margin-right: 1em;
					font-size: 1.5em;
				}
			}
			.video-room-btns-closemirc{
				color:#AAAAAA;
			}
			.video-room-btns-closevideo{
				
			}
		}
	}
</style>
