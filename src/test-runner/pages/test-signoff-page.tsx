import { VImage } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';

function TestSignoffPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      <div className="flex flex-col gap-6 place-items-center max-w-sm">
        <VImage src="/src/assets/svgs/close-window.svg"></VImage>
      </div>

      <div className="flex gap-2">
        <VTypography as="h4" className="!text-theme-brand">
          Thank you, You can safely Close this window
        </VTypography>
      </div>
    </div>
  );
}

export { TestSignoffPage };
