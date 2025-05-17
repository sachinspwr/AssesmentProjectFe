import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import uiReducer from './slices/ui.slice';
import accountReducer, { accountApiSlice } from './slices/account.slice';
import instructionOptionReducer, { testInstructionsOptionApiSlice } from './slices/test-instruction-option.slice';
import testSettingOptionReducer, { testSettingOptionApiSlice } from './slices/test-setting-option.slice';
import questionsReducer, { questionsApiSlice } from './slices/questions.slice';
import subjectsReducer, { subjectsApiSlice } from './slices/subject.slice';
import experienceReducer, { experienceLevelApiSlice } from './slices/experience-level.slice';
import industriesReducer, { industryApiSlice } from './slices/industry.slice';
import domainsReducer, { domainsApiSlice } from './slices/domain.slice';
import industryrolesReducer, { industryrolesApiSlice } from './slices/industry-role.slice';
import categoryReducer, { categoriesApiSlice } from './slices/category.slice';
import { tagsApiSlice } from './slices/tag.slice';
import sectionReduceer, { testSectionApiSlice } from './slices/test-section.slice';
import instructionsReducer, { testInstructionsApiSlice } from './slices/test-instruction.slice';
import { ticketsApiSlice } from './slices/support.slice';
import testSettingReducer, { testSettingsApiSlice } from './slices/test-setting.slice';
import registrationFieldOptionReducer, {
  testRegistrationFieldsOptionApiSlice,
} from './slices/test-registration-field-option.slice';
import registrationFieldReducer, { testRegistrationFieldsApiSlice } from './slices/test-registration-field.slice';
import testsReducer, { testAssessmentApiSlice } from './slices/test-assessment.slice';
import testRunnerReducer, { testRunnerApiSlice } from './slices/test-runner.slice';
import { subscriptionsApiSlice } from './slices/subscription-option.slice';
import { paymentsApiSlice } from './slices/paymen-order.slice';
import { accountSubscriptionApiSlice } from './slices/account-subscription.slice';
import supportDocReducer, { supportDocApiSlice } from './slices/support-doc.slice';
import { ticketLogsApiSlice } from './slices/ticket-activity-log.slice';
import codeEvaluationReducer, { codeEvaluationApiSlice } from './slices/test-code-evaluation.slice';
import usersReducer, { usersApiSlice } from './slices/user.slice';
import { authApiSlice } from './slices/auth.slice';
import { testResultApiSlice } from './slices/test-result.slice';
import { articlesApiSlice } from './slices/articles.slice';
import rolesReducer, { rolesApiSlice } from './slices/roles.slice';
import fieldsReducer, { registrationFieldsApiSlice } from './slices/registration-fields.slice';
import tenantsReducer, { tenantsApiSlice } from './slices/tenant.slice';
import permissionsReducer, { permissionsApiSlice } from './slices/permissions.slice';

