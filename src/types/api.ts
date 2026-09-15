export class ApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export type ApiErrorCode =
  | "offline"
  | "network"
  | "mock_failure"
  | "validation_error"
  | "conflict"
  | "unknown";
