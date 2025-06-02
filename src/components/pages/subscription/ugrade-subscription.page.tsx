import { ManageUserSubscription } from '@components/organisms/subscription/manage-user-subscription.organism';
import { useNavigate } from 'react-router-dom';

function UpgradeSubscriptionpage() {
  const navigate = useNavigate();

  const handleSubscriptionComplete = () => navigate('/subscriptions');

  return (
    <div className="flex flex-col  gap-6 p-4">
      <ManageUserSubscription onSubscriptionActivated={handleSubscriptionComplete} isEnterpriseMode />
    </div>
  );
}

export default UpgradeSubscriptionpage;
