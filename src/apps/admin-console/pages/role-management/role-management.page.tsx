import { VTitleWithIcon } from "@components/molecules/icon-title/v-title-with-icon.mol";
import RolesList from "apps/admin-console/components/role-management/roles-list.component";
import { useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchRolesQuery } from "store/slices/roles.slice";

function RoleManagement(){
    const navigate = useNavigate();
    const location = useLocation();
    const {data: roles = [], isFetching: fetchingRoles, refetch: refetchRole} = useFetchRolesQuery();

    useEffect(() => {
        if (location.state?.refetch) {
          refetchRole();
        }
      }, [location.state?.refetch, refetchRole]);
      
    return(
        <>
            <VTitleWithIcon as="h3" icon={MdArrowBack} onClick={() => navigate('/admin-console')}>Role Management</VTitleWithIcon>
            <div>
                <RolesList  
                    data={roles} 
                    loading={fetchingRoles} 
                    onDeleteSuccess={() => {
                        refetchRole();
                    }} 
                />
            </div>
        </>
    )
}

export default RoleManagement;