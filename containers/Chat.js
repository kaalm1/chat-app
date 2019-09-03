import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { SafeAreaView } from 'react-navigation'
import _ from 'lodash'
import ChatMain from '../components/Chat/ChatMain'
import {saveSentMessage} from '../actions/chats'
import Fire from '../Fire'
// import data from '../assets/data/messages.json'

class Chat extends React.Component{

  componentWillUnmount() {
    Fire.shared.off();
  }

  appendNewMessage = (message) => {
    this.props.saveSentMessage(message)
  }


  render(){
    let messages = _.mapKeys(this.props.chats, (v, k) => {return _.replace(k, this.props.user.uuid, "")})[this.props.friend.uuid] || []
    messages = _.uniqBy(messages, "_id")
    return(
      <View style={{flex:1}}>
        <SafeAreaView style={{flex:1}}>
        <ChatMain
          messages={messages}
          appendNewMessage={this.appendNewMessage}
          friend={this.props.friend}
          user={this.props.user}
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
    saveSentMessage,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
