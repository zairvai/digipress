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
import {useRouter} from 'next/router'
import Amplify from 'aws-amplify'
import awsExports from 'Src/aws-exports'
Amplify.configure(awsExports)

import {useAnalytics} from 'Library/hooks/useAnalytics'

// export const reportWebVitals = (metric) => { 
	
// 	const router = useRouter()
// 	console.log(router)
// 	const {init,trackPageViewed} = useAnalytics()

// 	console.log(metric)

// 	switch(metric.name) {

// 		case 'FCP' 				: 	init("G-CVJL7ZM7KN")
// 									trackPageViewed()
// 									break;

// 		case 'Next.js-render'	: 	trackPageViewed()
// 									break;

// 		default : break
// 	}
 
// }

const MyApp = ({Component,pageProps,store,...props}) => {

	const [width,setWidth] = React.useState()
	const router = useRouter()
	const {init,trackPageViewed} = useAnalytics()

	// const getInitialProps =  async ( { Component, ctx } ) => {
		
	// 	let pageProps = {}
	// 	if( Component.getInitialProps ){
	// 		pageProps = await Component.getInitialProps(ctx)
	// 	}
	// 	return { pageProps}
	// }

	React.useEffect(()=>{

		const isClient = typeof window === 'object'
		const width = isClient ? window.innerWidth : undefined
		setWidth(width)
		
		init("G-CVJL7ZM7KN")
		trackPageViewed(router.asPath)

		router.events.on("routeChangeComplete",(url,options)=>{
			trackPageViewed(url)
		})

	},[])

	return (
		<Provider store={store}>
			<PersistGate persistor={store._PERSISTOR} loading={null}>
				<VuroxContextProvider pageWidth={width}>
					<AppContextProvider>
						<Component {...pageProps}/>
					</AppContextProvider>
				</VuroxContextProvider>
			</PersistGate>
		</Provider>
	)
}

export default withRedux(configureStore)(MyApp)

