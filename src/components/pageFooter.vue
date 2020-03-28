<template>
	<div class="footer">
		<el-row class="footer-content">
			<el-col :span="3" class="footer-content-hidden">|</el-col>
			<el-col :span="8" class="footer-content-download">
				<dl>
					<dd>
						<img src="../assets/JRZf.png" alt="duomian"/>
					</dd>
					<dd>
						<p>扫码下载最新APP客户端</p>
					</dd>	
				</dl>
			</el-col>
			<el-col :span="4" class="footer-content-information">
				<dl>
					<dd>公司简介</dd>
					<dd>产品介绍</dd>
					<dd>联系我们</dd>
				</dl>
			</el-col>
			<el-col :span="6">
				<dl>
					<dd>北京嘉安国泰信息技术有限公司</dd>
					<dd>京ICP备122010222号-4</dd>
					<dd>客服电话：010-66668888</dd>
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
				copyright:'Copyright ©2019-2022 jagt All Rights Reserved'
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
		font-size: 12px;
		line-height: 1.5em;
		.footer-content{
			height: 180px;
			text-align: left;
			.footer-content-download img{
				width: 77px;
				height: 77px;
				margin-left: 30px;
			}
			.footer-content-hidden{
				color:#333;
			}
			dl{
				padding-top: 10px;
			}
			dd{
				padding-bottom: 10px
			}
		}
	}
</style>
