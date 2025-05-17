import { VLoader } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { TestResponseDTO } from '@dto/response';
import { mapper } from 'mapper';
import { Test } from 'models';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchTestByIdQuery } from 'store/slices/test-assessment.slice';
import { setParticipantId, setTestDetails } from 'store/slices/test-runner.slice';
import { useAppSelector } from 'store/store';

const TestRunnerBootstrap = () => {
  const {id}=useParams()
  const participantId = '047b486d-990e-4e6e-98ff-8d138bd1bfd5';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: testDetails, isLoading, isError } = useFetchTestByIdQuery(id as string);

  useEffect(() => {
    if (testDetails) {
    const test = mapper.map(testDetails, TestResponseDTO, Test);
    const plainTest = JSON.parse(JSON.stringify(test));
      dispatch(setTestDetails(plainTest));
    }
  }, [testDetails]);

  // const userId=useAppSelector((state)=>state.account.user)
  // const { data:participantId,  } = useGetParticipantByUserIdQuery(userId);

  useEffect(() => {
    if (participantId) {
      dispatch(setParticipantId(participantId));
    }
  }, [participantId]);

  useEffect(() => {
    if (testDetails) {
      if ((testDetails?.testRegistrationFields?.length ?? 0) > 0) {
        navigate(`/test-runner/${id}/register`);
        return;
      }
      navigate(`/test-runner/${id}/test-metadata`);
    }
  }, [testDetails, navigate]);

  return (
    <>
      {isLoading && <VLoader position="global" />}
      {isError && (
        <VTypography as="h4" className="flex justify-center items-center">
          Error In Fetching Test
        </VTypography>
      )}
    </>
  );
};

export default TestRunnerBootstrap;
