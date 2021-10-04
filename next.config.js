const withLess = require("next-with-less");
const withAntdLess = require('next-plugin-antd-less')
const lessToJS = require('less-vars-to-js')
const withFonts = require('next-fonts')
const vuroxConfigPlugins = require('next-compose-plugins')
const fileSystem = require('fs')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const { PHASE_PRODUCTION_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = vuroxConfigPlugins([
	{
		trailingSlash:false,
		env: {
			FRONTEND_ENV: process.env.FRONTEND_ENV
		},
		webpack:(config)=>{
			config.resolve.extensions.push(".js")
			config.plugins.push([
				new MiniCssExtractPlugin(),
				new HtmlWebpackPlugin({
					title: 'TinyMCE Webpack Demo',
					meta: {viewport: 'width=device-width, initial-scale=1'}
				})])

			config.module.rules.push({
				test: /skin\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},{
				test: /content\.css$/i,
				use: ['css-loader'],
			})

			config.optimization.splitChunks = {
				chunks: 'all',
				cacheGroups: {
					tinymceVendor: {
					test: /[\\/]node_modules[\\/](tinymce)[\\/](.*js|.*skin.css)|[\\/]plugins[\\/]/,
					name: 'tinymce'
					},
				}
			}

			config.output = {
				filename: '[name].js',
				path: path.resolve(__dirname, 'dist'),
				clean: true
			}

			return config
		}
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