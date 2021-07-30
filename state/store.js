import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import rootSaga from './sagas'
import thunk from 'redux-thunk'
// import mystorage from './storage'
function configureStore(preloadedState) {

	const logger = createLogger()
  	const sagaMiddleware = createSagaMiddleware()
	const middlewares = [sagaMiddleware]
	
	middlewares.push(thunk)
	// middlewares.push(logger)

	//const { persistReducer } = require('redux-persist')
	// const storage = mystorage//require('redux-persist/lib/storage').default
	const storage = require('redux-persist/lib/storage').default
	
	const persistConfig = {
		key:'root',
		storage,
		blacklist:['auth']
	}

  	const store = createStore(
		// persistReducer(persistConfig,rootReducer),
		rootReducer,
    	// preloadedState,
    	applyMiddleware(...middlewares)
	  )
	
	store._PERSISTOR = persistStore(store)

	rootSaga.forEach(saga=> {
		sagaMiddleware.run(saga)
	})


  	return store
}

export default configureStore