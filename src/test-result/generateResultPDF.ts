import { TestResultResponseDTO } from '@dto/response';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateResultPDF = (resultData:TestResultResponseDTO) => {
  const { user, testResults, test, testQuestionAnswer } = resultData;
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text('Candidate Result Report', 14, 20);

  // Candidate Info
  doc.setFontSize(12);
  const result = testResults[0];
  const basicInfo = [
    `Name: ${user.firstName} ${user.lastName}`,
    `Email: ${user.email}`,
    `Date: ${new Date(result.completedAt).toLocaleDateString()}`,
    `Result: ${result.isPassed ? 'Pass' : 'Fail'}`,
    `Score: ${result.score}/${result.outOf} (${result.correctionPercentage}%)`
  ];

  basicInfo.forEach((line, index) => {
    doc.text(line, 14, 30 + index * 6);
  });

  let y = 30 + basicInfo.length * 6 + 10;

  // Section-wise Scores
  autoTable(doc, {
    startY: y,
    head: [['Section', 'Score', 'Out Of']],
    body: test.testSections.map((sec) => [sec.name, sec.score, sec.outOf]),
  });

  y = doc.lastAutoTable.finalY + 10;

  // Questions
  test?.testSections.forEach((section) => {
    section.question.forEach((question, idx) => {
      const answer = testQuestionAnswer.find(
        (a) => a.sectionId === section.id && a.questionId === question.id
      );

      const selected = Array.isArray(answer?.answerText)
        ? answer.answerText
        : answer?.answerText?.split(',') ?? [];

      const correct = question.correctAnswer?.split(',') ?? [];

      const isCorrect = selected.every(ans => correct.includes(ans)) && selected.length === correct.length;

      const qLines = [
        `Q${idx + 1}: ${question.questionText}`,
        `Your Answer: ${selected.join(', ') || 'No answer given'}`,
        `Correct Answer: ${correct.join(', ')}`,
        `Explanation: ${question.answerExplanation || 'No explanation provided.'}`,
        `Status: ${isCorrect ? 'Correct' : 'Wrong'}`
      ];

      qLines.forEach((line, i) => {
        const textY = y + i * 6;
        if (textY > 280) {
          doc.addpage();
          y = 20;
        }
        doc.setFont(undefined, line.startsWith('Q') ? 'bold' : 'normal');
        doc.setTextColor(
          line.startsWith('Your Answer') ? (isCorrect ? 'green' : 'red') : 'black'
        );
        doc.text(line, 14, y + i * 6);
      });

      y += qLines.length * 6 + 6;
    });
  });

  // Save PDF
  doc.save(`Result-${user.firstName}-${user.lastName}.pdf`);
};
