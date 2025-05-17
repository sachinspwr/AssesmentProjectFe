import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { BasicTestDetailRequestDTO } from '@dto/request';
import { QuestionResponseDTO, TestResponseDTO, TestSettingOptionResponseDTO } from '@dto/response';
import { ExperienceLevelResponseDTO } from '@dto/response/experience-level-response.dto';
import { TestRegistrationFieldOptionResponseDTO } from '@dto/response/registration-field-option-response.dto';
import { TestInstructionOptionResponseDTO } from '@dto/response/test-instruction-option-response.dto';
import { TestSectionResponseDTO } from '@dto/response/test-section-response.dto';
import { TestSection, ExperienceLevel, Test, Question, TestInstructionOption, TestSettingOption } from 'models';
import { TestRegistrationFieldOption } from 'models/test/registration-field-opition';

export const testProfile = (mapper: Mapper) => {
  // ExperienceLevel mapping
  createMap(
    mapper,
    ExperienceLevelResponseDTO,
    ExperienceLevel,
    forMember(dest => dest.id, mapFrom(src => src.id)),
    forMember(dest => dest.name, mapFrom(src => src.name)),
    forMember(dest => dest.description, mapFrom(src => src.description)),
  );

  // TestSettingOption mapping
  createMap(
    mapper,
    TestSettingOptionResponseDTO,
    TestSettingOption,
    forMember(dest => dest.id, mapFrom(src => src.id)),
    forMember(dest => dest.category, mapFrom(src => src.category)),
    forMember(dest => dest.key, mapFrom(src => src.key)),
    forMember(dest => dest.value, mapFrom(src => src.value)),
    forMember(dest => dest.valueType, mapFrom(src => src.valueType)),
    forMember(dest => dest.description, mapFrom(src => src.description)),
    forMember(dest => dest.isConfigurable, mapFrom(src => src.isConfigurable))
  );

  // TestRegistrationFieldOption mapping
  createMap(
    mapper,
    TestRegistrationFieldOptionResponseDTO,
    TestRegistrationFieldOption,
    forMember(dest => dest.id, mapFrom(src => src.id)),
    forMember(dest => dest.name, mapFrom(src => src.name)),
    forMember(dest => dest.type, mapFrom(src => src.type)),
    forMember(dest => dest.label, mapFrom(src => src.label)),
    forMember(dest => dest.placeholder, mapFrom(src => src.placeholder)),
    forMember(dest => dest.isRequired, mapFrom(src => src.isRequired)),
    forMember(dest => dest.options, mapFrom(src => src.options))
  );

  // TestInstructionOption mapping
  createMap(
    mapper,
    TestInstructionOptionResponseDTO,
    TestInstructionOption,
    forMember(dest => dest.id, mapFrom(src => src.id)),
    forMember(dest => dest.category, mapFrom(src => src.category)),
    forMember(dest => dest.key, mapFrom(src => src.key)),
    forMember(dest => dest.value, mapFrom(src => src.value)),
    forMember(dest => dest.valueType, mapFrom(src => src.valueType)),
    forMember(dest => dest.description, mapFrom(src => src.description))
  );

  // TestSection mapping
  createMap(
    mapper,
    TestSectionResponseDTO,
    TestSection,
    forMember(dest => dest.id, mapFrom(src => src.id)),
    forMember(dest => dest.name, mapFrom(src => src.name)),
    forMember(dest => dest.testId, mapFrom(src => src.testId)),
    forMember(dest => dest.cutoffScore, mapFrom(src => src.cutoffScore)),
    forMember(dest => dest.description, mapFrom(src => src.description)),
    forMember(
      dest => dest.questions,
      mapFrom(src => mapper.mapArray(src.question || [], QuestionResponseDTO, Question))
    )
  );

  //Test Request to BasicTestRequest mapping
  createMap(
    mapper,
    Test,
    BasicTestDetailRequestDTO,
    forMember(dest => dest.title, mapFrom(src => src.title)),
    forMember(dest => dest.isPublic, mapFrom(src => src.isPublic)),
    forMember(dest => dest.testQuestionFormat, mapFrom(src => src.testQuestionFormat)),
    forMember(dest => dest.description, mapFrom(src => src.description ?? '')),
    forMember(dest => dest.cutoffScorePercentage, mapFrom(src => src.cutoffScorePercentage ?? 0)),
    forMember(dest => dest.experienceLevelId, mapFrom(src => src.experienceLevelId)),
    forMember(dest => dest.status, mapFrom(src => src.status)),
    forMember(dest => dest.hasNegativeMarking, mapFrom(src => src.hasNegativeMarking ?? false)),
    forMember(dest => dest.randomizeQuestions, mapFrom(src => src.randomizeQuestions ?? false)),
  );

  // Main Test mapping
  createMap(
    mapper,
    TestResponseDTO,
    Test,
    forMember(dest => dest.id, mapFrom(src => src.id)),
    forMember(dest => dest.title, mapFrom(src => src.title)),
    forMember(dest => dest.description, mapFrom(src => src.description)),
    forMember(dest => dest.tags, mapFrom(src => src.tags || [])),
    forMember(dest => dest.totalQuestions, mapFrom(src => src.totalQuestions)),
    forMember(dest => dest.totalSections, mapFrom(src => src.totalSections)),
    forMember(dest => dest.maxScore, mapFrom(src => src.maxScore)),
    forMember(dest => dest.cutoffScorePercentage, mapFrom(src => src.cutoffScorePercentage)),
    forMember(dest => dest.durationInMinutes, mapFrom(src => src.durationInMinutes)),
    forMember(dest => dest.isPublic, mapFrom(src => src.isPublic)),
    forMember(dest => dest.randomizeQuestions, mapFrom(src => src.randomizeQuestions)),
    forMember(dest => dest.hasNegativeMarking, mapFrom(src => src.hasNegativeMarking)),
    forMember(dest => dest.isPublic, mapFrom(src => src.isPublic)),
    forMember(
      dest => dest.testQuestionFormat, 
      mapFrom(src => src.testQuestionFormat)
    ),
    forMember(dest => dest.status, mapFrom(src => src.status)),
    forMember(
      dest => dest.experienceLevel,
      mapFrom(src => src.experienceLevel 
        ? mapper.map(src.experienceLevel, ExperienceLevelResponseDTO, ExperienceLevel)
        : null)
    ),
    forMember(
      dest => dest.testSections,
      mapFrom(src => mapper.mapArray(src.testSections || [], TestSectionResponseDTO, TestSection))
    ),
    forMember(
      dest => dest.testRegistrationFields,
      mapFrom(src => mapper.mapArray(src.testRegistrationFields || [], 
        TestRegistrationFieldOptionResponseDTO, 
        TestRegistrationFieldOption))
    ),
    forMember(
      dest => dest.testSettings,
      mapFrom(src => mapper.mapArray(src.testSettings || [], 
        TestSettingOptionResponseDTO, 
        TestSettingOption))
    ),
    forMember(
      dest => dest.testInstructions,
      mapFrom(src => mapper.mapArray(src.testInstructions || [], 
        TestInstructionOptionResponseDTO, 
        TestInstructionOption))
    )
  );
};