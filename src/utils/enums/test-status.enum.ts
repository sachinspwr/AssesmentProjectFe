/* eslint-disable no-unused-vars */
export enum TestStatus {
  Draft = 'Draft',
  PendingReview = 'PendingReview',
  InReview = 'InReview',
  NeedsChanges = 'NeedsChanges',
  Approved = 'Approved',
  Published = 'Published',
  Active = 'Active',
  Inactive = 'Inactive',
  Archived = 'Archived',
  Rejected = 'Rejected',
}
 
 
export enum TestLinkStatus {
  Active = 'Active',
  Disabled = 'Disabled',
}

/* eslint-disable no-unused-vars */
export enum ResultStatus {
  Pending = 'Pending',
  Passed = 'Passed',
  Failed = 'Failed',
  Incomplete = 'Incomplete',
  Under_Review = 'Under_Review',
  Disputed = 'Disputed',
  Voided = 'Voided',
  Processing = 'Processing',
  Flagged = 'Flagged',
   Error = 'Error'
}

/* eslint-disable no-unused-vars */
export enum TestSessionStatus {
  /** Test has been created but not yet started by participant */
  Created = 'Created',

  /** Participant has entered the test but not answered questions */
  Started = 'Started',

  /** Participant is actively taking the test */
  InProgress = 'InProgress',

  /** Test was paused by admin/proctor */
  Paused = 'Paused',

  /** Test is submitting by admin/proctor */
  Submitting = 'Submitting',

  /** Test was successfully submitted */
  Completed = 'Completed',

  /** Test was auto-submitted due to timeout */
  Expired = 'Expired',

  /** Test was abandoned (browser closed or left without submitting) */
  Abandoned = 'Abandoned',

  /** Test was terminated by admin/proctor */
  Terminated = 'Terminated',

  /** Test requires manual review (e.g. proctoring violation) */
  UnderReview = 'UnderReview'
}



