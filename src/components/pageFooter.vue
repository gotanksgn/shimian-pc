<template>
	<div class="footer">
		<el-row class="footer-content">
			<el-col :span="3" class="footer-content-hidden">|</el-col>
			<el-col :span="8" class="footer-content-download">
				<dl>
					<dd>
						<img src="@/assets/img/JRZf.png" alt="duomian"/>
					</dd>
					<dd>
						<p>扫码下载最新APP客户端</p>
					</dd>	
				</dl>
			</el-col>
			<el-col :span="4" class="footer-content-information">
				<dl>
					<dd v-for="(item,idx) in homelinks" :key="idx"><el-link :href="item.link" :underline="false" target="_blank">{{item.title}}</el-link></dd>
				</dl>
			</el-col>
			<el-col :span="6">
				<dl>
					<dd>{{company}}</dd>
					<dd>{{icp}}</dd>
					<dd>{{telphone}}</dd>
				</dl>
			</el-col>
			<el-col :span="3" class="footer-content-hidden">|</el-col>
		</el-row>
		<el-row class="footer-copyright">
			<el-col :span="24"><div class="grid-content bg-purple">{{copyright}}</div></el-col>
		</el-row>	
	</div>
</template>

<script>
	export default {
		name: 'pageFooter',
		data() {
			return {
				telphone:'电话：010-5352****',
				company:'北京龙马中外企业家服务有限公司',
				icp:'京ICP备17053558号-2',
				copyright:'Copyright ©2019-2022 jagt All Rights Reserved',
				homelinks:[
					{title:'公司简介',link:'https://www.shimianpower.com'},
					{title:'产品介绍',link:'https://www.shimianpower.com'},
					{title:'联系我们',link:'https://www.shimianpower.com'}
				]
			};
		},
		methods: {
		
		}
	}
</script>

<style lang="less">
	.footer{
		text-align: center;
		color: #ccc;
		background-color: #333;
		font-size: 0.75rem;
		line-height: 1.5rem;
		.footer-content{
			text-align: left;
			.footer-content-download img{
				width: 6rem;
				height: 6rem;
				margin: 0rem 0rem 0rem 1.5rem;
			}
			.footer-content-hidden{
				color:#333;
			}
			dl{
				margin: 3.5rem 0rem 0rem 0rem;
			}
			dd{
				margin:1rem 0rem 1rem 0rem;
				.el-link--inner{
					font-size: 0.75rem;
					color: #ccc;
				}
			}
		}
		.footer-copyright{
			.grid-content{
				margin: 1.5rem 7rem 1rem 0rem;	
			}
		}
	}
</style>
