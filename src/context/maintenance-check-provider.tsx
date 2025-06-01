import React, { useEffect, useState } from 'react';
import ConfirmAction from '@components/organisms/assessment/confirm-action/confirm-action.organisms';
import { useMaintenanceCheck } from '@hooks';
import { VLoader } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';

interface MaintenanceCheckProviderProps {
  children: React.ReactNode;
}

function MaintenanceCheckProvider({ children }: MaintenanceCheckProviderProps) {
  const {
    modalType,
    modalMessage,
    isModalOpen,
    handleModalClose,
    handleModalSubmit,
    checkMaintenance,
    hasChecked
  } = useMaintenanceCheck();

  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    // Only run the check once when component mounts
    if (!initialCheckDone) {
      checkMaintenance();
      setInitialCheckDone(true);
    }
  }, [checkMaintenance, initialCheckDone]);

  // Show loader only if initial check isn't complete and no modal is shown
  if (!initialCheckDone && !isModalOpen) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <VLoader />
        <VTypography>Loading System...</VTypography>
      </div>
    );
  }

  return (
    <>
      {children}
      <ConfirmAction
        width={25}
        title={modalType === 'maintenance' ? 'Maintenance in Progress' : 'Maintenance Warning'}
        message={modalMessage}
        onSubmit={handleModalSubmit}
        onClose={handleModalClose}
        isOpen={isModalOpen}
        hideCloseButton={modalType === 'maintenance'}
        showFooter={modalType !== 'maintenance'}
      />
    </>
  );
}

export default MaintenanceCheckProvider;