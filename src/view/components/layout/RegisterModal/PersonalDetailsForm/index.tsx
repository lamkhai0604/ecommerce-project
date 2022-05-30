import { FormEvent, MutableRefObject, useRef } from 'react';
import Button from 'view/components/base/Button';
import Divider from 'view/components/base/Divider';
import Input from 'view/components/base/FormikField';
import './style.css';

const PersonalDetailsForm = () => {
  //Ref
  const firstNameRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
  const lastNameRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
  const emailRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
  const phoneRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
  const paswordRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
  const paswordConfirmRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
  const handleRegistrationSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formValues = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      password: paswordRef.current.value,
      passwordConfirm: paswordConfirmRef.current.value,
    }
  };

  return (
    <form className="personal-detail" onSubmit={handleRegistrationSubmit}>
      <h4>Your personal details</h4>

      <Divider />

      <Input
        name="firstName"
        label="First Name"
        ref={firstNameRef}
        type="text"
        fullWidth
        sx={{ marginBottom: '1rem' }}
        required
      />
      <Input
        label="Last Name"
        name="lastName"
        ref={lastNameRef}
        type="text"
        fullWidth
        sx={{ marginBottom: '1rem' }}
        required
      />
      <Input
        label="Email"
        name="email"
        ref={emailRef}
        type="email"
        fullWidth
        sx={{ marginBottom: '1rem' }}
        required
      />
      <Input
        label="Phone"
        name="phone"
        ref={phoneRef}
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
        type="password"
        fullWidth
        sx={{ marginBottom: '1rem' }}
        required
      />
      <Input
        label="Password Confirm"
        name="passwordConfirm"
        ref={paswordConfirmRef}
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
  );
};

export default PersonalDetailsForm;
