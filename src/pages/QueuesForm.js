import React from 'react';
import { Formik, Form, Field, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

// Schema for the form validation using Yup
const QueueSchema = Yup.object().shape({
  startTime: Yup.date().required('Start time is required'),
  endTime: Yup.date().required('End time is required'),
  capacity: Yup.number().required('Capacity is required').positive('Capacity must be positive').integer('Capacity must be an integer')
});

const QueueForm = ({ open, handleClose }) => {
  // Formik initialization
  const formik = Formik({
    initialValues: {
      startTime: '',
      endTime: '',
      capacity: ''
    },
    validationSchema: QueueSchema,
    onSubmit: (values, actions) => {
      console.log('Creating queue with data:', values);
      actions.setSubmitting(false);
      handleClose();  // Close dialog after form submission
    }
  });

  const { handleSubmit, getFieldProps, isSubmitting } = formik;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <DialogTitle>Create New Queue</DialogTitle>
          <DialogContent>
            <Field as={TextField} name="startTime" label="Start Time" type="datetime-local"
                   fullWidth margin="dense" InputLabelProps={{ shrink: true }}
                   {...getFieldProps('startTime')} />
            <Field as={TextField} name="endTime" label="End Time" type="datetime-local"
                   fullWidth margin="dense" InputLabelProps={{ shrink: true }}
                   {...getFieldProps('endTime')} />
            <Field as={TextField} name="capacity" label="Capacity" type="number"
                   fullWidth margin="dense" {...getFieldProps('capacity')} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button type="submit" color="primary" disabled={isSubmitting}>Create</Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
};

export default QueueForm;
