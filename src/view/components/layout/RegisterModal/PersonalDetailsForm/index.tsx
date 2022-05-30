import { FormEvent } from 'react';
import Button from 'view/components/base/Button';
import Divider from 'view/components/base/Divider';
import Input from 'view/components/base/FormikField';
import './style.css';

const PersonalDetailsForm = () => {
  const handleRegistrationSubmit = (e: FormEvent): void => {};

  return (
    <div className="personal-detail">
      <h4>Your personal details</h4>

      <Divider />

      <Input
        name="firstName"
        label="First Name"
        type="text"
        fullWidth
        sx={{ marginBottom: '1rem' }}
        required
      />
      <Input
        label="Last Name"
        name="Last Name"
        type="text"
        fullWidth
        sx={{ marginBottom: '1rem' }}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        fullWidth
        sx={{ marginBottom: '1rem' }}
        required
      />
      <Input
        label="Phone"
        name="phone"
        type="number"
        fullWidth
        sx={{ marginBottom: '1rem' }}
        required
      />

      <h4 className="pt-3">Your personal details</h4>

      <Divider />

      <form>
        <Input
          label="Password"
          name="password"
          type="password"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          required
        />
        <Input
          label="Password Confirm"
          name="password"
          type="password"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          required
        />
        <div className="d-flex justify-content-end my-3">
          <Button type="submit" variant="contained" size="large">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
