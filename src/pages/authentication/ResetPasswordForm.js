import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import { TextField, Alert, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import axiosInstance from 'src/utils/axios';
import { useEffect } from 'react';
// import { replace } from 'lodash';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func
};

export default function ResetPasswordForm() {
  // const { resetPassword } = useAuth();
  const navigate = useNavigate();
  // const [email, setEmail] = useState('');
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }

  }
    , [isAuthenticated, navigate])

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: ResetPasswordSchema,


    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {

        // making api call to send email otp
        const response = await axiosInstance.post('/api/auth/reset-password', values)
        console.log(response.data)
        navigate('/auth/verify', { replace:true,  state: { email: values.email } });


      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            {...getFieldProps('email')}
            type="email"
            label="Email address"
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Reset Password
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
