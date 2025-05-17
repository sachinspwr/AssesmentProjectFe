import { VTypography } from '@components/molecules/typography/v-typography.mol';

interface SecuritySettingsProps {
    onPasswordChange: () => void;
    onAccountDeletion: () => void;
}

export function SecuritySettings({ onPasswordChange, onAccountDeletion }: SecuritySettingsProps) {
    return (
        <div className="space-y-6 pt-4">
            <VTypography as="h5">Privacy & Security</VTypography>
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b-2 py-2">
                    <div>
                        <VTypography as="p" className="font-medium">Password</VTypography>
                        <VTypography as="p" color="muted" className="text-sm">
                            Last changed 3 months ago
                        </VTypography>
                    </div>
                    <button className="text-theme-primary font-medium" onClick={onPasswordChange}>Change</button>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <VTypography as="p" className="font-medium">Delete account</VTypography>
                        <VTypography as="p" color="muted" className="text-sm">
                            Permanently delete your account and all data associated with it
                        </VTypography>
                    </div>
                    <button className="text-theme-negative font-medium" onClick={onAccountDeletion}>Delete</button>
                </div>
            </div>
        </div>
    );
}