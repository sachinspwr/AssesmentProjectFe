import { VStatus } from '@components/atoms';
import { VProgressBar } from '@components/molecules/progress-bar/v-progress-bar.mol';
import { VOverview } from '@components/organisms/overview/v-overview.organism';
import { TestResponseDTO, TestResultResponseDTO } from '@dto/response';
import { DifficultyLevel, QuestionType, TestQuestionFormat, TestStatus } from '@utils/enums';
import { useState } from 'react';
import AssessmentQuestionTable from 'test-result/asssessment-question-table';
import CandidateProfileDetails from 'test-result/components/candidate-profile-details.component';
import DynamicQuestionModal from 'test-result/dynamic-question-modal';
import ReviewResultRating from '../../components/review-result-rating.component';

function ReviewDetailedResultpage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionInfo, setQuestionInfo] = useState({ sectionId: '', questionId: '' });

  const reviewDetailedResultData: TestResultResponseDTO = {
    testId: 'test-abc-123',
    userId: 'user-xyz-789',
    testLinkId: 'link-456-def',
    user: {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      mobile: '+15551234567',
    },
    testResults: [
      {
        isPassed: true,
        correctionPercentage: 90,
        score: 27,
        outOf: 30,
        completedAt: new Date('2025-05-15T10:30:00Z'),
        id: 'result-001',
        testId: 'test-abc-123',
        participantId: 'participant-101',
        userId: 'user-xyz-789',
        testLinkId: 'link-456-def',
        totalQuestions: 30,
        correctAnswersCount: 27,
        feedback: 'Excellent performance. Keep up the good work.',
      },
    ],
    test: {
      testSections: [
        {
          id: 'section-01',
          name: 'Logical Reasoning',
          score: 14,
          outOf: 15,
          description: 'Evaluate reasoning and analytical ability.',
          question: [
            {
              id: 'lr-q1',
              questionText: 'If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?',
              difficulty: DifficultyLevel.Medium,
              type: QuestionType.SingleChoice,
              timeLimit: 2,
              subject: 'Reasoning',
              subjectId: 'sub-101',
              topic: 'Syllogisms',
              marks: 1,
              answerOptions: 'Yes, No, Cannot Determine, None of the above',
              correctAnswer: 'Yes',
              questionExplanation: 'This is a demo question explanation.',
              answerExplanation: 'This is a demo answer explanation.',
            },
            {
              id: 'lr-q2',
              questionText: 'Write essay on : Memory Management in Computer.',
              difficulty: DifficultyLevel.Easy,
              type: QuestionType.Essay,
              timeLimit: 1,
              subject: 'Logical Reasoning',
              subjectId: 'sub-lr-003',
              topic: 'Odd One Out',
              marks: 1,
              answerOptions: '',
              correctAnswer: `Memory management is a fundamental aspect of computer systems that involves the handling, allocation, and optimization of a computer's memory resources. It ensures that each process has adequate memory space and that the system operates efficiently without crashing or slowing down.

At its core, memory management is the process of controlling and coordinating computer memory, assigning portions to various running programs to optimize overall system performance. This is especially critical in multitasking environments where multiple programs or processes may run simultaneously and require dynamic access to memory.

There are two main types of memory in a computer: primary memory (RAM) and secondary memory (e.g., hard drives or SSDs). Memory management focuses mainly on primary memory, which is fast but limited in size. The operating system plays a central role in managing this memory through techniques such as paging, segmentation, and virtual memory.

Paging involves dividing memory into fixed-size blocks and mapping them to physical memory, which helps in reducing fragmentation. Segmentation, on the other hand, allows memory to be divided into logical units based on the program's structure, making it more flexible but complex. Virtual memory is another powerful concept where the system uses disk space as an extension of RAM, allowing larger programs to run by temporarily swapping data in and out of physical memory.

Effective memory management enhances system stability, performance, and multitasking capabilities. It prevents memory leaks, ensures that no process overwrites the memory of another, and allows efficient recovery and reuse of memory.

`,
              questionExplanation: 'This is a demo question explanation.',
              answerExplanation: 'This is a demo answer explanation.',
            },
            {
              id: 'lr-q3',
              questionText: 'What is the difference between `malloc()` and `calloc()` in C?',
              difficulty: DifficultyLevel.Medium,
              type: QuestionType.ShortAnswer,
              timeLimit: 3,
              subject: 'C Programming',
              subjectId: 'sub-c-001',
              topic: 'Dynamic Memory Allocation',
              marks: 2,
              answerOptions: '',
              correctAnswer: 'malloc allocates uninitialized memory, while calloc allocates zero-initialized memory.',
              questionExplanation:
                'This question evaluates the candidate’s understanding of dynamic memory allocation functions in the C standard library.',
              answerExplanation:
                '`malloc(size)` allocates a block of memory of the specified size but does not initialize it. `calloc(n, size)` allocates memory for an array of `n` elements and initializes all bytes to zero.',
            },
          ],
        },
        {
          id: 'section-02',
          name: 'Technical Knowledge',
          score: 13,
          outOf: 15,
          description: 'Assess fundamental technical understanding.',
          question: [
            {
              id: 'tech-q1',
              questionText: 'What is the output of 2 ** 3 in Python?',
              difficulty: DifficultyLevel.Easy,
              type: QuestionType.SingleChoice,
              timeLimit: 1,
              subject: 'Programming',
              subjectId: 'sub-202',
              topic: 'Operators',
              marks: 1,
              answerOptions: '6, 8, 9, Error',
              correctAnswer: '8',
              questionExplanation: 'This is a demo question explanation.',
              answerExplanation: 'This is a demo answer explanation.',
            },
            {
              id: 'tech-q2',
              questionText: 'Which of the following is feature of OOP (Object-Oriented Programming)?',
              difficulty: DifficultyLevel.Medium,
              type: QuestionType.MultipleChoice,
              timeLimit: 2,
              subject: 'Programming Concepts',
              subjectId: 'sub-tech-004',
              topic: 'OOP',
              marks: 1,
              answerOptions: 'Encapsulation, Inheritance, Polymorphism, Compilation',
              correctAnswer: 'Encapsulation, Inheritance, Polymorphism',
              questionExplanation: 'This is a demo question explanation.',
              answerExplanation: 'This is a demo answer explanation.',
            },
            {
              id: 'tech-q3',
              questionText: 'In JavaScript, `NaN === NaN` evaluates to true.',
              difficulty: DifficultyLevel.Easy,
              type: QuestionType.TrueFalse,
              timeLimit: 1,
              subject: 'JavaScript Basics',
              subjectId: 'sub-js-001',
              topic: 'Data Types',
              marks: 1,
              answerOptions: 'True, False',
              correctAnswer: 'True',
              questionExplanation: 'This is a demo question explanation.',
              answerExplanation: 'This is a demo answer explanation.',
            },
            {
              id: 'tech-q4',
              questionText: 'The command used to initialize a new Git repository is ________.',
              difficulty: DifficultyLevel.Medium,
              type: QuestionType.FillInTheBlanks,
              timeLimit: 2,
              subject: 'Version Control',
              subjectId: 'sub-vc-002',
              topic: 'Git Basics',
              marks: 1,
              answerOptions: 'git init, git start, git create, git new',
              correctAnswer: 'git init',
              questionExplanation: 'This is a demo question explanation.',
              answerExplanation: 'This is a demo answer explanation.',
            },
          ],
        },
      ],
      title: 'Campus Hiring Assessment - 2025',
      totalQuestions: 30,
      totalSections: 2,
      maxScore: 30,
      cutoffScorePercentage: 60,
      durationInMinutes: 45,
      testQuestionFormat: TestQuestionFormat.SingleChoice,
      status: TestStatus.Published,
      experienceLevel: {
        id: 'exp-01',
        name: 'Entry Level',
        isPublic: false,
      },
      id: 'test-abc-123',
    },
    testQuestionAnswer: [
      {
        questionId: 'lr-q1',
        sectionId: 'section-01',
        finalMarks: '1',
        answerText: 'No',
        testId: 'test-abc-123',
        participantId: 'participant-101',
        resultComments: 'isCorrect',
        id: 'ans-001',
      },
      {
        questionId: 'lr-q2',
        sectionId: 'section-01',
        finalMarks: '1',
        answerText:
          "Memory management is a fundamental aspect of computer systems that involves the handling, allocation, and optimization of a computer's memory resources. It ensures that each process has adequate memory space and that the system operates efficiently without crashing or slowing down. At its core, memory management is the process of controlling and coordinating computer memory, assigning portions to various running programs to optimize overall system performance. This is especially critical in multitasking environments where multiple programs or processes may run simultaneously and require dynamic access to memory.There are two main types of memory in a computer: primary memory (RAM) and secondary memory (e.g., hard drives or SSDs). Memory management focuses mainly on primary memory, which is fast but limited in size. The operating system plays a central role in managing this memory through techniques such as paging, segmentation, and virtual memory.Paging involves dividing memory into fixed-size blocks and mapping them to physical memory, which helps in reducing fragmentation. Segmentation, on the other hand, allows memory to be divided into logical units based on the program's structure, making it more flexible but complex. Virtual memory is another powerful concept where the system uses disk space as an extension of RAM, allowing larger programs to run by temporarily swapping data in and out of physical memory.Effective memory management enhances system stability, performance, and multitasking capabilities. It prevents memory leaks, ensures that no process overwrites the memory of another, and allows efficient recovery and reuse of memory.",
        testId: 'test-abc-123',
        participantId: 'participant-101',
        resultComments: 'isCorrect',
        id: 'ans-002',
      },
      {
        questionId: 'lr-q3',
        sectionId: 'section-01',
        finalMarks: '1',
        answerText: 'malloc allocates uninitialized memory, while calloc allocates zero-initialized memory.',
        testId: 'test-abc-123',
        participantId: 'participant-101',
        resultComments: 'isCorrect',
        id: 'ans-003',
      },
      {
        questionId: 'tech-q1',
        sectionId: 'section-02',
        finalMarks: '1',
        answerText: '8',
        testId: 'test-abc-123',
        participantId: 'participant-101',
        resultComments: 'isCorrect',
        id: 'ans-001',
      },
      {
        questionId: 'tech-q2',
        sectionId: 'section-02',
        finalMarks: '1',
        answerText: 'Encapsulation, Inheritance, Polymorphism',
        testId: 'test-abc-123',
        participantId: 'participant-101',
        resultComments: 'isCorrect',
        id: 'ans-002',
      },
      {
        questionId: 'tech-q3',
        sectionId: 'section-02',
        finalMarks: '1',
        answerText: 'False',
        testId: 'test-abc-123',
        participantId: 'participant-101',
        resultComments: 'isCorrect',
        id: 'ans-003',
      },
      {
        questionId: 'tech-q4',
        sectionId: 'section-02',
        finalMarks: '1',
        answerText: 'git start',
        testId: 'test-abc-123',
        participantId: 'participant-101',
        resultComments: 'isCorrect',
        id: 'ans-003',
      },
    ],
    createdAt: new Date('2025-05-15T09:00:00Z'),
    totalQuestions: 30,
    correctAnswersCount: 27,
    score: 27,
    outOf: 30,
    isPassed: true,
    correctionPercentage: 90,
    feedback: 'Excellent performance. Keep up the good work.',
    updatedOn: new Date('2025-05-15T10:35:00Z'),
    testLink: {
      id: 'link-456-def',
      createdAt: new Date('2025-05-01T12:00:00Z'),
      testId: '',
      testLinkName: '',
      link: '',
      maxAttemptsForLink: 0,
      usageCountLimit: 0,
      expiringOn: new Date(),
      testResults: new TestResultResponseDTO(),
      testLinkAnonymousUsers: [],
      test: new TestResponseDTO(),
    },
    testLinkAnonymousUser: {
      id: 'anon-user-001',
      testLinkId: '',
      email: '',
    },
  };

  const handleReviewQuestion = ({ questionId, sectionId }: { questionId: string; sectionId: string }) => {
    setQuestionInfo({ questionId, sectionId });
    setIsModalOpen(true);
  };

  return (
    <>
      <CandidateProfileDetails
        testResults={reviewDetailedResultData}
        showBackButton={true}
        statusElement={
          <VStatus
            className="w-[217px] h-[32px] px-4 py-2 whitespace-nowrap"
            label="3 questions pending"
            type="warning"
          />
        }
      />

      <div className="border border-theme-default my-5" />

      {/* Section Wise Performance */}
      <VOverview title="Section-wise performance" titleClassName="text-sm">
        <div className="px-5 flex flex-col gap-5 pb-5">
          {reviewDetailedResultData?.test?.testSections?.map((section) => (
            <VProgressBar
              key={section?.id}
              label={section?.name}
              completed={section?.score ?? 0}
              outOf={section?.outOf ?? 0}
            />
          ))}
        </div>
      </VOverview>

      <div className="border border-theme-default my-5" />

      {/* Question Table + Modal */}
      <div className="mt-6">
        {reviewDetailedResultData && (
          <>
            <AssessmentQuestionTable
              detailedResultData={reviewDetailedResultData}
              onReviewQuestion={handleReviewQuestion}
            />
            <DynamicQuestionModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              sectionId={questionInfo.sectionId}
              questionId={questionInfo.questionId}
              detailedResultData={reviewDetailedResultData}
            />
          </>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-4"></div>

      <ReviewResultRating />
    </>
  );
}

export default ReviewDetailedResultpage;
