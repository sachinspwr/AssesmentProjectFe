import { VTitleWithIcon } from '@components/molecules/icon-title/v-title-with-icon.mol';
import { VLoader } from '@components/molecules/index';
import { splitAndCapitalize } from '@utils/functions';
import { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchRoleByIdQuery } from 'store/slices/roles.slice';
import AddRoleForm from '../components/role-management/add-role-form.component';
import { RolesResponseDTO } from '@dto/response/roles.response.dto';

function ManageRolespage() {
  const navigate = useNavigate();
  const { id = '0' } = useParams();
  const bootstrapMode = id === '0' ? 'create' : 'edit';
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const { data: role, isLoading, refetch } = useFetchRoleByIdQuery(id, { skip: bootstrapMode === 'create' });
  console.log(role);

  const handleGoBack = () => {
    isPreview ? setIsPreview(false) : navigate('/admin-console/roles');
  };

  return (
    <div>
      <div className="flex gap-5">
        <VTitleWithIcon as="h3" icon={MdArrowBack} onClick={handleGoBack}>
          {splitAndCapitalize(isPreview ? 'try' : bootstrapMode)} Role
        </VTitleWithIcon>
      </div>
      <div className="mt-[20px] mb-[20px] border-b theme-border-default"></div>
      {isLoading ? (
        <VLoader type="spinner" />
      ) : (
        <AddRoleForm
          renderMode={bootstrapMode}
          initialValue={bootstrapMode === 'edit' ? role : ({ isPublic: true } as RolesResponseDTO)}
          isPreview={isPreview}
          setIsPreview={setIsPreview}
          onSuccess={() => {
            if (bootstrapMode === 'edit') {
              refetch();
            }
            navigate('/admin-console/roles', { state: { refetch: true } });
          }}                    
        />
      )}
    </div>
  );
}

export default ManageRolespage;
