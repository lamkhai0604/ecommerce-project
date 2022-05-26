import { SxProps, TextField, Theme } from '@mui/material';
import { ErrorMessage, Field, FieldProps, useField } from 'formik';
import { forwardRef } from 'react';

interface IInputProps {
  id?: string;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  clsName?: string;
  autoComplete?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  focused?: boolean;
  formControl?: boolean;
  defaultValue?: string | number;
  as?: string | React.ComponentType<FieldProps['field']>;
  variant?: 'standard' | 'outlined';
  size?: "small" | "medium" | undefined;
  sx?: SxProps<Theme>;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return (
    <TextField
      id={props.id}
      inputRef={ref}
      label={props.label}
      className={props.clsName}
      defaultValue={props.defaultValue}
      value={props.value}
      disabled={props.disabled}
      required={props.required}
      name={props.name}
      type={props.type}
      variant={props.variant}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus}
      onChange={props.onChange}
      onBlur={props.onBlur}
      error={props.error}
      fullWidth={props.fullWidth}
      focused={props.focused}
      size={props.size}
      sx={props.sx}
    />
  );
});

export default Input;
