import { ReactNode } from "react";
import { Field, ErrorMessage, FieldInputProps } from "formik";
import { InputLabel, MenuItem, FormHelperText, FormControl, Slider } from '@mui/material';
import Select from '@mui/material/Select';
import {styled} from "@mui/material/styles";

const FormikSelectStyle = styled(Slider)`
  margin: 10px 0;
`;

export interface FormikSelectItem {
  label?: string;
  value?: string;
}

interface FormikSelectProps {
  name: string;
  items?: FormikSelectItem[];
  label?: string;
  required?: boolean;
}

interface MaterialUISelectFieldProps extends FieldInputProps<string> {
  errorString?: string;
  children: ReactNode;
  label?: string;
  required?: boolean;
}

const MaterialUISelectField = (props: MaterialUISelectFieldProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel required={props.required}>{props.label}</InputLabel>
      <Select name={props.name} onChange={props.onChange} onBlur={props.onBlur} value={props.value}>
        {props.children}
      </Select>
      <FormHelperText>{props.errorString}</FormHelperText>
    </FormControl>
  );
};

const FormikSelect = (props: FormikSelectProps) => {
  return (
    <FormikSelectStyle>
      <Field
        name={props.name}
        as={MaterialUISelectField}
        label={props.label}
        errorString={<ErrorMessage name={props.name} />}
        required={props.required}
      >
        {props.items?.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Field>
    </FormikSelectStyle>
  );
};

export default FormikSelect;