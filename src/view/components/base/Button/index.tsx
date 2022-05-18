import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
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
    </button>
  );
};

export default Button;
