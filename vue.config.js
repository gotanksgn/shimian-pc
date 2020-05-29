const FileManagerPlugin = require('filemanager-webpack-plugin')
/**
 * 生成应用版本号
 */
let getAppVersion= function(){
	var date = new Date()
	return "v"+(date.getFullYear())+(date.getMonth() + 1)+(date.getDate())
		+(date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
		+(date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
		+(date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
}
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
						{source: './dist', destination: './archive/shimianpc.'+getAppVersion()+'.zip'},
					]
				}
			})
		]
	}
}
