import { configureStore,  ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { participantReducer } from './participant/participant.slice';
import { sessionReducer, navigationReducer, timersReducer, securityReducer, answersReducer } from './session';

import { participantApi } from './participant';
import { testSessionApi } from './session/session-api.slice';
import { navigationSanityMiddleware } from './middlewares/navigation-sanity.middleware';
import { syncStateMiddleware } from './middlewares';

const reducers = {
  participant: participantReducer,
  session: sessionReducer,
  navigation: navigationReducer,
  answers: answersReducer,
  timers: timersReducer,
  security: securityReducer,
  [testSessionApi.reducerPath]: testSessionApi.reducer,
  [participantApi.reducerPath]: participantApi.reducer,
};

export const testRunnerStore = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
       ignoredActionPaths: ['payload.test.testSections', 'payload.error'],
          ignoredPaths: [
            'testRunner.test.testSections',
            'testSessionApi.mutations',
            'testSessionApi.queries',
          ],
      },
    }).concat(
      navigationSanityMiddleware,
      testSessionApi.middleware,
      participantApi.middleware,
      syncStateMiddleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TestRunnerState,
  unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
>;

// Now export the types after store declaration
export type TestRunnerState = ReturnType<typeof testRunnerStore.getState>;
export type TestRunnerDispatch = typeof testRunnerStore.dispatch;

// Typed hooks
export const useTestRunnerDispatch = () => useDispatch<TestRunnerDispatch>();
export const useTestRunnerSelector: TypedUseSelectorHook<TestRunnerState> = useSelector;
