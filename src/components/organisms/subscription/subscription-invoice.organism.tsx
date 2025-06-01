import { format } from 'date-fns';
import { PaymentStatus } from '@utils/enums/payment-status.enum';
import { InvoiceResponseDTO } from '@dto/response/invoice-response.dto';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { AccountSubscription } from 'models/account/account-subscription.model';

interface InvoiceProps {
  subscription: AccountSubscription;
  invoiceDetails?: InvoiceResponseDTO;
}

export function SubscriptionInvoice({ subscription, invoiceDetails }: InvoiceProps) {



  // User details
  const user = (subscription.account.user.firstName) + (subscription.account.user.lastName);
  const compony = subscription.account.user.company || 'N/A';
  const mail = subscription.account.user.email;
  const mobile = subscription.account.user.mobile || 'Not Provided';
  //subscription Details
  const subscriptionName = subscription.subscription.name;
  //Invoice Details
  const address = (invoiceDetails?.business?.address);
  const city = (invoiceDetails?.business?.city) + " " + (invoiceDetails?.business?.country) + " " + (invoiceDetails?.business?.zip)
  const invoiceNumber = invoiceDetails?.invoiceNumber;
  const invoiceCompony = invoiceDetails?.business?.company;
  // Format dates
  const invoiceDate = format(new Date(), 'MMMM d, yyyy');
  const dueDate = format(new Date(subscription.endDate), 'MMMM d, yyyy');
  const startDate = format(new Date(subscription.startDate), 'MMM d, yyyy');
  const endDate = format(new Date(subscription.endDate), 'MMM d, yyyy');
  // Format amounts
  const amount = subscription.subscription.priceUsd.toFixed(2);
  const paymentStatus = subscription.accountSubscriptionPayment?.status || PaymentStatus.PENDING;
  const paymentMethod = subscription.accountSubscriptionPayment?.subscriptionPaymentOrder?.method || 'Credit Card';

  // Get status color based on PaymentStatus
  const getStatusColor = (status: string) => {
    switch (status) {
      case PaymentStatus.COMPLETED:
        return 'text-green-600';
      case PaymentStatus.FAILED:
        return 'text-red-600';
      case PaymentStatus.REFUNDED:
        return 'text-blue-600';
      case PaymentStatus.CANCELLED:
        return 'text-orange-600';
      default:
        return 'text-gray-500';
    }
  };

  // Format status display text
  const formatStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md p-8 text-sm print:text-xs">
      {/* Header */}
      <VTypography as='h2' className='pb-4'>{invoiceCompony}</VTypography>
      <div className="flex justify-between items-start border-b pb-4 mb-6">
        <div>
          <VTypography as='p'>{address}<br />{city}</VTypography>
          <VTypography as='p'>{mail}</VTypography>
        </div>
        <div className="text-right">
          <VTypography as='p'>
            Invoice : #{invoiceNumber}
          </VTypography>
          <VTypography as='p'>Date Issued: {invoiceDate}</VTypography>
          <VTypography as='p'>Due Date: {dueDate}</VTypography>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-6 flex flex-col">
        <VTypography as='h6'>Bill To</VTypography>
        <VTypography as='small'>{user}</VTypography>
        <VTypography as='small'>{compony}</VTypography>
        <VTypography as='small'>{mail}</VTypography>
        <VTypography as='small'>{mobile}</VTypography>
      </div>

      {/* Items */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-4 font-semibold bg-[#d4e3f3] p-2 rounded">
          <VTypography>Description</VTypography>
          <VTypography>Period</VTypography>
          <VTypography className="text-right">Amount (USD)</VTypography>
        </div>
        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200">
          <div>
            <VTypography as='small' className="font-medium">{subscriptionName}</VTypography>
            <VTypography className="text-gray-600 text-xs mt-1">
            </VTypography>
          </div>
          <div>
            <VTypography as='small' className="font-medium">{startDate} – {endDate}</VTypography>

            <VTypography className="text-gray-600 text-xs mt-1">
            </VTypography>
          </div>
          <div className="text-right">
            <VTypography as='small' className="font-medium">${amount}</VTypography>
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="text-right mb-6">
        <div className="flex justify-end gap-8">
          <VTypography as='small' className="font-medium">Subtotal:</VTypography>
          <VTypography as='small'>${amount}</VTypography>
        </div>
        <div className="flex justify-end gap-8">
          <VTypography as='small' className="font-medium">Tax:</VTypography>
          <VTypography as='small'>$0.00</VTypography>
        </div>
        <div className="flex justify-end gap-8 text-[#0064c7] text-lg font-bold mt-2">
          <VTypography as='small'>Total:</VTypography>
          <VTypography as='small'>${amount}</VTypography>
        </div>
      </div>

      {/* Payment */}
      <div className="mb-6">
        <p className="text-gray-600">
          Payment Method: {paymentMethod}
        </p>
        <p className={`font-semibold ${getStatusColor(paymentStatus)}`}>
          Payment Status: {formatStatusText(paymentStatus)}
        </p>
      </div>

      {/* Footer */}
      <div className="text-gray-500 text-xs border-t pt-4">
        <p>Thank you for your business! </p>
        <p className="mt-1">For any questions regarding this invoice, contact {mail}</p>
        <p className="mt-1">{`© ${new Date().getFullYear()} ${invoiceCompony}`}</p>
      </div>
    </div>
  );
}