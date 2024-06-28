import React, { useState, useEffect } from 'react';
import { TextField, Box, Grid, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form, Field } from 'formik';
// import axios from 'axios';
import Select from 'react-select';
import { State, City } from 'country-state-city';
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';
import axiosInstance from 'src/utils/axios';

const AccountLocation = ({ profile, vendorprofileid }) => {


  console.log("Locations are ", profile)
  const initialFormData = profile?.[0] || {
    address: '',
    city: '',
    state: '',
    postalcode: '',
    longitude: '',
    latitude: '',
  };

  const [country] = useState("PK");
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [province, setProvince] = useState(null);
  const [provinceCode, setProvinceCode] = useState(null);
  const [city, setCity] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const states = State.getStatesOfCountry(country);
    const filteredStates = states.map(({ name, isoCode }) => ({
      label: name,
      value: isoCode,
    }));
    setFilteredProvinces(filteredStates);

    if (initialFormData.state) {
      const selectedProvince = filteredStates.find(province => province.label === initialFormData.state);
      setProvince(selectedProvince);
      setProvinceCode(selectedProvince ? selectedProvince.value : null);
    }
  }, [country, initialFormData.state]);

  useEffect(() => {
    if (provinceCode) {
      const cities = City.getCitiesOfState(country, provinceCode);
      const filteredCityList = cities.map(({ name }) => ({
        label: name,
        value: name,
      }));
      setFilteredCities(filteredCityList);

      if (initialFormData.city) {
        const selectedCity = filteredCityList.find(city => city.label === initialFormData.city);
        setCity(selectedCity);
      }
    }
  }, [country, provinceCode, initialFormData.city]);

  const handleProvinceChange = (selectedOption, setFieldValue) => {
    setProvince(selectedOption);
    setProvinceCode(selectedOption ? selectedOption.value : null);
    setFieldValue('state', selectedOption ? selectedOption.label : '');
  };

  const handleCityChange = (selectedOption, setFieldValue) => {
    setCity(selectedOption);
    setFieldValue('city', selectedOption ? selectedOption.value : '');
  };


  // Handle Submit
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const endpoint = profile?.length
        ? `/api/location/${profile[0].locationid}`
        : '/api/location/create';
      const method = profile?.length ? 'put' : 'post';
      const response = await axiosInstance[method](endpoint, values);
      console.log('API Response:', response.data);
      setSubmitting(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitting(false);
    }
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '56px',
      boxShadow: state.isFocused ? 'none' : 'none',
      borderColor: state.isFocused ? theme.palette.primary.main : provided.borderColor,
      '&:hover': {
        borderColor: theme.palette.primary.main,
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0px 6px',
    }),
    input: (provided) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '56px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme.palette.background.paper,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? theme.palette.primary.main : theme.palette.background.paper,
      color: state.isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
      '&:hover': {
        backgroundColor: state.isSelected ? theme.palette.primary.dark : theme.palette.action.hover,
        color: state.isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
      },
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: theme.palette.background.paper,
    }),
  };

  const validationSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    postalcode: Yup.string().required('Postal code is required'),
    longitude: Yup.number().required('Longitude is required'),
    latitude: Yup.number().required('Latitude is required'),
  });

  return (
    <Container component="main" maxWidth="lg">
      <Typography variant="h5" component="h1" gutterBottom>
        Business Location
      </Typography>
      <Formik
        initialValues={initialFormData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="address"
                  as={TextField}
                  label="Address"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  options={filteredProvinces}
                  onChange={(option) => handleProvinceChange(option, setFieldValue)}
                  value={province}
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={true}
                  isSearchable={true}
                  name="provinces"
                  placeholder="Select Province"
                  styles={customSelectStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  options={filteredCities}
                  onChange={(option) => handleCityChange(option, setFieldValue)}
                  value={city}
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={true}
                  isSearchable={true}
                  name="cities"
                  placeholder="Select City"
                  styles={customSelectStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="postalcode"
                  as={TextField}
                  label="Postal Code"
                  fullWidth
                  variant="outlined"
                  required
                  style={{ zIndex: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="longitude"
                  as={TextField}
                  type="number"
                  label="Longitude"
                  fullWidth
                  variant="outlined"
                  required
                  style={{ zIndex: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="latitude"
                  as={TextField}
                  type="number"
                  label="Latitude"
                  fullWidth
                  variant="outlined"
                  required
                  style={{ zIndex: 0 }}
                />
              </Grid>
            </Grid>
            <Box mt={3} display="flex" justifyContent="flex-end">
              <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
                Submit
              </LoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AccountLocation;
