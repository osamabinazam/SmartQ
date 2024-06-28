import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, IconButton, Box,
  TextField, Container, Grid, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
import { updateServices } from '../../../../redux/slices/user';
import { useSnackbar } from 'notistack';
import axiosInstance from 'src/utils/axios';

const AccountService = ({ profile }) => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.user.services);
  const categories = useSelector((state) => state.user.categories);
  const [loading, setLoading] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const initialFormData = {
    name: '',
    description: '',
    price: '',
    categoryid: '',
    subcategoryid: '',
  };

  const handleCategoryChange = (event, setFieldValue) => {
    const categoryid = event.target.value;
    setFieldValue('categoryid', categoryid);
    const subcategories = categories.filter(category => category.parentcategoryid === categoryid);
    setFilteredSubcategories(subcategories);
    setFieldValue('subcategoryid', ''); // Clear subcategory if category changes
  };

  useEffect(() => {
    if (editingService) {
      const subcategories = categories.filter(category => category.parentcategoryid === editingService.categoryid);
      setFilteredSubcategories(subcategories);
    }
  }, [editingService, categories]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      let response;
      if (values.serviceid) {
        // Update service if serviceid is present
        response = await axiosInstance.put(`/api/services/${values.serviceid}`, values);
      } else {
        // Create new service
        response = await axiosInstance.post('/api/services', values);
        console.log("Response is : ", response)
      }

      const updatedService = values

      let updatedServices;
      if (values.serviceid) {
        // Update existing service in state
        updatedServices = services.map(service =>
          service.serviceid === values.serviceid ? updatedService : service
        );
      } else {
        // Add new service to state
        updatedServices = [...services, updatedService];
      }

      dispatch(updateServices(updatedServices));
      enqueueSnackbar('Service saved successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar('Failed to save service', { variant: 'error' });
    } finally {
      setLoading(false);
      setSubmitting(false);
      setEditingService(null);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    const subcategories = categories.filter(category => category.parentcategoryid === service.categoryid);
    setFilteredSubcategories(subcategories);
  };

  const handleDelete = async (serviceid) => {
    try {
      await axiosInstance.delete(`/api/services/${serviceid}`);
      const updatedServices = services.filter(service => service.serviceid !== serviceid);
      dispatch(updateServices(updatedServices));
      enqueueSnackbar('Service deleted successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error deleting service:', error);
      enqueueSnackbar('Failed to delete service', { variant: 'error' });
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Card>
        <CardHeader title={<Typography variant="h6">Account Service</Typography>} />
        <Box sx={{ p: 3 }}>
          <Formik
            initialValues={editingService || initialFormData}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field as={TextField} label="Name" name="name" fullWidth variant="outlined" required />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label="Description"
                      name="description"
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      label="Price (PKR)"
                      name="price"
                      type="number"
                      fullWidth
                      variant="outlined"
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      select
                      label="Category"
                      name="categoryid"
                      fullWidth
                      variant="outlined"
                      onChange={(e) => handleCategoryChange(e, setFieldValue)}
                    >
                      {categories.filter(category => category.parentcategoryid === null).map((category) => (
                        <MenuItem key={category.categoryid} value={category.categoryid}>
                          {category.categoryname}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      select
                      label="Subcategory"
                      name="subcategoryid"
                      fullWidth
                      variant="outlined"
                    >
                      {filteredSubcategories.map((subcategory) => (
                        <MenuItem key={subcategory.categoryid} value={subcategory.categoryid}>
                          {subcategory.categoryname}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                </Grid>
                <Box mt={3} display="flex" justifyContent="flex-end">
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={isSubmitting || loading}
                  >
                    {editingService ? 'Update' : 'Create'}
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Card>

      <Card sx={{ mt: 4 }}>
        <CardHeader title={<Typography variant="h6">All Services</Typography>} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Service Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Subcategory</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.length > 0 ? (
                services.map((service) => (
                  <TableRow key={service.serviceid}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>{categories.find(cat => cat.categoryid === service.categoryid)?.categoryname || 'N/A'}</TableCell>
                    <TableCell>{categories.find(cat => cat.categoryid === service.subcategoryid)?.categoryname || 'N/A'}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="edit" onClick={() => handleEdit(service)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDelete(service.serviceid)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 5, color: 'text.secondary' }}>
                    <Typography variant="h6">No services available</Typography>
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

export default AccountService;
