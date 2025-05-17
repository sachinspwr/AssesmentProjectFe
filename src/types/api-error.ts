export class AppError extends Error {
  constructor(
    public readonly code: string, // 'AUTH_REQUIRED', 'NOT_FOUND', etc.
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
  }
}
