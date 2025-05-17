import { VTypography } from '@components/molecules/typography/v-typography.mol';
import SampleSolutionsEditor from './sample-solution-editor.organism';
import ConstraintsEditor from './constraint-editor.organism';
import TestCaseEditor from './test-case-editor.organism';
import FunctionSignatureForm from './function-signature-form.organism';
import AllowedLanguagesForm from './allowed-language-form.organism';

function CodingMetadata() {
  return (
    <div className="flex flex-col gap-2">
      {/* Function Signature */}
      <section>
        <VTypography as="h5" className="py-6 text-theme-secondary">
          Function Signature
        </VTypography>
        <FunctionSignatureForm />
      </section>

      {/* Allowed Languages */}
      <section>
        <VTypography as="h5" className="py-6 text-theme-secondary">
          Allowed Languages
        </VTypography>
        <AllowedLanguagesForm options={['Java', 'JavaScript']} onChange={() => {}} />
      </section>

      {/* Constraints */}
      <section>
        <VTypography as="h5" className="py-6 text-theme-secondary">
          Constraints
        </VTypography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConstraintsEditor onConstraintsChange={(constraints) => console.log(constraints)} />
        </div>
      </section>

      {/* Sample Solution */}
      <section>
        <VTypography as="h5" className="py-6 text-theme-secondary">
          Sample Solution(s)
        </VTypography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SampleSolutionsEditor onChange={() => {}} />
        </div>
      </section>

      {/* Test Cases */}
      <section>
        <VTypography as="h5" className="py-6 text-theme-secondary">
          Test Cases
        </VTypography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TestCaseEditor
            onCasesChange={(testCases) => {
              console.log(testCases);
            }}
          />
        </div>
      </section>
    </div>
  );
}

export default CodingMetadata;
