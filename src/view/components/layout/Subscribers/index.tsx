
import { Divider, Paper } from '@mui/material';
import Button from 'view/components/base/Button';
import Input from 'view/components/base/Input';
import './style.css'

const Subscribers = () => {
  return (
    <Paper sx={{ pb: 4, px: 23, maxWidth: 2000 }}>
      <Divider sx={{ mb: 4}} />
      <p className="text-center">Special ofers for subscribers</p>
      <h3 className="text-center">Ten percent member discount</h3>
      <div className="subscribers-inputGroup">
        <Input />
        <span className="divider-group" />
        <Button>Subscribe</Button>
      </div>
    </Paper>
  );
};

export default Subscribers;
