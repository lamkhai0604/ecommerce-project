import { FormControlLabel } from '@mui/material';

interface IRadioProps {
  label?: string;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (e: React.SyntheticEvent) => void;
}

const Radio = (props: IRadioProps) => {
  return (
    <FormControlLabel
      value={props.value}
      control={
        <Radio checked={props.checked} disabled={props.disabled} onChange={props.onChange} />
      }
      label={props.label}
    />
  );
};

export default Radio;
