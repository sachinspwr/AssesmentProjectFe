import { PickType } from "types/extention.type";
import { TestRequestDTO } from "./test-request.dto";

export class BasicTestDetailRequestDTO extends PickType(TestRequestDTO, [
    'title',
    'isPublic',
    'testQuestionFormat',
    'description',
    'cutoffScorePercentage',
    'experienceLevelId',
    'status',
    'hasNegativeMarking',
    'randomizeQuestions'
  ] as const) {}
  