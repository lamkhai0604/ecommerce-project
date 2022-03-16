import { forwardRef } from 'react';
import './style.css';

interface IInputState {
  id?: string;
  type?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  step?: string;
  required?: boolean;
  defaultValue?: string | number;
}

interface ICheckboxState {
  id?: string;
  checked?: boolean;
}

interface IInputProps {
  clsName?: string;
  label?: string;
  input?: IInputState;
  checkbox?: ICheckboxState;
  disabled?: boolean
}

const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return (
    <>
      {props.input?.type === 'checkbox' ? (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={props.checkbox?.checked}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            {props.input.required && <span>*</span>}
            {props.label}
          </label>
        </div>
      ) : (
        <div className="input-component">
          <label htmlFor={props.input?.id}>
            {props.input?.required && <span>*</span>}
            {props.label}
          </label>
          <input className={props.clsName} id={props.input?.id} ref={ref} {...props.input} disabled={props.disabled} />
        </div>
      )}
    </>
  );
});

export default Input;
