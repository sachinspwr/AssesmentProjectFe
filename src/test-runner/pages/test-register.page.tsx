import { VImage } from '@components/atoms/image/v-image.atom';
import { VDynamicForm } from '@components/organisms';
import { VFormFieldData, VFormFields } from '@types';
import { MdMarkEmailRead } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { useSignUpMutation } from 'store/slices/account.slice';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'store/store';
import { TestRegistrationFieldOptionResponseDTO } from '@dto/response/registration-field-option-response.dto';
import { InputFieldTypes } from '@components/atoms';

// bootstarp page
// fetch test check regiter feild
//navigate meta data page if no data
//
type ApiField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'submit' | 'discard';
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[]; // for select
};

// const TestRunnerRegister: VFormFields[] = [
//   {
//     name: 'firstName',
//     label: 'First Name',
//     type: 'text',
//     required: true,
//     placeholder: 'Enter first name', //from db
//     position: '1 1 5',
//     icon: FaUserCircle,
//   },
//   {
//     name: 'lastName',
//     label: 'Last Name',
//     type: 'text',
//     icon: FiPlus,
//     required: true,
//     placeholder: 'Enter last name',
//     position: '1 6 5',
//   },
//   {
//     name: 'email',
//     label: 'Email Address',
//     type: 'email',
//     icon: MdMarkEmailRead,
//     required: true,
//     placeholder: 'Enter email address',
//     validate: (value) => {
//       const stringValue = value as string;
//       const regex = /^[a-z]+[0-9]?[.]?[a-z0-9]+[_]?[a-z0-9]+@[a-zA-Z]{3,}\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
//       if (!regex.test(stringValue)) {
//         return 'Invalid email format';
//       }
//     },
//     position: '2 1 7',
//   },
//   {
//     name: 'contactNo',
//     label: 'Contact No.',
//     type: 'text',
//     icon: FaUserCircle,
//     required: true,
//     placeholder: 'Enter contact no.',
//     position: '3 1 5',
//   },
//   {
//     name: 'degree',
//     label: 'Degree',
//     type: 'select',
//     icon: FiPlus,
//     required: true,
//     options: [
//       {
//         value: '1',
//         label: 'Beginner',
//       },
//       {
//         value: '2',
//         label: 'Intermediate',
//       },
//     ],
//     placeholder: 'Select Degree',
//     position: '3 6 5',
//   },
//   {
//     name: 'stream',
//     label: 'Stream',
//     type: 'select',
//     icon: FaUserCircle,
//     required: true,
//     placeholder: 'Select Stream',
//     options: [
//       {
//         value: '1',
//         label: 'Beginner',
//       },
//       {
//         value: '2',
//         label: 'Intermediate',
//       },
//     ],
//     position: '4 1 5',
//   },
//   {
//     name: 'experience',
//     label: 'Experience',
//     options: [
//       {
//         value: '1',
//         label: 'Beginner',
//       },
//       {
//         value: '2',
//         label: 'Intermediate',
//       },
//     ],
//     type: 'select',
//     icon: FiPlus,
//     required: true,
//     placeholder: 'Select Experience',
//     position: '4 6 5',
//   },
//   {
//     name: 'cancel',
//     label: 'Cancel',
//     type: 'discard',
//     position: '5 1 2',
//   },
//   {
//     name: 'submit',
//     label: 'Proceed',
//     type: 'submit',
//     position: '5 3 2',
//   },
// ];

// const TestRunnerRegisterDuplicate: ApiField[] = [
//   {
//     name: 'firstName',
//     label: 'First Name',
//     type: 'text',
//     required: true,
//     placeholder: 'Enter first name', //from db
//   },
//   {
//     name: 'lastName',
//     label: 'Last Name',
//     type: 'text',
//     required: true,
//     placeholder: 'Enter last name',
//   },
//   // {
//   //   name: 'email',
//   //   label: 'Email Address',
//   //   type: 'email',
//   //   required: true,
//   //   placeholder: 'Enter email address',
//   //   validate: (value:any) => {
//   //     const stringValue = value as string;
//   //     const regex = /^[a-z]+[0-9]?[.]?[a-z0-9]+[_]?[a-z0-9]+@[a-zA-Z]{3,}\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
//   //     if (!regex.test(stringValue)) {
//   //       return 'Invalid email format';
//   //     }
//   //   },
//   // },
//   {
//     name: 'contactNo',
//     label: 'Contact No.',
//     type: 'text',
//     required: true,
//     placeholder: 'Enter contact no.',
//   },
//   // {
//   //   name: 'degree',
//   //   label: 'Degree',
//   //   type: 'select',
//   //   required: true,
//   //   options: [
//   //     {
//   //       value: '1',
//   //       label: 'Beginner',
//   //     },
//   //     {
//   //       value: '2',
//   //       label: 'Intermediate',
//   //     },
//   //   ],
//   //   placeholder: 'Select Degree',
//   // },
//   {
//     name: 'stream',
//     label: 'Stream',
//     type: 'select',
//     required: true,
//     placeholder: 'Select Stream',
//     options: [
//       {
//         value: '1',
//         label: 'Beginner',
//       },
//       {
//         value: '2',
//         label: 'Intermediate',
//       },
//     ],
//   },
//   {
//     name: 'experience',
//     label: 'Experience',
//     options: [
//       {
//         value: '1',
//         label: 'Beginner',
//       },
//       {
//         value: '2',
//         label: 'Intermediate',
//       },
//     ],
//     type: 'select',
//     required: true,
//     placeholder: 'Select Experience',
//   },
//   {
//     name: 'cancel',
//     label: 'Cancel',
//     type: 'discard',
//   },
//   {
//     name: 'submit',
//     label: 'Proceed',
//     type: 'submit',
//   },
// ];

