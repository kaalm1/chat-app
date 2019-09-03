import React, {useState} from 'react'
import {View} from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {AppLoading} from 'expo'
import * as Font from 'expo-font'
import rootReducer from './reducers/index'
import Chat from './containers/Chat'
import Fire from './Fire'
import './global'
const uuidv1 = require('uuid/v1')

const store = createStore(rootReducer, applyMiddleware(thunk))

const user = {
  uuid: uuidv1(),
  name: 'Alicia',
  picture_url: 'https://images.unsplash.com/photo-1548382131-e0ebb1f0cdea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'
}

const friend = {
  uuid: uuidv1(),
  name: 'Felicity',
  picture_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
}

// import * as firebase from 'firebase';

// Initialize Firebase
// const firebaseConfig = {
//   apiKey: "<YOUR-API-KEY>",
//   authDomain: "<YOUR-AUTH-DOMAIN>",
//   databaseURL: "<YOUR-DATABASE-URL>",
//   storageBucket: "<YOUR-STORAGE-BUCKET>"
// };
//
// firebase.initializeApp(firebaseConfig);

const App = (props) => {
  const [isReady, setIsReady] = useState(false);

  const _cacheResourcesAsync = async () => {
    await Font.loadAsync({
      Roboto: require('./assets/fonts/Roboto.ttf'),
      Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
      Cabin: require('./assets/fonts/Cabin-Regular.ttf'),
      CabinBold: require('./assets/fonts/Cabin-Bold.ttf'),
      CabinItalic: require('./assets/fonts/Cabin-Italic.ttf'),
    });
  }

  const firebaseUser = () => {
    if(!Fire.shared.uid){return null}
    return {
      name: Fire.shared.name,
      _id: Fire.shared.uid
    }
  }

  return (
    !isReady ?
      <AppLoading
        startAsync={_cacheResourcesAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
      :
      <Provider store={store}>
        <Chat
          user={props.user || firebaseUser() || user}
          friend={props.friend || friend}
        />
      </Provider>
  )
}

export default App
