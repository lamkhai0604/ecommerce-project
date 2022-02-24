import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

interface ButtonProps {
  href?: string;
  size?: string;
  danger?: boolean;
  inverse?: boolean;
  to?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  clsName?: string;
  onClick?(): void;
  children: ReactNode;
}

const Button = ({
  children,
  href,
  size,
  danger,
  inverse,
  to,
  type,
  disabled,
  clsName,
  onClick,
}: ButtonProps) => {
  if (href) {
    return (
      <a
        className={`button button--${size || 'default'} ${inverse && 'button--inverse'} ${
        //   inverse === true ? "button--inverse" : null
          danger && 'button--danger'
        }`}
        href={href}
      >
        {children}
      </a>
    );
  }
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
      {children}
    </button>
  );
};

export default Button;
