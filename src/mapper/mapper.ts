import { createMapper, addProfile, Mapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { testProfile } from './profiles/test.profile';
import { questionProfile } from './profiles/question.profile';
import { sharedProfile } from './profiles/shared.profile';
import { userProfile } from './profiles/user.profile';
import { subscriptionProfile } from './profiles/subscription.profile';
import { tenantProfile } from './profiles/tenant.profile';
import { accountProfile } from './profiles/account.profiles';

// ✅ Configure logger FIRST, before anything else
const mapper = createMapper({ strategyInitializer: classes() });

// ✅ Add profiles
const mapperProfiles = (mapper: Mapper) => {
  addProfile(mapper, subscriptionProfile);
  addProfile(mapper, userProfile);
  addProfile(mapper, accountProfile);
  addProfile(mapper, sharedProfile);
  addProfile(mapper, questionProfile);
  addProfile(mapper, testProfile);
  addProfile(mapper, tenantProfile);
};

mapperProfiles(mapper);

export { mapper };
