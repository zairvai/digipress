import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import configureStore from '../state/store'
import { PersistGate } from 'redux-persist/integration/react'
import { VuroxContextProvider } from '../context'

import 'Styles/styles.less'
import 'antd/dist/antd.less'
import 'react-quill/dist/quill.snow.css';
import 'Styles/mycustom.less'

class VuroxApp extends App{

	state = {
		width : ''
	}

	static async getInitialProps( { Component, ctx } ){
		let pageProps = {}
		if( Component.getInitialProps ){
			pageProps = await Component.getInitialProps(ctx)
		}
		return { pageProps}
	}

	UNSAFE_componentWillMount(){
		const isClient = typeof window === 'object';
		const width = isClient ? window.innerWidth : undefined
		this.setState({ width: width })
	}

	render () {

		console.log(this.props)
		const { Component, pageProps,store} = this.props
		
	    return(
	        <Provider store={store}>
				<PersistGate persistor={store._PERSISTOR} loading={null}>
					<VuroxContextProvider pageWidth={this.state.width}>
						<Component {...pageProps}/>
					</VuroxContextProvider>
				</PersistGate>
	        </Provider>
	    )
	}
}

export default withRedux(configureStore)(VuroxApp)
