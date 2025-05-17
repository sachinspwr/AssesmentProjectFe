import { VImage } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';

function DocumentNotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="max-w-md ">
        {/* Image */}
        <div className="flex justify-center">
          <VImage
            src="../../src/assets/images/support-empty-list.png"
            size="sm"
            alt="No articles available"
          />
        </div>

        {/* Title/Description */}
        <VTypography as="h6" className="text-theme-secondary">
          Support document not found or deleted.
        </VTypography>
       
      </div>
    </div>
  );
}

export { DocumentNotFound };
