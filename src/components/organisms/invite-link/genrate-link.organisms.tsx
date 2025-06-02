import { VDynamicForm } from '../dynamic-form/v-dynamic-form.organism';
import { mapToFormFieldData, VFormFieldData, VFormFields } from '@types';
import { VLabelledDropdown } from '@components/molecules/index';
import { useFetchRegistrationFieldsOptionQuery } from 'store/slices/test-registration-field-option.slice';
import { useCreateTestLinkMutation, usePatchTestLinkMutation } from 'store/slices/test-link.slice.';
import toast from 'react-hot-toast';
import { CreateTestLinkRequestDTO } from '@dto/request/genrate-link.request.dto';
import { TestLinkType } from '@utils/enums/test-link-type.enums';
import { VButton, VICon, VInput } from '@components/atoms';
import { TbTrash } from 'react-icons/tb';
import { useState } from 'react';

type GenerateLinkProps = {
  initialValue?: CreateTestLinkRequestDTO;
  renderMode?: ActionMode;
  onSuccess?: () => void;
  testId?: string;
  testLinkType?: TestLinkType;
};

function GenerateLink({ initialValue, renderMode = 'create', onSuccess, testId, testLinkType }: GenerateLinkProps) {
  const [formKey, setFormKey] = useState(0); // Add this at the top of the component
  const { data: registrationFieldsFetched, isLoading } = useFetchRegistrationFieldsOptionQuery();
  const [createTestLink, { isLoading: isGenrateLoading }] = useCreateTestLinkMutation();
  const [updateTestLink, { isLoading: isUpadtingLoading }] = usePatchTestLinkMutation();
  const registrationFields =
    registrationFieldsFetched
      ?.filter((reg) => typeof reg?.name === 'string' && typeof reg?.label === 'string')
      .map((reg) => ({
        value: reg.name as string,
        label: reg.label as string,
      })) ?? [];

  const genrateLinkFormConfig: VFormFields[] = [
    {
      name: 'name',
      label: 'Title',
      type: 'text',
      placeholder: 'Enter title of the link',
      position: '1 1 4',
      required: true,
    },
    {
      name: 'restrictions',
      label: 'Restrictions',
      type: 'renderItem',
      shouldRender: () =>
        ['Restricted'].includes(testLinkType ?? '') ||
        ['Restricted'].includes(initialValue?.visibility ?? ''),
      position: '5 1 8',
      renderItem: (value = [], onChange) => {
        const handleAdd = () => {
          onChange([
            ...value,
            { type: 'DOMAIN', value: '', isActive: true }
          ]);
        };

        const handleUpdate = (index: number, field: string, fieldValue: unknown) => {
          const updated = [...value];
          updated[index][field] = fieldValue;
          onChange(updated);
        };

        const handleRemove = (index: number) => {
          const updated = value.filter((_, i) => i !== index);
          onChange(updated);
        };

        return (
          <div>
            <div className="flex flex-col gap-2">
              {(value || []).map((r: unknown, i: number) => (
                <div key={i} className="flex items-end gap-4">
                  <VLabelledDropdown
                    label="Restrictions"
                    name={`restriction-type-${i}`}
                    value={r.type}
                    options={[
                      { label: 'Domain', value: 'DOMAIN' },
                      // { label: 'Email', value: 'EMAIL' },
                      // { label: 'IP Address', value: 'IP' }
                    ]}
                    onChange={(val) => handleUpdate(i, 'type', val)}
                  />
                  <VInput
                    type="text"
                    placeholder="Enter value"
                    value={r.value}
                    onChange={(value) => handleUpdate(i, 'value', value)}
                    className="input input-bordered w-60"
                    name={'value'}
                  />
                  <div className="pb-2">
                    {/* Remove */}
                    <VICon onClick={() => handleRemove(i)} size={25} icon={TbTrash} className="text-red-500" />
                  </div>
                </div>
              ))}
              {/* Align add button with inputs */}
              <div className="flex justify-start w-fit mt-2">
                <VButton
                  type="button"
                  variant='link'
                  onClick={handleAdd}
                  className="btn btn-sm btn-primary"
                >
                  + Add Restriction
                </VButton>
              </div>
            </div>
          </div>
        );

      }
    },

    {
      name: 'description',
      type: 'text-area',
      label: 'Description (optional)',
      placeholder: 'Enter Description',
      required: false,
      position: '2 1 12',
    },
    {
      name: 'maxAttempts',
      label: 'Maximum Attempts',
      type: 'number',
      placeholder: 'Enter Maximum Attempts',
      required: true,
      validate: (value) => {
        const num = Number(value);
        if (isNaN(num)) return 'Must be a number';
        if (num < 0) return 'Cannot be negative';
        return '';
      },
      position: '3 1 4',
    },
    {
      name: 'maxUsages',
      label: 'Maximum Users',
      type: 'number',
      placeholder: 'Enter maximum users',
      shouldRender: () =>
        ['Restricted', 'Shared', 'Invite_Only'].includes(testLinkType ?? '') ||
        ['Restricted', 'Shared', 'Invite_Only'].includes(initialValue?.visibility ?? ''),
      position: '3 6 4',
    },
    {
      name: 'registrationfields',
      type: 'renderItem',
      position: '4 1 7',
      required: true,
      renderItem: (value, onChange) => (
        <div>
          <VLabelledDropdown
            label="Registration fields"
            name={`registrationfields`}
            value={value}
            options={registrationFields ?? []}
            disabled={isLoading}
            onChange={(v) => onChange(v)}
            isMultiSelect
            placeholder="Select registration fields"
          />
        </div>
      ),
      computeDependencies: ['type'],
    },
    {
      name: 'activeFrom',
      type: 'date',
      label: 'Active from',
      required: true,
      position: '6 1 4',
    },
    {
      name: 'activeUntil',
      type: 'date',
      label: 'Active until',
      required: true,
      position: '6 6 4',
    },
    {
      name: 'save',
      label: `${renderMode == 'create' ? 'Generate Link' : 'Update Link'}`,
      type: 'submit',
      position: '7 1 3',
    },
  ];

  const handleFormSubmit = async (formData: VFormFieldData) => {
    console.log('Saving form data:', formData);
    try {
      if (renderMode === 'edit') {
        await updateTestLink({ id: initialValue?.id ?? '0', data: formData as CreateTestLinkRequestDTO }).unwrap(); // Calling the mutation
      } else {
        const requestPayload: CreateTestLinkRequestDTO = {
          ...formData,
          maxAttempts: parseInt(formData?.maxAttempts as string),
          maxUsages: testLinkType === TestLinkType.Personal ? 1 : parseInt(formData?.maxUsages as string),
          visibility: testLinkType || TestLinkType.Personal,
        };
        const response = await createTestLink({
          testId: testId || '',
          linkType: testLinkType || TestLinkType.Invite_Only,
          data: requestPayload
        }).unwrap();
        setFormKey(prev => prev + 1);
        console.log('Link created successfully:', response);
      }
      onSuccess && onSuccess();
    } catch (error) {
      console.error('Failed to create question: ', error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div>
      <VDynamicForm
        key={formKey}
        renderMode={renderMode}
        config={genrateLinkFormConfig}
        isFormSubmitting={isGenrateLoading || isUpadtingLoading}
        onSubmit={handleFormSubmit}
        initialValues={mapToFormFieldData({
          ...initialValue,
        })}
      />
    </div>
  );
}

export default GenerateLink;
