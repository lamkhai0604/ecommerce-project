import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface ICheckBoxProps {
  required?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  type?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = (props: ICheckBoxProps) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          id={props.id}
          checked={props.checked}
          defaultChecked={props.defaultChecked}
          required={props.required}
          disabled={props.disabled}
          onChange={props.onChange}
        />
      }
      label={props.label}
    />
  );
};

export default CheckBox;
