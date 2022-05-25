import { ReactNode, useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './styles.css';

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
  onClick?(): void;
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const MuiButton = (props: ButtonProps) => {
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (props.isLoading === true) {
      setTimeout(() => setIsLoad(true), 1000);
    }
  }, [props.isLoading]);
  // if (to) {
  //   return (
  //     <Link
  //       to={to}
  //       className={`button button--${size || 'default'} ${inverse && 'button--inverse'} ${
  //         danger && 'button--danger'
  //       }`}
  //     >
  //       {children}
  //     </Link>
  //   );
  // }
  return (
    <>
      {isLoad ? (
        <LoadingButton 
        loading={true}
        variant="outlined"
        disabled>{props.children}</LoadingButton>
      ) : (
        <Button
          variant={props.variant}
          onClick={props.onClick}
          disabled={props.disabled}
          fullWidth={props.fullWidth}
          size={props.size}
          startIcon={props.startIcon}
          endIcon={props.endIcon}
        >
          {props.children}
        </Button>
      )}
    </>
    // <button
    //   className={`
    //     ${clsName}
    //     button button--${size || 'default'}
    //     ${inverse && 'button--inverse'}
    //     ${danger && 'button--danger'}
    //     ${radius && 'border-black'}
    //   `}
    //   type={type}
    //   onClick={onClick}
    //   disabled={disabled}
    // >
    //     {children}
    // </button>
  );
};

export default MuiButton;
