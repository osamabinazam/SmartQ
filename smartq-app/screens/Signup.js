import React, { useState, useContext } from 'react'
import { Formik } from 'formik'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons } from '@expo/vector-icons'
import {
  StyledContainer,
  InnerContainer,
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
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Alert } from 'react-native'
import { AuthContext } from './../Contexts/AuthContext'

const { brand, darkLight } = Colors

const Signup = () => {
  //deal with hide and show password
  const [hidePassword, setHidePassword] = useState(true)
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false) // Loading state for progress indication
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const userType = 'customer'
  const [message, setMessage] = useState('')

  //destructuring the context, setUsernameApiResp, setEmailApiResp, setProfilePictureApiResp, setAccessTokenApiResp
  const {
    setUsernameApiResp,
    setEmailApiResp,
    setProfilePictureApiResp,
    setAccessTokenApiResp,
    setPP,
    setPassApiResp,
    pcIP
  } = useContext(AuthContext)

  const handleCreateAccountSubmit = async () => {
    setMessage('')
    console.log('Creating account with the following details:')
    console.log('Username:', username)
    console.log('Email:', email)
    console.log('Gender:', selectedGender)
    console.log('Password:', password)
    console.log('Confirm Password:', confirmPassword)

    // Check if any of the fields are empty
    if (!username.trim()) {
      //Alert.alert('Username Empty Error', "Username can't be empty.")
      setMessage("Username can't be empty.")
      return
    }
    if (!email.trim()) {
      // Alert.alert('Email Empty Error', "Email can't be empty.")
      setMessage("Email can't be empty.")
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      // Alert.alert('Invalid Email', 'Please enter a valid email address.')
      setMessage('Invalid email! Please enter a valid email address.')
      return
    }

    if (!selectedGender.trim()) {
      // Alert.alert('Gender Empty Error', "Gender can't be empty.")
      setMessage("Gender can't be empty.")
      return
    }

    // Validate gender value
    if (!['male', 'female'].includes(selectedGender.toLowerCase())) {
      // Alert.alert(
      //   'Invalid Gender',
      //   'Only "male" or "female" is accepted in this field.'
      // )
      setMessage("Only 'male' or 'female' is accepted in gender.")
      return
    }

    if (!password.trim()) {
      // Alert.alert('Password Empty Error', "Password can't be empty.")
      setMessage("Password can't be empty.")
      return
    }
    if (!confirmPassword.trim()) {
      // Alert.alert(
      //   'Confirm Password Empty Error',
      //   "Confirm password can't be empty."
      // )
      setMessage("Confirm password can't be empty.")
      return
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9._]{1,10}$/
    if (!usernameRegex.test(username)) {
      // Alert.alert(
      //   'Invalid Username',
      //   'Username can only include letters, numbers, periods, and underscores, and must be 1-10 characters long.'
      // )
      setMessage(
        'Username can only include letters, numbers, periods, and underscores, and must be 1-10 characters long.'
      )
      return
    }

    // Validate strong password
    const passwordRegex = /^.{3,}$/
    if (!passwordRegex.test(password)) {
      // Alert.alert(
      //   'Weak Password',
      //   'Password must be at least 3 characters long.'
      // )
      setMessage('Password must be at least 3 characters long.')
      return
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      // If passwords don't match, show an alert to the user
      // Alert.alert(
      //   'Password Mismatch',
      //   'Please make sure the password and confirm password match.'
      // )
      setMessage('Passwords do not match. Please retry')
      return // Exit the function early
    } else {
      //merge the two passwords
      setPassword(password)
    }

    // Make a POST request to the register API with signup details
    try {
      setIsLoading(true) // Start loading
      console.log(`making request to api on this ip: ${pcIP}`)
      const response = await axios.post(
        `${pcIP}:3002/api/auth/register`,
        {
          username: username,
          email: email,
          password: password,
          gender: selectedGender,
          userType: userType,
        }
      )

      if (response && response.data) {
        console.log(
          'Registration Response:',
          JSON.stringify(response.data, null, 2)
        )

        // Extract the specific data from the response
        const accessToken = response.data.tokens.accessToken
        const username = response.data.user.username
        const email = response.data.user.email
        const profilePicture =
          response.data.user.profilePicture || 'No profile picture' // Assuming there is a profilePicture field

        setAccessTokenApiResp(accessToken)
        setUsernameApiResp(username)
        setEmailApiResp(email)
        setProfilePictureApiResp(profilePicture)
        setPassApiResp(password)

        // Log the extracted data
        console.log('Consoling API Resp. from Sign up screen')
        console.log(`Access Token: ${accessToken}`)
        console.log(`Username: ${username}`)
        console.log(`Email: ${email}`)
        console.log(`Profile Picture: ${profilePicture}`)

        setPP(false)
        navigation.navigate('Profile')
      } else {
        console.log('Unexpected response structure:', response)
        Alert.alert('Error', 'Received unexpected response from the server.')
      }
      setIsLoading(false) // Stop loading indicator on success or failure
    } catch (error) {
      setIsLoading(false)
      console.log('OGError:', error)
      if (error.response && error.response.data && error.response.data.errors) {
        console.log('0Error:', error)
        // Check if the error is a unique constraint violation
        const uniqueError = error.response.data.errors.find(
          (err) => err.type === 'unique violation'
        )

        if (uniqueError) {
          // Username already exists, inform the user
          // Alert.alert(
          //   'Error',
          //   'Username already exists. Please choose a different one.'
          // )
          console.log('uniqueError:', error)
          setMessage('Username taken! Please choose a different one.')
        } else {
          // Other error occurred, display a generic error message
          console.log('1Error:', error)
          // Alert.alert(
          //   '1Error',
          //   'An error occurred while creating your account. Please try again.'
          // )
          setMessage(
            'An error occurred while creating your account. Please try again.'
          )
        }
      } else {
        // Unable to determine specific error, display generic error message
        console.log('2Error:', error.response.data)
        // Alert.alert(
        //   '2Error',
        //   'An error occurred while creating your account. Please try again.'
        // )
        setMessage(
          'An error occurred while creating your account. Please try again.'
        )
      }
    }
  }

  return (
    <StyledContainer>
      <StatusBar style='auto' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <InnerContainer>
          <>
            <PageTitle>SmartQ</PageTitle>
            <SubTitle>Sign up for SmartQ</SubTitle>
          </>
          {/* Input fields */}
          <Formik
            initialValues={{
              username: '',
              email: '',
              gender: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={handleCreateAccountSubmit}
          >
            {({ handleChange, handleBlur, values }) => (
              <StyledTextBox>
                <TextInput
                  label={'Username'}
                  icon={'person'}
                  placeholder={'username e.g shafique7z'}
                  placeholderTextColor={darkLight}
                  onChangeText={(text) => {
                    handleChange('username')(text)
                    setUsername(text)
                  }}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
                <TextInput
                  label={'Email'}
                  icon={'mail'}
                  placeholder={'Please enter your email'}
                  placeholderTextColor={darkLight}
                  onChangeText={(text) => {
                    handleChange('email')(text)
                    setEmail(text) // Call getLoginDetails with current email and password
                  }}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType='email-address'
                />
                <TextInput
                  label={'Gender'}
                  icon={'moon'}
                  placeholder={'male'}
                  placeholderTextColor={darkLight}
                  onChangeText={(text) => {
                    handleChange('gender')(text)
                    setSelectedGender(text)
                  }}
                  onBlur={handleBlur('gender')}
                  value={values.gender}
                />
                <TextInput
                  label='Password'
                  icon='lock'
                  placeholder='Enter a strong password'
                  placeholderTextColor={darkLight}
                  onChangeText={(text) => {
                    handleChange('password')(text)
                    setPassword(text)
                  }}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <TextInput
                  label='Confirm Password'
                  icon='lock'
                  placeholder='Confirm password once more'
                  placeholderTextColor={darkLight}
                  onChangeText={(text) => {
                    handleChange('confirmPassword')(text)
                    setConfirmPassword(text)
                  }}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MessageBox>{message}</MessageBox>
                <StyledButton onPress={handleCreateAccountSubmit}>
                  {isLoading ? (
                    <ActivityIndicator size='small' color='#FFFFFF' />
                  ) : (
                    <ButtonText>Create an Account</ButtonText>
                  )}
                </StyledButton>
                <DividerLine />
                <ExtraView>
                  <ExtraText>Already have an account?</ExtraText>
                  <TextLink>
                    <TextLinkContent
                      onPress={() => navigation.navigate('Login')}
                    >
                      {' '}
                      Log in
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
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? 'eye-off' : 'eye'}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  )
}

export default Signup
