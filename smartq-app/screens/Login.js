import React, { useState, useContext } from 'react'
import { Formik } from 'formik'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { Octicons, Ionicons } from '@expo/vector-icons'
import {
  Alert,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  Modal,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
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
import axios from 'axios'
import { AuthContext } from './../Contexts/AuthContext'

const { brand, darkLight } = Colors

const Login = () => {
  //states
  const navigation = useNavigation()
  const [hidePassword, setHidePassword] = useState(true)
  const [emailOrUserName, setemailOrUserName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false) // Add this state at the top where other states are declared
  const [modalVisible, setModalVisible] = useState(false) // State to control the visibility of the modal
  const [emailForReset, setEmailForReset] = useState('') // State to store the email input for password reset
  const [verificationMode, setVerificationMode] = useState(false) // Tracks if the modal is in OTP verification mode
  const [otp, setOTP] = useState('') // This will store the OTP input by the user
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetPasswordMode, setResetPasswordMode] = useState(false) // To toggle new password input fields

  const openResetPasswordModal = () => {
    setMessage('') // Reset message state when modal is opened
    setModalVisible(true)
  }

  const closeResetPasswordModal = () => {
    setModalVisible(false)
    setVerificationMode(false) // Reset verification mode here if needed
  }

  // When verifying the OTP
  const verifyOTP = async () => {
    setIsSending(true) // Show progress indicator to indicate processing

    try {
      // Construct the API call to verify the OTP
      console.log('Verifying OTP...')
      console.log('OTP:', otp)
      console.log('Email:', emailForReset)
      const response = await axios.post(
        'http://10.102.139.47:3002/api/auth/verify-otp',
        {
          email: emailForReset, // Assuming you still have the email stored from when you sent the OTP
          otp: otp, // The OTP entered by the user
        }
      )

      console.log('OTP Verification Response:', response.data) // Log the response data from the server

      // Handle the response based on your application needs
      if (response) {
        setMessage('OTP verified! Please set your new password.')
        setVerificationMode(false) // Turn off verification mode
        setResetPasswordMode(true) // Switch to password reset mode
      } else {
        setMessage('Failed to verify OTP. Please try again.')
      }
    } catch (error) {
      if (error.response) {
        console.error(
          'Verification Error:',
          JSON.stringify(error.response, null, 2)
        )
        setMessage(
          `Verification failed: ${
            error.response.data || 'Invalid OTP. Please try again.'
          }`
        )
      } else if (error.request) {
        console.error('Verification Error: No response from server')
        setMessage(
          'Network error: No response from the server. Please check your connection.'
        )
      } else {
        console.error('Verification Error:', error.message)
        setMessage(`Error: ${error.message}. Please try again.`)
      }
    } finally {
      setIsSending(false) // Hide progress indicator regardless of the outcome
    }
  }

  const sendResetLink = async () => {
    setMessage('')
    setIsSending(true) // Start showing the progress bar

    if (!emailForReset.trim()) {
      setMessage("Email can't be empty.")
      setIsSending(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailForReset)) {
      setMessage('Invalid email! Please enter a valid email address.')
      setIsSending(false)
      return
    }

    try {
      console.log('Sending reset code to email: ', emailForReset)
      const response = await axios.post(
        'http://10.102.139.47:3002/api/auth/reset-password',
        { email: emailForReset }
      )
      console.log('API Response:', response.data)
      setMessage('Code sent! Please check your email.')
      setVerificationMode(true) // Enable verification mode right here
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message
      )
      setMessage('Failed to send reset link. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  //destructuring the context, username and email, profile, accesstoken only.
  const {
    setAccessTokenApiResp,
    setUsernameApiResp,
    setEmailApiResp,
    setPP,
    setPassApiResp,
    setProfilePictureApiResp,
  } = useContext(AuthContext)

  const handleLoginSubmit = async () => {
    setMessage('')
    console.log('Logging in user with following credentials:')
    console.log('emailOrUserName:', emailOrUserName)
    console.log('Password:', password)
    // Reset message state

    // Check for empty input fields
    if (!emailOrUserName.trim()) {
      setMessage("Email/Username can't be empty.")
      return
    }
    if (!password.trim()) {
      setMessage("Password can't be empty.")
      return
    }

    try {
      setIsLoading(true) // Set loading to true when login starts
      // Make a POST request to the login API with username and password
      const response = await axios.post(
        'http://10.102.139.47:3002/api/auth/login',
        {
          username: emailOrUserName,
          password: password,
        }
      )

      // Handle the response
      if (response && response.data) {
        console.log('Login Response:', JSON.stringify(response.data, null, 2))

        // Extract the specific data from the response
        const accessToken = response.data.tokens.accessToken
        const username = response.data.user.username
        const email = response.data.user.email
        const profilePicturePath =
          response.data.user.images &&
          response.data.user.images.coverPhoto &&
          response.data.user.images.coverPhoto.path
        const profilePicture = profilePicturePath || 'No profile picture' // Assuming there is a profilePicture field

        // Store the extracted data in state variables
        setAccessTokenApiResp(accessToken)
        setUsernameApiResp(username)
        setEmailApiResp(email)
        setProfilePictureApiResp(profilePicture)

        // Log the extracted data
        console.log('Consoling API Resp. from Login screen')
        console.log(`Access Token: ${accessToken}`)
        console.log(`Username: ${username}`)
        console.log(`Email: ${email}`)
        console.log(`Profile Picture: ${profilePicture}`)

        // Check the user type from the response
        const userType = response.data.user.usertype
        console.log('User Type:', userType)

        // Navigate based on user type
        if (userType === 'customer') {
          setPP(true)
          navigation.navigate('BottomNavigator')
        } else {
          // Show an alert if the user type is not 'customer'
          Alert.alert(
            'Vendor Not Allowed',
            'Please login on web portal of SmartQ'
          )
        }
      }
      setIsLoading(false) // Set loading to false when login is successful or fails
    } catch (error) {
      setIsLoading(false) // Ensure loading is set to false on error as well
      if (error.response) {
        console.error('Error1:', JSON.stringify(error.response.data, null, 2))

        // Extract the error message from the response data
        let errorMessage =
          typeof error.response.data === 'string'
            ? error.response.data
            : error.response.data.message

        // Check specific starts of the error message
        if (errorMessage.startsWith('Invalid password')) {
          setMessage('Invalid credentials. Please try again.')
        } else if (errorMessage.startsWith('User not found')) {
          setMessage('Account not found. Please create an account first.')
        } else {
          // Default error message if none of the conditions are met
          setMessage('An error occurred. Please try again later.')
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error:', error.request)
        Alert.alert(
          'Network Error',
          'No response from the server. Check your network connection.'
        )
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message)
        Alert.alert(
          'Error',
          'An error occurred while logging in: ' + error.message
        )
      }
    }
  }

  const handleSignupSubmit = () => {
    navigation.navigate('Signup')
  }

  const handleSetNewPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match. Please try again.')
      return
    }
    setIsSending(true)
    try {
      // Call API to set new password
      console.log('Setting new password for email:', emailForReset)
      const response = await axios.post(
        'http://10.102.139.47:3002/api/auth/new-password',
        {
          email: emailForReset,
          password: newPassword, // assuming the API expects a key named 'newPassword'
        }
      )
      if (response.data && response.data.message) {
        console.log(
          'Response.Data.Message:',
          JSON.stringify(response.data.message, null, 2)
        )
        console.log('Response.Data:', JSON.stringify(response.data, null, 2))
        setMessage('Password has been updated successfully.')
        setResetPasswordMode(false) // Reset mode after successful password update
        closeResetPasswordModal() // Assuming you have a function to close the modal
      } else {
        setMessage('Failed to update password. Please try again.') // Handle the case where the API doesn't return a success flag
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('API Error:', error.response.data)
        setMessage(
          `Failed to update password: ${
            error.response.data.message ||
            error.response.data ||
            'Please try again.'
          }`
        )
      } else if (error.request) {
        // The request was made but no response was received
        console.error('API Error: No response from server')
        setMessage('Network error: No response from server.')
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('API Error:', error.message)
        setMessage(`Error: ${error.message}. Please try again.`)
      }
    } finally {
      setIsSending(false)
    }
  }

  return (
    <StyledContainer>
      <StatusBar style='auto' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <InnerContainer>
          <PageLogo
            //style={{ marginTop: 50 }}
            resizeMode='cover'
            source={require('./../assets/sd.png')}
          />
          <PageTitle>SmartQ</PageTitle>
          <SubTitle>Log into SmartQ</SubTitle>

          {/* emailOrUserName TextBox Input settings */}
          <Formik
            initialValues={{ emailOrUserName: '', password: '' }}
            onSubmit={handleLoginSubmit}
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
                  label={'Email or Username'}
                  icon={'mail'}
                  placeholder={'Enter your email or username'}
                  placeholderTextColor={darkLight}
                  onChangeText={(text) => {
                    handleChange('emailOrUserName')(text)
                    setemailOrUserName(text) // Call getLoginDetails with current emailOrUserName and password
                  }}
                  onBlur={handleBlur('emailOrUserName')}
                  value={values.emailOrUserName}
                  keyboardType='email-address'
                />
                <TextInput
                  label='Password'
                  icon='lock'
                  placeholder='Enter a strong password'
                  placeholderTextColor={darkLight}
                  onChangeText={(text) => {
                    handleChange('password')(text)
                    setPassword(text) // Call getLoginDetails with current email and password
                  }}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MessageBox>{message}</MessageBox>
                <StyledButton onPress={handleLoginSubmit}>
                  {isLoading ? (
                    <ActivityIndicator size='small' color='#FFFFFF' /> // Display loading indicator when logging in
                  ) : (
                    <ButtonText>Log in</ButtonText>
                  )}
                </StyledButton>
                <DividerLine />
                <StyledButton onPress={handleSignupSubmit} isSignUp>
                  <ButtonText>Create an Account</ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Forgot Password? {''}</ExtraText>
                  <TextLink>
                    <TextLinkContent onPress={openResetPasswordModal}>
                      Reset Password
                    </TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledTextBox>
            )}
          </Formik>
        </InnerContainer>
      </ScrollView>
      {/* Modal for reset password */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeResetPasswordModal} // Close modal when back button is pressed
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss() // Dismiss the keyboard if open
            if (!verificationMode) {
              setMessage('') // Clear message only when not in verification mode
              closeResetPasswordModal() // Close the modal only if not in verification mode
            }
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={closeResetPasswordModal}>
                  <Text style={styles.modalText}>CANCEL</Text>
                </TouchableOpacity>
                <Text style={[styles.modalTitle, { marginBottom: 15 }]}>
                  {resetPasswordMode
                    ? 'New Password'
                    : verificationMode
                    ? 'Verify Code'
                    : 'Reset Password'}
                </Text>
                <TouchableOpacity
                  onPress={
                    resetPasswordMode
                      ? handleSetNewPassword
                      : verificationMode
                      ? verifyOTP
                      : sendResetLink
                  }
                >
                  <Text style={styles.modalText}>
                    {resetPasswordMode
                      ? 'SET'
                      : verificationMode
                      ? 'VERIFY'
                      : 'SEND'}
                  </Text>
                </TouchableOpacity>
              </View>
              {resetPasswordMode ? (
                <>
                  <TextInput
                    label='New Password'
                    icon='lock'
                    placeholder='Enter new password'
                    secureTextEntry={true}
                    onChangeText={setNewPassword}
                    value={newPassword}
                  />
                  <TextInput
                    label='Confirm New Password'
                    icon='lock'
                    placeholder='Confirm new password'
                    secureTextEntry={true}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                  />
                </>
              ) : verificationMode ? (
                <TextInput
                  label='OTP'
                  icon='key'
                  placeholder='Enter the code sent to your email'
                  keyboardType='numeric'
                  onChangeText={setOTP}
                  value={otp}
                />
              ) : (
                <TextInput
                  label='Email'
                  icon='mail'
                  placeholder='Enter your email'
                  keyboardType='email-address'
                  onChangeText={setEmailForReset}
                  value={emailForReset}
                />
              )}
              <MessageBox>{message}</MessageBox>
              <StyledButton
                onPress={
                  resetPasswordMode
                    ? handleSetNewPassword
                    : verificationMode
                    ? verifyOTP
                    : sendResetLink
                }
              >
                {isSending ? (
                  <ActivityIndicator size='small' color='#FFFFFF' />
                ) : (
                  <ButtonText>
                    {resetPasswordMode
                      ? 'Set Password'
                      : verificationMode
                      ? 'Verify'
                      : 'Send Code'}
                  </ButtonText>
                )}
              </StyledButton>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </StyledContainer>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    marginBottom: 40,
  },
  modalView: {
    margin: 20,
    width: '90%', // Adjusted for consistent modal width
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  modalText: {
    color: brand,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalInput: {
    marginBottom: 15,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
})

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
