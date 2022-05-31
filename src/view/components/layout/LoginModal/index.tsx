import { Box, Typography } from '@mui/material';
import Divider from 'view/components/base/Divider';
import Modal from 'view/components/base/Modal';

interface ILoginModalProps {
  onClose: () => void;
}

const LoginModal = (props: ILoginModalProps) => {
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
              borderTop: '4px solid #292929',
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
        </Typography>
      </Box>
    </Modal>
  );
};
export default LoginModal;
