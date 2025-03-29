class ErrorMessage extends Error {
  constructor(statusCode, message) {
    super(message); // Call the parent Error class
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor); // Captures where the error was thrown
  }
}

export default ErrorMessage;
