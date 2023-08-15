export class HttpError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'HttpError';
  }
}

export class ApiError extends Error {
  constructor(message: string, public status: string, public code: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }

  getErrorCode() {
    return this.code;
  }
}
