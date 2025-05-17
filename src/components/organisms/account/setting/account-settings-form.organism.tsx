// hooks/use-account-settings-form.hook.ts
import { VButton } from '@components/atoms/button/v-button.atom';
import { useLoggedInUser } from '@hooks';
import { VFormFields } from '@types';

export function useAccountSettingsForm() {
    const user = useLoggedInUser();

    const initialValues = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phone: user?.mobile,
        dob: user?.dateOfBirth,
        gender: user?.gender,
        company: user?.company,
        companyRole: user?.companyRole,
    };

    const formConfig: VFormFields[] = [
        {
            type: 'group',
            position: '2 1 12', // row 2 (gap above)
            label: ' Personal Information',
            fields: [
                {
                    type: 'text',
                    name: 'firstName',
                    label: 'First Name',
                    value: initialValues.firstName,
                    required: true,
                    position: '3 1 6' // shifted down by 1 row
                },
                {
                    type: 'text',
                    name: 'lastName',
                    label: 'Last Name',
                    value: initialValues.lastName,
                    required: true,
                    position: '3 7 6'
                },
                {
                    type: 'date',
                    name: 'dob',
                    label: 'Date Of Birth',
                    value: String(initialValues.dob),
                    position: '4 1 6'
                },
                {
                    type: 'select',
                    name: 'gender',
                    options: [
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" }
                    ],
                    label: 'Gender',
                    value: initialValues.gender,
                    position: '4 7 6'
                }
            ]
        },
        {
            type: 'group',
            position: '6 1 12', // 1 row gap after previous group
            label: ' Contact Information',
            fields: [
                {
                    type: 'email',
                    name: 'email',
                    label: 'Email Address',
                    value: initialValues.email,
                    required: true,
                    disabled: true,
                    helpText: "We'll never share your email with anyone else.",
                    position: '7 1 6'
                },
                {
                    type: 'text',
                    name: 'phone',
                    label: 'Phone Number',
                    value: initialValues.phone,
                    position: '7 7 6'
                }
            ]
        },
        {
            type: 'group',
            position: '9 1 12', // 1 row gap after previous group
            label: ' Professional Details',
            fields: [
                {
                    type: 'text',
                    name: 'company',
                    label: 'Company',
                    value: initialValues.company,
                    position: '10 1 6'
                },
                {
                    type: 'text',
                    name: 'companyRole',
                    label: 'Company Role',
                    value: initialValues.companyRole,
                    position: '10 7 6'
                }
            ]
        },
        {
            type: 'group',
            position: '12 1 12',
            fields: [
                {
                    type: 'custom',
                    name: 'cancel',
                    label: 'Cancel',
                    position: '13 8 2',
                    customContent: <VButton variant='secondary'>Close</VButton>
                },
                {
                    type: 'custom',
                    name: 'saveChanges',
                    label: 'Save Changes',
                    position: '13 10 3',
                    customContent: <VButton type='submit' >Save Changes</VButton>
                }
            ]
        },
    ];


    return { initialValues, formConfig };
}