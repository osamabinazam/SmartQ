import React, { useState } from 'react'
import { Formik } from 'formik'
import { StatusBar, StyleSheet } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { Octicons, Ionicons } from '@expo/vector-icons'
import { Alert, ScrollView, View } from 'react-native'
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledTextBox,
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  StyledTextInput,
  Colors,
  StyledButton,
  ButtonText,
  MessageBox,
  DividerLine,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
} from './../components/styles'

const { brand, darkLight } = Colors

const Login = () => {
  //deal with hide and show password
  const [hidePassword, setHidePassword] = useState(true)
  const navigation = useNavigation()

  const handleLoginSubmit = () => {
    navigation.navigate('BottomNavigator')
  }

  const handleSignupSubmit = () => {
    navigation.navigate('Signup')
  }

  const showAlert = () => {
    Alert.alert(
      'SmartQ Mobile Team',
      'Reset Password Feature Under Development. Please Hold on!'
    )
  }

  return (
    <StyledContainer>
      <StatusBar style='auto' />
      <ScrollView>
        <InnerContainer>
          <PageLogo
            //style={{ marginTop: 50 }}
            resizeMode='cover'
            source={require('./../assets/sd.png')}
          />
          <PageTitle>SmartQ</PageTitle>
          <SubTitle>Log into SmartQ</SubTitle>

          {/* Email TextBox Input settings */}
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => {
              console.log(values)
              // Corrected: Use handleLoginSubmit instead of handleSignupSubmit
              handleLoginSubmit()
              handleSignupSubmit()
            }}
          >
            {({
              handleChange,
              handleBlur,
              //handleSubmit,
              //handleSubmit,
              values,
            }) => (
              <StyledTextBox>
                <TextInput
                  label={'Email'}
                  icon={'mail'}
                  placeholder={'Please enter your email'}
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType='email-address'
                />
                <TextInput
                  label='Password'
                  icon='lock'
                  placeholder='Enter a strong password'
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MessageBox>...</MessageBox>
                <StyledButton onPress={handleLoginSubmit}>
                  <ButtonText>Log in</ButtonText>
                </StyledButton>
                <DividerLine />
                <StyledButton onPress={handleSignupSubmit} isSignUp>
                  <ButtonText>Create an Account</ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Forgot Password? {''}</ExtraText>
                  <TextLink>
                    <TextLinkContent
                      //Show a toast message when pressed
                      onPress={
                        showAlert
                        //() => navigation.navigate('ResetPassword')
                      }
                    >
                      Reset Password
                    </TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledTextBox>
            )}
          </Formik>
        </InnerContainer>
      </ScrollView>
    </StyledContainer>
  )
}

const TextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? 'md-eye-off' : 'md-eye'}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  )
}

export default Login
