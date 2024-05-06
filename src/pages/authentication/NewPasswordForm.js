import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, TextField, Alert, Typography, Container, IconButton, InputAdornment } from '@mui/material';
import { Form, useFormik, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
// import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import * as Yup from 'yup';
import Page from '../../components/Page';
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
import { LoadingButton } from '@mui/lab';
import { useState, useEffect } from 'react';
import useAuth from 'src/hooks/useAuth';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';


const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: theme.spacing(12, 0)
}));

const ContentBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
  margin: 'auto',
}));

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function NewPasswordForm() {
  const navigate = useNavigate();
  const isMountedRef = useIsMountedRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation(); // Use location to access state
  const { isAuthenticated , resetPassword } = useAuth()


  const email = location.state?.email; // Access email passed via state

  console.log(email)
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }

    if (!email) {
      enqueueSnackbar('Email not provided, please try again.', { variant: 'error' });
      navigate('/auth/reset-password', {replace: true}); // Redirect back if no email found
    }
  }, [isAuthenticated, navigate, email, enqueueSnackbar]);


  

 

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false
    },
    validationSchema: validationSchema,


    onSubmit: async (values, { setErrors, setSubmitting }) => {

      try{

        await resetPassword(email, values.password);

        if (!isAuthenticated){
          navigate('/auth/login', { replace: true });
        } 
        enqueueSnackbar('Password has been reset successfully', { variant: 'success' });
      }
      catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          enqueueSnackbar(error.message ? error.message:'Encuter a problem', { variant: 'error' });
          setSubmitting(false);
        }
      }
      

    }
  });


  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;


  //  Handle eye icon click to show password
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  // Handle eye icon click to show confirm password
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };
  return (
    <RootStyle title="Set New Password">
      <LogoOnlyLayout />
      <Container>
        <ContentBox>

          <Typography variant="h3" paragraph sx={{
            textAlign: 'left',
            mb: 5

          }}>
            Set New Password
          </Typography>

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}


                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  {...getFieldProps('password')}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />


                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  {...getFieldProps('confirmPassword')}
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}

                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowConfirmPassword}>
                          <Icon icon={showConfirmPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                  Register
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </ContentBox>
      </Container>
    </RootStyle>
  );
};
