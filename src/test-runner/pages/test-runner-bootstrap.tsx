import { VLoader } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { TestResponseDTO } from '@dto/response';
import { AxiosBaseQueryError } from 'api/base.query';
import { mapper } from 'mapper';
import { Test } from 'models';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchTestByIdQuery } from 'store/slices/test-assessment.slice';
import {
  setParticipantId,
  setTestDetails,
  useCreateParticipantByUserIdMutation,
  useGetParticipantByUserIdQuery,
} from 'store/slices/test-runner.slice';
import { useAppSelector } from 'store/store';

const TestRunnerBootstrap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: testDetails, isLoading: isTestLoading, isError } = useFetchTestByIdQuery(id as string);
  const userId = useAppSelector((state) => state.account.user?.id);
  const participantId = useAppSelector((state) => state.testRunner?.participantId);

  const {
    data: fetchedParticipant,
    error: fetchError,
    isFetching,
  } = useGetParticipantByUserIdQuery(userId!, {
    skip: !userId || !!participantId,
  });

  const [createParticipant, { data: createdParticipant, error: createError, isLoading: isCreatingParticipant }] =
    useCreateParticipantByUserIdMutation();

  useEffect(() => {
    const axiosError = fetchError as AxiosBaseQueryError;
    if (fetchedParticipant) {
      dispatch(setParticipantId(fetchedParticipant.id));
    } else if (axiosError?.status === 404) {
      createParticipant({ userId: userId! });
    } else if (fetchError) {
      console.error('Error fetching participant:', fetchError);
    }
  }, [fetchedParticipant, fetchError]);

  useEffect(() => {
    if (createdParticipant) {
      dispatch(setParticipantId(createdParticipant.id));
    } else if (createError) {
      console.error('Error creating participant:', createError);
    }
  }, [createdParticipant, createError]);

  useEffect(() => {
    if (testDetails) {
      const test = mapper.map(testDetails, TestResponseDTO, Test);
      const plainTest = JSON.parse(JSON.stringify(test));
      dispatch(setTestDetails(plainTest));
    }
  }, [testDetails]);

  useEffect(() => {
    if (testDetails && participantId) {
      if ((testDetails?.testRegistrationFields?.length ?? 0) > 0) {
        navigate(`/test-runner/${id}/register`);
        return;
      }
      navigate(`/test-runner/${id}/test-metadata`);
    }
  }, [testDetails, navigate, participantId]);

  const showLoader = isTestLoading || isFetching || isCreatingParticipant || !testDetails || !participantId;

  return (
    <>
      {showLoader && <VLoader position="global" />}
      {isError && (
        <VTypography as="h4" className="flex justify-center items-center">
          Error In Fetching Test
        </VTypography>
      )}
    </>
  );
};

export default TestRunnerBootstrap;
