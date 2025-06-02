export class TestRunnerApiError extends Error {
  constructor(
    public readonly data: unknown,
    public readonly meta?: {
      status?: number;
      isCritical?: boolean;
      isUnauthorized?: boolean;
    }
  ) {
    super(typeof data === 'string' ? data : 'Test Runner Error');
    this.name = 'TestRunnerApiError';
  }

  get shouldRetry() {
    return !this.meta?.isCritical && this.meta?.status !== 423;
  }
}