import { Box, Typography } from '@mui/material';
import Divider from 'view/components/base/Divider';
import Modal from 'view/components/base/Modal';
import PersonalDetailsForm from './PersonalDetailsForm';

interface IRegisterProps {
  onClose: () => void;
}

const RegisterModal = (props: IRegisterProps) => {
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
          <Typography
            component="div"
            gutterBottom
            sx={{ display: 'inline-block', width: '100%' }}
          >
            <Typography variant="h5" gutterBottom>Register Account</Typography>
            <Typography variant="subtitle1">If you already have an account with us, please login at the <span>login form</span></Typography>
          </Typography>
          <PersonalDetailsForm onClose={props.onClose} />
        </Typography>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
