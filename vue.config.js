const FileManagerPlugin = require('filemanager-webpack-plugin')
const versionid = "v1.2.1.11"
//vue配置信息
module.exports={
	//不生成.map文件
	productionSourceMap:process.env.NODE_ENV === 'production'?false:true,
	configureWebpack: {
		plugins: [
			new FileManagerPlugin({
				onEnd: {
/* 					delete: [
						'./archive/dist.zip',
					], */
					mkdir:['./archive'],
					archive: [
						{source: './dist', destination: './archive/dist.'+versionid+'.zip'},
					]
				}
			})
		]
	}
} 
