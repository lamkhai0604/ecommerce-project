import { Box } from '@mui/material';
import { FormEvent, MutableRefObject, useRef, useState } from 'react';
import Button from 'view/components/base/Button';
import Divider from 'view/components/base/Divider';
import Input from 'view/components/base/FormikField';
import { toast } from 'react-toastify';
import { IUser } from 'models/types/user';
import { v4 as uuidv4 } from 'uuid';
import userApi from 'controllers/api/userApi';

interface IPersonalDetailsFormProps {
  onClose: () => void;
}

const PersonalDetailsForm = (props: IPersonalDetailsFormProps) => {
  //State
  const [isLoading, setIsLoading] = useState(false);
  const [firstNameValid, setFirstNameValid] = useState({ error: false, message: '' });
  const [lastNameValid, setLastNameValid] = useState({ error: false, message: '' });
  const [emailValid, setEmailValid] = useState({ error: false, message: '' });
  const [phoneValid, setPhoneValid] = useState({ error: false, message: '' });
  const [passwordValid, setPasswordValid] = useState({ error: false, message: '' });
  //Ref
  const firstNameRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
  const lastNameRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
  const emailRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
  const phoneRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
  const paswordRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
  const paswordConfirmRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;

  const handleRegistrationSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formValues: IUser = {
      id: uuidv4(),
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      password: paswordRef.current.value,
    };
    if (formValues.firstName.trim().length === 0) {
      setFirstNameValid({ error: true, message: 'Please enter a valid first name' });
      return;
    }
    if (formValues.lastName.trim().length === 0) {
      setLastNameValid({ error: true, message: 'Please enter a valid last name' });
      return;
    }
    if (formValues.email.trim().length === 0) {
      setEmailValid({ error: true, message: 'Please enter a valid email' });
      return;
    }
    if (formValues.phone.trim().length === 0) {
      setPhoneValid({ error: true, message: 'Please enter a valid phone' });
      return;
    }
    if (formValues.password !== paswordConfirmRef.current.value) {
      setPasswordValid({ error: true, message: 'Wrong password, please try again.' });
      return;
    }
    await userApi.addNewuser(formValues)
    toast.success(
      `Thanks ${formValues.firstName}. We are glad that you joined us. Here is the coupon for you to exclusively use on our website. Have a nice day`
    );
    setIsLoading(true);
    setTimeout(() => props.onClose(), 1000);
  };

  return (
    <Box sx={{ height: 400, overflow: 'auto' }}>
      <form onSubmit={handleRegistrationSubmit}>
        <h4>Your personal details</h4>

        <Divider />

        <Input
          name="firstName"
          label="First Name"
          ref={firstNameRef}
          type="text"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          error={firstNameValid.error}
          helperText={firstNameValid.message}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          ref={lastNameRef}
          error={lastNameValid.error}
          helperText={lastNameValid.message}
          type="text"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          required
        />
        <Input
          label="Email"
          name="email"
          ref={emailRef}
          error={emailValid.error}
          helperText={emailValid.message}
          type="email"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          required
        />
        <Input
          label="Phone"
          name="phone"
          ref={phoneRef}
          error={phoneValid.error}
          helperText={phoneValid.message}
          type="tel"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          required
        />

        <h4 className="pt-3">Your personal details</h4>

        <Divider />

        <Input
          label="Password"
          name="password"
          ref={paswordRef}
          error={passwordValid.error}
          helperText={passwordValid.message}
          type="password"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          required
        />
        <Input
          label="Password Confirm"
          name="passwordConfirm"
          ref={paswordConfirmRef}
          error={passwordValid.error}
          helperText={passwordValid.message}
          type="password"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          required
        />
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" size="large" isLoading={isLoading} sx={{borderRadius: 10, backgroundColor: '#292929', width: '20%'}}>
            Continue
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PersonalDetailsForm;
