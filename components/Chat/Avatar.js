import React from 'react'
import {Image, View} from 'react-native'
import { isSameUser } from './utils'
import NoImage from './NoImage'


export default class Avatar extends React.Component{

  render(){
    return(
      !this.props.thisUser &&
      !isSameUser(this.props.currentMessage, this.props.previousMessage) ?
      this.props.url ?
      <Image
        style={{height:40, width:40, borderRadius: 20, margin:10, alignSelf:'flex-end'}}
        source={{uri: this.props.url}}
      />
      :
      <NoImage style={{height:40, width:40, borderRadius:20, margin:10, alignSelf:'flex-end'}}/>
      :
      <View style={{height:40, width:40, margin:10, alignSelf:'flex-end'}}/>
    )
  }
}
