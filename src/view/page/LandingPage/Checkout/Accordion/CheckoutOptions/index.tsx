import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'view/components/base/Button';
import Input from 'view/components/base/Input';
import Radio from 'view/components/base/Radio';
import './style.css';

interface ICheckoutProps {
  doNextStep: (id: string) => void;
}

const ChecoutOption = (props: ICheckoutProps) => {
  const doNextStep = () => {
      props.doNextStep('collapseTwo')
  };
  

  return (
    <div className="container-fluid d-flex flex-row w-100">
      <div className="d-flex flex-column w-50 new-customer pe-3">
        <h4><b>New Customer</b></h4>
        <p>Checkout Options:</p>
        <Radio label="Register Account" checked={true} />
        <p className="my-3">
          By creating an account you will be able to shop faster, be up to date on an order's
          status, and keep track of the orders you have previously made.
        </p>
        <Button onClick={doNextStep}>Continue</Button>
      </div>

      <div className="d-flex flex-column w-50 return-customer">
        <h4>
          <b>Returning Customer</b>
        </h4>
        <p>I am a returning customer</p>
        <Input label="Email" input={{ type: 'email', placeholder: 'Email', required: true }} />
        <Input
          label="Password"
          input={{ type: 'password', placeholder: 'Password', required: true }}
        />
        <Link to="/">Forgotten Password</Link>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default ChecoutOption;
