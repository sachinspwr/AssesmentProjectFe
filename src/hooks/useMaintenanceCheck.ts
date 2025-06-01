import { useState, useCallback, useMemo } from 'react';
import { useLazyGetMaintenanceQuery } from 'store/slices/settings.slice';
import { Value } from '@dto/response/maintenance-response.dto';
import { useNavigate } from 'react-router-dom';
import { AxiosBaseQueryError } from 'api/base.query';

type ModalType = 'maintenance' | 'warning' | null;

export function useMaintenanceCheck() {
  const navigate = useNavigate();
  const [fetchMaintenance] = useLazyGetMaintenanceQuery();
  const [modal, setModal] = useState<{ type: ModalType; message: string } | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  const checkMaintenance = useCallback(async () => {
    try {
      const { data: maintenance, isError, error } = await fetchMaintenance();

      // Handle 404 as "no maintenance" case
      if ((error as AxiosBaseQueryError)?.status === 404) {
        setHasChecked(true);
        return { shouldBlock: false };
      }

      // Handle other errors
      if (isError || !maintenance) {
        console.error('Maintenance check failed', error);
        setHasChecked(true);
        return { shouldBlock: false };
      }

      // Check if maintenance is active
      if (maintenance?.key?.toLowerCase() !== 'maintenance') {
        setHasChecked(true);
        return { shouldBlock: false };
      }

      const data: Value = maintenance.value;
      const { startAt, endAt, warningFrom, maintenanceMessage, warningMessage } = data;

      // Validate required fields
      if (!startAt || !endAt || !warningFrom) {
        setHasChecked(true);
        return { shouldBlock: false };
      }

      const now = new Date();
      const start = new Date(startAt);
      const end = new Date(endAt);
      const warning = new Date(warningFrom);

      if (now >= start && now < end) {
        // Maintenance active
        setModal({ 
          type: 'maintenance', 
          message: `Maintenance in progress until ${end.toLocaleString()}. ${maintenanceMessage}`
        });
        return { shouldBlock: true };
      } else if (now >= warning && now < start) {
        // Maintenance warning period
        setModal({ 
          type: 'warning', 
          message: `Maintenance scheduled from ${start.toLocaleString()}. ${warningMessage}`
        });
        return { shouldBlock: false }; // Don't block for warnings
      }

      setHasChecked(true);
      return { shouldBlock: false };
    } catch (error) {
      console.error('Maintenance check failed:', error);
      setHasChecked(true);
      return { shouldBlock: false };
    }
  }, [fetchMaintenance]);

  const handleModalClose = useCallback(() => {
    setModal(null);
  }, []);

  const handleModalSubmit = useCallback(() => {
    setModal(null);
  }, []);

  const modalType = useMemo(() => modal?.type ?? null, [modal]);
  const modalMessage = useMemo(() => modal?.message ?? '', [modal]);
  const isModalOpen = modal !== null;

  return {
    modalType,
    modalMessage,
    isModalOpen,
    handleModalClose,
    handleModalSubmit,
    checkMaintenance, // Now you need to call this manually when needed
    hasChecked,
  };
}