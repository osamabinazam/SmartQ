import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, IconButton, Box,
  TextField, Container, Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { updateOperatingHours } from '../../../../redux/slices/user';
import { useSnackbar } from 'notistack';
import axiosInstance from 'src/utils/axios';

const daysOfWeek = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
];

const AccountOperatingHours = () => {
  const dispatch = useDispatch();
  const operatingHours = useSelector((state) => state.user.operatinghours);
  const [loading, setLoading] = useState(false);
  const [editingHour, setEditingHour] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const initialFormData = {
    weekday: '',
    opentime: '',
    closetime: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      let response;

      if (values.openinghoursid) {
        // Update operating hour if openinghoursid is present
        response = await axiosInstance.put(`/api/operatinghours/${values.openinghoursid}`, values);
      } else {
        // Create new operating hour
        response = await axiosInstance.post('/api/operatinghours/create', values);
      }

      const updatedOperatingHour = response.data;

      let updatedOperatingHours;
      if (values.openinghoursid) {
        // Update existing operating hour in state
        updatedOperatingHours = operatingHours.map(hour =>
          hour.openinghoursid === values.openinghoursid ? updatedOperatingHour : hour
        );
      } else {
        // Add new operating hour to state
        updatedOperatingHours = [...operatingHours, updatedOperatingHour];
      }

      dispatch(updateOperatingHours(updatedOperatingHours));
      enqueueSnackbar('Operating hour saved successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar('Failed to save operating hour', { variant: 'error' });
    } finally {
      setLoading(false);
      setSubmitting(false);
      setEditingHour(null);
    }
  };

  const handleEdit = (hour) => {
    setEditingHour(hour);
  };

  const handleDelete = async (openinghoursid) => {
    try {
      console.log("Operating Hours id to delete: ", openinghoursid); // Debugging log
      await axiosInstance.delete(`/api/operatinghours/${openinghoursid}`);
      const updatedOperatingHours = operatingHours.filter(hour => hour.openinghoursid !== openinghoursid);
      dispatch(updateOperatingHours(updatedOperatingHours));
      enqueueSnackbar('Operating hour deleted successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error deleting operating hour:', error);
      enqueueSnackbar('Failed to delete operating hour', { variant: 'error' });
    }
  };

  console.log("Operating Hours Data: ", operatingHours); // Debugging log

  return (
    <Container component="main" maxWidth="lg">
      <Card>
        <CardHeader title={<Typography variant="h6">Account Operating Hours</Typography>} />
        <Box sx={{ p: 3 }}>
          <Formik
            initialValues={editingHour || initialFormData}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      name="weekday"
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={daysOfWeek}
                          onChange={(selectedOption) => setFieldValue('weekday', selectedOption ? selectedOption.value : '')}
                          value={daysOfWeek.find(day => day.value === field.value) || null}
                          isClearable
                          isSearchable
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              minHeight: '56px',
                              boxShadow: 'none',
                              borderColor: 'currentColor',
                              '&:hover': {
                                borderColor: 'currentColor',
                              },
                            }),
                            valueContainer: (provided) => ({
                              ...provided,
                              padding: '0px 16px',
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
                              backgroundColor: 'background.paper',
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isSelected ? 'primary.main' : 'background.paper',
                              color: state.isSelected ? 'primary.contrastText' : 'text.primary',
                              '&:hover': {
                                backgroundColor: state.isSelected ? 'primary.dark' : 'action.hover',
                                color: state.isSelected ? 'primary.contrastText' : 'text.primary',
                              },
                            }),
                            menuList: (provided) => ({
                              ...provided,
                            }),
                          }}
                          placeholder="Select Weekday(s)"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      label="Open Time"
                      name="opentime"
                      type="time"
                      fullWidth
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      label="Close Time"
                      name="closetime"
                      type="time"
                      fullWidth
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
                <Box mt={3} display="flex" justifyContent="flex-end">
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={isSubmitting || loading}
                  >
                    {editingHour ? 'Update' : 'Create'}
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Card>

      <Card sx={{ mt: 4 }}>
        <CardHeader title={<Typography variant="h6">All Operating Hours</Typography>} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Weekday(s)</TableCell>
                <TableCell>Open Time</TableCell>
                <TableCell>Close Time</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {operatingHours.length > 0 ? (
                operatingHours.map((hour) => (
                  <TableRow key={hour.openinghoursid}>
                    <TableCell>{hour.weekday}</TableCell>
                    <TableCell>{hour.opentime}</TableCell>
                    <TableCell>{hour.closetime}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="edit" onClick={() => handleEdit(hour)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDelete(hour.openinghoursid)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 5, color: 'text.secondary' }}>
                    <Typography variant="h6">No operating hours available</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};

export default AccountOperatingHours;
