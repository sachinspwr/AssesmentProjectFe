
import { VSwitch } from '@components/atoms';
import { VLabelledDropdown } from '@components/molecules/dropdown/v-labelled-dropdown.mol';
import { PaymentStatus } from '@utils/enums/payment-status.enum';

const ORDER_STATUS_OPTIONS = [
    { value: 'all', label: 'All Statuses' },
    ...Object.values(PaymentStatus).map(status => ({
        value: status,
        label: status,
    })),
];

interface OrderFiltersProps {
    selectedStatus: string;
    onStatusChange: (statusValue: string | string[]) => void;
    onToggleStatus: (statusType: 'completed' | 'pending') => void;
}

export function OrderFilters({
    selectedStatus,
    onStatusChange,
    onToggleStatus,
}: OrderFiltersProps) {
    return (
        <div className="flex flex-wrap gap-4 md:gap-8 items-center">
            <div className="w-full md:w-1/4 min-w-[200px]">
                <VLabelledDropdown
                    options={ORDER_STATUS_OPTIONS}
                    value={selectedStatus}
                    onChange={onStatusChange}
                    placeholder="Select Status"
                    name="status"
                    label="Select Status"
                />
            </div>

            <div className="flex gap-4">
                <VSwitch
                    label="Completed"
                    checked={selectedStatus === PaymentStatus.COMPLETED}
                    className="mt-8"
                    onChange={() => onToggleStatus('completed')}
                />
                <VSwitch
                    label="Pending"
                    checked={selectedStatus === PaymentStatus.PENDING}
                    className="mt-8"
                    onChange={() => onToggleStatus('pending')}
                />
            </div>
        </div>
    );
}