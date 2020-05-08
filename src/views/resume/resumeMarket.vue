<template>
	<el-container>
		<el-header>
			<page-head loginStatus></page-head>
		</el-header>
		<el-main>
			<el-table :data="resumesTable" :stripe="true" class="resume-table-list">
				<el-table-column :min-width="80" class="resume-table-headimg">
					<template slot-scope="scope">
						<el-avatar shape="square" :size="60" :src="scope.row.info.profilePicture" @error="errorHeadImgHandler">
							<img src="@/assets/img/job/headimg/head_999.png"/>
						</el-avatar>
						<div class="resume-table-name resume-table-name-fullname">{{scope.row.info.fullname}}</div>
						<div>
							<el-tag type="danger">{{scope.row.info.age}}岁</el-tag>
							<el-tag>{{scope.row.info.city}}</el-tag>
						</div>
					</template>
				</el-table-column>	
			</el-table>			
		</el-main>
		<el-footer>
			<page-footer></page-footer>
		</el-footer>
	</el-container>	
</template>

<script>
	import pageHead from '@/components/pageHead.vue'
	import pageFooter from '@/components/pageFooter.vue'
	import {getResumesBySearchKeyApi} from '@/api/studentFun.js'
	export default {
		data() {
			return {
				resumesTable:[]
			}
		},
		created(){
			this.searchResumes("JAVA");
		},
		methods:{
			searchResumes(searchKey){
				getResumesBySearchKeyApi({"searchKey":searchKey}).then(res=>{
					this.resumesTable=res.data
				});
			},
			errorHeadImgHandler(){
				return true;
			}
		},
		// 注册组件
		components: {
			pageHead,
			pageFooter
		}
	}
	
</script>

<style>
</style>
