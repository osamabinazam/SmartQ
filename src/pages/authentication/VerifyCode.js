import React from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { OutlinedInput, FormHelperText, Stack, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import Page from '../../components/Page';
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
import { SentIcon } from 'src/assets';
import axiosInstance from 'src/utils/axios';
import useAuth from 'src/hooks/useAuth';
import { useEffect, useState } from 'react';

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

export default function VerifyCodeForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation(); // Use location to access state
  const { isAuthenticated } = useAuth();

  const email = location.state?.email; // Access email passed via state

  console.log("Email is : ", email)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }

    if (!email) {
      enqueueSnackbar('Email not provided, please try again.', { variant: 'error' });
      navigate('/auth/reset-password'); // Redirect back if no email found
    }
  }, [email, isAuthenticated, navigate, enqueueSnackbar]);




  

  

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.number().required('Code is required'),
    code2: Yup.number().required('Code is required'),
    code3: Yup.number().required('Code is required'),
    code4: Yup.number().required('Code is required'),
    code5: Yup.number().required('Code is required'),
    code6: Yup.number().required('Code is required')
  });

  const formik = useFormik({
    initialValues: {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      code6: ''
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {


        const data = {
          email: email,
          otp: `${values.code1}${values.code2}${values.code3}${values.code4}${values.code5}${values.code6}`
        }

        const response = await axiosInstance.post('/api/auth/verify-otp', data);
        console.log(response.data);

        console.log("Email is in submit form : ", email)
        enqueueSnackbar('Verification successful', { variant: 'success' });
        navigate('/auth/new-password', { replace:true, state: { email: email } });
      } catch (error) {
        console.log(error)
        enqueueSnackbar(error, { variant: 'error' });
        setSubmitting(false);
      }
    }
  });

  const { values, errors, isValid, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <RootStyle title="Verify Code">
      <LogoOnlyLayout />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >

        <SentIcon sx={{ mb: 5, mx: 'auto', height: 150 }} />


        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            justifyContent: 'center',
            mb:5
          }}
        >

          <Typography variant="h3" gutterBottom>
            Email sent successfully
          </Typography>
          <Typography gutterBottom >
            We have sent a confirmation email to &nbsp;
            <strong>{email}</strong>
            <br />
            Please check your email.
          </Typography>
        </Box>



        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack direction="row" spacing={2} justifyContent="center">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <OutlinedInput
                  key={index}
                  id={`code${index}`}
                  {...getFieldProps(`code${index}`)}
                  type="number"
                  placeholder="-"
                  maxLength={1}
                  error={Boolean(touched[`code${index}`] && errors[`code${index}`])}
                  inputProps={{
                    sx: {
                      p: 0,
                      textAlign: 'center',
                      width: { xs: 36, sm: 56 },
                      height: { xs: 36, sm: 56 }
                    }
                  }}
                />
              ))}
            </Stack>
            <FormHelperText error={!isValid} style={{ textAlign: 'right' }}>
              {!isValid && 'Code is required'}
            </FormHelperText>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 3 }}>
              Verify
            </LoadingButton>
          </Form>
        </FormikProvider>
      </Box>
    </RootStyle>
  );
}
