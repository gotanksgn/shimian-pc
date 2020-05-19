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
							<el-button type="danger" @click="cancelVideoConfirm()" :loading="callingFlag" size="small" round icon="el-icon-switch-button" v-else-if="videoStatus=='done'">{{callingFlag?'挂断中...':'挂断'}}</el-button>
							<!-- <el-button type="warning" @click="remark()" size="small" icon="el-icon-star-on" v-else-if="videoStatus=='finish'" round>评价</el-button> -->
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
	import {authOtpApi} from '@/api/pushFun.js'
	// 引入goeasy
	import GoEasy from 'goeasy';
	// 定义goeasy全局变量
	var $goEasy;
	// 定义aliWebrtc服务
	var aliWebrtc = new window.AliRtcEngine();
	// 订阅用户调度
	var loopSubScribeUserInterval;
	// 呼叫超时调度
	var callingTimeout;
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
					sourceChannel:'invitation#'+this.invitation.staff.phone+"#1",
					sourceId:this.invitation.staff.id,
					sourcePhone:this.invitation.staff.phone,
					sourceType: "web",
					targetType: "app",
					targetId:this.invitation.info.id,
					targetPhone:this.invitation.info.phone,
					targetChannel:'invitation#'+this.invitation.info.phone+"#2"
				}
			},
			waitInfo(){
				return this.videoStatus=='connecting'?"面试人已加入房间":"等待面试人进入面试间"
			}
		},
		watch:{
			
		},
		beforeDestroy(){
			//关闭呼叫
			clearTimeout(callingTimeout);
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
					authOtpApi().then(res=>{
						console.log("goeasy-auto:"+JSON.stringify(res));
						console.log("goeasy-token:"+res.data);
						$goEasy = new GoEasy({
							host:'hangzhou.goeasy.io',
							appkey: 'PC-6480848211034de79bfbe5df7919f59e', 
							otp:res.data,
							onConnected: function() {
								console.log('[GOEASY]:连接成功')
							},
							onDisconnected: function() {
								console.log('[GOEASY]:连接断开')
							},
							onConnectFailed: function(error) {
								console.log('[GOEASY]:连接失败或错误,'+JSON.stringify(error))
							}
						});
						$goEasy.subscribe({
							channel: this.caller.sourceChannel,
								onMessage: function (message) {
									console.log("[GOEASY]:您有新消息：channel：" + message.channel + " 内容：" + message.content);
									let obj = JSON.parse(message.content);
									console.log(obj);
									if(_this.videoStatus=='waiting' && obj.action=='JOIN'){//加入房间
										_this.videoStatus='connecting';
										_this.callingFlag=false;
									}else if(obj.action=='ACCEPT'){
										_this.$message({
											message: '面试人已接受面试邀请',
											type:'success',
										});
									}else if(obj.action=='REFUSE'){
										_this.$message({
											message: '面试人拒绝了面试邀请',
											type:'error',
										});
									}else if(obj.action=='LEAVE'){//离开房间
										_this.videoStatus='waiting';
									}else if(obj.action=='FINISH'){//结束面试
										_this.videoStatus='finish';
									}
								},
								onSuccess: function () {
									console.log("[GOEASY]:订阅成功");
								},
								onFailed: function (error) {
									console.log("[GOEASY]:订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
								}
							}
						);
						resolve();
					});
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
									console.log("[RTC]:用户加入房间:"+publisher.displayName);
								});
								//用户离开房间
								aliWebrtc.on("onLeave", (publisher) => {
									console.log("[RTC]:用户离开房间:"+publisher.displayName);
								});
								//用户推流
								aliWebrtc.on("onPublisher", (publisher) => {
									console.log("[RTC]:用户开启视频:"+publisher.displayName);
									this.subScribeUser(publisher.displayName);
								});
								//用户关闭推流
								aliWebrtc.on("onUnPublisher", (publisher) => {
									console.log("[RTC]:用户关闭视频:"+publisher.displayName);
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
									console.log("[RTC]:被退出:"+msg);
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
									console.log("[RTC]:用户异常:"+msg);
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
									console.log("[RTC]:已订阅,无需订阅");
								}
							}else{
								console.log("[RTC]:用户未开视频");
							}
						}
					}else{
						console.log("[RTC]:当前无用户在线");
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
				return new Promise((resolve, reject)=> {
					rtcAuthApi({"roomid":roomid,"userid":userid}).then(response=>{
						response.data.channel = roomid;
						console.log("[RTC]:获取鉴权成功");
						resolve(response.data);
					}).catch(function (error) {
						reject(error);
					});
				});
			},
			joinChannel(authInfo){
				return new Promise((resolve)=> {
					aliWebrtc.joinChannel(authInfo, this.caller.sourceId).then(() => {
						this.publishGoEasy('JOIN').then(()=>{
							console.log("[RTC]:加入房间成功");
							resolve();
						});
					});
				});
			},
			leaveChannel(){
				return new Promise((resolve, reject)=> {
					aliWebrtc.leaveChannel().then(()=>{
						this.publishGoEasy('LEAVE').then(()=>{
							console.log("[RTC]:离开房间成功");
							resolve();
						});
					}).catch(error=>{
						console.log("[RTC]:离开房间失败");
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
						console.log("[RTC]:推流成功");
						resolve();
					}, (error) => {
						console.log('[RTC]:推流失败');
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
					clearTimeout(callingTimeout);
					console.log('[RTC]:订阅成功');
				}).catch((error) => {
					clearTimeout(callingTimeout);
					console.log('[RTC]:订阅失败'+error.message);
				});
				aliWebrtc.setDisplayRemoteVideo(remoteUserName, this.$refs.remoteVideo, 1);				
			},
			unSubscribeUser(remoteUserName){
				return new Promise((resolve, reject)=> {
					aliWebrtc.unSubscribe(remoteUserName).then(()=>{
						resolve();
					}).catch(error=>{
						reject(error);
						console.log('[RTC]:退订失败'+error.message);
					})
				});
			},
			openLocalVideo(){
				aliWebrtc.startPreview(this.$refs.localVideo).then(() => {
					this.videoStatus='waiting';
					this.videoOpen=true;
					console.log("[LOCAL]:已打开本地视频");
				}).catch((error) => { 
					console.log("[LOCAL]:打开本地视频失败,"+ error.message);
				}); 
			},
			closeLocalVideo(){
				aliWebrtc.stopPreview(this.$refs.localVideo).then(() => {
					console.log("[LOCAL]:已关闭本地视频");
					this.videoOpen=false;
				}).catch((error) => { 
					console.log("[LOCAL]:关闭本地视频失败"+ error.message);
				});
			},
			callUser(){
				this.callingFlag=true;
				this.publishGoEasy('CALL').then(()=>{
					callingTimeout=setTimeout(()=>{
						if(this.videoStatus=='waiting'){
							this.$message.error("未拨通用户,呼叫挂断");
							this.cancelVideo();
						}
					},60000);
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
					this.publishGoEasy('START').then(()=>{
						resolve();
					});
				});
			},
			cancelVideo(){
				this.callingFlag = true;
				this.publishGoEasy('CANCEL').then(()=>{
					this.publishStream(false,false).then(()=>{
						this.unSubscribeUser(this.caller.targetId);
						setTimeout(()=>{
							this.callingFlag = false;
							this.videoStatus='connecting';
						},2000);
					})
				}).catch(error=>{
					console.log(JSON.stringify(error))
				});
			},
			publishGoEasy(action){
				return new Promise((resolve)=> { 
					if($goEasy && $goEasy!=undefined){
						$goEasy.publish({
							channel: action=='CALL'?this.caller.targetChannel+"#call":this.caller.targetChannel, 
							message: JSON.stringify({
								action:action,
								role:2,
								invitationId:this.caller.invitationId,
								timestamp:this.$util.date.getTime()
							})
						});
					}else{
						this.initGoEasyMsg().then(()=>{
							this.publishGoEasy(action);
						})
					}
					resolve();
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