const TestRegisterPage = () => {
  const { id } = useParams();
  const testDetails = useAppSelector((state) => state.testRunner.testDetails);
  // const [formConfig, setFormConfig] = useState<VFormFields[]>(testDetails?.testRegistrationFields);
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();
  const testRegistrationFields = testDetails?.testRegistrationFields as TestRegistrationFieldOptionResponseDTO[];
console.log("testRegistrationFields",testRegistrationFields)
  const mapApiFieldsToFormFields = (fieldsFromApi: TestRegistrationFieldOptionResponseDTO[]): VFormFields[] => {
    const maxCols = 12;
    const colSpan = 5;
    const gap = 1;

    let currentRow = 1;
    let currentCol = 1;

    const formFields: VFormFields[] = [];

    // Map normal form fields with dynamic positioning
    for (const field of fieldsFromApi) {
      let startCol = currentCol;
      let endCol = startCol + colSpan - 1;

      // Wrap to next row if exceeds
      if (endCol > maxCols) {
        currentRow++;
        startCol = 1;
        endCol = startCol + colSpan - 1;
      }

      const position = `${currentRow} ${startCol} ${colSpan}`;
      currentCol = endCol + gap;
      console.log('from api',fieldsFromApi)
      // 🔁 Convert string options into array of objects
      let options: { label: string; value: string }[] | undefined = undefined;

      if (typeof field?.options === 'string') {
        options = field.options?.split(',').map((opt) => ({
          label: opt.trim(),
          value: opt.trim(),
        }));
      } else if (Array.isArray(field?.options)) {
        // Already in correct format
        options = field.options;
      }
      console.log('Field:', field.name, 'Type:', field.type, 'Options:', field.options);
      formFields.push({
        name: field.name as string,
        label: field.label,
        type: field.type,
        required: field.isRequired ?? false,
        placeholder: field.placeholder ?? '',
        position,
        options,
        validate:
          field.name === 'email'
            ? (value) => {
                const stringValue = value as string;
                const regex = /^[a-z]+[0-9]?[.]?[a-z0-9]+[_]?[a-z0-9]+@[a-zA-Z]{3,}\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
                if (!regex.test(stringValue)) return 'Invalid email format';
              }
            : undefined,
      });
    }

    // Add action buttons at fixed position on a new row
    currentRow++;

    // Manually append fixed-position action buttons
    formFields.push(
      {
        name: 'cancel',
        label: 'Cancel',
        type: 'discard',
        required: false,
        position: `${currentRow} 1 2`,
      },
      {
        name: 'submit',
        label: 'Proceed',
        type: 'submit',
        required: false,
        position: `${currentRow} 3 2`,
      }
    );

    return formFields;
  };

  const mappedFields = mapApiFieldsToFormFields(testRegistrationFields);

  console.log(mappedFields);
  // useEffect(() => {

  //   async function fetchFormData() {
  //     // const res = await fetch('/api/form-fields'); // replace with actual API
  //     // const data = await res.json();
  //     const mappedFields = mapApiFieldsToFormFields(TestRunnerRegisterDuplicate);
  //     setFormConfig(mappedFields);
  //   }

  //   fetchFormData();
  // }, []);

  const handleRegistrationRequest = async (formData: VFormFieldData) => {
    const userRequestData = {
      ...formData,
    };

    navigate(`/test-runner/${id}/test-metadata`);

    // try {
    //   const response: ApiResponse = await signUp(userRequestData).unwrap();
    //   // Assuming the response contains the email
    //   navigate('/register-user-success', { state: { email: userRequestData.email } });
    // } catch (error) {
    //   // Handle error if needed
    //   console.error('Registration failed:', error);
    // }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center lg:flex-row gap-10">
      <div className="w-full flex justify-center items-center bg-theme-highlight h-full">
        {/* <VImage src="src/assets/svgs/login.svg" className="max-w-full h-auto" /> */}
        {/* <VImage src="src/assets/svgs/test-runner-register.svg" className="max-w-full h-auto" /> */}
      </div>
      <div className="w-full">
        <div>
          <VTypography as="p" color="muted">
            Welcome Ajinkya!{' '}
          </VTypography>
          <VTypography as="h3" color="brand">
            Please fill registration form to get started!
          </VTypography>
        </div>
        {mappedFields.length > 0 && (
          <VDynamicForm
            config={mappedFields}
            className="flex flex-col gap-3 w-full py-2"
            onSubmit={handleRegistrationRequest}
            spacing={4}
            isFormSubmitting={isLoading}
          />
        )}
        {/* {formConfig.length > 0 && (
          <VDynamicForm
            config={formConfig}
             className="flex flex-col gap-3 w-full py-2"
            onSubmit={handleRegistrationRequest}
            spacing={4}
            isFormSubmitting={isLoading}
          />
        )} */}
        {/* <VDynamicForm
          config={TestRunnerRegister}
          className="flex flex-col gap-3 w-full py-2"
          onSubmit={handleRegistrationRequest}
          spacing={4}
          isFormSubmitting={isLoading}
        /> */}
      </div>
    </div>
  );
};

export default TestRegisterPage;
