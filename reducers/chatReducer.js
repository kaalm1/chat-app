import _ from 'lodash'

export default function chatReducer(state= {chats: {}, image: null, giphy: null, message: null}, action) {
  switch (action.type) {

    case 'ALL_CHATS':
      return Object.assign({}, state, {chats: action.payload})
    case 'MESSAGE_ADDED_TO_CHAT':
      let updatedChats = Object.assign({}, state.chats)
      updatedChats[action.payload.chatId] = [action.payload, ...(updatedChats[action.payload.chatId] || [])]
      return Object.assign({}, state, {chats: updatedChats})
    case 'WAS_MESSAGE_SAVED':
      return Object.assign({}, state)
    case 'GOT_IMAGE':
      return Object.assign({}, state, {image: action.payload.url})
    case 'GOT_GIPHY':
      return Object.assign({}, state, {giphy: action.payload.url})
    case 'RESET_IMAGE':
      return Object.assign({}, state, {image: null})
    case 'RESET_GIPHY':
      return Object.assign({}, state, {giphy: null})
    case 'LAST_MESSAGE_SENT':
      return Object.assign({}, state, {message: action.payload})
    default:
      return state

  }
}
