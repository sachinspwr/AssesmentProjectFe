export type TestRunnerActionTypes = 
  | 'participant/initializeTestSessionSuccess'
  | 'participant/submitTestSessionSuccess'
  | 'participant/endTestSession'
  | 'answers/saveAnswer'
  | 'navigation/setCurrentSection'
  | 'navigation/setCurrentQuestion';