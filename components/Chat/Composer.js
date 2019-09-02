import PropTypes from 'prop-types'
import React from 'react'
import { Platform, StyleSheet, TextInput, View, TouchableOpacity} from 'react-native'
import {Input, Item, Icon} from 'native-base'
import AdditionalActions from './AdditionalActions'
import { MIN_COMPOSER_HEIGHT, DEFAULT_PLACEHOLDER, DEFAULT_ICE_BREAKER } from './Constant'
import Color from './Color'
import styles from '../../styles/chat.style'

export default class Composer extends React.Component {

  render() {

    return (
      <View style={{borderTopWidth:0.5, borderTopColor:'gray'}}>
        <View style={{flexDirection: 'row', marginBottom:5, marginLeft:10, marginRight:10, marginTop:5}}>

          {
            !this.props.iceBreaker &&
            <AdditionalActions
              onSend={this.props.sendMessage}
            />
          }


          <Input
            placeholder={!this.props.iceBreaker ? DEFAULT_PLACEHOLDER : DEFAULT_ICE_BREAKER}
            onChangeText={(e) => this.props.onTextChanged(e)}
            value={this.props.text}
            multiline={true}
            // autoFocus={false}
            style={[styles.textInput]}
            enablesReturnKeyAutomatically
            underlineColorAndroid="transparent"
          />

          { !!this.props.text && this.props.text.length !==0 &&
            <TouchableOpacity onPress={()=>this.props.sendMessage({})} style={{alignSelf:'flex-end', paddingBottom:5}}>
              <Icon name='send' type='Feather' style={{color:Color.defaultBlue}}/>
            </TouchableOpacity>
          }

        </View>
      </View>
    )
  }

}

// const styles = StyleSheet.create({
//   textInput: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 16,
//     lineHeight: 16,
//     marginTop: Platform.select({
//       ios: 6,
//       android: 0,
//     }),
//     marginBottom: Platform.select({
//       ios: 5,
//       android: 3,
//     }),
//   },
// })
