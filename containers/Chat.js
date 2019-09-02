import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { SafeAreaView } from 'react-navigation'
import _ from 'lodash'
import ChatMain from '../components/Chat/ChatMain'
import Config from '../config'
import commonColor from '../styles/commonColor.style'
import {updateChatWithNewMessage} from '../actions/chats'

import data from '../assets/data/messages.json'

class Chat extends React.Component{

  appendNewMessage = (message) => {
    this.props.updateChatWithNewMessage(message)
  }


  render(){
    let messages = _.mapKeys(this.props.chats, (v, k) => {return _.replace(k, this.props.user.uuid, "")})[this.props.friend.uuid] || []
    messages = _.uniqBy(messages, "_id")
    return(
      <View style={{flex:1}}>
        <SafeAreaView style={{flex:1}}>
        <ChatMain
          messages={messages || data}
          appendNewMessage={this.appendNewMessage}
          friend={this.props.friend}
        />
      </SafeAreaView>
     </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chats: state.chat.chats
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateChatWithNewMessage,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
