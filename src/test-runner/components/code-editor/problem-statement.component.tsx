import { VTypography } from "@components/molecules/typography/v-typography.mol"
import { QuestionResponseDTO } from "@dto/response"


function ProblemStatementComponent({ questionText }: QuestionResponseDTO) {

  return (
    <>

      <div className="w-full">
        <div className="space-y-6">
          <div className="border-b-2">
            <section className="m-4">
              <VTypography as="h3">Problem Statement</VTypography>
              <VTypography as="p">
                {questionText}
              </VTypography>
            </section>
          </div>
          <div className="m-4">
            <section>
              <VTypography as="h3" >Description</VTypography>
              <VTypography as="p">
                You may assume that each input would have exactly one solution, and you may not use the same element
                twice. You can return the answer in any order.
              </VTypography>
            </section>
            <section>
              <VTypography as="h3" className="text-xl font-semibold mb-2">Sample Input</VTypography>
              <pre className="bg-theme-default-alt p-2 rounded">nums = [2,7,11,15], target = 9</pre>
            </section>
            <section>
              <VTypography as="h3" className="text-xl font-semibold mb-2">Sample Output</VTypography>
              <pre className="bg-theme-default-alt p-2 rounded">[0,1]</pre>
            </section>
            <section>
              <VTypography as="h3" className="text-xl font-semibold mb-2">Explanation</VTypography>
              <VTypography as="p">Because nums[0] + nums[1] == 9, we return [0, 1].</VTypography>
            </section>
          </div>
        </div>
      </div>

    </>
  )
}

export { ProblemStatementComponent }