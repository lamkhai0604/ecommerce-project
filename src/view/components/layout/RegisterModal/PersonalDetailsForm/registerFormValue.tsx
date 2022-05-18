import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

export interface RegisterFormValues {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export const initialRegisterValues: RegisterFormValues = {
  id: uuidv4.toString(),
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
};

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const emailAddresses = ['test@gmail.com', 'test2@gmail.com', 'test3@gmail.com'];

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too Short!').required('Required'),
  lastName: Yup.string().min(2, 'Too Short!').required('Required'),
  email: Yup.string()
    .lowercase()
    .email('Must be a valid email!')
    .notOneOf(emailAddresses, 'Email already taken!')
    .required('Required!'),
  phone: Yup.string().min(5, 'Too Short!').max(14, 'Too Long!').required('Required'),
  password: Yup.string()
    .matches(lowercaseRegex, 'one lowercase required!')
    .matches(uppercaseRegex, 'one uppercase required!')
    .matches(numericRegex, 'one number required!')
    .min(8, 'Minimum 8 characters required!')
    .required('Required!'),
});
