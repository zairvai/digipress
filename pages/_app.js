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

import analytics from 'Library/modules/analytics'

export function reportWebVitals({ id, name, label, value }) {
	analytics.track(name, {
	  category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
	  value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
	  label: id, // id unique to current page load
	  nonInteraction: true, // avoids affecting bounce rate.
	});
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

