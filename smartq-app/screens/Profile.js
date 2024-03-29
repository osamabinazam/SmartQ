import React from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledTextBox,
  StyledButton,
  ButtonText,
  DividerLine,
  WelcomeContainer,
  Avatar,
} from './../components/styles'
import { useNavigation,useFocusEffect } from '@react-navigation/native'

const Profile = () => {
  const navigation = useNavigation()

  useFocusEffect(() => {
    console.log('Screen Name: Profile');
  });

  const handleLogout = () => {
    // logout logic to be performed here
    // For now, only navigate back to login screen when logout is pressed
    navigation.navigate('Login')
  }

  return (
    <>
      <StatusBar style='auto' />
      <InnerContainer>
        <WelcomeContainer>
          {/* <PageTitle welcome={true}>Welcome to SmartQ!</PageTitle>
           */}
           <Avatar
              resizeMode='cover'
              source={require('./../assets/pp.jpeg')}
            />
          <StyledTextBox>
            <SubTitle welcome={true}>Shafique Ahmed</SubTitle>
            <SubTitle welcome={true}>shafiqued17z@gmail.com</SubTitle>
                   {/* <DividerLine /> */}
                  {/* <DividerLine/> */}
            <StyledButton onPress={handleLogout}>
              <ButtonText>About</ButtonText>
            </StyledButton>
            <StyledButton onPress={handleLogout}>
              <ButtonText>Privacy Policy</ButtonText>
            </StyledButton>
            <StyledButton onPress={handleLogout}>
              <ButtonText>Share App</ButtonText>
            </StyledButton>
            <StyledButton onPress={handleLogout}>
              <ButtonText>Log out</ButtonText>
            </StyledButton>
          </StyledTextBox>
        </WelcomeContainer>
      </InnerContainer>
    </>
  )
}

export default Profile
