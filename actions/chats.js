import {AsyncStorage} from 'react-native'
import Config from '../config'
import _ from 'lodash'
var shuffle = require('shuffle-array')
const Entities = require('html-entities').XmlEntities
const entities = new Entities()
import Fire from '../Fire';
const GIPHY_KEY = 'c8qlNTGXI0TJRLZEaqw3m93jSUWUPBJQ'

export function checkGoodFirstMessage(message){
  return ( message && message.length >= 15 && message.split(" ").length >=4)
}

export function getAllChats(userId, dating){
  return async (dispatch) => {
    Fire.shared.on(message =>
      dispatch({type: 'ALL_CHATS', payload: message})
    )
  }
}

export function saveAllMessages(chats){
  return {type: 'ALL_CHATS', payload: chats}
}

export function saveSentMessage(message){
  return async (dispatch, getState) => {
    updateChatWithNewMessage(message)
    Fire.shared.send(message)
  }
}

export function updateChatWithNewMessage(message){
  return {type: "MESSAGE_ADDED_TO_CHAT", payload: message}
}

export function messageCoffee(position, onSend){
  return async (dispatch) => {
    let messageLocation = {
      text: data.name,
      location: {
        latitude: data.coordinates.latitude,
        longitude: data.coordinates.longitude,
      },
    }

    Fire.shared.send(messageLocation)
    Fire.shared.send({text: `@ ${data.location.display_address}`})
  }
}

export function messageImage(uri, onSend){
  return async (dispatch) => {
    saveSentMessage({image: uri})
  }
}

export function messageGiphy(word, onSend){
  return async (dispatch) => {
    token = await AsyncStorage.getItem(Config.FIREBASE)
    // let words = message.text.toLowerCase().replace('giphy/','')
    let options = {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      },
    }
    let url = `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_KEY}&tag=${word}&rating=G`
    return fetch(url, options)
    .then(res=>res.json())
    .then(data=>{
      if(data.data.fixed_height_downsampled_width > data.data.fixed_width_downsampled_width){
        saveSentMessage({image: data.data.fixed_height_downsampled_url})
      } else {
        saveSentMessage({image: data.data.fixed_width_downsampled_url})
      }
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
      saveSentMessage(message)
    })
    .catch(()=>{
      message.text = 'No trivia available.'
      saveSentMessage(message)
    })
  }
}

export function messageQuote(message, infoToSend){
  return (dispatch) => {
    return fetch('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en')
    .then(resp=>resp.json())
    .then((data)=>{
      message.text = `"${data.quoteText}" - ${data.quoteAuthor}`
      saveSentMessage(message)
    })
    .catch(()=>{
      message.text = 'No quote available.'
      saveSentMessage(message)
    })
  }
}