/* eslint-disable no-underscore-dangle */
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    account: accountReducer,
    questions: questionsReducer,
    subjects: subjectsReducer,
    experience: experienceReducer,
    industries: industriesReducer,
    domains: domainsReducer,
    industryroles: industryrolesReducer,
    categories: categoryReducer,
    instructionsOption: instructionOptionReducer,
    testSettingOption: testSettingOptionReducer,
    testsection: sectionReduceer,
    instructions: instructionsReducer,
    testSetting: testSettingReducer,
    registrationFieldOption: registrationFieldOptionReducer,
    registrationField: registrationFieldReducer,
    test: testsReducer,
    supportDoc: supportDocReducer,
    testRunner: testRunnerReducer,
    codeEvaluation: codeEvaluationReducer,
    users: usersReducer,
    fields: fieldsReducer,
    roles: rolesReducer,
    tenants: tenantsReducer,
    permissions: permissionsReducer,
    [accountApiSlice.reducerPath]: accountApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [questionsApiSlice.reducerPath]: questionsApiSlice.reducer,
    [subjectsApiSlice.reducerPath]: subjectsApiSlice.reducer,
    [experienceLevelApiSlice.reducerPath]: experienceLevelApiSlice.reducer,
    [industryApiSlice.reducerPath]: industryApiSlice.reducer,
    [domainsApiSlice.reducerPath]: domainsApiSlice.reducer,
    [industryrolesApiSlice.reducerPath]: industryrolesApiSlice.reducer,
    [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
    [testInstructionsOptionApiSlice.reducerPath]: testInstructionsOptionApiSlice.reducer,
    [testSettingOptionApiSlice.reducerPath]: testSettingOptionApiSlice.reducer,
    [tagsApiSlice.reducerPath]: tagsApiSlice.reducer,
    [testSectionApiSlice.reducerPath]: testSectionApiSlice.reducer,
    [testInstructionsApiSlice.reducerPath]: testInstructionsApiSlice.reducer,
    [ticketsApiSlice.reducerPath]: ticketsApiSlice.reducer,
    [testSettingsApiSlice.reducerPath]: testSettingsApiSlice.reducer,
    [testRegistrationFieldsOptionApiSlice.reducerPath]: testRegistrationFieldsOptionApiSlice.reducer,
    [testRegistrationFieldsApiSlice.reducerPath]: testRegistrationFieldsApiSlice.reducer,
    [testAssessmentApiSlice.reducerPath]: testAssessmentApiSlice.reducer,
    [testRunnerApiSlice.reducerPath]: testRunnerApiSlice.reducer,
    [subscriptionsApiSlice.reducerPath]: subscriptionsApiSlice.reducer,
    [paymentsApiSlice.reducerPath]: paymentsApiSlice.reducer,
    [accountSubscriptionApiSlice.reducerPath]: accountSubscriptionApiSlice.reducer,
    [supportDocApiSlice.reducerPath]: supportDocApiSlice.reducer,
    [articlesApiSlice.reducerPath]: articlesApiSlice.reducer,
    [ticketLogsApiSlice.reducerPath]: ticketLogsApiSlice.reducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [testResultApiSlice.reducerPath]:testResultApiSlice.reducer,
    [codeEvaluationApiSlice.reducerPath]: codeEvaluationApiSlice.reducer,
    [registrationFieldsApiSlice.reducerPath]: registrationFieldsApiSlice.reducer,
    [rolesApiSlice.reducerPath]: rolesApiSlice.reducer,
    [tenantsApiSlice.reducerPath]: tenantsApiSlice.reducer,
    [permissionsApiSlice.reducerPath]: permissionsApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      accountApiSlice.middleware,
      authApiSlice.middleware,
      questionsApiSlice.middleware,
      subjectsApiSlice.middleware,
      experienceLevelApiSlice.middleware,
      industryApiSlice.middleware,
      domainsApiSlice.middleware,
      industryrolesApiSlice.middleware,
      categoriesApiSlice.middleware,
      testInstructionsOptionApiSlice.middleware,
      testSettingOptionApiSlice.middleware,
      testAssessmentApiSlice.middleware,
      tagsApiSlice.middleware,
      testSectionApiSlice.middleware,
      testInstructionsApiSlice.middleware,
      ticketsApiSlice.middleware,
      testSettingsApiSlice.middleware,
      testRegistrationFieldsOptionApiSlice.middleware,
      testRegistrationFieldsApiSlice.middleware,
      testRunnerApiSlice.middleware,
      subscriptionsApiSlice.middleware,
      paymentsApiSlice.middleware,
      accountSubscriptionApiSlice.middleware,
      supportDocApiSlice.middleware,
      articlesApiSlice.middleware,
      ticketLogsApiSlice.middleware,
      usersApiSlice.middleware,
      testResultApiSlice.middleware,
      codeEvaluationApiSlice.middleware,
      usersApiSlice.middleware,
      registrationFieldsApiSlice.middleware,
      rolesApiSlice.middleware,
      tenantsApiSlice.middleware,
      permissionsApiSlice.middleware
    ),
    devTools: process.env.NODE_ENV !== 'production'
});
/* eslint-enable */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
