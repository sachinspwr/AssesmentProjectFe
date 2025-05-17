import { Outlet } from 'react-router-dom';
import { VHeader } from '@components/organisms/layout/v-header.organism';

function HeaderOnlyLayout() {
  return (
    <div className="relative bg-theme-default">
      <VHeader className="fixed top-0 left-0 w-full z-10" showIcons={true} />
      <div className="mt-16 p-5 pt-10">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export { HeaderOnlyLayout };
