import { TestResultResponseDTO } from '@dto/response';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Extend jsPDF type to recognize lastAutoTable
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

export const generateResultPDF = (resultData: TestResultResponseDTO) => {
  const { participant, sections } = resultData;
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text('Candidate Result Report', 14, 20);

  // Candidate Info
  doc.setFontSize(12);
  const basicInfo = [
    `Name: ${participant?.profile?.firstName} ${participant?.profile?.lastName}`,
    `Email: ${participant?.email}`,
    `Date: ${new Date(resultData.completedAt).toLocaleDateString()}`,
    `Result: ${resultData.isPassed ? 'Pass' : 'Fail'}`,
    `Score: ${resultData?.maxPossibleScore} (${resultData?.percentageScore}%)`,
  ];

  basicInfo.forEach((line, index) => {
    doc.text(line, 14, 30 + index * 6);
  });

  let y = 30 + basicInfo.length * 6 + 10;

  // Section-wise Scores
  autoTable(doc, {
    startY: y,
    head: [['Section', 'Score', 'Out Of']],
    body: sections.map((sec) => [sec.title, sec.maxScore, sec.cutoffScore]),
  });

  y = doc.lastAutoTable.finalY + 10;

  // Questions
  sections.forEach((section) => {
    section.questions.forEach((question, idx) => {

      const qLines = [
        `Q${idx + 1}: ${question.text}`,
        `Your Answer: ${question?.userAnswer || 'No answer given'}`,
        `Correct Answer: ${question?.correctAnswer}`,
        `Explanation: ${question.explanation || 'No explanation provided.'}`,
        `Status: ${question?.isCorrect ? 'Correct' : 'Wrong'}`,
      ];

      qLines.forEach((line, i) => {
        const textY = y + i * 6;
        if (textY > 280) {
          doc.addPage();
          y = 20;
        }
        doc.setFont(line.startsWith('Q') ? 'bold' : 'normal');
        doc.setTextColor(
          line.startsWith('Your Answer') ? (question?.isCorrect ? 'green' : 'red') : 'black'
        );
        doc.text(line, 14, y + i * 6);
      });

      y += qLines.length * 6 + 6;
    });
  });

  doc.save(`Result-${participant?.profile.firstName}-${participant?.profile.lastName}.pdf`);
};
