import Divider from 'view/components/base/Divider';
import Modal from 'view/components/base/Modal';
import PersonalDetailsForm from './PersonalDetailsForm';
import './style.css';

interface IRegisterProps {
  onClose: () => void;
}

const RegisterModal = (props: IRegisterProps) => {
  return (
    <Modal onClose={props.onClose}>
      <div className="register-modal">
        <div className="register-modal_header">
          <h2>Login or create an account</h2>
        </div>

        <Divider />
        
        <div className="register-modal_form">
          <div className="modal_form--title">
            <h4>Register Account</h4>
            <p>
              If you already have an account with us, please login at the <span>login form</span>.
            </p>
          </div>

            <PersonalDetailsForm />
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;
