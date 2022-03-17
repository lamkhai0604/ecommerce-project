interface IRadioProps {
  label?: string;
  disabled?: boolean;
  checked?: boolean;
}

const Radio = (props: IRadioProps) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefault1"
        defaultChecked={props.checked}
      />
      <label className="form-check-label" htmlFor="flexRadioDefault1">
        {props.label}
      </label>
    </div>
  );
};

export default Radio;
