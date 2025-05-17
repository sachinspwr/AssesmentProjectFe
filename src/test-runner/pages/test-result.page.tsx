/* eslint-disable @typescript-eslint/ban-types */
import { Button, Icon } from '@components/atoms';
import { Card, Loader } from '@components/molecules/index';
import { TestResultResponseDTO } from '@dto/response';
import { useLoggedInUser } from '@hooks';
import { apiService } from '@services/api.service';
import React, { useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { FiBell } from 'react-icons/fi';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { QuestionList, ResultMarksCard, ResultTimeCard } from 'test-result';
function TestResultPage() {
  const [saveResult, setSaveResult] = useState<Boolean>(false);
  const user = useLoggedInUser();
  const userId = user?.id;
  const { testId } = useParams<{ testId: string }>();
  function handleSaveResultButtonClick() {
    setSaveResult(!saveResult);
  }

  const { data: result, isLoading } = useQuery<TestResultResponseDTO, Error>(
    `result`,
    async () => await apiService.get<TestResultResponseDTO>(`/tests/results/detailed/${testId}/userId/${userId}`)
  );

  return (
    <>
      {!isLoading ? (
        <div className="w-full p-14 bg-gray-100">
          <div className="w-full h-full flex flex-col gap-4">
            <Card>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-xl">Test Result</h3>
                </div>
                <div>
                  <Button
                    varient="no-background-border"
                    className={`outline-gray-400 outline outline-1 flex gap-4 items-center`}
                    onClick={handleSaveResultButtonClick}
                  >
                    <Icon
                      type="react-icons"
                      icon={saveResult ? FaBookmark : FaRegBookmark}
                      title="Switch Theme"
                      size={20}
                    />
                    Save the result
                  </Button>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex-col ">
                <div className="mb-4">
                  <h3 className="font-bold text-base">RESPONDENT</h3>
                </div>
                <div className="flex gap-5 items-center">
                  <Icon type="react-icons" icon={FaUser} title="Switch Theme" size={30} />
                  <h2 className="font-black text-2xl">{`${result?.user?.firstName} ${result?.user?.lastName}`}</h2>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex-col ">
                <div className="mb-4">
                  <h3 className="font-bold text-base">SUMMARY</h3>
                </div>
                <div className="flex gap-5 items-center">
                  <Icon type="react-icons" icon={FiBell} title="Switch Theme" size={30} color="purple" />
                  <h2 className="text-base">Thank you for taking the test!</h2>
                </div>
                <div className="flex gap-5 items-center">
                  <Icon
                    className="opacity-0"
                    type="react-icons"
                    icon={FiBell}
                    title="Switch Theme"
                    size={30}
                    color="purple"
                  />
                  <h2 className="text-base">Congratulations on completing the test</h2>
                </div>
              </div>
            </Card>
            {/* Result Card */}
            <div className="flex gap-6 w-full flex-wrap">
              <ResultMarksCard testResult={result?.testResults ?? []} />
              <ResultTimeCard />
            </div>
            <Card>
              <QuestionList testResultResponse={result ?? ({} as TestResultResponseDTO)} />
            </Card>
          </div>
        </div>
      ) : (
        <Loader type="global" />
      )}
    </>
  );
}

export { TestResultPage };
