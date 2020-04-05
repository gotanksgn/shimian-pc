<template>
	<el-container>
		<el-header>
			<page-head loginStatus></page-head>
		</el-header>
		<el-main>
			<div class="help-manager">
				<div class="help-manager-box">
					<el-carousel :interval="2000" type="card" class="bgCarousel">
						<el-carousel-item v-for="item in bgImgList" :key="item">
							<el-avatar shape="square" :size="500" :src="item" class="img-warp"></el-avatar>
						</el-carousel-item>
					</el-carousel>
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
		name: 'helpManager',
		data() {
			return {
				bgImgList:[
					require('@/assets/img/job/headimg/head_1.png'),
					require('@/assets/img/job/headimg/head_3.png'),
					require('@/assets/img/job/headimg/head_4.png'),
					require('@/assets/img/job/headimg/head_5.png'),
					require('@/assets/img/job/headimg/head_6.png'),
					require('@/assets/img/job/headimg/head_7.png')
				]
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
	.help-manager{
		margin: 8vh 2vw;
		.help-manager-box{
			.bgCarousel{
				height:100%
			}
		}
	}
</style>
