import React from 'react';

type TestRunnerAsideProps = {
  questionCount: number;
};

function TestRunnerAside({ questionCount }: TestRunnerAsideProps) {
  const questions = Array.from({ length: questionCount }, (_, index) => index + 1);
  return (
    <div>
      {questions.map((qc) => (
        <div>{qc}</div>
      ))}
    </div>
  );
}

export default TestRunnerAside;
