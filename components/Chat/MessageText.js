import React from 'react'
import {View} from 'react-native'
import {Text} from 'native-base'
import Time from './Time'
import Color from './Color'
import moment from 'moment'
import commonColor from '../../styles/commonColor.style'
import style from '../../styles/chat.style'

export default class MessageText extends React.Component{
  render(){
    return(

        <Text
          allowFontScaling={false}
          style={this.props.thisUser ? style.textUser : style.textMatch}
        >
        {this.props.currentMessage.text}
        </Text>

    )
  }
}
