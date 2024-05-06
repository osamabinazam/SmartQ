import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  InnerContainer,
  SubTitle,
  StyledTextBox,
  StyledButton,
  ButtonText,
  DividerLine,
  WelcomeContainer,
  StyledInputLabel,
  StyledTextInput,
  Avatar,
} from '../components/styles'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { AuthContext } from '../Contexts/AuthContext'
import * as ImagePicker from 'expo-image-picker' // Make sure this is imported at the top
import * as Camera from 'expo-camera' // Importing Camera
import axios from 'axios' // Import axios for making HTTP requests

const Profile = () => {
  const navigation = useNavigation()
  const [name, setName] = useState('') // State to store the name

  //destructuring the context, username and email, profile, accesstoken only.
  const {
    usernameApiResp,
    emailApiResp,
    accessTokenApiResp,
    profilePictureApiResp,
    setProfilePictureApiResp,
    setAccessTokenApiResp,
    pp,
    setRefreshTokenApiResp,
  } = useContext(AuthContext)
  console.log('Profile', profilePictureApiResp)
  useFocusEffect(() => {
    console.log('Screen Name: Profile')
  })

  // const handleChangeName = (text) => {
  //   console.log('Name:', text)
  //   setName(text)
  // }

  const handleLogout = () => {
    setProfilePictureApiResp(null) // Clear profile picture context
    setAccessTokenApiResp('')
    setRefreshTokenApiResp('')
    navigation.navigate('Login')

    navigation.navigate('Login')
  }

  const handleGoingToHome = () => {
    console.log(
      'Going to Home from Profile, accessTokenApiResp:',
      accessTokenApiResp,
      '\nprofilePictureApiResp:',
      profilePictureApiResp
    )
    navigation.navigate('BottomNavigator')
  }

  //new uploadImage
  const uploadImage = async (imageUri) => {
    try {
      const formData = new FormData()
      formData.append('profilePhoto', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      })

      console.log('accessTokenApiResp:', accessTokenApiResp)
      const response = await axios.post(
        'http://10.102.139.47:3002/api/images/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessTokenApiResp}`,
          },
        }
      )

      console.log('Upload response:', JSON.stringify(response.data, null, 2))

      if (response.data && response.data.imageUrl) {
        console.log('uri:', response.data.imageUrl)
        setProfilePictureApiResp({ uri: response.data.imageUrl })
      }
    } catch (error) {
      console.error('Upload error:', error)
    }
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0]
      setProfilePictureApiResp({ uri: selectedAsset.uri }) // Immediately update with local URI
      uploadImage(selectedAsset.uri) // Upload and handle response inside uploadImage
    }
  }

  // Function to handle taking a new photo
  const takePhoto = async () => {
    // Request camera permissions
    const cameraPerm = await ImagePicker.requestCameraPermissionsAsync()

    if (cameraPerm.status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!')
      return
    }

    // Launch the camera with these settings
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    // Changed to use assets array, check for non-empty assets array
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0]
      setProfilePictureApiResp({ uri: selectedAsset.uri })
      uploadImage(selectedAsset.uri) // Pass the uri directly
    }
  }

  console.log(
    '1Profile Picture URI:',
    profilePictureApiResp ? profilePictureApiResp : 'Using default image'
  )

  console.log('2Profile Picture URI:', profilePictureApiResp)
  // State for handling the image source
  const [imageSource, setImageSource] = useState(null)

  useEffect(() => {
    // Update image source whenever profilePictureApiResp changes
    setImageSource(
      profilePictureApiResp
        ? { uri: pp ? profilePictureApiResp : profilePictureApiResp.uri }
        : require('./../assets/nopp.jpg')
    )
  }, [profilePictureApiResp]) // Add pp as a dependency if its value can change during the component lifecycle

  return (
    <>
      <StatusBar style='auto' />
      <InnerContainer>
        <WelcomeContainer>
          <Avatar resizeMode='cover' source={imageSource} />
          {/* Use state to manage image source */}
          <StyledTextBox>
            <SubTitle
              welcome={true}
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              {usernameApiResp}
            </SubTitle>
            <SubTitle
              welcome={true}
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              {emailApiResp}
            </SubTitle>
            <SubTitle welcome={true}
              style={{
                marginTop: 20,
              }}
            >Upload Profile Photo Below</SubTitle>
            <StyledButton onPress={pickImage}>
              <ButtonText>Choose from Photos</ButtonText>
            </StyledButton>
            <StyledButton onPress={takePhoto}>
              <ButtonText>Take Photo</ButtonText>
            </StyledButton>
            <StyledButton onPress={handleGoingToHome}>
              <ButtonText>Home</ButtonText>
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
