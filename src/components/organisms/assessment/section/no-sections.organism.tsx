import { VButton } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';

type NoSectionsProps = {
  onAddSection: () => void;
};

function NoSections({ onAddSection }: NoSectionsProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <VTypography as="h4">No Sections!</VTypography>
      <VTypography as="p">Please add the first section to this assessment</VTypography>
      <div className="flex flex-col items-center gap-3">
        <VButton onClick={onAddSection}>Add Section</VButton>
      </div>
    </div>
  );
}

export { NoSections };
