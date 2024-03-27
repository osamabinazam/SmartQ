import React, { useState } from 'react'
import { Formik } from 'formik'
import { StatusBar, StyleSheet } from 'expo-status-bar'
import { Octicons, Ionicons } from '@expo/vector-icons'
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
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'

const { brand, darkLight } = Colors

const Signup = () => {
  //deal with hide and show password
  const [hidePassword, setHidePassword] = useState(true)
  const navigation = useNavigation()
  const [selectedGender, setSelectedGender] = useState('')

  const handleGenderChange = (itemValue) => {
    setSelectedGender(itemValue)
  }

  const handleCreateAccountSubmit = (values) => {
    // Extract only the relevant signup values
    const { userName, email, gender, password, confirmPassword } = values

    // Log the signup values in a clear format
    console.log('Signup Values:', {
      email,
      userName,
      gender,
      password,
      confirmPassword,
    })
    navigation.navigate('Profile')
  }

  {
    /** All of the date of birth logic is coded because of changes to database schema
  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date(2000, 0, 1))
  
  //Actual date of birth to be sent
  const [dob, setDob] = useState()

  //dob function
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(false)
    setDate(currentDate)
    setDob(currentDate)
  }

  // Date picker
  const showDatePicker = () => {
    // Corrected: Set show state to true when date icon is pressed
    setShow(true)
  }
  */
  }

  return (
    <StyledContainer>
      <StatusBar style='auto' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <InnerContainer>
          {/* <PageLogo
          //style={{ marginTop: 50 }}
          resizeMode='cover'
          source={require('./../assets/icon.png')}
        /> */}
          <>
            <PageTitle>SmartQ</PageTitle>
            <SubTitle>Sign up for SmartQ</SubTitle>
          </>
          {/* date & time picker calendar */}
          {/* {show && (
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode='date'
              is24Hour={true}
              onChange={onChange}
            />
          )} */}

          {/* Input fields */}
          <Formik
            initialValues={{
              userName: '',
              email: '',
              // dateOfBirth: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values) => handleCreateAccountSubmit(values)}
            // onSubmit={(values) => {
            //   console.log(values)
            //   Corrected: Use handleCreateAccountSubmit instead of handleSignupSubmit
            //   handleCreateAccountSubmit(values)
            // }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              //handleSignupSubmit,
              values,
            }) => (
              <StyledTextBox>
                <TextInput
                  label={'Username'}
                  icon={'person'}
                  placeholder={'Username e.g shafique7z'}
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('userName')}
                  onBlur={handleBlur('userName')}
                  value={values.userName}
                />
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
                  label={'Gender'}
                  icon={'moon'}
                  placeholder={'Please specify your gender.'}
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('gender')}
                  onBlur={handleBlur('gender')}
                  value={values.gender}
                />
                {/* <TextInput
                  label={'Date of Birth'}
                  icon={'calendar'}
                  placeholder={'YYYY - MM - DD'}
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('dateOfBirth')}
                  onBlur={handleBlur('dateOfBirth')}
                  value={dob ? dob.toDateString() : ''}
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
                /> */}
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
                <TextInput
                  label='Confirm Password'
                  icon='lock'
                  placeholder='Confirm password once more'
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MessageBox>...</MessageBox>
                <StyledButton onPress={handleCreateAccountSubmit}>
                  <ButtonText>Create an Account</ButtonText>
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
            name={hidePassword ? 'md-eye-off' : 'md-eye'}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  )
}

export default Signup
