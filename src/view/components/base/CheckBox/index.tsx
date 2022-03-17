import './style.css'

interface ICheckBoxProps {
    required?: boolean;
    checked?: boolean;
    label?: string;
    type?: string;
}

const CheckBox = (props: ICheckBoxProps) => {
    return (
        <div className="form-check">
          <input
            className="form-check-input"
            type={props.type}
            checked={props.checked}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            {props.required && <span>*</span>}
            {props.label}
          </label>
        </div>
    )
}

export default CheckBox;