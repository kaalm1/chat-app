import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

import Color from './Color';

import { isSameDay } from './utils';
import { DATE_FORMAT } from './Constant';

import styles from '../../styles/chat.style'

export default function Day(
  { dateFormat, currentMessage, previousMessage, nextMessage, containerStyle, wrapperStyle, textStyle, inverted },
  context,
) {
  if (!isSameDay(currentMessage, nextMessage)) {
    return (
      <View style={[styles.dayContainer, containerStyle]}>
        <View style={wrapperStyle}>
          <Text style={[styles.dayText, textStyle]}>
            {moment(currentMessage.created)
              .locale('en')
              .format('ll')
              .toUpperCase()}
          </Text>
        </View>
      </View>
    );
  }
  return null;
}
