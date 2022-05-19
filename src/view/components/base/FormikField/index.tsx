import { SxProps, Theme } from '@mui/material';
import { ErrorMessage, Field, FieldProps } from 'formik';
import { forwardRef } from 'react';

interface IFormikFieldProps {
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
  readOnly?: boolean;
  fullWidth?: boolean;
  focused?: boolean;
  formControl?: boolean;
  defaultValue?: string | number;
  as?: string | React.ComponentType<FieldProps['field']>;
  variant?: 'standard' | 'outlined';
  size?: 'medium' | 'small' | string;
  sx?: SxProps<Theme>;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const FormikField = forwardRef<HTMLInputElement, IFormikFieldProps>((props, ref) => {
  return (
    <Field
      id={props.id}
      as={props.as}
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
      readOnly={props.readOnly}
      size={props.size}
      fullWidth={props.fullWidth}
      focused={props.focused}
      formControl={props.formControl}
      sx={props.sx}
      helperText={<ErrorMessage name={props.name} />}
    />
  );
});

export default FormikField;
