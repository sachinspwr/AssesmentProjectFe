import { VTypography } from '@components/molecules/typography/v-typography.mol';
import SampleSolutionsEditor from './sample-solution-editor.organism';
import ConstraintsEditor from './constraint-editor.organism';
import TestCaseEditor, { TestCase } from './test-cases.organism';
import FunctionSignatureForm from './function-signature-form.organism';
import AllowedLanguagesForm from './allowed-language-form.organism';
import ProblemStatementForm from './problem-configuration.organism';
import StarterCodeEditor from './starter-code.organism';

interface CodingMetadataProps {
  testCases?: TestCase[];
  onTestCasesChange?: (testCases: TestCase[]) => void;
}

function CodingMetadata({ testCases = [], onTestCasesChange = () => { } }: CodingMetadataProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* Function Signature */}
      <section>
        <VTypography as="h5" className="py-2 text-theme-secondary">
          {/* Problem Statement */}
        </VTypography>
        {/* <FunctionSignatureForm /> */}
        <ProblemStatementForm />
      </section>

      {/* Allowed Languages */}
      {/* <section>
        <VTypography as="h5" className="py-6 text-theme-secondary">
          Allowed Languages
        </VTypography>
        <AllowedLanguagesForm options={['Java', 'JavaScript']} onChange={() => {}} />
      </section> */}

      {/* Constraints */}
      {/* <section>
        <VTypography as="h5" className="py-6 text-theme-secondary">
          Constraints
        </VTypography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConstraintsEditor onConstraintsChange={(constraints) => console.log(constraints)} />
        </div>
      </section> */}

      {/* Sample Solution */}
      {/* <section>
        <VTypography as="h5" className="py-6 text-theme-secondary">
          Sample Solution(s)
        </VTypography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SampleSolutionsEditor onChange={() => {}} />
        </div>
      </section> */}

      {/* Test Cases */}
      {/* <section>
        <VTypography as="h5" className="py-6 text-theme-secondary">
          Test Cases
        </VTypography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TestCaseList
            initialTestCases={[]}
            onCasesChange={onTestCasesChange}
          />
        </div>
      </section> */}

      <section>
        {/* <VTypography as="h5" className="py-6 text-theme-secondary">
          Starter Code
        </VTypography> */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 py-6 gap-6">
          <StarterCodeEditor
            initialLanguages={[
              { value: 'javascript', label: 'JavaScript' },
              { value: 'typescript', label: 'TypeScript' },
              { value: 'python', label: 'Python' }
            ]}
            initialStarterCodes={[]}
            onStarterCodesChange={(starterCodes) => {
              console.log('Updated starter codes:', starterCodes);
            }}
          />
        </div> */}

      </section>
    </div>
  );
}

export default CodingMetadata;
