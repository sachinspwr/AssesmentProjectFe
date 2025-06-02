// components/templates/VFeedbackCard.tsx
import { VButton, VCard, VImage } from '@components/atoms';

interface VFeedbackCardProps {
  icon?: React.ReactNode;
  imageSrc?: string;
  title: string;
  message: string | React.ReactNode;
  additionalNote?: string | React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    ariaLabel?: string;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    ariaLabel?: string;
  };
  supportLink?: {
    label: string;
    onClick: () => void;
  };
}

export function VFeedbackCard({
  icon,
  imageSrc,
  title,
  message,
  additionalNote,
  primaryAction,
  secondaryAction,
  supportLink,
}: VFeedbackCardProps) {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-theme-surface">
      <VCard className="!shadow-none rounded-2xl p-8 max-w-lg w-full text-center animate-fade-in">
        {(icon || imageSrc) && (
          <div className="mb-6 flex justify-center">
            {icon ? (
              <div className="bg-red-100 text-red-600 rounded-full p-4">{icon}</div>
            ) : (
              <VImage src={imageSrc!} alt="" className="w-32 h-32" />
            )}
          </div>
        )}

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h1>

        <div className="text-gray-600 mb-4">{typeof message === 'string' ? <p>{message}</p> : message}</div>

        {additionalNote && <div className="bg-gray-50 text-sm text-gray-700 p-4 rounded-lg mb-6">{additionalNote}</div>}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {primaryAction && (
            <VButton
              onClick={primaryAction.onClick}
              variant="primary"
              className="w-full sm:w-auto"
              aria-label={primaryAction.ariaLabel || primaryAction.label}
            >
              {primaryAction.label}
            </VButton>
          )}
          {secondaryAction && (
            <VButton
              onClick={secondaryAction.onClick}
              variant="secondary"
              className="w-full sm:w-auto"
              aria-label={secondaryAction.ariaLabel || secondaryAction.label}
            >
              {secondaryAction.label}
            </VButton>
          )}
        </div>

        {supportLink && (
          <div className="mt-6 border-t pt-4">
            <button
              onClick={supportLink.onClick}
              className="text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-200 rounded"
            >
              {supportLink.label}
            </button>
          </div>
        )}
      </VCard>
    </main>
  );
}
