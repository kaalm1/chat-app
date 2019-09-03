import React from 'react'
import {View} from 'react-native'
import {Text} from 'native-base'
import MessageText from './MessageText'
import MessageImage from './MessageImage'
import MessageLocation from './MessageLocation'
import Avatar from './Avatar'
import Day from './Day'
import Time from './Time'
import { isSameUser, isSameDay } from './utils'
import commonColor from '../../styles/commonColor.style'
import styles from '../../styles/chat.style'

export default class MessageContainer extends React.PureComponent{
  render(){
    const { message, messages, idx, } = this.props
    let thisUser = message.userId === this.props.user
    const previousMessage = messages[idx - 1] || {}
    const nextMessage = messages[idx + 1] || {}
    let sameUser = isSameUser(message, previousMessage)
    let sameDay = isSameDay(message, previousMessage)
    return(
      <View>
        <Day currentMessage={message} previousMessage={previousMessage} nextMessage={nextMessage}/>
        <View
          style={{
            flexDirection: 'row',
            marginRight: thisUser ? 5: 15,
            paddingRight: thisUser ? 5: 15,
            alignSelf: thisUser ? 'flex-end' : 'flex-start',
          }}>
          <Avatar
            url={this.props.friend.picture_url}
            friend={this.props.friend}
            thisUser={thisUser}
            currentMessage={message}
            nextMessage={nextMessage}
            previousMessage={previousMessage}
          />
          <View
            style={[thisUser ? styles.messageContainerUser : styles.messageContainerMatch, {marginTop: !sameUser && sameDay ? 15 : 3}]}
            >
            {!!message.image && <MessageImage currentMessage={message}/>}
            {!!message.location && <MessageLocation currentMessage={message} navigation={this.props.navigation}/>}
            {!!message.text && <MessageText currentMessage={message} thisUser={thisUser}/>}
            <Time thisUser={thisUser} currentMessage={message}/>
          </View>
        </View>
      </View>
    )
  }
}
