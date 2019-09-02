import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import Chat from './containers/Chat'
const uuidv1 = require('uuid/v1')

const store = createStore(rootReducer, applyMiddleware(thunk));

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

const App = (props) => {
  return (
    <Chat
      user={props.user || user}
      friend={props.friend || friend}
    />
  );
}

export default App
