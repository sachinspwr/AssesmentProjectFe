import { useNavigate } from 'react-router-dom';
import { localStorageService } from '@services/local-storage.service';
import { mapFormDataToDTO, VFormField, VFormFieldData } from '@types';
import { StorageKeys } from '@utils/constants/storage.constant';
import { VDynamicForm } from '../dynamic-form/v-dynamic-form.organism';
import { setUser } from 'store/slices/account.slice';
import { CredentialDTO } from '@dto/request';
import { useAppDispatch } from 'store/store';
import { VLink } from '@components/atoms';
import { useSignInMutation } from 'store/slices/auth.slice';

const loginFormConfig: VFormField[] = [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    placeholder: 'Enter your email address',
    position: '1 1 12',
    validate: (value) => {
      if (value == '') {
        return 'Email is required';
      } else if (!(value as string).includes('@')) {
        return 'Invalid email format';
      }
    },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter your password',
    position: '2 1 12',
    validate: (value) => {
      if (value == '') {
        return 'Password is required';
      } else if ((value as string).length < 6) {
        return 'Password must be at least 6 characters long';
      }
    },
  },
  {
    name: 'rememberMe',
    type: 'checkbox',
    label: (
      <div className="flex justify-between">
        <p>Remember Me</p>
        <VLink to="/forgot-password">Forgot Password</VLink>
      </div>
    ),
    position: '3 1 12',
  },
  {
    name: 'submit',
    type: 'submit',
    label: 'Sign-In',
    position: '4 1 12',
  },
];

type LoginFormProps = DefaultProps;

function LoginForm({ className }: LoginFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [triggerLogin, { isLoading }] = useSignInMutation();

  const handleLoginRequest = async (formData: VFormFieldData) => {
    try {
      await dispatch(setUser(null));
      const credentials = mapFormDataToDTO<CredentialDTO>(formData, loginFormConfig);
      const response = await triggerLogin(credentials).unwrap();

      // Save token and set user
      localStorageService.setItem(StorageKeys.TOKEN, response.token);
      navigate('/bootstrap');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <VDynamicForm config={loginFormConfig} isFormSubmitting={isLoading} onSubmit={handleLoginRequest} />
    </div>
  );
}

export { LoginForm };
