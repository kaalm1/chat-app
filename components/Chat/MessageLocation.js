import React from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps'

export default class MessageLocation extends React.Component {
  render() {
      return (
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChatMap', {currentMessage: this.props.currentMessage})}>
          <MapView
            style={[styles.mapView, this.props.mapViewStyle]}
            region={{
              latitude: this.props.currentMessage.location.latitude,
              longitude: this.props.currentMessage.location.longitude,
              latitudeDelta: 0.0922/10,
              longitudeDelta: 0.0421/10,
            }}
          >
            <MapView.Marker title={this.props.currentMessage.text} coordinate={{latitude: this.props.currentMessage.location.latitude,longitude: this.props.currentMessage.location.longitude}}/>
          </MapView>
        </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  mapView: {
    width: 200,
    height: 150,
    borderRadius: 13,
    margin: 3,
  },
});
