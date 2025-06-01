import { useEffect, useState } from "react";
import { VDynamicForm } from "@components/organisms";
import { VFormFields } from "@types";
import { useGetMaintenanceQuery, useUpdateMaintenanceMutation } from "store/slices/settings.slice";
import toast from "react-hot-toast";

function MaintenceForm() {
  const { data: maintenanceData,  } = useGetMaintenanceQuery();
  console.log("fetched data : ", maintenanceData);
  const [updateMaintenance,{isLoading : updatingMaintenance}] = useUpdateMaintenanceMutation();
  const [initialValues, setInitialValues] = useState<any>({});
  

  useEffect(() => {
    const nestedValue = maintenanceData?.value?.value;
  
    if (nestedValue) {
      console.log("Corrected nested value:", nestedValue);
  
      const {
        startAt,
        endAt,
        warningMessage,
        maintenanceMessage,
        warningFrom,
      } = nestedValue;
  
      setInitialValues({
        isPublic: maintenanceData.value.isPublic,
        startAt: startAt ? new Date(startAt) : undefined,
        endAt: endAt ? new Date(endAt) : undefined,
        warningMessage: warningMessage || '',
        maintenanceMessage: maintenanceMessage || '',
        warningFrom: warningFrom ? new Date(warningFrom) : undefined,
      });            
    }
  }, [maintenanceData]);
  
  
  
  useEffect(() => {
    console.log('initialValues updated:', JSON.stringify(initialValues, null, 2));
  }, [initialValues]);
  
  

  const handleFormSubmit = async (formData: any) => {
    try {
      await updateMaintenance({ data: formData }).unwrap();
    } catch (error) {
      console.error("Update failed", error);
      toast.error((error as Error).message);
    }
  };

  const maintenanceFormConfig: VFormFields[] = [
    {
      type: 'group',
      label: 'Maintenance Settings',
      position: '1 1 3',
      fields: [
        {
          name: 'isPublic',
          label: 'Public',
          type: 'switch',
          classNames: 'w-full flex justify-end',
          position: '1 5 2',
        },
        {
          name: 'startAt',
          label: 'Start At',
          type: 'date',
          position: '2 1 3',
        },
        {
          name: 'endAt',
          label: 'End At',
          type: 'date',
          position: '2 4 3',
        },
        {
          name: 'warningMessage',
          label: 'Warning Message',
          type: 'text-area',
          required: true,
          placeholder: 'Enter warning message',
          position: '3 1 6',
        },
        {
          name: 'maintenanceMessage',
          label: 'Maintenance Message',
          type: 'text-area',
          required: true,
          placeholder: 'Enter maintenance message',
          position: '4 1 6',
        },
        {
          name: 'warningFrom',
          label: 'Warning From',
          type: 'date',
          position: '5 1 3',
        }
      ]
    },
    {
      name: 'submit',
      label: 'Submit',
      type: 'submit',
      classNames: 'mt-8',
      position: '5 4 3'
    }
  ];

  return (
    <>
      <VDynamicForm
        key={JSON.stringify(initialValues)}  // Force remount when initialValues change
        config={maintenanceFormConfig}
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        isFormSubmitting={updatingMaintenance}
        />

    </>
  );
}

export default MaintenceForm;
