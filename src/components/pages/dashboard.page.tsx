import { useLoggedInUser } from '@hooks';
import UserResultDashboard from 'test-result/user-result-dashboard.page';
import { RecruiterDashboard } from './recruiter-dashboard.page';

function Dashboard() {
  const user = useLoggedInUser();

  if (!user) return null;

  return user?.tenantId ? <RecruiterDashboard /> : <UserResultDashboard />;
}

export default Dashboard;
