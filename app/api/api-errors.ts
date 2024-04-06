class APIError extends Error {}

type Cause = [string, string][]

export class InvalidRequestBody extends Error {
  cause?: Cause;
  constructor(cause?: Cause) {
      super("Invalid request body");
      this.cause = cause;
  }
}
