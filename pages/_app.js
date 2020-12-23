import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import configureStore from '../state/store'
import { PersistGate } from 'redux-persist/integration/react'
import { VuroxContextProvider } from '../context'
import { AppContextProvider } from '../context/app'
import 'antd/dist/antd.less'
import 'react-quill/dist/quill.snow.css';
import 'Styles/styles.less'
import 'Styles/mycustom.less'

import Amplify from 'aws-amplify'
import awsExports from 'Src/aws-exports'
Amplify.configure(awsExports)

import {DefaultSeo} from 'next-seo'
import SEO from '../next-seo.config'

import {useAnalytics} from 'Library/hooks/useAnalytics'

export const reportWebVitals = (metric) => { 
	
	const {init,trackPageViewed} = useAnalytics()

	switch(metric.name) {

		case 'FCP' 				: 	init("UA-185970054-1")
									trackPageViewed()
									break;

		case 'Next.js-render'	: 	trackPageViewed()
									break;

		default : break
	}
 
}

const MyApp = ({Component,pageProps,store,...props}) => {

	const [width,setWidth] = React.useState()
	

	const getInitialProps =  async ( { Component, ctx } ) => {
		
		let pageProps = {}
		if( Component.getInitialProps ){
			pageProps = await Component.getInitialProps(ctx)
		}
		return { pageProps}
	}

	React.useEffect(()=>{
		const isClient = typeof window === 'object'
		const width = isClient ? window.innerWidth : undefined
		setWidth(width)

	},[])

	return (
		<Provider store={store}>
			<PersistGate persistor={store._PERSISTOR} loading={null}>
				<VuroxContextProvider pageWidth={width}>
					<AppContextProvider>
						<DefaultSeo {...SEO}/>
						<Component {...pageProps}/>
					</AppContextProvider>
				</VuroxContextProvider>
			</PersistGate>
		</Provider>
	)
}

export default withRedux(configureStore)(MyApp)

