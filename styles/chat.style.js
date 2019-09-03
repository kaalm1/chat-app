import { StyleSheet, Platform } from 'react-native'
import {scale, verticalScale, horizontalScale} from './scaling'
import commonColor from './commonColor.style'

export default StyleSheet.create({
  messageContainerUser: {
    backgroundColor: commonColor.brandThird,
    borderRadius:20,
    padding:10,
    marginLeft: 65,
    marginRight: 10,
    // marginTop: !sameUser && sameDay ? 15 : 3,
    marginBottom: 3,
    alignSelf: 'flex-end'
  },
  messageContainerMatch: {
    backgroundColor: commonColor.chatBackgroundMatch,
    borderRadius:20,
    padding:10,
    marginLeft: 0,
    marginRight: 65,
    // marginTop: !sameUser && sameDay ? 15 : 3,
    marginBottom: 3,
    alignSelf: 'flex-start'
  },
  textUser:{
    color: 'black',
    fontFamily: commonColor.fontPrimary,
    fontSize: Math.min(Math.max(14, horizontalScale(20)),26),
  },
  textMatch: {
    color: 'black',
    fontFamily: commonColor.fontPrimary,
    fontSize: Math.min(Math.max(14, horizontalScale(20)),26),
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: commonColor.fontPrimary,
    fontSize: Math.min(Math.max(14, horizontalScale(20)),26),
    lineHeight: Math.min(Math.max(16, horizontalScale(23)),29),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
    }),
    paddingLeft:10,
    paddingBottom: 5,
    paddingTop:5
  },
  timeUser: {
    color: '#939393',
    fontSize: Math.min(Math.max(10, horizontalScale(10)),16),
    textAlign: 'right',
    // fontFamily: commonColor.fontPrimary
  },
  timeMatch: {
    color: '#aaa',
    // color: 'black',
    fontSize: Math.min(Math.max(10, horizontalScale(10)),16),
    textAlign: 'left',
    // fontFamily: commonColor.fontPrimary
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  dayText: {
    backgroundColor: 'transparent',
    color: '#b2b2b2',
    fontSize: Math.min(Math.max(12, horizontalScale(14)),16),
    fontWeight: '600',
  }
})
