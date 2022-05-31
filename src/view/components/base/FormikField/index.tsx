import { SxProps, TextField, Theme } from '@mui/material';
import { forwardRef } from 'react';

interface IInputProps {
  id?: string;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  clsName?: string;
  autoComplete?: string;
  helperText?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  focused?: boolean;
  formControl?: boolean;
  defaultValue?: string | number;
  variant?: 'standard' | 'outlined';
  size?: "small" | "medium" | undefined;
  sx?: SxProps<Theme>;
  onBlur?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    console.log(`onChange ${e.target.value}`)
  }
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
      onChange={handleChange}
      onBlur={props.onBlur}
      error={props.error}
      fullWidth={props.fullWidth}
      focused={props.focused}
      size={props.size}
      sx={props.sx}
      helperText={props.helperText}
    />
  );
});

export default Input;
