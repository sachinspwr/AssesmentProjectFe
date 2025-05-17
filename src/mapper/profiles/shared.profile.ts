import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { SubjectResponseDTO } from '@dto/response/subject-response.dto';
import { Subject } from 'models';

export const sharedProfile = (mapper: Mapper) => {
  createMap(
    mapper,
    SubjectResponseDTO,
    Subject,
    forMember(
      (dest) => dest.id,
      mapFrom((src) => src.id)
    ),
    forMember(
      (dest) => dest.name,
      mapFrom((src) => src.name)
    ),
    forMember(
      (dest) => dest.description,
      mapFrom((src) => src.description)
    )
  );
};
