import Divider from 'view/components/base/Divider';
import Input from 'view/components/base/Input';
import './style.css';

const PersonalDetailsForm = () => {
  return (
    <form>
      <h4>Your personal details</h4>
      <Divider />
      <div>
        <Input
          label="First Name"
          input={{
            type: 'text',
            placeholder: 'First Name',
            required: true,
          }}
        />
        <Input
          label="Last Name"
          input={{
            type: 'text',
            placeholder: 'Last Name',
            required: true,
          }}
        />
        <Input
          label="Email"
          input={{
            type: 'mail',
            placeholder: 'Email',
            required: true,
          }}
        />
        <Input
          label="Phone"
          input={{
            type: 'number',
            min: '10',
            max: '11',
            placeholder: 'Phone',
            required: true,
          }}
        />
      </div>
      <h4>Your personal details</h4>
      <Divider />
      <div>
        <Input
          label="Password"
          input={{
            type: 'password',
            min: '8',
            max: '15',
            placeholder: 'password',
            required: true,
          }}
        />
        <Input
          label="Password Confirm"
          input={{
            type: 'password',
            min: '8',
            max: '15',
            placeholder: 'password confirm',
            required: true,
          }}
        />
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
