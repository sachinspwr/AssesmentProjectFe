import React from 'react';
import { VDynamicForm } from '@components/organisms';
import { FormFieldData, VFormFields } from '@types';
import { MdMarkEmailRead, MdOutlinePassword } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { VLink } from '@components/atoms/link/v-link.atom';
import { useSignUpMutation } from 'store/slices/account.slice';
import { UserRequestDTO } from '@dto/request';

const SignUpFormConfig: VFormFields[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    icon: FaUserCircle,
    required: true,
    placeholder: 'Enter first name',
    position: '1 1 6',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    icon: FiPlus,
    required: true,
    placeholder: 'Enter last name',
    position: '1 7 6',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    icon: MdMarkEmailRead,
    required: true,
    placeholder: 'Enter email address',
    validate: (value) => {
      const stringValue = value as string;
      const regex = /^[a-z]+[0-9]?[.]?[a-z0-9]+[_]?[a-z0-9]+@[a-zA-Z]{3,}\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
      if (!regex.test(stringValue)) {
        return 'Invalid email format';
      }
    },
    position: '2 1 12',
  },
  
  {
    name: 'password',
    label: 'Create New Password',
    type: 'password',
    icon: MdOutlinePassword,
    required: true,
    placeholder: 'Enter password',
    validate: (value) => {
      const password = value as string;
      if (password.length < 8) {
        return 'Password must be at least 8 characters long';
      }
      if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter';
      }
      if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter';
      }
      if (!/[0-9]/.test(password)) {
        return 'Password must contain at least one digit';
      }
      if (!/[!@#$%^&*]/.test(password)) {
        return 'Password must contain at least one special character (@, #, $, %, &, *)';
      }
    },
    position: '3 1 12',
  },
  {
    name: 'agreement',
    label: (
      <>
        Accept <VLink to="/compliance-page">Terms and Conditions</VLink>
      </>
    ),
    type: 'checkbox',
    required: true,
    position: '4 1 12',
  },
  {
    name: 'submit',
    label: 'Sign-Up',
    type: 'submit',
    position: '5 1 12',
  },
];

type SignUpFormProps = {
  className?: string;
};

function SignUpForm({ className }: SignUpFormProps) 
{
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  const handleRegistrationRequest = async (formData: FormFieldData) => {
    // Map formData to UserRequestDTO
    const userRequestData = {
      ...formData,
    } as unknown as UserRequestDTO;
  
    try {
      await signUp(userRequestData).unwrap();
      // Assuming the response contains the email
      navigate('/register-user-success', { state: { email: userRequestData.email } });
    } catch (error) {
      // Handle error if needed
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <VDynamicForm
        config={SignUpFormConfig}
        className="flex flex-col gap-3 w-full py-2"
        onSubmit={handleRegistrationRequest}
        spacing={4}
        isFormSubmitting={isLoading}
      />
    </div>
  );
}

export { SignUpForm };
