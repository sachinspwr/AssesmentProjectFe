import { Icon, ListItem, Switch } from '@components/atoms';
import { Card, Loader, List, IConWithLabel, IConButton, Alert } from '@components/molecules';
import { TestResponseDTO } from '@dto/response';
import { apiService } from '@services/api.service';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { FaNoteSticky } from 'react-icons/fa6';
import { LuTimerReset } from 'react-icons/lu';
import { TbSum } from 'react-icons/tb';
import { useContext } from 'react';
import { ThemeContext } from '@context/themeContext';
import { MdCreditScore } from 'react-icons/md';
import { MdRestartAlt } from 'react-icons/md';
import { HiOutlineChevronRight } from 'react-icons/hi2';

function TestLandingPage() {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  const { testId } = useParams<{ testId: string }>();
  const { data: test, isLoading } = useQuery<TestResponseDTO, Error>(
    `test:${testId}`,
    async () => await apiService.get<TestResponseDTO>(`tests/${testId}`)
  );

  return (
    <>
      {!isLoading && (
        <div
          className="w-full flex justify-center items-center 
             bg-skin-theme-consistant text-skin-theme min-h-screen"
        >
          {/* content */}
          <Card className="w-full relative mx-8 flex flex-col justify-center items-center rounded-xl">
            {/* theme selector */}
            <div className="absolute top-12 right-8">
              <Switch
                onChange={(toggleState) => themeContext.setTheme(toggleState ? 'theme-dark' : 'theme-light')}
                label="Dark Theme"
              />
            </div>

            <div className="flex flex-col justify-between" style={{ minHeight: '86vh' }}>
              {/* header */}
              <div className="flex gap-2 text-2xl p-5">
                <Icon icon={FaNoteSticky} /> {test?.title}
              </div>

              {/* main contents */}
              <div className="w-full flex justify-between gap-1">
                {/* onstructions */}
                <div className="w-4/6 mb-4">
                  <h2 className="my-2 px-5">INSTRUCTIONS:</h2>
                  <div className="overflow-y-auto scrollbar-thin  p-4 " style={{ maxHeight: '62vh' }}>
                    <List items={JSON.parse(test?.instructions ?? '[]')} numbered={true}></List>
                  </div>
                </div>

                {/* quick info */}
                <div className="w-2/6  my-2 flex flex-col justify-around items-center">
                  <ListItem>
                    <IConWithLabel icon={LuTimerReset} label={`Total Duration : ${test?.durationInMinutes} Minutes`} />
                  </ListItem>
                  <ListItem>
                    <IConWithLabel icon={TbSum} label={`Total Questions : ${test?.questions.length}`} />
                  </ListItem>
                  <ListItem>
                    <IConWithLabel icon={MdCreditScore} label={`Maximum Score : ${test?.maxScore}`} />
                  </ListItem>
                  <ListItem>
                    <IConWithLabel icon={MdCreditScore} label={`Passing Score : ${test?.cutoffScore}`} />
                  </ListItem>
                  <ListItem>
                    <IConWithLabel icon={MdCreditScore} label={`Negative Marking : ${'No'}`} />
                  </ListItem>
                </div>
              </div>

              {test?.questions.length === 0 && (
                <div>
                  <Alert type="error">
                    No questions added for this test. You can not take this test try sample test.
                  </Alert>
                </div>
              )}
              {/* buttons */}
              <div className="flex gap-3 justify-end">
                <IConButton
                  iconProps={{ icon: MdRestartAlt }}
                  iconPosition="left"
                  className="bg-skin-theme"
                  onClick={() => navigate('questions', { state: { test: test, questions: test?.questions } })}
                  disabled={test?.questions.length === 0}
                >
                  I AGREE AND START NOW
                </IConButton>
                <IConButton iconProps={{ icon: HiOutlineChevronRight }} iconPosition="right" className="bg-skin-theme">
                  TRY SAMPLE TEST
                </IConButton>
              </div>
            </div>
          </Card>
        </div>
      )}
      {isLoading && <Loader type="global" />}
    </>
  );
}

export { TestLandingPage };
