import { Icon, VLink } from "@components/atoms";
import { VTypography } from "@components/molecules/typography/v-typography.mol";
import { VTabs, VTabsRef } from "@components/organisms";
import { useEffect, useMemo, useRef } from "react";
import { TbArrowLeft } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store/store";
import TenantBasicDetails from "./tenant-basic-details.page";
import { useSelector } from "react-redux";
import { selectSelectedTenant, setSelectedTenant, useGetTenantByIdQuery } from "store/slices/tenants.slice";
import { Tenant } from "models/tenant/tenant.model";
import UserSection from "./user-section.page";
import TenantTeamDetails from "./tenant-team-details.page";
import { VLoader } from "@components/molecules/index";

type TenantMode = 'add' | 'edit';

function ManageTenant() {
  const navigate = useNavigate();
  const tabRef = useRef<VTabsRef>(null);
  const { tenantId = '0' } = useParams();
  const mode: TenantMode = tenantId === '0' ? 'add' : 'edit';
  const dispatch = useAppDispatch();
  const selectedTenant = useSelector(selectSelectedTenant);

  const pageTitle = useMemo(() => (mode === 'add' ? 'Add Tenant' : 'Edit Tenant'), [mode]);
  const { data: fetchedTenant, isLoading } = useGetTenantByIdQuery(tenantId, {
    skip: mode === "add",
  });

  useEffect(() => {
    if (fetchedTenant) dispatch(setSelectedTenant(fetchedTenant));
  }, [fetchedTenant, dispatch]);

  const handleSaveComplete: OnCompleteHandler<Tenant> = async (
    savedTest,
    { shouldExit, skipNavigation = false } = {}
  ) => {
    dispatch(setSelectedTenant(savedTest));

    // Decide on the navigation flow
    if (shouldExit) {
      navigate('/admin-console/tenants');
    }

    if (!skipNavigation) {
      // If we are not exiting, move to the next tab
      tabRef.current?.nextTab();
    }
  };


  const tabs = useMemo(() => {
    return [
      {
        name: 'basicDetails',
        label: 'Basic Details',
        content: (
          <TenantBasicDetails
            tenant={selectedTenant!}
            renderMode={mode}
            onComplete={handleSaveComplete}
          />
        ),
      },
      {
        name: 'users',
        label: 'Users',
        content:
          <UserSection
            tenant={selectedTenant!}
            renderMode={mode}
          />,
      },
      {
        name: 'teams',
        label: 'Teams',
        content:
          <TenantTeamDetails
            tenant={selectedTenant!}
            renderMode={mode}
          />,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTenant, mode]);

  if (mode === "edit" && isLoading) {
    return <div className="p-8"><VLoader /></div>;
  }


  return (
    <div className="relative w-full flex flex-col min-h-screen bg-skin-theme-light">
      <header className="flex justify-between items-center gap-2">
        <div className="flex gap-4 items-center">
          <VLink to="/admin-console/tenants" aria-label="Back to tenants">
            <Icon icon={TbArrowLeft} size={26} color="#000" />
          </VLink>
          <VTypography as="h3">{pageTitle}</VTypography>
        </div>
      </header>

      <div className="my-4">
        <VTabs tabs={tabs} ref={tabRef} />
      </div>
    </div>
  )
}

export default ManageTenant;