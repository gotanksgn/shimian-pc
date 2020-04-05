<template>
	<el-container>
		<el-header>
			<page-head loginStatus></page-head>
		</el-header>
		<el-main>
			<div class="video-room">
				<el-row>
					<el-col :span="7" class="userinfo">
							<el-row type="flex">
								<el-col :span="6">
									<div class="userinfo-label"><i class="el-icon-time"></i>面试时间</div>
								</el-col>
								<el-col :span="18">
									<div class="userinfo-text">{{userForm.appointtime}}</div>
								</el-col>
							</el-row>
							<el-row type="flex" >
								<el-col :span="6">
									<div class="userinfo-label">面试岗位</div>
								</el-col>
								<el-col :span="18">
									<div class="userinfo-text">{{userForm.job}}</div>
								</el-col>
							</el-row>
							<el-row type="flex" >
								<el-col :span="6" class="userinfo-headimg">
									<el-avatar shape="square" :size="65" :src="userForm.headimg"></el-avatar>
								</el-col>
								<el-col :span="18" class="userinfo-nameinfo">
									<el-row type="flex" >
										<el-col :span="24">
											<div class="userinfo-nameinfo-name">{{userForm.name}}<i class="el-icon-female" v-if="userForm.sex=='男'"></i><i class="el-icon-male" v-else></i></div>
										</el-col>
									</el-row>
									<el-row type="flex" >
										<el-col :span="24">
											<div class="userinfo-nameinfo-degree">{{userForm.degree}}/{{userForm.age}}岁</div>
										</el-col>
									</el-row>
								</el-col>	
							</el-row>
							<el-row type="flex" >
								<el-col :span="6">
									<div class="userinfo-label">联系方式</div>
								</el-col>
								<el-col :span="18">
									<div class="userinfo-text">{{userForm.phone}}</div>
								</el-col>
							</el-row>	
							<el-divider></el-divider>
							<div class="userinfo-work">
								<div v-for="(item, idx) in userForm.work" :key="idx">
									<el-row type="flex">
										<el-col :span="24" class="userinfo-work-company">
											{{item.company}}
										</el-col>
									</el-row>
									<el-row type="flex">
										<el-col :span="24" class="userinfo-work-job">
											<el-tag type="danger"><i class="el-icon-time"></i> {{item.starttime}} ~ <i class="el-icon-time"></i> {{item.endtime}}</el-tag>
											<el-tag>{{item.job}}</el-tag>
										</el-col>	
									</el-row>
									<el-row type="flex">
										<el-col :span="24" class="userinfo-work-desc">
											<p>{{item.desc}}</p>
										</el-col>	
									</el-row>
								</div>
							</div>
					</el-col>	
					<el-col :span="15">
						<div class="rtcVideoBox">
							<video autoplay playsinline ref="localVideo" class="rtcVideo"></video>
							<div class="video-run-info">
								<el-row type="flex">
									<el-col :span="24">
										<p class="video-run-info-title">面试官，欢迎参加此次面试</p>
									</el-col>
								</el-row>
								<el-row type="flex">
									<el-col :span="16" :offset="10">
										<el-progress :percentage="75" :stroke-width="20"  text-inside  status="exception" :format="videoProcessFormat"></el-progress>
									</el-col>
								</el-row>
								<el-row type="flex">
									<el-col :span="10" :offset="13">
										<p class="video-run-info-sectitle">检测通过后即可进入面试间</p>
									</el-col>
								</el-row>
								<el-row type="flex">
									<el-col :span="24">
										<el-row type="flex">
											<el-col :span="4" :offset="14">
												<p class="video-run-info-check-label">浏览器检测</p>
											</el-col>
											<el-col :span="4">	
												<p class="video-run-info-check-text video-run-info-check-text-success">[通过]</p>
											</el-col>	
										</el-row>
										<el-row type="flex">
											<el-col :span="4" :offset="14">
												<p class="video-run-info-check-label">音频设备检测</p>
											</el-col>
											<el-col :span="4">	
												<p class="video-run-info-check-text video-run-info-check-text-error">[不通过]</p>
											</el-col>	
										</el-row>
										<el-row type="flex">
											<el-col :span="4" :offset="14">
												<p class="video-run-info-check-label">视频设备检测</p>
											</el-col>
											<el-col :span="4">	
												<p class="video-run-info-check-text video-run-info-check-text-wait">[检测中...]</p>
											</el-col>	
										</el-row>																				
									</el-col>	
								</el-row>	
							</div>
						</div>
					</el-col>
				</el-row>
				<div class="video-room-btns">
					<el-row>
						<el-col :span="9" class="video-room-btns-call">
							<el-button type="danger">呼叫</el-button>
						</el-col>
						<el-col :span="6" class="video-room-btns-mark">
							<el-button type="primary" >面试备注</el-button>
						</el-col>
						<el-col :span="7" class="video-room-btns-video">
							<el-popover placement="top" width="200" trigger="click">
								音量调节<el-slider v-model="micVol"></el-slider>
								<el-link icon="el-icon-set-up" :underline="false" slot="reference" title="音量调节"></el-link>
							</el-popover>
							<el-link icon="el-icon-microphone" :underline="false" v-if="openMic" @click="micSwitch" title="麦克风开关"></el-link>
							<el-link icon="el-icon-turn-off-microphone" :underline="false" class="video-room-btns-closemirc" v-else @click="micSwitch" title="麦克风开关"></el-link>
							<el-button icon="el-icon-phone" class="video-room-btns-closevideo" circle type="danger" size="mini" title="挂断"></el-button>
						</el-col>
					</el-row>	
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
		name: 'videoRoom',
		data() {
			return {
				userForm:{
					name:'张小美',
					age:32,
					degree:'本科',
					sex:'女',
					phone:'13888988888',
					appointtime:'2020-04-02 14:00:00',
					job:'研发总监',
					headimg:require('@/assets/img/job/headimg/head_1.png'),
					work:[
						{
							company:"北京神州泰岳软件股份有限公司",
							starttime:"2018-04",
							endtime:"至今",
							job:"研发经理",
							desc:"工作概述：中国移动设计院财务集中报账平台项目是中国移动设计院本部和下属十多个分院在财务报账应用上的共享和协同财务系统。平台功能包括报账单录入、提交、审批、查询、统计分析、系统管理等功能，满足了各级用户的定制需求。与客户沟通协调，深挖用户需求，进行需求分析，完成产品原型设计和需求评审。做好需求管理工作，划分需求优先级，合理安排定期更新内容。独立完成项目相关文档的编写，包括PRD 、流程图、业务数据、历史数据、定期报表等。并负责系统运维实施、功能验证、测试工作。"
						},
						{
							company:"长春蓝色快车计算机工程技术有限公司",
							starttime:"2011-09",
							endtime:"2018-04",
							job:"研发工程师",
							desc:"工作概述：根据项目需求进行概要设计和详细设计，通过JAVA/ECLIPS/DB2完成功能开发。工作职责:在北京移动设计院CMDI-财务集中报账平台1期项目中完成报账和查询模块的功能开发。在电网金融服务信息平台设计及信息发布系统建设研究项目中完成CMS模块开发。在北京电信计费帐务系统话批改造项目中负责运维支持 。"
						},
					]
				},
				micVol:45,
				openMic:true
			}
		},
		computed:{
			
		},
		methods:{
			videoProcessFormat(percentage) {
				if(percentage<100){
					return "正在检测您的网络,请稍后...";
				}else{
					return "检测完成";
				}
				
			},
			micSwitch(){
				this.openMic = !this.openMic;
			}
		},
		// 注册组件
		components: {
			pageHead,
			pageFooter
		}
		
	}
