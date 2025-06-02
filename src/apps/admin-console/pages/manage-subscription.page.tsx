import { Subscriptionpage } from '@components/pages/subscription/subscription.page'
import UpgradeSubscriptionpage from '@components/pages/subscription/ugrade-subscription.page'

export default function ManageSubscriptionPage() {
    return (
        <div>
            <UpgradeSubscriptionpage />
            <Subscriptionpage isEnterpriseMode />
        </div>
    )
}
