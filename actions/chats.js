import {AsyncStorage} from 'react-native'
import Config from '../config'
import _ from 'lodash'
var shuffle = require('shuffle-array')
const Entities = require('html-entities').XmlEntities
const entities = new Entities()
const CHAT_URL = process.env.NODE_ENV === 'development' ? Config.CHAT_URL_DEV : Config.CHAT_URL

export function checkGoodFirstMessage(message){
  return ( message && message.length >= 15 && message.split(" ").length >=4)
}

export function getAllChats(userId, dating){
  return async (dispatch) => {
    token = await AsyncStorage.getItem(Config.FIREBASE)
    let options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({matches: dating.map(x=>x.uuid)}),
    }

    return fetch(`${CHAT_URL}/messages/${userId}`, options)
    .then(res=>res.json())
    .then( chats =>{
      dispatch({type: 'ALL_CHATS', payload: chats})
      dispatch({type: 'MAIN_LOADING_END'})
    })
    .catch(()=>dispatch({type: 'MAIN_LOADING_END'}))
  }
}

export function saveAllMessages(chats){
  return {type: 'ALL_CHATS', payload: chats}
}

export function saveSentMessage(message){
  return async (dispatch, getState) => {
    token = await AsyncStorage.getItem(Config.FIREBASE)
    let options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({message: message}),
    }
    return fetch(`${CHAT_URL}/messages/new`, options)
    .then(res=>res.json())
    .then( saved => dispatch({type: 'WAS_MESSAGE_SAVED', payload: saved}))
    .catch(()=>{
      console.log('unauthorized')
      let socket = getState().websockets.socket
      socket.emit('recieve new user message',{message: message})
    })
  }
}

export function updateChatWithNewMessage(message){
  return {type: "MESSAGE_ADDED_TO_CHAT", payload: message}
}

export function messageCoffee(position, onSend){
  return async (dispatch) => {
    token = await AsyncStorage.getItem(Config.FIREBASE)
    let options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(position.coords),
    }
    return fetch(`${CHAT_URL}/chats/coffee`, options)
    .then(res=>res.json())
    .then(data=>{
      onSend({
        text: data.name,
        location: {
          latitude: data.coordinates.latitude,
          longitude: data.coordinates.longitude,
        },
      })
      onSend({text: `@ ${data.location.display_address}`})
    })
    .catch(()=>{
      onSend({image: _.sample(global.LOCATION_ERROR)})
    })
  }
}

export function messageImage(uri, onSend){
  return async (dispatch) => {
    token = await AsyncStorage.getItem(Config.FIREBASE)
    let formData = new FormData()
      formData.append('file', {
        uri,
        name: 'photo.png',
        type: 'image/png',
      })

    const options = {
        method: 'POST',
        headers: {
          'content-type': 'multipart/form-data',
          'accept': 'application/json',
          'Authorization': token
        },
        body: formData
      }
    return fetch(`${CHAT_URL}/chats/image`, options)
    .then(data=>data.json())
    .then(async (response) =>{
      if (response.image_url && response.image_url.length > 0){
        onSend({image: response.image_url})
      } else {
        if (response.message === 'inappropriate'){
          token = await AsyncStorage.getItem(Config.JWT)
          // dispatch(submitUserInappropriateReport(token))
        }
      }
    })
    .catch(()=>{
      onSend({image: _.sample(global.IMAGE_ERROR)})
    })
  }
}

export function messageGiphy(word, onSend){
  return async (dispatch) => {
    token = await AsyncStorage.getItem(Config.FIREBASE)
    // let words = message.text.toLowerCase().replace('giphy/','')
    let options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({giphy: word}),
    }
    return fetch(`${CHAT_URL}/chats/giphy`, options)
    .then(res=>res.json())
    .then(data=>{
      onSend({image: data.image_url})
    })
    .catch(()=>{
      onSend({image: _.sample(global.GIPHY_ERROR)})
    })
  }
}

export function messageTrivia(message, infoToSend){
  return (dispatch) => {
    return fetch('https://opentdb.com/api.php?amount=1&type=multiple')
    .then(resp=>resp.json())
    .then((data)=>{
      let question = entities.decode(data.results[0].question)
      let correctAns = entities.decode(data.results[0].correct_answer)
      let wrongAns = data.results[0].incorrect_answers.map(ans=>entities.decode(ans))
      let answers = shuffle([...wrongAns,correctAns])
      message.text = `"${question}" \n A. ${answers[0]} \n B. ${answers[1]} \n C. ${answers[2]} \n D. ${answers[3]}`
      infoToSend(message)
    })
    .catch(()=>{
      message.text = 'No trivia available.'
      infoToSend(message)
    })
  }
}

export function messageQuote(message, infoToSend){
  return (dispatch) => {
    return fetch('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en')
    .then(resp=>resp.json())
    .then((data)=>{
      message.text = `"${data.quoteText}" - ${data.quoteAuthor}`
      infoToSend(message)
    })
    .catch(()=>{
      message.text = 'No quote available.'
      infoToSend(message)
    })
  }
}