</script>
	
<style lang="less">
	.video-room{
		width: 90vw;
		min-height: 85vh;
		background: #ffffff;
		border-radius: 2rem;
		margin: 3vh 0vw 3vh 3vw;
		.userinfo{
			margin: 2vh 0rem 0rem 5vw;
			.el-row{
				margin-top: 1vh;
				font-family: PingFang SC;
				.userinfo-label{
					font-size: 0.75rem;
					text-align: left;
					i{
						position: absolute;
						left: -1.1rem;
						top:0.2rem;
					}
				}
				.userinfo-text{
					font-size: 0.75rem;
					color: #666666;
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
						color: #666666;
					}
				}
			}
			.userinfo-work{
				height: 43vh;
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
		.rtcVideoBox{
			margin: 2vh 2vw 2vh 5vw;
			background-color: #000000;
			border: 0.1em solid #000000;
			box-shadow: 0.1em 0.1em 0.1em 0.1em #000000;
			.rtcVideo{
				min-height: 70vh;
				width: 100%;
				display: block;
			}
			.video-run-info{
				position: absolute;
				top:0vh;
				.video-run-info-title{
					font-size: 1.5em;
					font-weight: bolder;
					color: #FFFFFF;
					margin: 12vh 0vw 10vh 15vw;
				}
				.video-run-info-sectitle{
					margin: 5vh 0vw 4vh 0vw;
					font-size: 0.75em;
					color: #AAAAAA;
				}
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
		}
		.video-room-btns{
			.video-room-btns-call{
				text-align: center;
			}
			.video-room-btns-mark{
				text-align: left;
				margin-left: 2em;
			}
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
