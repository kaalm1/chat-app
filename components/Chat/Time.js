import React from 'react'
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native'

import moment from 'moment'

import Color from './Color'
import { TIME_FORMAT } from './Constant'

import styles from '../../styles/chat.style'

export default class Time extends React.Component{
 render(){
   return (
     <View style={{marginTop:5}}>
       <Text
         allowFontScaling={false}
         style={this.props.thisUser ? styles.timeUser : styles.timeMatch}
        >
         {moment(this.props.currentMessage.created)
           .locale('en')
           .format('LT')}
       </Text>
     </View>
   )
 }
}
