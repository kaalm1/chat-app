import React from 'react'
import {Image, View} from 'react-native'
import { isSameUser } from './utils';
import NoImage from './NoImage'


export default class Avatar extends React.Component{

  render(){

    let url = this.props.url !== global.NO_PICTURE_URL ? {uri: this.props.url} : this.props.match.gender === 'male' ? defaultImageMale : defaultImageFemale

    return(
      !this.props.thisUser &&
      !isSameUser(this.props.currentMessage, this.props.previousMessage) ?
      <Image
        style={{height:40, width:40, borderRadius: 20, margin:10, alignSelf:'flex-end'}}
        source={url}
      />
      :
      <NoImage style={{height:40, width:40, borderRadius:20, margin:10, alignSelf:'flex-end'}}/>
    )
  }
}
