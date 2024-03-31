import React from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { OutlinedInput, FormHelperText, Stack, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { PATH_DASHBOARD } from '../../routes/paths';
import NewPasswordForm from './NewPasswordForm';
import Page from '../../components/Page';
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout'; 

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

export default function VerifyCodeForm({ email }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

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
    
        enqueueSnackbar('Verification successful', { variant: 'success' });
        navigate('/auth/new-password'); 
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
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
          minHeight: '100vh'
        }}
      >
        <Typography variant="h3" paragraph>
          Verify Code Page
        </Typography>
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
