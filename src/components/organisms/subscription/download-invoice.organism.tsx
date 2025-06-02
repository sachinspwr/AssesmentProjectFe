import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import { VButton, VICon } from '@components/atoms';
import { SubscriptionInvoice } from './subscription-invoice.organism';
import { MdOutlineSimCardDownload } from 'react-icons/md';
import { useFetchAccountSubscriptionInvoiceQuery } from 'store/slices/account-subscription.slice';
import { AccountSubscription } from 'models/account/account-subscription.model';

interface InvoiceOrganismProps {
  subscription: AccountSubscription;
}

export function DownloadInvoice({ subscription }: InvoiceOrganismProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  console.log("SubScription", subscription);

  const { data: invoiceDetails, isFetching } = useFetchAccountSubscriptionInvoiceQuery(
    {
      accountId: subscription.accountId,
      userSubscriptionId: subscription.id
    },
    { skip: !subscription } // Only skip if subscription isn't available
  );

  const downloadInvoice = async () => {
    try {


      if (!invoiceRef.current) return;
      await new Promise(resolve => setTimeout(resolve, 0));

      const invoiceNode = invoiceRef.current.cloneNode(true) as HTMLDivElement;
      document.body.appendChild(invoiceNode);

      invoiceNode.style.position = 'absolute';
      invoiceNode.style.left = '0';
      invoiceNode.style.top = '0';
      invoiceNode.style.bottom = '0';
      invoiceNode.style.right = '0';
      invoiceNode.style.width = '210mm';
      invoiceNode.style.visibility = 'visible';
      invoiceNode.style.opacity = '1';
      invoiceNode.style.zIndex = '9999';

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      doc.html(invoiceNode, {
        callback: (pdf) => {
          pdf.save(`invoice-${subscription.id}.pdf`);
          document.body.removeChild(invoiceNode);
        },
        width: 210,
        windowWidth: invoiceNode.scrollWidth,
        x: 0,
        y: 0,
      });

    } catch (error) {
      console.error('Failed to generate invoice:', error);
    }
  };

  return (
    <div>
      {/* Hidden invoice (visually hidden but in DOM) */}
      <div
        ref={invoiceRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: '210mm',
          visibility: 'hidden',
          opacity: 0
        }}
      >
        {invoiceDetails && (
          <SubscriptionInvoice
            subscription={subscription}
            invoiceDetails={invoiceDetails}
          />
        )}
      </div>

      {/* Download button */}
      <VButton variant="link" size="md" onClick={downloadInvoice} disabled={isFetching}>
        <VICon icon={MdOutlineSimCardDownload} size={16} />
        Download Invoice
      </VButton>
    </div>
  );
}