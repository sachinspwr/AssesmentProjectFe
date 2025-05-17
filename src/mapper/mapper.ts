import { createMapper, addProfile, Mapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { testProfile } from './profiles/test.profile';
import { questionProfile } from './profiles/question.profile';
import { sharedProfile } from './profiles/shared.profile';
import { userProfile } from './profiles/user.profile';
import { subscriptionProfile } from './profiles/subscription.profile';

// ✅ Configure logger FIRST, before anything else
const mapper = createMapper({ strategyInitializer: classes() });

// ✅ Add profiles
const mapperProfiles = (mapper: Mapper) => {
  addProfile(mapper, subscriptionProfile);
  addProfile(mapper, userProfile);
  addProfile(mapper, sharedProfile);
  addProfile(mapper, questionProfile);
  addProfile(mapper, testProfile);
};

mapperProfiles(mapper);

export { mapper };
