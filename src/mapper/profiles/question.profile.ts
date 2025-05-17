import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { QuestionResponseDTO } from '@dto/response';
import { Question } from 'models/question/question.model';

export const questionProfile = (mapper: Mapper) => {
  // Mapping from QuestionResponseDTO to Question
  createMap(
    mapper,
    QuestionResponseDTO,
    Question,
    // **Basic Information**
    forMember(
      (dest) => dest.id,
      mapFrom((src) => src.id)
    ),
    forMember(
      (dest) => dest.questionText,
      mapFrom((src) => src.questionText)
    ),
    forMember(
      (dest) => dest.topic,
      mapFrom((src) => src.topic)
    ),
    forMember(
      (dest) => dest.subject,
      mapFrom((src) => ({
        id: src.subjectId,
        name: src.subject,
      }))
    ),
    forMember(
      (dest) => dest.tags,
      mapFrom((src) => src.tags)
    ),

    // **Question Details**
    forMember(
      (dest) => dest.difficulty,
      mapFrom((src) => src.difficulty)
    ),
    forMember(
      (dest) => dest.type,
      mapFrom((src) => src.type)
    ),
    forMember(
      (dest) => dest.timeLimit,
      mapFrom((src) => src.timeLimit)
    ),
    forMember(
      (dest) => dest.marks,
      mapFrom((src) => src.marks)
    ),
    forMember(
      (dest) => dest.correctAnswer,
      mapFrom((src) => src.correctAnswer)
    ),
    forMember(
      (dest) => dest.answerOptions,
      mapFrom((src) => src.answerOptions)
    ),
    forMember(
      (dest) => dest.questionExplanation,
      mapFrom((src) => src.questionExplanation)
    ),
    forMember(
      (dest) => dest.answerExplanation,
      mapFrom((src) => src.answerExplanation)
    ),

    // **Relation Information**
    forMember(
      (dest) => dest.industryId,
      mapFrom((src) => src.industryId)
    ),
    forMember(
      (dest) => dest.domainId,
      mapFrom((src) => src.domainId)
    ),
    forMember(
      (dest) => dest.industryRoleId,
      mapFrom((src) => src.industryRoleId)
    )
  );
};
