import { DifficultyLevel, QuestionType } from '@utils/enums';
import { Section } from 'test-runner/types';

interface SectionAnalysis {
  dominantDifficulty: DifficultyLevel;
  difficultyBreakdown: Record<DifficultyLevel, number>;
  questionTypes: {
    dominantType: QuestionType | 'Hybrid';
    typeDistribution: Record<QuestionType, number>;
  };
}

export function analyzeSection(section: Section): SectionAnalysis {
  if (!section.questions || section.questions.length === 0) {
    return {
      dominantDifficulty: DifficultyLevel.Medium, // Default when no questions
      difficultyBreakdown: {
        [DifficultyLevel.Easy]: 0,
        [DifficultyLevel.Medium]: 0,
        [DifficultyLevel.Hard]: 0,
      },
      questionTypes: {
        dominantType: 'Hybrid',
        typeDistribution: Object.values(QuestionType).reduce(
          (acc, type) => {
            acc[type] = 0;
            return acc;
          },
          {} as Record<QuestionType, number>
        ),
      },
    };
  }

  // Calculate difficulty breakdown
  const difficultyCounts = section.questions.reduce(
    (acc, question) => {
      const difficulty = question.difficulty as DifficultyLevel;
      acc[difficulty] = (acc[difficulty] || 0) + 1;
      return acc;
    },
    {} as Record<DifficultyLevel, number>
  );

  // Normalize difficulty counts
  const totalQuestions = section.questions.length;
  const difficultyBreakdown = {
    [DifficultyLevel.Easy]: (difficultyCounts[DifficultyLevel.Easy] || 0) / totalQuestions,
    [DifficultyLevel.Medium]: (difficultyCounts[DifficultyLevel.Medium] || 0) / totalQuestions,
    [DifficultyLevel.Hard]: (difficultyCounts[DifficultyLevel.Hard] || 0) / totalQuestions,
  };

  // Determine dominant difficulty using weighted approach
  const difficultyScores = {
    [DifficultyLevel.Easy]: 1,
    [DifficultyLevel.Medium]: 2,
    [DifficultyLevel.Hard]: 3,
  };

  const weightedDifficultyScore =
    difficultyBreakdown[DifficultyLevel.Easy] * difficultyScores[DifficultyLevel.Easy] +
    difficultyBreakdown[DifficultyLevel.Medium] * difficultyScores[DifficultyLevel.Medium] +
    difficultyBreakdown[DifficultyLevel.Hard] * difficultyScores[DifficultyLevel.Hard];

  let dominantDifficulty: DifficultyLevel;
  if (weightedDifficultyScore >= 2.5) {
    dominantDifficulty = DifficultyLevel.Hard;
  } else if (weightedDifficultyScore >= 1.5) {
    dominantDifficulty = DifficultyLevel.Medium;
  } else {
    dominantDifficulty = DifficultyLevel.Easy;
  }

  // Calculate question type distribution
  const typeCounts = section.questions.reduce(
    (acc, question) => {
      acc[question.type] = (acc[question.type] || 0) + 1;
      return acc;
    },
    {} as Record<QuestionType, number>
  );

  const typeDistribution = Object.values(QuestionType).reduce(
    (acc, type) => {
      acc[type] = (typeCounts[type] || 0) / totalQuestions;
      return acc;
    },
    {} as Record<QuestionType, number>
  );

  // Determine dominant question type
  const typeEntries = Object.entries(typeCounts) as [QuestionType, number][];
  const sortedTypes = typeEntries.sort((a, b) => b[1] - a[1]);
  const dominantType = sortedTypes[0][1] === totalQuestions ? sortedTypes[0][0] : 'Hybrid';

  return {
    dominantDifficulty,
    difficultyBreakdown,
    questionTypes: {
      dominantType,
      typeDistribution,
    },
  };
}
