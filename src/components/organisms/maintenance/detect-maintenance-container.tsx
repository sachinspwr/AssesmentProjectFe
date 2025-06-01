import DetectMaintenance from './detect-maintenance';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setMaintenance } from '../../../store/slices/settings.slice';

function DetectMaintenanceContainer () {
  const dispatch = useAppDispatch();
  const isMaintenance = useAppSelector((state) => state.maintenance.isMaintenance);

  const handleClose = () => dispatch(setMaintenance(false));

  return (
    <DetectMaintenance
      isOpen={isMaintenance}
      title="Maintenance Mode"
      message="The system is currently under maintenance. Please try again later."
      onSubmit={handleClose}
      onClose={handleClose}
      okButtonLabel="OK"
      showFooter={false}
    />
  );
};

export default DetectMaintenanceContainer;
