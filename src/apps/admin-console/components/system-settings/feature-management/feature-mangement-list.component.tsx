import { VSwitch } from '@components/atoms';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { FeatureManagerResponseDto } from '@dto/response/feature-manager-response.dto';
import { splitAndCapitalize } from '@utils/index';
import toast from 'react-hot-toast';
import { useToggleFeatureMutation } from 'store/slices/feature-manager.slice';

type FeaturesListProps = {
    data?: FeatureManagerResponseDto[];
    loading?: boolean;
    onToggleSuccess?: () => void;
};

function FeaturesList({ data, loading, onToggleSuccess }: FeaturesListProps) {
    const [toggleFeature] = useToggleFeatureMutation();

    const handleToggle = async (feature: FeatureManagerResponseDto, newValue: boolean) => {
        if (!feature.id || !feature.featureKey || !feature.targetLayer) {
            toast.error('Missing required feature data');
            return;
        }
        try {
            await toggleFeature({
                featureKey: feature.featureKey,
                targetLayer: feature.targetLayer,
                isEnabled: newValue,
            }).unwrap();
            onToggleSuccess?.();
        } catch (error) {
            toast.error('Failed to update feature');
            console.error('Feature toggle error:', error);
        }
    };

    const columns: VTableColumn<FeatureManagerResponseDto>[] = [
        {
            key: 'featureKey',
            label: 'Feature Key',
            customRender: (row) => splitAndCapitalize(row.featureKey || ''),
        },
        { key: 'description', label: 'Description' },
        {
            key: 'isEnabled',
            label: 'Status',
            customRender: (row) => (
                <VSwitch
                    checked={row.isEnabled || false}
                    onChange={(newVal) => handleToggle(row, newVal)}
                    disabled={loading}
                />
            ),
        },
    ];

    return (
        <VTable
            title="Features"
            data={data ?? []}
            columns={columns}
            itemsPerPage={8}
            loading={loading}
            emptyState={<div>No Features Found!</div>}
            getId={(x) => x.id || ''}
            tableClassName="table-fixed w-full"
        />
    );
}

export default FeaturesList;
