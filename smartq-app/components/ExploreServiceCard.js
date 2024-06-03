import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Platform, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from './styles';
import { useNavigation } from '@react-navigation/native';

const ExploreServiceCard = ({ item }) => {
  const navigation = useNavigation(); // Hook to access navigation
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: '',
    time: '',
  });

  // States for date and time pickers
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // State to track the validation messages
  const [validationMessages, setValidationMessages] = useState({
    date: '',
    time: '',
  });

  // Function to handle booking appointment
  const handleBookAppointment = () => {
    setIsModalVisible(true); // Show the modal
  };

  // Function to handle confirming the appointment
  const handleConfirmAppointment = () => {
    const messages = {
      date: appointmentDetails.date ? '' : 'Date cannot be empty.',
      time: appointmentDetails.time ? '' : 'Time cannot be empty.',
    };

    setValidationMessages(messages);

    if (!messages.date && !messages.time) {
      console.log('Appointment Details:', appointmentDetails);
      showAlert();
      handleCloseModal(); // Close the modal after confirming
    }
  };

  // Function to handle date change
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    if (currentDate < new Date()) {
      Alert.alert('Invalid Date', 'Please select a future date.');
      return;
    }
    setShowDatePicker(false);
    setAppointmentDetails({ ...appointmentDetails, date: currentDate.toLocaleDateString() });
  };

  // Function to handle time change
  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    if (currentTime < new Date()) {
      Alert.alert('Invalid Time', 'Please select a future time.');
      return;
    }
    setShowTimePicker(false);
    setAppointmentDetails({ ...appointmentDetails, time: currentTime.toLocaleTimeString() });
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalVisible(false); // Hide the modal
  };

  // Function to show the alert
  const showAlert = () => {
    Alert.alert(
      'Appointment Scheduled',
      `Appointment has been successfully scheduled to Dr. John Doe on date ${appointmentDetails.date} and time ${appointmentDetails.time}. You'll be notified a day prior to your appointment.\n\nPlease pay the charges at Dr. John Doe's counter.`,
      [{ text: 'Close', onPress: () => console.log('Alert closed') }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Temporary Image */}
      <Image source={item.servicesThumbnail} style={styles.image} />

      {/* Service Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.serviceTitle}</Text>
        <TouchableOpacity style={styles.dotsIcon}>
          <FontAwesome name='ellipsis-h' size={24} color='gray' />
        </TouchableOpacity>
      </View>

      {/* Necessary Details */}
      <TouchableOpacity onPress={() => navigation.navigate('VendorProfile')}>
        <Text style={styles.details}>
          {item.serviceProviderName} - {item.distance} km away
        </Text>
        <Text style={styles.details}>{item.openingHours}</Text>
      </TouchableOpacity>
      {/* Price */}
      <View style={styles.priceContainer}>
        <Text style={styles.price}>Rs. {item.price}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleBookAppointment} style={[styles.button, styles.filledButton]}>
          <Text style={[styles.buttonText, styles.filledButtonText]}>
            Book Appointment
          </Text>
        </TouchableOpacity>
      </View>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Modal for booking appointment */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Book Appointment</Text>
            <Text style={styles.modalDescription}>
              Please provide the details for your appointment.
            </Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.datePickerText}>
                {appointmentDetails.date ? appointmentDetails.date : 'Choose Date'}
              </Text>
            </TouchableOpacity>
            {validationMessages.date ? <Text style={styles.errorText}>{validationMessages.date}</Text> : null}
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <Text style={styles.datePickerText}>
                {appointmentDetails.time ? appointmentDetails.time : 'Choose Time'}
              </Text>
            </TouchableOpacity>
            {validationMessages.time ? <Text style={styles.errorText}>{validationMessages.time}</Text> : null}
            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()} // Allow only future dates
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                display="default"
                onChange={handleTimeChange}
                minimumDate={new Date()} // Allow only future times
              />
            )}
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmAppointment}>
              <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 1,
    // marginTop: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  details: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  dotsIcon: {
    marginLeft: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginRight: 8,
  },
  price: {
    fontSize: 20,
    marginLeft: 1,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#3cc0f0',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 8,
  },
  buttonText: {
    color: Colors.brand,
    fontWeight: 'bold',
  },
  filledButton: {
    backgroundColor: Colors.brand,
    marginRight: 0, // Remove margin for full width
  },
  filledButtonText: {
    color: '#ffffff',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginVertical: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  datePickerText: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: Colors.brand,
    padding: 15,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
};

export default ExploreServiceCard;