import { VButton, VTextArea } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VFormFieldData } from '@types';

type ShortAnswerPreviewProps = {
  formData: VFormFieldData;
};

function ShortAnswerPreview({ formData }: ShortAnswerPreviewProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2.5">
        <VTypography as="h4">1. {formData.questionText as string}</VTypography>
        {(formData.questionExplanation as string) && (formData.questionExplanation as string) !== 'NA' && (
          <VTypography as="small">{formData.questionExplanation as string}</VTypography>
        )}
      </div>

      <div className="border-b theme-border-default"></div>

      <div className="flex flex-col gap-2.5">
        <VTypography as="h5">Please enter short answer</VTypography>

        <VTextArea
          name="shortans"
          placeholder="Enter short answer"
          className="!w-[530px] 1h-[90px]"
          onChange={() => {}}
        />
      </div>

      <VButton variant="primary" size="md" className="!w-[74px]"></VButton>

      {(formData.answerExplanation as string) && (formData.answerExplanation as string) !== 'NA' && (
        <>
          <div className="border-b theme-border-default"></div>
          <div className="flex flex-col gap-2.5">
            <VTypography as="h5">Interview Guidelines</VTypography>
            <VTypography as="small">{formData.answerExplanation as string}</VTypography>
          </div>
        </>
      )}
    </div>
  );
}

export default ShortAnswerPreview;
