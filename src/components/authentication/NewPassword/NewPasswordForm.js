import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import { TextField, Alert, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPasswordForm = ({ onSubmit }) => {
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: NewPasswordSchema,
    onSubmit: async (values, { setErrors }) => {
      setIsSubmitting(true);
      try {
        await onSubmit(values.password);
        setIsSubmitting(false);
        navigate('/auth/login'); // Navigate to login page after successful password change
      } catch (error) {
        console.error(error);
        setIsSubmitting(false);
        setErrors({ afterSubmit: error.message });
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            {...getFieldProps('password')}
            type="password"
            label="New Password"
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            {...getFieldProps('confirmPassword')}
            type="password"
            label="Confirm Password"
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Set New Password
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

NewPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default NewPasswordForm;
