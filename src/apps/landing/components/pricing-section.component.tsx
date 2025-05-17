import { SubscriptionPlans } from '@components/organisms/subscription/subscription-plans.organism';
import { useNavigate } from 'react-router-dom';

function Pricing() {
  const navigator = useNavigate();

  const handleOnPlanSelected = () => {
    navigator('/sign-up');
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center" id="pricing">
      <div className="w-full flex flex-col gap-8">
        <SubscriptionPlans onPlanSelected={handleOnPlanSelected} />
      </div>
    </section>
  );
}

export { Pricing };
