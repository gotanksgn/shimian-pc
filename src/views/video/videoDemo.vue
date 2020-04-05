<template>
	<div>
		<el-button @click="info">获取设备信息</el-button>
		<el-input type="textarea" rows="5" :value="deviceInfo"></el-input>
		<el-button @click="auth">获取鉴权信息</el-button>
		<el-input type="textarea" rows="5" :value="authInfo"></el-input>
		<el-button @click="open">打开视频</el-button>
		<div class="local-video">
			<video autoplay playsinline ref="localVideo"></video>
		</div>
	</div>
</template>

<script>
	var aliWebrtc = new window.AliRtcEngine();
	export default {
		name: 'videoRoom',
		data() {
			return {
				deviceInfo:'',
				authInfo:''
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
			auth(){
				let apiUrl = 'https://mianshipower.com:9090/employ-aliyun-video-server/api/aliyun/auth/token';
				apiUrl=apiUrl+'?roomid=111&userid=Demo';
				this.$axios.get(apiUrl).then(response=>{
					this.authInfo = JSON.stringify(response.data.data)
				}).catch(function (error) {
					console.log('error=>'+error)
				});
			},
			open(){
				console.log(this.$refs.localVideo);
				aliWebrtc.startPreview(this.$refs.localVideo).then((obj) => {
					console.log(obj)
				}).catch((error) => { 
					console.log("[开启预览失败]"+ error.message);
				});
			}
		}
	}
</script>
	
<style lang="less">
	.local-video{
		margin: 0 calc(50 / 1080 * 100vh);
		position: relative;
		video{
			height: calc(602 / 850 * 100vh);
			width: 100%;
			display: block;
			background-color: black;
		}
	}

</style>
