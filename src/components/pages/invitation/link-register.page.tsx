import { VButton } from '@components/atoms/button/v-button.atom';
import { VLoader } from '@components/molecules/loader/v-loader.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VDynamicForm } from '@components/organisms/dynamic-form/v-dynamic-form.organism';
import { LinkRegistrationRequestDto } from '@dto/request/link-registration-request.dto';
import { localStorageService } from '@services/local-storage.service';
import { VFormField, VFormFieldData } from '@types';
import { StorageKeys } from '@utils/index';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRegisterLinkMutation } from 'store/slices/link-registration.slice';
import { initializeLinkTokenFromUrl } from './initialize-link-token-from-url';
initializeLinkTokenFromUrl();

function LinkRegisterPage() {
    const [searchParams] = useSearchParams();
    const invitationType = searchParams.get('type'); // 'restricted' or 'shared'
    const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
    const [registerParticipant, { isLoading: isCreating }] = useRegisterLinkMutation();

    const schema: VFormField[] = [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            required: true,
            placeholder: "Enter your first name",
            position: '1 1 12'
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            required: true,
            placeholder: "Enter your last name",
            position: '2 1 12'
        },
        {
            name: 'email',
            label: 'Email Address',
            type: 'email',
            required: true,
            placeholder: "Enter your email address",
            position: '3 1 12'
        },
        {
            name: 'save',
            type: 'custom',
            label: 'Register',
            position: '4 1 12',
            customContent: (<VButton type='submit' isLoading={isCreating}>Register</VButton>)
        }
    ];

    const handleSubmit = async (formData: VFormFieldData) => {
        const token = localStorageService.getItem(StorageKeys.TOKEN) as string || '';
        if (!token) {
            setStatus('error');
            return;
        }
        console.log('Token', token);

        try {
            await registerParticipant({
                token,
                data: {
                    ...formData,
                    status: 'Registered',
                    registeredAt: new Date().toISOString()
                } as LinkRegistrationRequestDto
            }).unwrap();
            localStorageService.removeItem(StorageKeys.TOKEN);
            setStatus('success');
        } catch (error) {
            console.error('❌ Registration failed:', error);
            setStatus('error');
        }
    };

    const handleMailSupport = () => {
        window.location.href =
            'mailto:support@valt.com?subject=Invitation%20Register%20Concerns&body=I%20have%20questions%20about...';
    };

    if (status === 'pending') {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <VLoader />
                <span className="mt-4 text-lg">Processing your registration...</span>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-12">
            <div className="w-full max-w-md rounded-xl shadow-sm p-8 border-2">
                {/* Header with icon */}
                {!(status === 'success' || status === 'error') && (
                    <div>
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                            <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>

                        <div className='w-full text-center'>
                            <VTypography as="h3" color="primary" className="mb-6 text-2xl font-bold">
                                {invitationType === 'restricted' && 'Restricted Test Registration'}
                                {invitationType === 'shared' && 'Shared Test Registration'}
                                {!invitationType && 'Registration'}
                            </VTypography>
                        </div>
                    </div>
                )}

                {status === 'success' ? (
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <VTypography as="h3" color="primary" className="mb-2 text-xl font-bold">
                            Registration Successful!
                        </VTypography>
                        <VTypography as="p" color="secondary" className="mb-6">
                            Thank you for registering. You'll receive further instructions via email.
                        </VTypography>
                    </div>
                ) : status === 'error' ? (
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                            <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <VTypography as="h3" color="primary" className="mb-2 text-xl font-bold">
                            Registration Failed
                        </VTypography>
                        <VTypography as="p" color="secondary" className="mb-6">
                            Please try again or contact support if the problem persists.
                        </VTypography>
                        <VButton onClick={() => setStatus('idle')} variant="primary" className="w-full">
                            Try Again
                        </VButton>
                    </div>
                ) : (
                    <VDynamicForm
                        config={schema}
                        onSubmit={handleSubmit}
                    />
                )}

                <div className="mt-6 pt-6 border-t text-center">
                    <VTypography as="p" color="secondary" className='text-sm'>
                        Need help? <span onClick={handleMailSupport} className='text-theme-brand cursor-pointer'>Contact support</span>
                    </VTypography>
                </div>
            </div>
        </div>
    );
}

export default LinkRegisterPage;