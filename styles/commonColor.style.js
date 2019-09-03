import color from "color"

import { Platform, Dimensions, PixelRatio } from "react-native"

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width
const platform = Platform.OS
const platformStyle = undefined

export default {
  platformStyle,
  platform,

  // options:
  // orange safe: '#F78228'
  // gummi red: 	"#D93B1D"
  // skype blue: "#02B0E2"
  // sapphire blue: '#0F52BA'
  // cornflower blue: '#6495ED'

  // Color
  brandPrimary: "#0F52BA",
  brandSecond: '#6495ED',
  brandBackground: "transparent",
  brandSecondary: '#E34228',
  brandInfo: "#28B8F6",
  brandSuccess: "#59DBB6",
  brandDanger: "#fa8072",
  brandWarning: "#F0CB2C",
  brandSidebar: "#252932",
  backgroundColor:'#f5f5f5',

  brandThird: '#A9E1FF',
  brandThirdBold: '#57C4FF',
  brandThirdBoldDeep: '#0ba9ff',
  brandNotSelected: '#F5F5F5',
  brandNotSelectedDarker: '#C0C0C0',
  brandNoPicColor: '#3d5875',

  // thisUser ? '#0084ff' : '#f0f0f0'

  chatBackgroundMatch: '#f0f0f0',
  chatBackgroundUser: '#0084ff',

  backgroundNext: "#DCDCDC",
  textNext: "#BEBEBE",

  headerColor: "black",
  headerCheck: '#57C4FF', //Brand Third Bold

  // Font
  fontPrimary: "Cabin",
  fontBold: "CabinBold",
  fontItalic: "CabinItalic",

  //
  blackAlternative: '#1B4F5D'
}
