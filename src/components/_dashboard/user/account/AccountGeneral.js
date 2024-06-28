import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState, useEffect } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, TextField, Typography, MenuItem, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
// import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { UploadAvatar } from '../../../upload';
// utils
import { fData } from '../../../../utils/formatNumber';
//
import countries from '../countries';
import axiosInstance from 'src/utils/axios';

// Enum values for business types
const businessTypes = [
  'Retail', 'Wholesale', 'Manufacturing', 'Services', 'Healthcare', 'Banking', 'Government', 'Education', 'Restaurants', 'Entertainment', 'Transportation', 'Telecommunications', 'Utilities', 'Hospitality', 'Pharmacy', 'Post Office', 'Others'
];

// ----------------------------------------------------------------------

export default function AccountGeneral({ profile }) {
  // const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const [businessType, setBusinessType] = useState(profile?.businesstype || '');
  const [showOtherBusinessType, setShowOtherBusinessType] = useState(profile?.businesstype === 'Others');

  useEffect(() => {
    setShowOtherBusinessType(profile?.businesstype === 'Others');
  }, [profile?.businesstype]);

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: profile?.user?.username || '',
      email: profile?.user?.email || '',
      photoURL: user.photoURL || null,
      phoneNumber: profile?.user?.contact?.phone || '',
      country: profile?.user?.contact?.country || '',
      address: profile?.user?.contact?.address || '',
      state: profile?.user?.state || '',
      city: profile?.user?.contact?.city || '',
      zipCode: user.zipCode,
      about: profile?.bio || '',
      businessname: profile?.businessname || '',
      businesstype: profile?.businesstype || '',
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const contactData = {
          phone: values.phoneNumber,
          country: values.country,
          address: values.address,
          city: values.city,
          state: values.state
        };

        const profileData = {
          businessname: values.businessname,
          businesstype: values.businesstype,
          bio: values.about,
        };

        const userUpdate = {
          username: values.displayName,
          email: values.email,
          photoURL: values.photoURL
        };

        var isCreate =  false;
        if (profile.user.contact === null) {
          isCreate = true;
        }

        // API call to update profile
        const response = await axiosInstance.put(`/api/profile/vendor/${profile.vendorprofileid}`, {
          userDetails: userUpdate,
          contactDetails: contactData,
          profileDetails: profileData,
          isCreate: isCreate
        });

        console.log(response)

        

        
        enqueueSnackbar('Update success', { variant: 'success' });
        setSubmitting(false);
      } catch (error) {
        console.error('Error updating profile:', error);
        enqueueSnackbar('Update failed', { variant: 'error' });
        setErrors({ afterSubmit: error.message });
        setSubmitting(false);
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('photoURL', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  const handleBusinessTypeChange = (event) => {
    const selectedBusinessType = event.target.value;
    setBusinessType(selectedBusinessType);
    console.log(selectedBusinessType === 'Others')
    setShowOtherBusinessType(selectedBusinessType === 'Others');
    setFieldValue('businesstype', selectedBusinessType);
    if (selectedBusinessType !== 'Others') {
      setFieldValue('otherbusinesstype', '');
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
              <UploadAvatar
                accept="image/*"
                file={values.photoURL}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.photoURL && errors.photoURL)}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary'
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />

              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.photoURL && errors.photoURL}
              </FormHelperText>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Name" {...getFieldProps('displayName')} />
                  <TextField fullWidth label="Email Address" {...getFieldProps('email')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Phone Number" {...getFieldProps('phoneNumber')} />
                  <TextField fullWidth label="Address" {...getFieldProps('address')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    select
                    fullWidth
                    label="Country"
                    placeholder="Country"
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField fullWidth label="State/Region" {...getFieldProps('state')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="City" {...getFieldProps('city')} />
                  <TextField fullWidth label="Zip/Code" {...getFieldProps('zipCode')} />
                </Stack>

                <TextField {...getFieldProps('about')} fullWidth multiline minRows={4} maxRows={4} label="About" />
                <TextField fullWidth label="Business Name" {...getFieldProps('businessname')} />
                <TextField
                  select
                  fullWidth
                  label="Business Type"
                  value={businessType}
                  onChange={handleBusinessTypeChange}
                  {...getFieldProps('businesstype')}
                >
                  {businessTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
                {showOtherBusinessType && (
                  <TextField fullWidth label="Other Business Type" {...getFieldProps('otherbusinesstype')} />
                )}
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
