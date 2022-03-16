import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import './styles.css';

interface ButtonProps {
  size?: string;
  danger?: boolean;
  inverse?: boolean;
  to?: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  clsName?: string;
  onClick?(): void;
  children: ReactNode;
}

const Button = ({
  children,
  size,
  danger,
  inverse,
  to,
  isLoading,
  type,
  disabled,
  clsName,
  onClick,
}: ButtonProps) => {
  if (to) {
    return (
      <Link
        to={to}
        className={`button button--${size || 'default'} ${inverse && 'button--inverse'} ${
          danger && 'button--danger'
        }`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`${clsName} button button--${size || 'default'} ${inverse && 'button--inverse'} ${
        danger && 'button--danger'
      }`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading && <Loading />}
      {children}
    </button>
  );
};

export default Button;
