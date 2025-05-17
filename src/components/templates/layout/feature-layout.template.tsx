import { Outlet } from 'react-router-dom';
import { VSidebar } from '@components/organisms/layout/v-sidebar.organism';
import { VHeader } from '@components/organisms/layout/v-header.organism';
import { MdDashboard, MdOutlineSupportAgent, MdSubscriptions } from 'react-icons/md';
import { FaFileCircleCheck } from 'react-icons/fa6';
import { BsBarChartLine, BsQuestionSquare } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from 'store/store';
import {
  selectIsSidebarExpanded,
  selectIsSidebarVisible,
  setIsSidebarExpanded,
} from 'store/slices/ui.slice';
import clsx from 'clsx';

function FeatureLayout() {
  const dispatch = useAppDispatch();
  const isSidebarVisible = useAppSelector(selectIsSidebarVisible);
  const isSidebarExpanded = useAppSelector(selectIsSidebarExpanded);

  const sidebarItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: MdDashboard,
    },
    {
      label: 'Test Assessment',
      path: '/assessments',
      icon: FaFileCircleCheck,
    },
    {
      label: 'Questions',
      path: '/questions',
      icon: BsQuestionSquare,
    },
    {
      label: 'Result',
      path: '/result',
      icon: BsBarChartLine,
      separator: true,
    },
    {
      label: 'Support',
      path: '/support',
      icon: MdOutlineSupportAgent,
    },
    {
      label: 'Subscription',
      path: '/subscriptions',
      icon: MdSubscriptions,
    },
  ];

  const handleSidebarToggle = (isExpanded: boolean) => {
    dispatch(setIsSidebarExpanded(isExpanded));
  };


  return (
    <div className="relative bg-theme-default">
      {/* Fixed Header */}
      <VHeader className="fixed top-0 left-0 w-full z-10" showIcons={true} />

      {/* Sidebar below header */}
      <div
        className={clsx('fixed top-0 left-0 h-full transition-all duration-300 bg-theme-default-alt', {
          'w-64': isSidebarExpanded,
          'w-14': !isSidebarExpanded,
          'translate-x-0': isSidebarVisible,
          '-translate-x-full': !isSidebarVisible,
        })}
      >
        <VSidebar items={sidebarItems} onSidebarToggle={handleSidebarToggle} classes={{ wrapper: 'mt-16 z-20' }} />
      </div>

      {/* Main Content */}
      <div
        className={clsx('transition-all duration-300 mt-16 p-5 pt-10', {
          'ml-64': isSidebarVisible && isSidebarExpanded,
          'ml-14': isSidebarVisible && !isSidebarExpanded,
          'ml-0': !isSidebarVisible,
        })}
      >
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export { FeatureLayout };
