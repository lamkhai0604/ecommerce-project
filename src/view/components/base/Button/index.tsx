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
  radius?: boolean;
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
  radius,
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
      className={`
        ${clsName} 
        button button--${size || 'default'} 
        ${inverse && 'button--inverse'} 
        ${danger && 'button--danger'}
        ${radius && 'border-black'}
      `}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
        {children}
      {/* <span className="d-flex flex-row justify-content-center align-items-center">
        {isLoading && <Loading />}
      </span> */}
    </button>
  );
};

export default Button;
