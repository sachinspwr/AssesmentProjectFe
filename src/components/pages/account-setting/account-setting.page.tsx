import { useAccountActions } from "@components/organisms/account/setting/account-actions.hook";
import { useAccountSettingsForm } from "@components/organisms/account/setting/account-settings-form.organism";
import { ChangePasswordModal } from "@components/organisms/account/setting/change-password.organism";
import { DeleteAccountModal } from "@components/organisms/account/setting/delete-account.organism";
import { ProfileInformationSection } from "@components/organisms/account/setting/profile-information.organism";
import { SecuritySettings } from "@components/organisms/account/setting/security-settings.organism";
import { useLoggedInUser } from "@hooks";

export function AccountSettings() {
    const { initialValues, formConfig } = useAccountSettingsForm();
    const {
        isPasswordModalOpen,
        isDeactivateModalOpen,
        isChangingPassword,
        isDeactivating,
        setIsPasswordModalOpen,
        setIsDeactivateModalOpen,
        handlePasswordSubmit,
        handleDeactivateSubmit
    } = useAccountActions();
    const user = useLoggedInUser();


    return (
        <div className="max-w-4xl space-y-4">
            <ProfileInformationSection
                user={user}
                formConfig={formConfig}
                initialValues={initialValues}
            />

            <SecuritySettings
                onPasswordChange={() => setIsPasswordModalOpen(true)}
                onAccountDeletion={() => setIsDeactivateModalOpen(true)}
            />

            {/* <FormActions /> */}

            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onSubmit={handlePasswordSubmit}
                isChangingPassword={isChangingPassword}
            />

            <DeleteAccountModal
                isOpen={isDeactivateModalOpen}
                onClose={() => setIsDeactivateModalOpen(false)}
                onSubmit={handleDeactivateSubmit}
                isDeactivating={isDeactivating}
            />
        </div>
    );
}

export default AccountSettings;