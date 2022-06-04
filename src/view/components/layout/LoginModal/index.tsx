import { Box, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'controllers/app/hooks';
import { authActions } from 'controllers/feature/auth/authSlice';
import { getUserList, userActions } from 'controllers/feature/user/userSlice';
import { FormEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'view/components/base/Button';
import Divider from 'view/components/base/Divider';
import Input from 'view/components/base/FormikField';
import Modal from 'view/components/base/Modal';

interface ILoginModalProps {
  onClose: () => void;
}

const LoginModal = (props: ILoginModalProps) => {
  //State
  const [isLoading, setIsLoading] = useState(false);
  const [emailValid, setEmailValid] = useState({ error: false, message: '' });
  const [passwordValid, setPasswordValid] = useState({ error: false, message: '' });
  //Ref
  const emailRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
  //Redux
  const dispatch = useAppDispatch();
  const UserList = useAppSelector(getUserList);

  useEffect(() => {
    (async () => await dispatch(userActions.fetchUserList(10)))();
  }, [dispatch]);

  const handleSubmitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(authActions.login(formValues))
  };

  return (
    <Modal onClose={props.onClose}>
      <Box sx={{ width: '100%', padding: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{
            position: 'relative',
            fontWeight: 500,
            color: '#292929',
            display: 'inline-block',
            padding: '0 0 1rem 0',
            '&::before': {
              position: 'absolute',
              content: '""',
              borderTop: '4px solid rgb(255, 0, 85)',
              width: 430,
              bottom: -13,
            },
          }}
        >
          Login or create an account
        </Typography>

        <Divider />

        <Typography gutterBottom component="div" sx={{ width: '100%', padding: '2rem 0 0 0' }}>
          <Typography component="div" gutterBottom sx={{ display: 'inline-block', width: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Returning Customer
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              I am a returning customer
            </Typography>
          </Typography>

          <form onSubmit={handleSubmitLogin}>
            <Input
              name="email"
              label="Email Address"
              ref={emailRef}
              type="email"
              fullWidth
              sx={{ marginBottom: '1rem' }}
              error={emailValid.error}
              helperText={emailValid.message}
              required
            />
            <Input
              name="password"
              label="Password"
              ref={passwordRef}
              type="password"
              fullWidth
              sx={{ marginBottom: '1rem' }}
              error={passwordValid.error}
              helperText={passwordValid.message}
              required
            />
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  isLoading={isLoading}
                  sx={{ borderRadius: 10, backgroundColor: '#292929', width: '100%' }}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  isLoading={isLoading}
                  sx={{ borderRadius: 10, backgroundColor: '#292929', width: '100%' }}
                >
                  Create an account
                </Button>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <Link to="/">Forgotten Password</Link>
              </Grid>
            </Grid>
          </form>
        </Typography>
      </Box>
    </Modal>
  );
};
export default LoginModal;
