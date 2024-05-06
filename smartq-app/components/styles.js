import styled from 'styled-components'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'

const StatusBarHeight = Constants.statusBarHeight

//app theme: colors
export const Colors = {
  primary: '#ffffff',
  secondary: '#E5E7EB',
  tertiary: '#1F2937',
  darkLight: '#9CA3AF',
  anotherBrand: '3cc0f0', //light-blue
  brand: '#086AC5', //dark-blue
  brandSecondary: '#4ecdc4',
  green: '#10B981',
  red: '#EF4444',
}

const {
  primary,
  secondary,
  tertiary,
  darkLight,
  brand,
  brandSecondary,
  green,
  red,
} = Colors

export const StyledContainer = styled.View`
  flex: 1;
  padding: 20px;
  padding-top: ${StatusBarHeight + 10}px;
  background-color: ${primary};
`

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${primary};
  align-items: center;
`

export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`
export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 4px;
  border-color: ${brand};
  margin-bottom: 24px;
  margin-left: 10px;
  margin-top: 10px;
`

export const PageLogo = styled.Image`
  width: 250px;
  height: 104px;
  margin-top: 64px;
`

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;

  ${(props) =>
    props.welcome &&
    `
    font-size: 35px;
    `};
`

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 0px;
  font-weight: bold;
  color: ${tertiary};
  ${(props) =>
    props.welcome &&
    `
    margin-bottom: 5px; 
    font-weight: normal;
    `};
`

export const StyledTextBox = styled.View`
  width: 90%;
`

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 30px;
  font-size: 14px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 12px;
  color: ${tertiary};
`
export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
  margin-left: 20px;
`
export const LeftIcon = styled.View`
  left: 15px;
  top: 32px;
  position: absolute;
  z-index: 1;
`

export const RightIcon = styled.TouchableOpacity`
  right: 16px;
  top: 32px;
  position: absolute;
  z-index: 1;
`

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${(props) => (props.isSignUp ? brandSecondary : brand)};
  justify-content: center;
  border-radius: 5px;
  align-items: center;
  margin-vertical: 8px;
  height: 60px;
`
export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
  font-weight: bold;
`

//Message box for signing in and signing up
export const MessageBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: red;
  font-style: italic;
`
export const DividerLine = styled.View`
  height: 1px;
  width: 90%;
  align-self: center;
  background-color: ${darkLight};
  margin-vertical: 16px;
`
export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`
export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
`
export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`
export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`
