const withLess = require("next-with-less");
const withAntdLess = require('next-plugin-antd-less')
const lessToJS = require('less-vars-to-js')
const withFonts = require('next-fonts')
const vuroxConfigPlugins = require('next-compose-plugins')
const fileSystem = require('fs')
const path = require('path')

const { PHASE_PRODUCTION_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = vuroxConfigPlugins([
	{
		trailingSlash:false
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