// Always go to to the bottom when there is a new message
// If no image then give default pic
// It is becoming very slow... Not sure why -- maybe because it needs to re-render too much??

import React from 'react'
import {FlatList, KeyboardAvoidingView, Platform, AsyncStorage, View} from 'react-native'
import {Container, Content, Text} from 'native-base'
import moment from 'moment'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import _ from 'lodash'
import MessageContainer from './MessageContainer'
import Composer from './Composer'
import Config from '../../config'
const uuidv1 = require('uuid/v1')

const ITEM_HEIGHT = 100

class ChatMain extends React.Component{
  state = {
    newInput: null,
  }

  _keyExtractor = (item, index) => item._id

  onTextChanged = (text) => {
    this.setState({newInput: text})
  }

  sendMessage = (message) => {
    if (_.isEmpty(message) && this.state.newInput.trim().length === 0){
      this.setState({newInput: null})
      return
    }

    let userId = this.props.user.uuid
    let friendId = this.props.friend.uuid
    let newMessage = {
      "_id": uuidv1(),
      "created": moment(),
      text: (message && message.text) || (this.state.newInput && this.state.newInput.trim()),
      image: message && message.image,
      location: message && message.location,
      chatId: userId > friendId ? userId + friendId : friendId + userId,
      userId: this.props.user.uuid,
      friendId: friendId
    }

    this.props.appendNewMessage(newMessage)
    this.setState({newInput: null})
  }


  componentDidUpdate(props){
    if (this.props.messages.length > 0 && props.messages.length !== this.props.messages.length){
      this.flatList.scrollToIndex({index:0})
    }
  }


  render(){
    return(

      <Container style={{flex: 1}}>

          <FlatList
            ref={(ref) => { this.flatList = ref }}
            data={this.props.messages}
            keyExtractor={this._keyExtractor}
            // extraData={this.props}
            inverted
            initialNumToRender={8}
            renderItem={({item, index})=>
              <MessageContainer
                messages={this.props.messages}
                message={item}
                idx={index}
                user={this.props.user.uuid}
                friend={this.props.friend}
                navigation={this.props.navigation}
              />
            }
            // renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            // enableEmptySections
            contentContainerStyle={{paddingBottom: 10}}
            maxToRenderPerBatch={2}
            onEndReachedThreshold={0.5}
            // getItemLayout={getItemLayout}
          />


            <Composer
              onTextChanged={this.onTextChanged}
              text={this.state.newInput}
              sendMessage={this.sendMessage}
            />

        <KeyboardSpacer/>

      </Container>

    )
  }
}

// const renderItem = ({item, index}) => (<MessageContainer message={item} />)

const getItemLayout = (data, index) => (
  {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
)


export default ChatMain
