<template>
	<el-container>
		<el-header>
			<page-head loginStatus></page-head>
		</el-header>
		<el-main>
			<div class="vide-manager">
				<el-tabs v-model="activeMenu">
					<el-tab-pane name="wait">
						<span slot="label">待接受<el-badge :value="waitCount"></el-badge></span>
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
									<div>
										<el-tag type="danger">{{scope.row.age}}岁</el-tag>
										<el-tag>{{scope.row.city}}</el-tag>
									</div>
								</template>
							</el-table-column>
							<el-table-column :min-width="15" class="video-table-edu">
								<template slot-scope="scope">
									<div class="video-table-name">{{scope.row.edu}}</div>
									<div class="video-table-spec">{{scope.row.spec}}</div>
								</template>
							</el-table-column>
							<el-table-column :min-width="20" class="video-table-video">
								<template slot-scope="scope">
									<div class="video-table-appointtime"><el-tag type="danger"><i class="el-icon-time"></i>面试时间：{{scope.row.appointtime}}</el-tag></div>
									<el-button @click="enterVideoRoom(scope.row)"  v-loading.fullscreen.lock="fullscreenLoading" 
										element-loading-background="rgba(0, 0, 0, 0.2)" element-loading-spinner="el-icon-loading" element-loading-text="正在进入面试间...">进入房间
									</el-button>
									<el-button @click="cancelInterview(scope.row)">取消预约</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane name="doing">
						<span slot="label">待面试<el-badge :value="doneCount" ></el-badge></span>
						<el-table :data="doneTableData" class="video-table-list" stripe :show-header="false">
							
						</el-table>
					</el-tab-pane>
					<el-tab-pane name="finish">
						<span slot="label">已面试<el-badge :value="cancelCount"></el-badge></span>
						<el-table :data="cancelTableData" class="video-table-list" stripe :show-header="false">
						</el-table>	
					</el-tab-pane>
				</el-tabs>
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
	/* import playerVideo from '@/components/playerVideo.vue' */
	export default {
		name: 'videoManager',
		data() {
			return {
				activeMenu:'doing',
				waitTableData: [],
				doneTableData:[],
				cancelTableData:[]
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
			pageFooter
			/* ,playerVideo */
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
					item["canceltime"]= this.$date.format(new Date());
					this.waitTableData.splice(this.waitTableData.indexOf(item),1);
					this.cancelTableData.push(item);
				}).catch(() => {
					
				});
			},
			interviewResult(item){
				console.log(item);
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
