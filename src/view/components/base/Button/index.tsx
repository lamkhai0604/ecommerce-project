import { ReactNode } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { SxProps, Theme } from '@mui/material';

interface ButtonProps {
  danger?: boolean;
  inverse?: boolean;
  to?: string;
  variant?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  clsName?: string;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | string;
  radius?: boolean;
  onClick?: () => void;
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps<Theme> | undefined
}

const MuiButton = (props: ButtonProps) => {
  return (
    <>
      {props.isLoading ? (
        <LoadingButton
          loading
          loadingPosition="start"
          variant="outlined"
          startIcon={<SaveIcon />}
          size="large"
        >
          Continue
        </LoadingButton>
      ) : (
        <Button
          variant={props.variant}
          onClick={props.onClick}
          disabled={props.disabled}
          fullWidth={props.fullWidth}
          size={props.size}
          startIcon={props.startIcon}
          endIcon={props.endIcon}
          type={props.type}
          sx={props.sx}
        >
          {props.children}
        </Button>
      )}
    </>
  );
};

export default MuiButton;
