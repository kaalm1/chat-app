import React from 'react'
import {View, StyleSheet, Platform, TouchableOpacity, ViewPropTypes} from 'react-native'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Icon, Text, Button, Content} from 'native-base'
import * as ImageManipulator from 'expo-image-manipulator'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import {messageImage, messageCoffee, messageGiphy} from '../../actions/chats'

import ActionSheet from 'react-native-actionsheet'

const CANCEL_INDEX = 0
const EMOJIFY_CHAT = 'Emojify Chat'
const DEMOJIFY_CHAT = 'Demojify Chat'

class AdditionalActions extends React.Component {
  state = {
    options: [ 'Cancel', 'Choose From Gallery', 'Coffee Date', 'Send Giphy'],
    selected: ''
  }

    onImagePick = async () => {

      let result = await Permissions.getAsync(Permissions.CAMERA_ROLL)

      if (Platform.OS === 'ios' &&  result.status !== 'granted'){
        let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (Platform.OS === 'ios' && status !== 'granted'){
          this.setState({alertCamera: true})
          return
        }
      }


      let image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        base64: true
      })

      if (image.width > global.MAX_IMAGE_WIDTH){
        image = await ImageManipulator.manipulateAsync(
          image.uri,
          [{ resize: { width: global.MAX_IMAGE_WIDTH}}, {saveOptions: {base64: true}}],
          { format: 'jpeg' }
        )
      }

      if (image.base64){
        this.props.messageImage(image.base64, this.props.onSend)
      }

    }

    onCoffeeDate = async (position) => {
      if(Platform.OS !== 'ios'){
        result = await Location.hasServicesEnabledAsync()
        if(result === false){
          this.setState({alertOn: true})
          return
        }
      }

      result = await Permissions.getAsync(Permissions.LOCATION)
      if (result.status !== 'granted'){
        result = await Permissions.askAsync(Permissions.LOCATION)
        if (result.status !== 'granted'){
          this.setState({alertOn: true})
          return
        }
      }

      position = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest, maximumAge:5000})


      this.props.messageCoffee(position, this.props.onSend)
    }

    onEmojizeChat = () => {
      this.props.emojizeChat()
      let newOption = this.state.options.slice(-1)[0] === EMOJIFY_CHAT ? DEMOJIFY_CHAT : EMOJIFY_CHAT
      this.setState({
        options: [ 'Cancel', 'Choose From Gallery', 'Coffee Date', newOption],
      })
    }

    onSendGiphy = () => {
      let items = global.RANDOM_GIPHY_WORDS
      let word = items[Math.floor(Math.random()*items.length)]
      this.props.messageGiphy(word, this.props.onSend)
    }

    showActionSheet = () => {
      this.ActionSheet.show()
      }

    handlePress = (i) => {
      this.setState({
        selected: i
      })
      switch (i) {
        case 1:
          this.onImagePick()
          break
        case 2:
          this.onCoffeeDate()
          break
        case 3:
          this.onSendGiphy()
          break
        default:
          break
      }
    }

  render(){
    return(
      <TouchableOpacity
        style={{alignSelf:'flex-end', paddingBottom:5}}
        onPress={this.showActionSheet}
      >
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={this.state.options}
          cancelButtonIndex={CANCEL_INDEX}
          onPress={this.handlePress}
        />
        <Icon name='plus-circle' type='Feather'/>

      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    messageImage,
    messageCoffee,
    messageGiphy
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(AdditionalActions)
