import { Form, Formik } from 'formik';
import Button from 'view/components/base/Button';
import Divider from 'view/components/base/Divider';
import Input from 'view/components/base/FormikField';
import {TextField} from "@mui/material";
import { initialRegisterValues, RegisterFormValues, RegisterSchema } from './registerFormValue';
import './style.css';

const PersonalDetailsForm = () => {
  const handleRegistrationSubmit = (values: RegisterFormValues): void => {
    alert(JSON.stringify(values));
  };

  return (
    <div className="personal-detail">
      <h4>Your personal details</h4>

      <Divider />

      <Formik
        initialValues={initialRegisterValues}
        onSubmit={handleRegistrationSubmit}
        validationSchema={RegisterSchema}
      >
        {({ dirty, isValid }) => {
          return (
            <Form>
              <Input as={TextField} name="firstName" label="First Name" type="text" fullWidth sx={{marginBottom: '1rem'}} required  />
              <Input as={TextField} label="Last Name" name="Last Name" type="text" fullWidth sx={{marginBottom: '1rem'}} required/>
              <Input as={TextField} label="Email" name="email"  type="email"  fullWidth sx={{marginBottom: '1rem'}} required/>
              <Input as={TextField} label="Phone" name="phone"  type="number" fullWidth sx={{marginBottom: '1rem'}} required/>

              <h4 className="pt-3">Your personal details</h4>

              <Divider />

              <div>
                <Input as={TextField} label="Password" name="password" type="password" fullWidth sx={{marginBottom: '1rem'}} required/>
                <Input as={TextField} label="Password Confirm" name="password" type="password" fullWidth sx={{marginBottom: '1rem'}} required/>
              </div>
              
              <div className="d-flex justify-content-end my-3">
                <Button type="submit" radius disabled={!dirty || !isValid}>
                  Continue
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PersonalDetailsForm;
