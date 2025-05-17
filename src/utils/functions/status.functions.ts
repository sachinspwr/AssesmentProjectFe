import { TicketStatus } from '@utils/enums';

type UIStatusType = 'default' | 'primary' | 'positive' | 'negative' | 'warning';

function getStatusType(status: string): { type?: UIStatusType } {
  switch (status) {
    case TicketStatus.Open:
      return { type: 'primary' };
    case TicketStatus.InProgress:
      return { type: 'primary' };
    case TicketStatus.Resolved:
      return { type: 'positive' };
    case TicketStatus.Closed:
      return { type: 'default' };
    default:
      return { type: 'default' };
  }
}

function getVarientFromSubscriptionStatus(status: string): { type?: UIStatusType } {
  switch (status) {
    case 'Completed':
      return { type: 'positive' };
    case 'Active':
      return { type: 'primary' };
    default:
      return { type: 'default' };
  }
}

function getVarientFromPaymentStatus(status: string): { type?: UIStatusType } {
  switch (status) {
    case 'Completed':
      return { type: 'positive' };
    default:
      return { type: 'default' };
  }
}

function getVarientColor(variant: Variant): { color: string } {
  switch (variant) {
    case 'default':
      return { color: 'text-theme-default' };
    case 'positive':
      return { color: 'text-theme-positive' };
    case 'warning':
      return { color: 'text-theme-warning' };
    case 'negative':
      return { color: 'text-theme-negative' };
    case 'primary':
      return { color: 'text-theme-brand' };
    default:
      return { color: 'text-theme-default' };
  }
}

export { getStatusType, getVarientFromPaymentStatus, getVarientFromSubscriptionStatus, getVarientColor };
