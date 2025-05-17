/* eslint-disable react/function-component-definition */
import React from 'react';
import { FaBuilding, FaUsersCog, FaChartBar, FaFileAlt } from 'react-icons/fa';
import { BsShieldLock, BsGraphUp } from 'react-icons/bs';
import { VStatCard } from '@components/molecules/advance-card/v-stat-card.mol';
import { VActionCard } from '@components/molecules/index';

// Types for props
interface AdminConsoleHomePageProps {
  userRole?: 'super_admin' | 'company_admin'; // Optional prop, defaults to 'super_admin'
}

// eslint-disable-next-line react/function-component-definition
function AdminConsoleHomePage({ userRole = 'super_admin' }: AdminConsoleHomePageProps) {
  // Get permissions
  const isSuperAdmin = userRole === 'super_admin';
  const isCompanyAdmin = userRole === 'company_admin';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isSuperAdmin ? 'Super Admin Console' : 'Company Admin Console'}
        </h1>
        <p className="text-gray-600 mt-2">
          {isSuperAdmin ? 'Manage all companies and system settings' : 'Manage your team and assessments'}
        </p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <VStatCard
          icon={<BsGraphUp className="text-blue-500" size={24} />}
          title="Total Assessments"
          value="128"
          trend="↑ 12%"
        />
        <VStatCard
          icon={<FaUsersCog className="text-green-500" size={24} />}
          title={isSuperAdmin ? 'Companies' : 'Team Members'}
          value={isSuperAdmin ? '24' : '18'}
          trend={isSuperAdmin ? '↑ 3%' : '↑ 8%'}
        />
        <VStatCard
          icon={<FaChartBar className="text-purple-500" size={24} />}
          title="Avg. Score"
          value="82%"
          trend="→ 0%"
        />
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Shared Actions */}
        <VActionCard
          icon={<FaFileAlt size={20} />}
          title="Manage Assessments"
          description="Create or edit test content"
          link="/admin/assessments"
          buttonText="Go to Assessments"
        />

        {/* Conditional Super Admin Cards */}
        {isSuperAdmin && (
          <>
            <VActionCard
              icon={<FaBuilding size={20} />}
              title="Company Management"
              description="Add or configure organizations"
              link="/admin/companies"
              buttonText="Manage Companies"
              accentClass="bg-blue-50 border-blue-200"
            />
            <VActionCard
              icon={<BsShieldLock size={20} />}
              title="System Settings"
              description="Configure global parameters"
              link="/admin/settings"
              buttonText="Open Settings"
              accentClass="bg-orange-50 border-orange-200"
            />
          </>
        )}

        {/* Conditional Company Admin Cards */}
        {isCompanyAdmin && (
          <VActionCard
            icon={<FaUsersCog size={20} />}
            title="Team Management"
            description="Invite or remove members"
            link="/admin/team"
            buttonText="Manage Team"
            accentClass="bg-green-50 border-green-200"
          />
        )}
      </div>
    </div>
  );
}


export default AdminConsoleHomePage;
