import React, { useState, useRef, useEffect } from 'react';
import { localStorageService } from '@services/local-storage.service';
import { StorageKeys } from '@utils/index';
import { useRejectInvitationMutation } from 'store/slices/test-invitation.slice';
import { initializeLinkTokenFromUrl } from './initialize-link-token-from-url';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VLoader } from '@components/molecules/loader/v-loader.mol';
import { VFormFieldData, VFormFields } from '@types';
import { VDynamicForm } from '@components/organisms/dynamic-form/v-dynamic-form.organism';
import { VButton } from '@components/atoms/button/v-button.atom';

initializeLinkTokenFromUrl();

function AssessmentInvitationRejectPage() {
    const [status, setStatus] = useState<'initial' | 'pending' | 'success' | 'error'>('initial');
    const [showForm, setShowForm] = useState(false); // Start with false to show loader first
    const [isInitializing, setIsInitializing] = useState(true); // New state for initial loading
    const [rejectInvitation, { isLoading: isRejecting }] = useRejectInvitationMutation();
    const formRef = useRef<{ submit: () => void; isValid: () => boolean }>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitializing(false);
            setShowForm(true);
        }, 1000); // 1 second loading time

        return () => clearTimeout(timer);
    }, []);

    const rejectionFormConfig: VFormFields[] = [
        {
            type: 'text-area',
            name: 'rejectionMessage',
            label: 'Reason for Declining',
            required: true,
            textAreaRows: 2,
            helpText: 'Your feedback helps us improve our assessment process',
            position: '1 1 12'
        },
        {
            type: 'custom',
            name: 'submit',
            position: '2 1 12',
            customContent: (<VButton type='submit' isLoading={isRejecting}>Submit Rejection</VButton>)
        }
    ];

    const handleReject = async (formData: VFormFieldData) => {
        const token = localStorageService.getItem(StorageKeys.TOKEN) as string;
        if (!token) {
            setStatus('error');
            return;
        }
        try {
            await rejectInvitation({
                token,
                rejectionMessage: formData.rejectionMessage as string
            }).unwrap();
            localStorageService.removeItem(StorageKeys.TOKEN);
            setShowForm(false);
            setStatus('success');
        } catch (error) {
            console.error('❌ Reject failed:', error);
            setStatus('error');
        }
    };

    const handleMailSupport = () => {
        window.location.href =
            'mailto:support@valt.com?subject=Invitation%20Rejection%20Concerns&body=I%20have%20questions%20about...';
    };

    if (isInitializing) {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <VLoader />
                <span className="mt-4 text-lg">Processing your request...</span>
            </div>
        );
    }

    if (status === 'initial' && showForm) {
        return (
            <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-12">
                <div className="w-full max-w-md rounded-xl shadow-sm p-8 text-center border-2">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                        <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <VTypography as="h2" color="primary" className="mb-6 text-2xl font-bold">
                        Decline Invitation
                    </VTypography>

                    <div className="mb-6 text-left">
                        <VTypography as="p" color="secondary" className="mb-4 text-center">
                            You're about to decline this assessment invitation. Please let us know why:
                        </VTypography>

                        <VDynamicForm
                            ref={formRef}
                            config={rejectionFormConfig}
                            onSubmit={handleReject}
                            contentClasses="space-y-4"
                        />
                    </div>

                    <div className="border-t pt-6 mt-6">
                        <VTypography as="p" color="secondary" className="text-sm">
                            Your response will help us improve our process.
                        </VTypography>
                    </div>
                    <div className="mt-6 text-center">
                        <VTypography as="p" color="secondary" className='text-sm'>
                            Need help? <span onClick={handleMailSupport} className='text-theme-brand cursor-pointer'>Contact support</span>
                        </VTypography>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-12">
            <div className="w-full max-w-md rounded-xl shadow-sm p-8 text-center border border-gray-200">
                {/* Status Indicator */}
                <div className="mb-6">
                    {status === 'success' && (
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                            <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Status Messages */}
                <div className="space-y-2">
                    {status === 'success' && (
                        <div>
                            <VTypography as="h2" color="primary" className="mb-2 text-2xl font-bold">
                                Assessment Declined
                            </VTypography>
                            <VTypography as="p" color="secondary" className="mb-4">
                                You have successfully declined the assessment invitation.
                            </VTypography>
                            <div className="mt-4 p-4">
                                <VTypography as="p" color="secondary" className="text-sm font-medium mb-2">
                                    Note
                                </VTypography>
                                <ul className="text-left list-disc list-inside text-sm text-theme-secondary space-y-1">
                                    <li>This action is permanent and cannot be undone</li>
                                    <li>You can request a new invitation if needed</li>
                                    <li>Please contact your coordinator if you need help</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div>
                            <VTypography as="h2" color="primary" className="mb-2 text-2xl font-bold">
                                Error Occurred
                            </VTypography>
                            <VTypography as="p" color="secondary" className="mb-4">
                                Failed to process your rejection.
                            </VTypography>
                            <VTypography as="p" color="secondary" className="text-sm mb-4">
                                Please try again later or contact support.
                            </VTypography>
                            <div className='w-40 m-auto'>
                                <VButton
                                    onClick={() => {
                                        setStatus('initial');
                                        setShowForm(true);
                                    }}
                                    variant="primary"
                                    className="w-full"
                                >
                                    Try Again
                                </VButton>
                            </div>
                        </div>
                    )}
                </div>

                {/* Additional UI Elements */}
                {(status == 'success' || status == 'error') && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <VTypography as="p" color="secondary" className="text-sm">
                            {status === 'success'
                                ? 'Thank you for your response.'
                                : 'We apologize for the inconvenience.'}
                        </VTypography>
                    </div>
                )}
                <div className="mt-3 text-center">
                    <VTypography as="p" color="secondary" className='text-sm'>
                        Need help? <span onClick={handleMailSupport} className='text-theme-brand cursor-pointer'>Contact support</span>
                    </VTypography>
                </div>
            </div>
        </div>
    );
}

export default AssessmentInvitationRejectPage;