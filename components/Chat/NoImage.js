import React, { useState, useEffect } from 'react';
import {View} from 'react-native'
import {Icon} from 'native-base'


const NoImage = function(props) {
  // const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   // document.title = `You clicked ${count} times`;
  // });

  return (
    <View
      style={[
        {backgroundColor: '#B2B6B9',
        borderColor: '#EFF1F3',
        borderWidth:2,
        height: props.height || 50,
        width: props.width || 50,
        borderRadius: props.borderRadius || 25,
        justifyContent:'center',
        alignItems:'center'},
        {...props.style}
      ]}>
      <Icon
        name='user'
        type='AntDesign'
        style={{color: '#DDDEDF', fontSize: props.fontSize || 20}}/>
    </View>
  );
}

export default NoImage
