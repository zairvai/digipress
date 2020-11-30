const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const withFonts = require('next-fonts')
const vuroxConfigPlugins = require('next-compose-plugins')

const fileSystem = require('fs')
const path = require('path')

const withImages = require("next-images")
const { styles } = require('@ckeditor/ckeditor5-dev-utils')

const themeVariables = lessToJS(
    fileSystem.readFileSync(path.resolve(__dirname, './public/style/variables.less'), 'utf8')
)

const { PHASE_PRODUCTION_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = vuroxConfigPlugins([
	[withSass,{
		cssModules:true,
		webpack: (config,options) => {
			
			if(!options.isServer){
				config.module.rules.forEach((rule, index, array) => {
					const test = rule.test && rule.test.toString() || ''
					if (test.includes('css')) {
					array[index] = {
						...rule,
						exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
					}
					}
				})

				config.module.rules.push({
					test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
					use: [
					{
						loader: 'style-loader',
						options: {
						injectType: 'singletonStyleTag',
						attributes: {
							'data-cke': true
						}
						}
					},
					{
						loader: 'postcss-loader',
						options: styles.getPostCssConfig({
						themeImporter: {
							themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
						},
						minify: true
						})
					}
					]
				})
			}

			return config
		}
	}],
	[withImages,{
		webpack: (config,options)=>{
			
			if(!options.isServer){
				config.module.rules.forEach(function (rule, index, array) {
					const test = rule.test && rule.test.toString() || ''
					if (test.includes('svg')) {
						array[index] = {
							...rule,
							exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/
						}
					}
				})

				config.module.rules.push({
					test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
					use: ['raw-loader']
				})
			}

			return config
		}
	}],
	[withLess, {
		lessLoaderOptions: {
		  javascriptEnabled: true,
		  modifyVars: themeVariables, // make your antd custom effective
		},
		webpack: (config, { isServer }) => {
		  
		  if (isServer) {
				const antStyles = /antd\/.*?\/style.*?/
				const origExternals = [...config.externals]
				config.externals = [
				  (context, request, callback) => {
						if (request.match(antStyles)) return callback()
						  if (typeof origExternals[0] === 'function') {
							  origExternals[0](context, request, callback)
						  } else {
							  callback()
						  }
					  },
				  ...(typeof origExternals[0] === 'function' ? [] : origExternals),
				]

			  config.module.rules.unshift({
				  test: antStyles,
				  use: 'null-loader',
			  })
		  }
		  
		  return config
		}
	}],
	[withImages,{
		webpack: (config,options)=>{
			config.module.rules.forEach(function (rule, index, array) {
				const test = rule.test && rule.test.toString() || ''
				if (test.includes('svg')) {
				  array[index] = {
					...rule,
					exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/
				  }
				}
			})

			config.module.rules.push({
				test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
				use: ['raw-loader']
			})

			return config

		}
	}],
	[withFonts]
])