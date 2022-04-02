import bkg_breadcrumbs from 'assets/images/bkg_breadcrumbs.jpg';
import './style.css';

const Register = () => {
  return (
    <div className="register">
      <img src={bkg_breadcrumbs} alt="background breadcrumbs" />
      <div className='register-container'>
        <p>If you already have an account with us, please login at the login page.</p>
        <div className='personal-details'>Your Personal Details</div>
        <div className='personal-details-children'>
          <label className='asterisk-label'>Full Name</label>
          <input className='form-control' placeholder='Full Name'></input>
        </div>
        <div className='personal-details-children'>
          <label className='asterisk-label'>Email</label>
          <input className='form-control' placeholder='Email'></input>
        </div>
        <div className='personal-details-children'>
          <label className='asterisk-label'>Phone</label>
          <input className='form-control' placeholder='Phone'></input>
        </div>
        <div className='personal-details'>Your Password</div>
        <div className='personal-details-children'>
          <label className='asterisk-label'>Password</label>
          <input className='form-control' placeholder='Password'></input>
        </div>
        <div className='personal-details-children'>
          <label className='asterisk-label'>Password Confirm</label>
          <input className='form-control' placeholder='Password Confirm'></input>
        </div>
        <div className='personal-details'>Newsletter</div>
        <div className='personal-details-children d-flex -flex-column'>
          <label className='asterisk-label'>Subscribe</label>
          <div className='d-flex flex-row'>
            <label className='radio-label'>
              <input type='radio'value='0' className='radio-input'/>
              Yes
            </label>
            <label>
              <input type='radio'value='1' className='radio-input'/>
              No
            </label>
          </div>
          <div>
            <input type='submit' value='CONTINUE' className='submit-input'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
