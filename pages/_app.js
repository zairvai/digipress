import App, { Container } from 'next/app'
import {END} from 'redux-saga'
import {useStore} from 'react-redux'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import { wrapper } from '../state/store'
import { PersistGate } from 'redux-persist/integration/react'
import { VuroxContextProvider } from '../context'
import { AppContextProvider } from '../context/app'
import 'antd/dist/antd.less'
import 'react-quill/dist/quill.snow.css';
import 'Styles/styles.less'
import 'Styles/mycustom.less'
import 'Styles/mymedia.less'
import moment from 'moment'
import Amplify from 'aws-amplify'
import awsExports from 'Src/aws-exports'
Amplify.configure(awsExports)

import {DefaultSeo} from 'next-seo'
import SEO from '../next-seo.config'

import analytics from 'Library/modules/analytics'

moment.locale("id")

export function reportWebVitals({ id, name, label, value }) {
	analytics.track(name, {
	  category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
	  value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
	  label: id, // id unique to current page load
	  nonInteraction: true, // avoids affecting bounce rate.
	});
  }

const MyApp = ({Component,pageProps,...props}) => {

	const [width,setWidth] = React.useState()
	const store = useStore()

	const getInitialProps =  async ( { Component, ctx } ) => {

		// 1. Wait for all page actions to dispatch
		const pageProps = {
			...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
		}

		// 2. Stop the saga if on server
        if (ctx.req) {
            ctx.store.dispatch(END);
            await ctx.store.sagaTask.toPromise();
        }

        // 3. Return props
        return {
            pageProps
        }


	}

	React.useEffect(()=>{
		const isClient = typeof window === 'object'
		const width = isClient ? window.innerWidth : undefined
		setWidth(width)

	},[])
	
	

	return (
		<PersistGate persistor={store.__persistor} loading={null}>
			<VuroxContextProvider pageWidth={width}>
				<AppContextProvider>
					<DefaultSeo {...SEO}/>
					<Component {...pageProps}/>
				</AppContextProvider>
			</VuroxContextProvider>
		</PersistGate>
	)
}

export default wrapper.withRedux(MyApp)

