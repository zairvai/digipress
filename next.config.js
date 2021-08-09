const withLess = require("next-with-less");
const withAntdLess = require('next-plugin-antd-less')
const lessToJS = require('less-vars-to-js')
const withFonts = require('next-fonts')
const vuroxConfigPlugins = require('next-compose-plugins')
const fileSystem = require('fs')
const path = require('path')

// const themeVariables = lessToJS(
//     fileSystem.readFileSync(path.resolve(__dirname, './public/style/styles.less'), 'utf8')
// )

const { PHASE_PRODUCTION_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants')


// module.exports = vuroxConfigPlugins([
// 	[{
// 		trailingSlash: true,
// 		reactStrictMode:true,
// 		eslint:{
// 			ignoreDuringBuilds:true
// 		}
// 	}],
// 	[withCSS,{
// 		cssModules: true,
// 		cssLoaderOptions: {
// 		  importLoaders: 1,
// 		  localIdentName: "[local]___[hash:base64:5]",
// 		},
// 		...withLess(
// 			withSass({
// 				lessLoaderOptions: {
// 					javascriptEnabled: true,
// 					modifyVars: themeVariables, // make your antd custom effective
// 				},			
// 				webpack: (config, { isServer }) => {

// 					if(!isServer){
// 						config.resolve.fallback = {fs:false,crypto:false}
// 					}
// 					return config
// 				}
// 			}))

// 	}],
// 	[withFonts]
// ])

module.exports = vuroxConfigPlugins([
	{
		trailingSlash:true
	},
	[withLess,{
		lessLoaderOptions:{
			javascriptEnabled:true,
			//modifyVars:themeVariables
		},
		...withAntdLess({
			lessVarsFilePath: './public/style/styles.less',
			webpack : (config,{isServer})=>{
				if(!isServer){
					config.resolve.fallback = {fs:false,crypto:false}
				}
				return config
			}
		})
	}],
	[withFonts]
])